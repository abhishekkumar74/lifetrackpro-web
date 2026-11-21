import http from 'http';
import fs from 'fs';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SITE_DOMAIN = 'https://lifetrackpro.in';

async function fetchUrl(url, redirectCount = 0) {
  if (redirectCount > 5) {
    throw new Error(`Redirect chain exceeded: ${url}`);
  }

  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const { statusCode, headers } = res;
      if (statusCode >= 300 && statusCode < 400 && headers.location) {
        let redirectTarget = headers.location;
        if (redirectTarget.startsWith('/')) {
          redirectTarget = `${BASE_URL}${redirectTarget}`;
        }
        resolve({
          statusCode,
          headers,
          redirectLocation: headers.location,
          isRedirect: true,
        });
        return;
      }

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode,
          headers,
          body: data,
          isRedirect: false,
        });
      });
    }).on('error', reject);
  });
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractTags(html) {
  // Title
  const titleMatch = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  const rawTitle = titleMatch ? titleMatch[1].trim() : null;
  const title = decodeHtmlEntities(rawTitle);

  // Meta Description
  const descMatch = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(html) ||
                    /<meta\s+content="([^"]*)"\s+name="description"/i.exec(html);
  const rawDesc = descMatch ? descMatch[1].trim() : null;
  const description = decodeHtmlEntities(rawDesc);

  // Canonical
  const canonMatch = /<link\s+rel="canonical"\s+href="([^"]*)"/i.exec(html) ||
                     /<link\s+href="([^"]*)"\s+rel="canonical"/i.exec(html);
  const canonical = canonMatch ? canonMatch[1].trim() : null;

  // H1s
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const h1s = [];
  let match;
  while ((match = h1Regex.exec(html)) !== null) {
    const cleanH1 = decodeHtmlEntities(match[1].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' '));
    h1s.push(cleanH1);
  }

  // Links
  const linkRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>/gi;
  const links = [];
  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  // Images without alt
  const imgRegex = /<img\s+([^>]*?)>/gi;
  const images = [];
  while ((match = imgRegex.exec(html)) !== null) {
    const imgTag = match[1];
    const srcMatch = /src="([^"]*)"/i.exec(imgTag);
    const altMatch = /alt="([^"]*)"/i.exec(imgTag);
    const hasAlt = !!altMatch && altMatch[1].trim().length > 0;
    images.push({
      src: srcMatch ? srcMatch[1] : 'unknown',
      hasAlt,
    });
  }

  return { title, description, canonical, h1s, links, images };
}

async function fetchServedRobotsTxt(validationErrors) {
  console.log(`🤖 Fetching SERVED robots.txt from ${BASE_URL}/robots.txt ...`);
  const res = await fetchUrl(`${BASE_URL}/robots.txt`);
  if (res.statusCode !== 200) {
    validationErrors.push(`Failed to fetch served robots.txt (status: ${res.statusCode})`);
    return null;
  }

  const body = res.body || '';
  console.log(`   Status: 200 OK (${body.length} bytes)`);

  // Assert no information disclosure of protected administrative routes
  const forbiddenDisallowPaths = ['/admin', '/secret-admin-portal', '/basecamp'];
  for (const forbidden of forbiddenDisallowPaths) {
    if (body.includes(forbidden)) {
      validationErrors.push(
        `SECURITY VIOLATION: Served robots.txt discloses private route "${forbidden}". Use noindex metadata instead of listing private paths in robots.txt.`
      );
    }
  }

  if (!body.includes('Sitemap: https://lifetrackpro.in/sitemap.xml')) {
    validationErrors.push('Served robots.txt missing sitemap declaration: "Sitemap: https://lifetrackpro.in/sitemap.xml"');
  }

  return body;
}

async function fetchServedSitemapUrls(validationErrors) {
  console.log(`📋 Fetching SERVED sitemap.xml from ${BASE_URL}/sitemap.xml ...`);
  const res = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  if (res.statusCode !== 200) {
    validationErrors.push(`Failed to fetch served sitemap.xml (status: ${res.statusCode})`);
    return [];
  }

  const content = res.body || '';
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1].trim());
  }

  if (urls.length === 0) {
    validationErrors.push('Served sitemap.xml returned 0 URLs.');
  } else {
    console.log(`   Status: 200 OK (${urls.length} routes in served sitemap)`);
  }

  return urls;
}

async function runCrawl() {
  console.log(`🚀 Starting Automated Strict Verification Crawl on ${BASE_URL} ...\n`);

  const validationErrors = [];

  // Check 1: Verify served robots.txt
  await fetchServedRobotsTxt(validationErrors);

  // Check 2: Verify served sitemap.xml
  const sitemapUrls = await fetchServedSitemapUrls(validationErrors);
  console.log(`\n📋 Found ${sitemapUrls.length} URLs in SERVED sitemap.xml:`);
  sitemapUrls.forEach((u) => console.log(`   • ${u}`));
  console.log('');

  const allTitles = new Map();
  const allDescriptions = new Map();
  const allH1s = new Map();
  const brokenLinks = [];
  const missingAltImages = [];
  const crawlResults = [];
  const checkedLinks = new Map();
  const crawledRouteSet = new Set();

  for (const fullUrl of sitemapUrls) {
    const routePath = fullUrl.replace(SITE_DOMAIN, '') || '/';
    const localUrl = `${BASE_URL}${routePath}`;

    const res = await fetchUrl(localUrl);
    if (res.statusCode !== 200) {
      validationErrors.push(`Non-200 status code: ${res.statusCode} for ${localUrl}`);
    }

    const { title, description, canonical, h1s, links, images } = extractTags(res.body);

    // 1. Title validation (<= 60 chars)
    if (!title) {
      validationErrors.push(`Missing title on ${routePath}`);
    } else if (title.length > 60) {
      validationErrors.push(`Title exceeds 60 chars (${title.length} chars) on ${routePath}: "${title}"`);
    }

    // Check duplicate titles
    if (title) {
      if (allTitles.has(title)) {
        validationErrors.push(`Duplicate Title: "${title}" on ${routePath} and ${allTitles.get(title)}`);
      } else {
        allTitles.set(title, routePath);
      }
    }

    // 2. Description validation (140-160 chars)
    if (!description) {
      validationErrors.push(`Missing meta description on ${routePath}`);
    } else if (description.length < 140 || description.length > 160) {
      validationErrors.push(`Description outside 140-160 chars (${description.length} chars) on ${routePath}: "${description}"`);
    }

    // Check duplicate descriptions
    if (description) {
      if (allDescriptions.has(description)) {
        validationErrors.push(`Duplicate Description: "${description}" on ${routePath} and ${allDescriptions.get(description)}`);
      } else {
        allDescriptions.set(description, routePath);
      }
    }

    // 3. Single H1 & duplicate H1 validation
    const h1Count = h1s.length;
    if (h1Count === 0) {
      validationErrors.push(`Missing H1 on ${routePath}`);
    } else if (h1Count > 1) {
      validationErrors.push(`Multiple H1s (${h1Count}) found on ${routePath}: ${JSON.stringify(h1s)}`);
    } else {
      const mainH1 = h1s[0];
      if (allH1s.has(mainH1)) {
        validationErrors.push(`Duplicate H1: "${mainH1}" on ${routePath} and ${allH1s.get(mainH1)}`);
      } else {
        allH1s.set(mainH1, routePath);
      }
    }

    // 4. Canonical validation
    const expectedCanonical = `${SITE_DOMAIN}${routePath === '/' ? '' : routePath}`;
    const isCanonicalValid = canonical === expectedCanonical || (routePath === '/' && canonical === SITE_DOMAIN);
    if (!isCanonicalValid) {
      validationErrors.push(`Canonical mismatch on ${routePath}: Expected "${expectedCanonical}", found "${canonical}"`);
    }

    // 5. Images without alt
    for (const img of images) {
      if (!img.hasAlt) {
        missingAltImages.push({ route: routePath, src: img.src });
        validationErrors.push(`Image missing alt attribute on ${routePath}: ${img.src}`);
      }
    }

    // 6. Internal links check
    for (const link of links) {
      if (link.startsWith('/') && !link.startsWith('/_next') && !link.startsWith('#')) {
        const linkPath = link.split('#')[0].split('?')[0];
        if (linkPath && !checkedLinks.has(linkPath)) {
          const testRes = await fetchUrl(`${BASE_URL}${linkPath}`);
          checkedLinks.set(linkPath, testRes.statusCode);
          if (testRes.statusCode >= 400) {
            brokenLinks.push({ from: routePath, to: linkPath, status: testRes.statusCode });
            validationErrors.push(`Broken internal link from ${routePath} to ${linkPath} (Status ${testRes.statusCode})`);
          }
        }
      }
    }

    crawlResults.push({
      route: routePath,
      status: res.statusCode,
      titleLength: title ? title.length : 0,
      descLength: description ? description.length : 0,
      h1Count,
      canonicalOk: isCanonicalValid ? 'PASS' : `FAIL (${canonical})`,
      title: title ? title.slice(0, 45) + '...' : 'MISSING',
      h1: h1s[0] ? h1s[0].slice(0, 40) + '...' : 'MISSING',
    });

    crawledRouteSet.add(fullUrl);
  }

  // Strict check: fail if sitemap URLs != crawled routes
  if (sitemapUrls.length !== crawledRouteSet.size) {
    validationErrors.push(`Sitemap URL count (${sitemapUrls.length}) does not match unique crawled routes count (${crawledRouteSet.size})`);
  }
  for (const u of sitemapUrls) {
    if (!crawledRouteSet.has(u)) {
      validationErrors.push(`Sitemap URL ${u} was in sitemap but not crawled.`);
    }
  }

  console.log('\n📊 Strict Site Crawl Verification Summary:');
  console.table(crawlResults);

  console.log('\n🔎 Detailed Audit Checklist:');
  console.log(`• Total Routes in Sitemap: ${sitemapUrls.length}`);
  console.log(`• Unique Titles: ${allTitles.size} / ${sitemapUrls.length}`);
  console.log(`• Unique Descriptions: ${allDescriptions.size} / ${sitemapUrls.length}`);
  console.log(`• Unique H1s: ${allH1s.size} / ${sitemapUrls.length}`);
  console.log(`• Broken Internal Links: ${brokenLinks.length}`);
  console.log(`• Images Missing Alt: ${missingAltImages.length}`);
  console.log(`• Total Validation Failures: ${validationErrors.length}`);

  if (validationErrors.length > 0) {
    console.error('\n❌ STRICT CRAWL VALIDATION FAILED WITH THE FOLLOWING ERRORS:');
    validationErrors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
    console.error('\nExiting with process.exit(1)...\n');
    process.exit(1);
  }

  console.log('\n🎉 ALL CRAWL VERIFICATION CHECKS PASSED WITH 100% SUCCESS! (Zero errors, Title <=60, Desc 140-160, Single H1, Valid Canonicals)\n');
}

runCrawl().catch((err) => {
  console.error('Fatal error during crawl:', err);
  process.exit(1);
});
