import fs from 'fs';
import path from 'path';

const PUBLIC_ROUTES = [
  { path: '/', htmlFile: '.next/server/app/index.html', isHome: true },
  { path: '/features', htmlFile: '.next/server/app/features.html', isFeature: true },
  { path: '/features/pomodoro-timer', htmlFile: '.next/server/app/features/pomodoro-timer.html', isFeature: true },
  { path: '/features/spaced-repetition', htmlFile: '.next/server/app/features/spaced-repetition.html', isFeature: true },
  { path: '/features/habit-tracker', htmlFile: '.next/server/app/features/habit-tracker.html', isFeature: true },
  { path: '/features/study-rooms', htmlFile: '.next/server/app/features/study-rooms.html', isFeature: true },
  { path: '/tools', htmlFile: '.next/server/app/tools.html', isTool: true },
  { path: '/tools/study-timetable-generator', htmlFile: '.next/server/app/tools/study-timetable-generator.html', isTool: true },
  { path: '/tools/daily-routine-generator', htmlFile: '.next/server/app/tools/daily-routine-generator.html', isTool: true },
  { path: '/tools/study-hours-calculator', htmlFile: '.next/server/app/tools/study-hours-calculator.html', isTool: true },
  { path: '/tools/weekly-study-planner', htmlFile: '.next/server/app/tools/weekly-study-planner.html', isTool: true },
  { path: '/tools/focus-time-calculator', htmlFile: '.next/server/app/tools/focus-time-calculator.html', isTool: true },
  { path: '/calculator', htmlFile: '.next/server/app/calculator.html', isTool: true },
  { path: '/exams', htmlFile: '.next/server/app/exams.html', isExam: true },
  { path: '/exams/jee', htmlFile: '.next/server/app/exams/jee.html', isExam: true },
  { path: '/exams/neet', htmlFile: '.next/server/app/exams/neet.html', isExam: true },
  { path: '/exams/upsc', htmlFile: '.next/server/app/exams/upsc.html', isExam: true },
  { path: '/faq', htmlFile: '.next/server/app/faq.html', isInfo: true },
  { path: '/about', htmlFile: '.next/server/app/about.html', isInfo: true },
  { path: '/contact', htmlFile: '.next/server/app/contact.html', isInfo: true },
  { path: '/privacy', htmlFile: '.next/server/app/privacy.html', isInfo: true },
  { path: '/terms', htmlFile: '.next/server/app/terms.html', isInfo: true },
];

function extractJsonLdBlocks(html) {
  const blocks = [];
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawContent = match[1].trim();
    if (rawContent) {
      blocks.push(rawContent);
    }
  }
  return blocks;
}

function getAllNodes(parsed) {
  let nodes = [];
  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      nodes = nodes.concat(getAllNodes(item));
    }
  } else if (parsed && typeof parsed === 'object') {
    if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
      for (const item of parsed['@graph']) {
        nodes = nodes.concat(getAllNodes(item));
      }
    } else {
      nodes.push(parsed);
    }
  }
  return nodes;
}

let totalErrors = 0;
let totalBlocks = 0;
const results = [];

console.log(`🔍 Starting JSON-LD Structured Data Validation Across All ${PUBLIC_ROUTES.length} Public Routes...\n`);

for (const route of PUBLIC_ROUTES) {
  const fullPath = path.resolve(process.cwd(), route.htmlFile);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ HTML file missing for route ${route.path}: ${route.htmlFile}`);
    totalErrors++;
    continue;
  }

  const html = fs.readFileSync(fullPath, 'utf8');
  const blocks = extractJsonLdBlocks(html);
  totalBlocks += blocks.length;

  if (blocks.length === 0) {
    console.error(`❌ No JSON-LD blocks found in route ${route.path}`);
    totalErrors++;
    continue;
  }

  let routeErrors = 0;
  const parsedNodes = [];

  for (let i = 0; i < blocks.length; i++) {
    try {
      const parsed = JSON.parse(blocks[i]);
      parsedNodes.push(...getAllNodes(parsed));
    } catch (err) {
      console.error(`❌ JSON parse error in ${route.path} (block ${i + 1}): ${err.message}`);
      routeErrors++;
    }
  }

  // Node validation
  const nodeTypes = parsedNodes.map((n) => n['@type']).filter(Boolean);

  // 1. Check Sitewide Organization and WebSite
  const org = parsedNodes.find((n) => n['@type'] === 'Organization');
  if (!org) {
    console.error(`❌ Missing sitewide Organization schema in ${route.path}`);
    routeErrors++;
  } else {
    if (org.name !== 'LifeTrack Pro') {
      console.error(`❌ Organization name incorrect in ${route.path}: expected "LifeTrack Pro", got "${org.name}"`);
      routeErrors++;
    }
    if (!org.url || org.url !== 'https://lifetrackpro.in') {
      console.error(`❌ Organization url incorrect in ${route.path}: ${org.url}`);
      routeErrors++;
    }
    if (!org.logo) {
      console.error(`❌ Organization logo missing in ${route.path}`);
      routeErrors++;
    }
    if (!Array.isArray(org.sameAs) || org.sameAs.length < 4) {
      console.error(`❌ Organization sameAs missing or incomplete in ${route.path}: expected at least 4 social profiles`);
      routeErrors++;
    }
  }

  const webSite = parsedNodes.find((n) => n['@type'] === 'WebSite');
  if (!webSite) {
    console.error(`❌ Missing WebSite schema in ${route.path}`);
    routeErrors++;
  }

  // 2. BreadcrumbList check on all inner pages
  if (!route.isHome) {
    const breadcrumb = parsedNodes.find((n) => n['@type'] === 'BreadcrumbList');
    if (!breadcrumb) {
      console.error(`❌ Missing BreadcrumbList schema on inner page ${route.path}`);
      routeErrors++;
    } else {
      if (!Array.isArray(breadcrumb.itemListElement) || breadcrumb.itemListElement.length === 0) {
        console.error(`❌ BreadcrumbList has empty itemListElement on ${route.path}`);
        routeErrors++;
      } else {
        // Validate each item
        breadcrumb.itemListElement.forEach((item, idx) => {
          if (!item.name || !item.item || typeof item.position !== 'number') {
            console.error(`❌ Malformed breadcrumb item #${idx + 1} on ${route.path}`);
            routeErrors++;
          }
          if (item.item && item.item.endsWith('/') && item.item !== 'https://lifetrackpro.in') {
            console.error(`❌ Breadcrumb item URL has trailing slash on ${route.path}: ${item.item}`);
            routeErrors++;
          }
        });
      }
    }
  }

  // 3. Home + Feature pages: MobileApplication / SoftwareApplication
  if (route.isHome || route.isFeature || route.isExam) {
    const app = parsedNodes.find((n) => n['@type'] === 'MobileApplication' || n['@type'] === 'SoftwareApplication');
    if (!app) {
      console.error(`❌ Missing MobileApplication/SoftwareApplication on ${route.path}`);
      routeErrors++;
    } else {
      if (app.operatingSystem !== 'Android') {
        console.error(`❌ App operatingSystem must be "Android" on ${route.path}, got "${app.operatingSystem}"`);
        routeErrors++;
      }
      if (!['ProductivityApplication', 'EducationalApplication'].includes(app.applicationCategory)) {
        console.error(`❌ Invalid applicationCategory "${app.applicationCategory}" on ${route.path}`);
        routeErrors++;
      }
      if (!app.offers || app.offers.price !== '0' || app.offers.priceCurrency !== 'INR') {
        console.error(`❌ Invalid offers (expected 0 INR) on ${route.path}`);
        routeErrors++;
      }
      if (app.aggregateRating || app.review) {
        console.error(`❌ Fake aggregateRating/review detected on ${route.path}!`);
        routeErrors++;
      }
    }
  }

  // 4. Tools pages: WebApplication schema
  if (route.isTool) {
    const webApp = parsedNodes.find((n) => n['@type'] === 'WebApplication');
    if (!webApp) {
      console.error(`❌ Missing WebApplication schema on tool page ${route.path}`);
      routeErrors++;
    } else {
      if (!webApp.name || !webApp.url) {
        console.error(`❌ WebApplication missing name/url on ${route.path}`);
        routeErrors++;
      }
      if (webApp.operatingSystem !== 'All') {
        console.error(`❌ WebApplication operatingSystem should be "All" on ${route.path}, got "${webApp.operatingSystem}"`);
        routeErrors++;
      }
      if (!webApp.browserRequirements) {
        console.error(`❌ WebApplication browserRequirements missing on ${route.path}`);
        routeErrors++;
      }
      if (!webApp.offers || webApp.offers.price !== '0' || webApp.offers.priceCurrency !== 'INR') {
        console.error(`❌ WebApplication offers must be 0 INR on ${route.path}`);
        routeErrors++;
      }
      if (webApp.aggregateRating || webApp.review) {
        console.error(`❌ Fake aggregateRating/review detected on ${route.path}!`);
        routeErrors++;
      }
    }
  }

  // 5. Zero fake ratings anywhere in any node
  for (const n of parsedNodes) {
    if (n.aggregateRating || n.review) {
      console.error(`❌ Fake reviews/ratings found in node ${n['@type']} on ${route.path}`);
      routeErrors++;
    }
  }

  totalErrors += routeErrors;
  results.push({
    route: route.path,
    blocksCount: blocks.length,
    schemas: Array.from(new Set(nodeTypes)).join(', '),
    status: routeErrors === 0 ? 'PASS' : 'FAIL',
  });
}

console.log('\n📊 JSON-LD Validation Results Summary:');
console.table(results);

if (totalErrors === 0) {
  console.log(`\n✅ ALL CHECKS PASSED: ${PUBLIC_ROUTES.length} routes validated across ${totalBlocks} JSON-LD blocks. Zero errors, zero fake data.\n`);
  process.exit(0);
} else {
  console.error(`\n❌ FAILED: Found ${totalErrors} errors across JSON-LD implementations.\n`);
  process.exit(1);
}
