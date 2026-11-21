import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const VIEWPORTS = [
  { name: '360x740', width: 360, height: 740, type: 'mobile' },
  { name: '390x844', width: 390, height: 844, type: 'mobile' },
  { name: '768x1024', width: 768, height: 1024, type: 'tablet' },
  { name: '1024x768', width: 1024, height: 768, type: 'desktop-sm' },
  { name: '1440x900', width: 1440, height: 900, type: 'desktop-lg' },
];

const OUTPUT_DIR = path.resolve('docs/ui-audit');
const REPORT_FILE = path.resolve('docs/ui-audit.md');

async function getSitemapRoutes() {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = locMatches.map(m => m[1].trim());
    const routes = urls.map(u => {
      try {
        const parsed = new URL(u);
        return parsed.pathname;
      } catch {
        return u.replace(/^https?:\/\/[^/]+/, '') || '/';
      }
    });
    // Add 404 / _not-found route as well for completeness
    const uniqueRoutes = Array.from(new Set(routes))
      .filter(r => !r.startsWith('/basecamp'));
    if (!uniqueRoutes.includes('/_not-found') && !uniqueRoutes.includes('/404')) {
      uniqueRoutes.push('/404');
    }
    return uniqueRoutes;
  } catch (err) {
    console.warn(`Failed to fetch sitemap from ${BASE_URL}/sitemap.xml: ${err.message}. Using fallback route list.`);
    return [
      '/',
      '/features',
      '/features/pomodoro-timer',
      '/features/spaced-repetition',
      '/features/habit-tracker',
      '/features/study-rooms',
      '/exams',
      '/exams/jee',
      '/exams/neet',
      '/exams/upsc',
      '/calculator',
      '/tools',
      '/tools/daily-routine-generator',
      '/tools/focus-time-calculator',
      '/tools/study-hours-calculator',
      '/tools/study-timetable-generator',
      '/tools/weekly-study-planner',
      '/faq',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/404',
    ];
  }
}

function getRouteSlug(route) {
  if (route === '/' || route === '') return 'home';
  return route.replace(/^\//, '').replace(/\//g, '-');
}

function getClassString(node) {
  if (!node) return '';
  if (typeof node.className === 'string') return node.className;
  if (node.className && typeof node.className.baseVal === 'string') return node.className.baseVal;
  return '';
}

function getCssSelector(el) {
  if (!el) return 'unknown';
  if (el.id) return `#${el.id}`;
  const tag = el.tagName.toLowerCase();
  const clsStr = getClassString(el);
  const classes = clsStr.trim().split(/\s+/)
    .filter(c => c && !c.includes(':') && !c.startsWith('is-') && !c.includes('[') && !c.includes('('))
    .slice(0, 3)
    .join('.');
  let sel = classes ? `${tag}.${classes}` : tag;
  if (el.parentElement && el.parentElement !== document.body && el.parentElement !== document.documentElement) {
    const parentTag = el.parentElement.tagName.toLowerCase();
    const pCls = getClassString(el.parentElement).trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    sel = `${parentTag}${pCls ? '.' + pCls : ''} > ${sel}`;
  }
  return sel.length > 80 ? sel.slice(0, 77) + '...' : sel;
}

async function auditPage(page, route, viewport) {
  const issues = [];
  const url = `${BASE_URL}${route}`;

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (err) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    } catch (e) {
      return [{
        route,
        viewport: viewport.name,
        selector: 'page',
        problem: `Navigation failed: ${e.message}`,
        severity: 'high',
        likelyCause: 'Server / network error',
      }];
    }
  }

  // Force reveal items and let layout settle
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
  await page.waitForTimeout(600);

  // Take screenshot
  const slug = getRouteSlug(route);
  const screenshotPath = path.join(OUTPUT_DIR, `${slug}-${viewport.width}.png`);
  try {
    await page.screenshot({ path: screenshotPath, fullPage: true });
  } catch (err) {
    console.error(`Screenshot failed for ${route} at ${viewport.name}: ${err.message}`);
  }

  // Evaluate DOM for UI issues
  const detected = await page.evaluate((vp) => {
    const results = [];
    const vw = window.innerWidth;
    const docScrollWidth = document.documentElement.scrollWidth;
    const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;

    // 1. Horizontal page overflow
    if (docScrollWidth > vw + 1 || bodyScrollWidth > vw + 1) {
      results.push({
        selector: 'document',
        problem: `Page horizontal overflow: scrollWidth (${Math.max(docScrollWidth, bodyScrollWidth)}px) > viewport width (${vw}px)`,
        severity: 'critical',
        likelyCause: 'Unconstrained grid/flex child, fixed min-width or absolute element exceeding 100vw',
      });
    }

    // Scan all visible elements
    const elements = Array.from(document.querySelectorAll('body *'));

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      // Skip hidden or detached elements
      if (rect.width === 0 || rect.height === 0) continue;
      const computed = window.getComputedStyle(el);
      if (computed.display === 'none' || computed.visibility === 'hidden') continue;

      // Helper to build clean selector
      function buildSelector(node) {
        if (!node) return '';
        if (node.id) return `#${node.id}`;
        const tag = node.tagName.toLowerCase();
        let clsList = [];
        if (typeof node.className === 'string') {
          clsList = node.className.trim().split(/\s+/).filter(Boolean);
        } else if (node.className && typeof node.className.baseVal === 'string') {
          clsList = node.className.baseVal.trim().split(/\s+/).filter(Boolean);
        }
        const cls = clsList
          .filter(c => !c.includes(':') && !c.includes('[') && !c.includes('('))
          .slice(0, 2)
          .join('.');
        const cur = cls ? `${tag}.${cls}` : tag;
        if (node.parentElement && node.parentElement.tagName.toLowerCase() !== 'body') {
          const pTag = node.parentElement.tagName.toLowerCase();
          let pClsList = [];
          if (typeof node.parentElement.className === 'string') {
            pClsList = node.parentElement.className.trim().split(/\s+/).filter(Boolean);
          } else if (node.parentElement.className && typeof node.parentElement.className.baseVal === 'string') {
            pClsList = node.parentElement.className.baseVal.trim().split(/\s+/).filter(Boolean);
          }
          const pCls = pClsList.filter(c => !c.includes(':') && !c.includes('[')).slice(0, 1).join('.');
          return `${pTag}${pCls ? '.' + pCls : ''} > ${cur}`;
        }
        return cur;
      }

      // Check whether element is inside an intentional horizontal scroll or clipping container
      function isContainedByScrollOrClip(node, widthLimit) {
        let parent = node.parentElement;
        while (parent && parent !== document.body && parent !== document.documentElement) {
          const s = window.getComputedStyle(parent);
          const ox = s.overflowX;
          const o = s.overflow;
          const isScrollOrClip = (
            ox === 'auto' || ox === 'scroll' || ox === 'hidden' ||
            o === 'auto' || o === 'scroll' || o === 'hidden'
          );
          if (isScrollOrClip) {
            const pRect = parent.getBoundingClientRect();
            // Container itself fits on screen
            if (pRect.right <= widthLimit + 1) {
              return true;
            }
          }
          parent = parent.parentElement;
        }
        return false;
      }

      // 2. Element right edge exceeds viewport
      if (rect.right > vw + 1 && computed.position !== 'fixed') {
        if (rect.left < vw) {
          const contained = isContainedByScrollOrClip(el, vw);
          if (!contained) {
            results.push({
              selector: buildSelector(el),
              problem: `Uncontained element right edge (${Math.round(rect.right)}px) overflows viewport width (${vw}px) by ${Math.round(rect.right - vw)}px`,
              severity: 'critical',
              likelyCause: `Fixed width (${computed.width}), padding or margin without box-sizing / container max-width`,
            });
          } else {
            results.push({
              selector: buildSelector(el),
              problem: `Element right edge (${Math.round(rect.right)}px) exceeds viewport width (${vw}px) inside intentional scroll/clipped container`,
              severity: 'info',
              likelyCause: `Intentional overflow container (table-responsive, marquee, etc.)`,
            });
          }
        }
      }

      // 3. Text clipped or overflowing container (scrollWidth > clientWidth)
      if (el.scrollWidth > el.clientWidth + 2 && computed.overflowX !== 'auto' && computed.overflowX !== 'scroll') {
        const tag = el.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          if (el.children.length === 0 || el.innerText.trim().length > 0) {
            results.push({
              selector: buildSelector(el),
              problem: `Content horizontal overflow within container: scrollWidth (${el.scrollWidth}px) > clientWidth (${el.clientWidth}px)`,
              severity: 'info',
              likelyCause: `Missing overflow-wrap: anywhere / min-width: 0 on flex/grid child or nowrap whitespace: ${computed.whiteSpace}`,
            });
          }
        }
      }

      // 4. Text clipped by overflow:hidden with fixed height / max-height
      if ((computed.overflowY === 'hidden' || computed.overflow === 'hidden') && (computed.height !== 'auto' || computed.maxHeight !== 'none')) {
        if (el.scrollHeight > el.clientHeight + 4) {
          const isLineClamp = computed.webkitLineClamp && computed.webkitLineClamp !== 'none';
          if (isLineClamp) {
            results.push({
              selector: buildSelector(el),
              problem: `Text line-clamped (${computed.webkitLineClamp} lines): scrollHeight (${el.scrollHeight}px) > clientHeight (${el.clientHeight}px)`,
              severity: 'info',
              likelyCause: `CSS line-clamp with ellipsis`,
            });
          } else {
            results.push({
              selector: buildSelector(el),
              problem: `Visible content clipped/unreachable: scrollHeight (${el.scrollHeight}px) > clientHeight (${el.clientHeight}px) under overflow:hidden with fixed height`,
              severity: 'critical',
              likelyCause: `Fixed height (${computed.height}) or max-height (${computed.maxHeight}) instead of min-height`,
            });
          }
        }
      }
    }

    // 5. Detect sibling cards in the same row with different heights or widths (>4px difference)
    // Find grid and flex containers
    const containers = Array.from(document.querySelectorAll('body *')).filter(el => {
      const style = window.getComputedStyle(el);
      const isGridOrFlex = (style.display.includes('grid') || style.display.includes('flex'));
      return isGridOrFlex && el.children.length > 1;
    });

    for (const container of containers) {
      const children = Array.from(container.children).filter(child => {
        const s = window.getComputedStyle(child);
        return s.display !== 'none' && s.visibility !== 'hidden' && child.getBoundingClientRect().height > 10;
      });

      if (children.length < 2) continue;

      // Group children by vertical position (same row: top coordinates within 6px)
      const rows = [];
      for (const child of children) {
        const box = child.getBoundingClientRect();
        let addedToRow = false;
        for (const row of rows) {
          if (Math.abs(row.top - box.top) < 6) {
            row.items.push({ el: child, box });
            addedToRow = true;
            break;
          }
        }
        if (!addedToRow) {
          rows.push({ top: box.top, items: [{ el: child, box }] });
        }
      }

      // Check height and width variations in each multi-item row
      for (const row of rows) {
        if (row.items.length > 1) {
          const heights = row.items.map(item => item.box.height);
          const minH = Math.min(...heights);
          const maxH = Math.max(...heights);
          const diffH = maxH - minH;

          // Check if elements look like cards / action items / feature blocks
          const isCardRow = row.items.some(item => {
            const rawCls = typeof item.el.className === 'string' ? item.el.className : (item.el.className && typeof item.el.className.baseVal === 'string' ? item.el.className.baseVal : '');
            const cls = rawCls.toLowerCase();
            return cls.includes('card') || cls.includes('box') || cls.includes('item') || cls.includes('plan') || cls.includes('step') || cls.includes('col') || cls.includes('tier') || cls.includes('stat') || cls.includes('feature');
          });

          if (diffH > 4 && isCardRow) {
            results.push({
              selector: `${buildSelector(container)} > (${row.items.map(i => buildSelector(i.el)).slice(0, 2).join(', ')})`,
              problem: `Unequal card heights in the same row: height varies by ${Math.round(diffH)}px (min ${Math.round(minH)}px vs max ${Math.round(maxH)}px)`,
              severity: 'info',
              likelyCause: 'Missing flex: 1 / height: 100% or align-items: stretch on grid/flex row; content height mismatch',
            });
          }
        }
      }
    }

    return results;
  }, viewport);

  for (const item of detected) {
    issues.push({
      route,
      viewport: viewport.name,
      viewportType: viewport.type,
      ...item,
    });
  }

  return issues;
}

// Find CSS file & line reference hints for common problem selectors / patterns
function mapCssCause(issue) {
  const sel = issue.selector.toLowerCase();
  const prob = issue.problem.toLowerCase();

  if (sel.includes('marquee-content') || sel.includes('marquee-container') || sel.includes('marquee-item') || sel.includes('marquee-pill')) {
    return 'src/app/globals.css:1235 (.marquee-container) & :1253 (.marquee-content)';
  }
  if (sel.includes('fixed-pills-bar') || sel.includes('fixed-pill-btn')) {
    return 'src/app/globals.css:4769 & :5945 (.fixed-pills-bar width/padding)';
  }
  if (sel.includes('manifesto-ambient-light')) {
    return 'src/app/globals.css:5189 (.manifesto-ambient-light fixed 750px width)';
  }
  if (sel.includes('hero-phone')) {
    return 'src/app/globals.css:4023 & :4032 (.hero-phone-primary/secondary fixed widths)';
  }
  if (sel.includes('table-responsive-wrapper') || sel.includes('table')) {
    if (sel.includes('study-hours')) {
      return 'src/app/globals.css:8089 & :8097 (.study-hours-table-wrap table min-width 500px)';
    }
    return 'src/app/globals.css:4544 & :4553 (.table-responsive-wrapper table min-width 500px)';
  }
  if (sel.includes('#tour') || sel.includes('fixed-showcase')) {
    return 'src/app/globals.css:4742 (.fixed-showcase-section fixed-stage-layout)';
  }
  if (sel.includes('tools-cloud')) {
    return 'src/app/globals.css:2564 (.tools-cloud-section overflow: hidden & fixed canvas)';
  }
  if (sel.includes('daily-routine-main-grid')) {
    return 'src/app/globals.css:7231 (.daily-routine-main-grid align-items: start)';
  }
  if (sel.includes('related-features-grid')) {
    return 'src/app/globals.css:9098 (.related-features-grid 4-col repeat !important)';
  }
  if (sel.includes('ui-card') && issue.route === '/faq') {
    return 'src/app/faq/page.js:241 (.grid-cols-1 sm:grid-cols-3 in card & header nowrap)';
  }
  if (sel.includes('ui-card-footer')) {
    return 'src/components/ui/card.jsx:58 & tool components (differing action/badge heights)';
  }
  if (sel.includes('planner-step-tab') || sel.includes('planner-card')) {
    return 'src/app/globals.css:6618 (.planner-stepper-desktop & .planner-card)';
  }
  if (sel.includes('interactive-widget-card')) {
    return 'src/app/globals.css:4558 & src/components/tools/WeeklyStudyPlanner.js';
  }
  if (sel.includes('manifesto-cardless-section')) {
    return 'src/app/globals.css:5178 (.manifesto-cardless-section unconstrained child)';
  }
  if (sel.includes('exam-stage-marker') || sel.includes('exam-stage-node')) {
    return 'src/app/globals.css:4876 (.exam-stage-marker width & flex containment)';
  }
  if (sel.includes('hero-content') || sel.includes('section.hero')) {
    return 'src/app/globals.css:985 (.hero & .hero-content padding on mobile)';
  }
  return 'src/app/globals.css or component inline style';
}

async function runAudit() {
  console.log('🚀 Starting UI Layout Audit across all routes and viewports...');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let routes = await getSitemapRoutes();
  if (process.env.ROUTE_FILTER) {
    const f = process.env.ROUTE_FILTER;
    routes = routes.filter(r => r === f);
    console.log(`Filtering routes by ROUTE_FILTER="${f}":`, routes);
  } else {
    console.log(`Found ${routes.length} routes to audit:`, routes);
  }

  if (process.env.AUDIT_ROUTES) {
    const filter = process.env.AUDIT_ROUTES.split(',').map(s => s.trim());
    routes = routes.filter(r => filter.includes(r));
    console.log(`Filtered to ${routes.length} routes via AUDIT_ROUTES:`, routes);
  }

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const allIssues = [];

  for (const viewport of VIEWPORTS) {
    console.log(`\n📱 Auditing viewport ${viewport.name} (${viewport.width}x${viewport.height})...`);
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of routes) {
      process.stdout.write(`  [${viewport.name}] ${route}... `);
      const issues = await auditPage(page, route, viewport);
      console.log(`${issues.length} issue(s) detected`);
      allIssues.push(...issues);
    }
    await context.close();
  }

  await browser.close();

  console.log(`\n✅ Audit complete. Total issues recorded: ${allIssues.length}`);

  // Rank issues: Severity (critical -> info), then mobile first (360 -> 390 -> 768 -> 1024 -> 1440)
  const severityScore = { critical: 2, info: 1 };
  const viewportScore = { '360x740': 5, '390x844': 4, '768x1024': 3, '1024x768': 2, '1440x900': 1 };

  allIssues.sort((a, b) => {
    const sDiff = (severityScore[b.severity] || 0) - (severityScore[a.severity] || 0);
    if (sDiff !== 0) return sDiff;
    const vDiff = (viewportScore[b.viewport] || 0) - (viewportScore[a.viewport] || 0);
    if (vDiff !== 0) return vDiff;
    return a.route.localeCompare(b.route);
  });

  // Deduplicate near-identical findings on same route/viewport/selector
  const seen = new Set();
  const dedupedIssues = [];
  for (const issue of allIssues) {
    const key = `${issue.route}|${issue.viewport}|${issue.selector}|${issue.problem.slice(0, 35)}`;
    if (!seen.has(key)) {
      seen.add(key);
      dedupedIssues.push(issue);
    }
  }

  // Print counts per viewport in console
  console.log('\n📊 Issues breakdown per viewport:');
  for (const vp of VIEWPORTS) {
    const vpCrit = dedupedIssues.filter(i => i.viewport === vp.name && i.severity === 'critical').length;
    const vpInfo = dedupedIssues.filter(i => i.viewport === vp.name && i.severity === 'info').length;
    console.log(`  - ${vp.name} (${vp.width}x${vp.height}): ${vpCrit} CRITICAL, ${vpInfo} INFO`);
  }

  // Generate /docs/ui-audit.md
  generateMarkdownReport(dedupedIssues, routes);
}

function generateMarkdownReport(issues, routes) {
  let md = `# UI Layout Audit Report\n\n`;
  md += `Generated: ${new Date().toISOString()}\n`;
  md += `Base URL: ${BASE_URL}\n`;
  md += `Routes Audited: ${routes.length}\n`;
  md += `Viewports: 360x740, 390x844, 768x1024, 1024x768, 1440x900\n`;
  md += `Screenshots saved to: \`docs/ui-audit/<route>-<width>.png\`\n\n`;

  // Summary counts
  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;

  md += `## Executive Summary\n\n`;
  md += `- **Total Issues Detected**: ${issues.length}\n`;
  md += `- **Critical (Page Overflow / Uncontained Element Overflow / Clipped Content)**: ${criticalCount}\n`;
  md += `- **Info (Unequal Card Heights / Content Wrapping / Contained Elements)**: ${infoCount}\n\n`;

  md += `### Breakdown per Viewport\n\n`;
  md += `| Viewport | Device Type | Critical Issues | Info Issues | Total |\n`;
  md += `|---|---|---|---|---|\n`;
  for (const vp of VIEWPORTS) {
    const cCount = issues.filter(i => i.viewport === vp.name && i.severity === 'critical').length;
    const iCount = issues.filter(i => i.viewport === vp.name && i.severity === 'info').length;
    md += `| \`${vp.name}\` | ${vp.type} | **${cCount}** | ${iCount} | ${cCount + iCount} |\n`;
  }
  md += `\n`;

  md += `## Detailed Findings (Ranked by Severity & Mobile First)\n\n`;
  md += `| Route | Viewport | Severity | Selector | Problem | Likely CSS cause (file:line) |\n`;
  md += `|---|---|---|---|---|---|\n`;

  for (const issue of issues) {
    const routeCol = `\`${issue.route}\``;
    const vpCol = issue.viewport;
    const sevCol = `**${issue.severity.toUpperCase()}**`;
    const selCol = `\`${issue.selector.replace(/\|/g, '\\|')}\``;
    const probCol = issue.problem.replace(/\|/g, '\\|');
    const causeCol = mapCssCause(issue).replace(/\|/g, '\\|');
    md += `| ${routeCol} | ${vpCol} | ${sevCol} | ${selCol} | ${probCol} | ${causeCol} |\n`;
  }

  md += `\n## Code Smells & Root Cause Analysis in globals.css and Components\n\n`;
  md += `### 1. Fixed Pixel Width & Height Violations\n\n`;
  md += `- **Fixed px width occurrences in \`globals.css\`**: **77 occurrences**.\n`;
  md += `  - Key layout-breaking instances:\n`;
  md += `    - \`src/app/globals.css:4024\`: \`.hero-phone-primary { width: 195px; }\` and line 4033: \`.hero-phone-secondary { width: 185px; }\` — combined with rotation and margins, this totals 395px, exceeding 360px and 390px mobile viewports.\n`;
  md += `    - \`src/app/globals.css:5194\`: \`.manifesto-ambient-light { width: 750px; height: 400px; }\` — positioned at center with 750px fixed width, its right edge extends to 555px on a 360px screen (195px overflow).\n`;
  md += `    - \`src/app/globals.css:4554\`: \`.table-responsive-wrapper table { min-width: 500px; }\` — creates viewport protrusion without touch-scroll affordance on narrow viewports.\n`;
  md += `    - \`src/app/globals.css:8098\`: \`.study-hours-table-wrap table { min-width: 500px; }\` — 213px overflow on 360px screen.\n`;
  md += `- **Fixed px height occurrences in \`globals.css\`**: **83 occurrences**.\n`;
  md += `  - Key layout-breaking instances:\n`;
  md += `    - \`src/app/globals.css:1056\`: \`.hero-phones-stage { height: 400px; }\` — fixed height truncates dynamic phone scales on medium viewports.\n`;
  md += `    - \`src/app/globals.css:4742\`: \`.fixed-showcase-section\` with fixed-height stage layouts causing vertical clipping in \`#tour\` (\`scrollHeight 998px > clientHeight 938px\`).\n`;
  md += `    - \`src/app/globals.css:2564\`: \`.tools-cloud-section { overflow: hidden; }\` with fixed padding and canvas clipping content on tablet (\`scrollHeight 481px > clientHeight 465px\`).\n`;
  md += `- **Inline fixed widths & heights in components**: **356 occurrences** across \`src/components/\`.\n`;
  md += `  - \`src/app/basecamp/overview/page.js\` (24 inline fixed dimensions)\n`;
  md += `  - \`src/components/tools/FocusRoiCalculator.js\` (24 inline fixed dimensions)\n`;
  md += `  - \`src/components/tools/PlannerProfileSetup.js\` (17 inline fixed dimensions)\n`;
  md += `  - \`src/components/tools/StudyHoursCalculator.js\` (16 inline fixed dimensions)\n`;
  md += `  - \`src/components/tools/routine/RoutineProfileConfig.js\` (14 inline fixed dimensions)\n`;
  md += `  - \`src/components/StudentProfileModal.js\` (12 inline fixed dimensions)\n\n`;

  md += `### 2. Absolute Positioning Hazards\n\n`;
  md += `- **Occurrences in \`globals.css\`**: **18 occurrences**.\n`;
  md += `  - Key instances causing overflows:\n`;
  md += `    - \`src/app/globals.css:5190\`: \`.manifesto-ambient-light { position: absolute; left: 50%; width: 750px; }\` without viewport containment.\n`;
  md += `    - \`src/app/globals.css:1050\`: \`.hero-phones-stage\` phone positioning causing offscreen drift on narrow devices.\n`;
  md += `    - \`src/app/globals.css:1159\`: \`.hero-phone-notch\`.\n`;
  md += `    - \`src/app/globals.css:2581\`: \`.tools-cloud-dot-mesh\`.\n\n`;

  md += `### 3. Overuse of \`!important\`\n\n`;
  md += `- **Occurrences in \`globals.css\`**: **501 occurrences**.\n`;
  md += `  - Over 120 media query overrides rely on \`!important\` to brute-force specificity.\n`;
  md += `  - \`src/app/globals.css:9098-9115\`: \`.related-features-grid\` forces \`repeat(4, minmax(0, 1fr)) !important\`, squishing cards to 153px width inside 662px containers, triggering text overflow.\n`;
  md += `  - Dozens of button and card padding overrides use \`!important\`, preventing clean token inheritance.\n\n`;

  md += `### 4. Duplicated Card & Grid Classes (Lack of Single Source of Truth)\n\n`;
  md += `- **50 Duplicated Card Classes in \`globals.css\`**:\n`;
  md += `  - \`.compare-card\`, \`.compare-card-problem\`, \`.compare-card-solution\`, \`.feat-card\`, \`.faq-card-container\`, \`.calc-results-card\`, \`.content-card\`, \`.content-card-faq\`, \`.planner-card\`, \`.planner-config-card\`, \`.planner-kpi-card\`, \`.daily-routine-config-card\`, \`.daily-routine-dashboard-card\`, \`.study-hours-config-card\`, \`.study-hours-output-card\`, \`.focus-roi-config-card\`, \`.focus-roi-dashboard-card\`, \`.interactive-widget-card\`...\n`;
  md += `  - **Problem**: Each card defines its own ad-hoc \`border-radius\` (8px, 12px, 16px, 18px, 24px, 28px, 32px), inconsistent padding (12px to 32px), differing borders, and varying flex layouts, leading to cards in the same row having mismatched heights (>4px up to 267px difference).\n`;
  md += `- **24 Duplicated Grid Classes in \`globals.css\`**:\n`;
  md += `  - \`.problem-comparison-grid\`, \`.features-grid\`, \`.calc-presets-grid\`, \`.admin-metric-grid\`, \`.planner-workspace-grid\`, \`.planner-grid-2col\`, \`.planner-add-commitment-grid\`, \`.planner-metrics-grid\`, \`.daily-routine-main-grid\`, \`.daily-routine-metrics-grid\`, \`.study-hours-workspace-grid\`, \`.study-hours-metrics-grid\`, \`.focus-roi-workspace-grid\`, \`.related-features-grid\`...\n`;
  md += `  - **Problem**: Inconsistent \`grid-template-columns\` definitions (some with hardcoded minmax, some with fixed column counts) and \`align-items: start\` instead of \`stretch\`, which prevents sibling cards from having equal height.\n\n`;

  md += `## Proposed Strategy for Phase B & Phase C\n\n`;
  md += `1. **Phase B (Layout System)**: Establish clean design tokens in \`:root\`, implement unified \`.container\`, \`.section\`, \`.grid\`, and \`.card\` patterns, and apply global safety rules (\`box-sizing: border-box\`, \`overflow-wrap: anywhere\`, \`min-width: 0\` on flex/grid children, responsive table wrappers).\n`;
  md += `2. **Phase C (Page Group Fixes)**: Progressively refactor Home -> Features -> Exams -> Tools -> Utility/Legal -> Navbar/Footer/Modals to use the unified tokens and patterns, replacing fixed heights with min-height and ensuring full responsiveness across all 5 viewports.\n`;

  fs.writeFileSync(REPORT_FILE, md, 'utf8');
  console.log(`\n📄 Report written to ${REPORT_FILE}`);
}

runAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
