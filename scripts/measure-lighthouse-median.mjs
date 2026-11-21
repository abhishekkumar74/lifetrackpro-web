import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ALL_ROUTES = [
  { name: 'Home (/)', path: '/' },
  { name: 'Features (/features)', path: '/features' },
  { name: 'JEE Planner (/exams/jee)', path: '/exams/jee' },
  { name: 'Study Timetable (/tools/study-timetable-generator)', path: '/tools/study-timetable-generator' },
];

const ROUTES = process.env.TARGET_ROUTE
  ? ALL_ROUTES.filter(r => r.path === process.env.TARGET_ROUTE)
  : ALL_ROUTES;

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const OUTPUT_DIR = path.resolve('.lighthouseci');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const summaryResults = [];

for (const route of ROUTES) {
  const url = `${BASE_URL}${route.path}`;
  const slug = route.path.replace(/\//g, '_') || '_root';
  console.log(`\n======================================================`);
  console.log(`🔍 Testing ${route.name} (3 runs for median)...`);
  console.log(`======================================================`);

  const runs = [];

  for (let i = 1; i <= 3; i++) {
    const outputPath = path.join(OUTPUT_DIR, `${slug}_run${i}.json`);
    console.log(`  ▶ Run ${i} of 3...`);
    try {
      const cmd = `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx lighthouse "${url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet --form-factor=mobile --throttling-method=simulate --no-enable-error-reporting`;
      execSync(cmd, { stdio: 'pipe' });

      const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      const categories = report.categories;
      const audits = report.audits;

      const perf = Math.round((categories.performance?.score || 0) * 100);
      const a11y = Math.round((categories.accessibility?.score || 0) * 100);
      const bp = Math.round((categories['best-practices']?.score || 0) * 100);
      const seo = Math.round((categories.seo?.score || 0) * 100);

      const lcpNum = audits['largest-contentful-paint']?.numericValue || 0;
      const clsNum = audits['cumulative-layout-shift']?.numericValue || 0;
      const tbtNum = audits['total-blocking-time']?.numericValue || 0;

      runs.push({
        run: i,
        perf,
        a11y,
        bp,
        seo,
        lcp: lcpNum,
        lcpDisplay: audits['largest-contentful-paint']?.displayValue,
        cls: clsNum,
        clsDisplay: audits['cumulative-layout-shift']?.displayValue,
        tbt: tbtNum,
        tbtDisplay: audits['total-blocking-time']?.displayValue,
      });

      console.log(`    Result Run ${i}: Perf=${perf}, A11y=${a11y}, BP=${bp}, SEO=${seo}, LCP=${(lcpNum/1000).toFixed(2)}s, CLS=${clsNum.toFixed(3)}`);
    } catch (err) {
      console.error(`    Run ${i} failed:`, err.message);
    }
  }

  if (runs.length > 0) {
    const medPerf = Math.round(median(runs.map(r => r.perf)));
    const medA11y = Math.round(median(runs.map(r => r.a11y)));
    const medBp = Math.round(median(runs.map(r => r.bp)));
    const medSeo = Math.round(median(runs.map(r => r.seo)));
    const medLcp = (median(runs.map(r => r.lcp)) / 1000).toFixed(2) + 's';
    const medCls = median(runs.map(r => r.cls)).toFixed(3);
    const medTbt = Math.round(median(runs.map(r => r.tbt))) + ' ms';

    summaryResults.push({
      route: route.name,
      perf: `${medPerf}/100`,
      a11y: `${medA11y}/100`,
      bestPractices: `${medBp}/100`,
      seo: `${medSeo}/100`,
      lcp: medLcp,
      cls: medCls,
      tbt: medTbt,
      runsCount: runs.length,
    });
  }
}

console.log(`\n======================================================`);
console.log(`📊 FINAL 3-RUN MEDIAN LIGHTHOUSE REPORT (MOBILE):`);
console.log(`======================================================`);
console.table(summaryResults);
