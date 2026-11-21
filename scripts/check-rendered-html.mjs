import fs from 'fs';
import path from 'path';

const APP_DIR = path.resolve('.next/server/app');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

console.log('🔍 Checking rendered HTML for unresolved "TODO" or "[TODO" ...\n');

const htmlFiles = getHtmlFiles(APP_DIR);

if (htmlFiles.length === 0) {
  console.error('❌ No pre-rendered HTML files found in .next/server/app. Did you run next build first?');
  process.exit(1);
}

let violations = [];

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);

  if (content.includes('TODO') || content.includes('[TODO')) {
    // Extract context lines
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('TODO') || line.includes('[TODO')) {
        const snippet = line.trim().slice(0, 140);
        violations.push({
          file: relativePath,
          line: idx + 1,
          snippet,
        });
      }
    });
  }
}

if (violations.length > 0) {
  console.error(`❌ BUILD CHECK FAILED: Found ${violations.length} unresolved TODO instance(s) in rendered HTML:`);
  violations.forEach((v, i) => {
    console.error(`  ${i + 1}. [${v.file}:${v.line}] => "${v.snippet}"`);
  });
  console.error('\nPublic rendered pages must not expose raw TODO placeholders to users or search engines.');
  process.exit(1);
} else {
  console.log(`✅ Pre-rendered HTML Check Passed: Scanned ${htmlFiles.length} HTML files. Zero "TODO" or "[TODO" found in rendered HTML.\n`);
}
