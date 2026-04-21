// fetch-notion.js
// Nightly Notion data fetcher for Lee Hathcock's Netflix-style personal site
// Run via GitHub Actions every night at 2am UTC
// Fetches all databases and writes data.json

const https = require('https');
const fs = require('fs');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = '2022-06-28';

// Database IDs extracted from Notion URLs
const DATABASES = {
  journal:   '3375a230e58580a8a756e6af89613990',
  ideas_db:  '7742e7dd78894570ab720460a86ce90c',
  health:    'f32f30a0f61c456587b0df7e4a000ed5',
  writing:   '471e8536006b45f693e28a599cd70108',
  ideas:     '4d88f0d49f224860989b11b86dc3ba28',
  impossible:'69e917445c924a6fbf7277e2151f704d',
};

function notionRequest(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body || {});
    const options = {
      hostname: 'api.notion.com',
      path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(new Error('JSON parse error: ' + body.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function extractTitle(page) {
  const props = page.properties || {};
  for (const key of ['Name', 'Title', 'title', 'name']) {
    if (props[key]?.title?.[0]?.plain_text) {
      return props[key].title[0].plain_text;
    }
  }
  return 'Untitled';
}

function extractText(richTextArr) {
  if (!Array.isArray(richTextArr)) return '';
  return richTextArr.map(t => t.plain_text || '').join('');
}

function extractStatus(page) {
  const props = page.properties || {};
  for (const key of ['Status', 'status', 'Stage', 'Type', 'type']) {
    const p = props[key];
    if (p?.select?.name) return p.select.name;
    if (p?.status?.name) return p.status.name;
    if (p?.multi_select?.[0]?.name) return p.multi_select[0].name;
  }
  return 'Idea';
}

function extractDescription(page) {
  const props = page.properties || {};
  for (const key of ['Description', 'description', 'Notes', 'notes', 'Summary', 'Body', 'Content', 'Excerpt']) {
    const p = props[key];
    if (p?.rich_text?.length) return extractText(p.rich_text);
  }
  return '';
}

function extractDate(page) {
  // Try last edited first for recency, then created
  const lte = page.last_edited_time;
  const created = page.created_time;
  const props = page.properties || {};
  for (const key of ['Date', 'date', 'Created', 'Due', 'Start']) {
    const p = props[key];
    if (p?.date?.start) return p.date.start;
  }
  return lte || created || null;
}

function extractDone(page) {
  const props = page.properties || {};
  for (const key of ['Done', 'done', 'Completed', 'Complete', 'Checked', 'Status']) {
    const p = props[key];
    if (p?.type === 'checkbox') return !!p.checkbox;
    if (p?.select?.name) {
      return ['Done','Completed','Complete','Yes'].includes(p.select.name);
    }
  }
  return false;
}

function pageToItem(page, type) {
  return {
    id: page.id,
    title: extractTitle(page),
    description: extractDescription(page),
    status: extractStatus(page),
    date: extractDate(page),
    url: page.url,
    done: extractDone(page),
    type,
  };
}

async function queryDB(dbId, type, pageSize = 30) {
  console.log(`Fetching ${type} (${dbId})...`);
  try {
    const result = await notionRequest(`/v1/databases/${dbId}/query`, {
      page_size: pageSize,
      sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
    });
    if (result.object === 'error') {
      console.warn(`  Error: ${result.message}`);
      return [];
    }
    const items = (result.results || []).map(p => pageToItem(p, type));
    console.log(`  Got ${items.length} items`);
    return items;
  } catch(e) {
    console.warn(`  Failed: ${e.message}`);
    return [];
  }
}

async function main() {
  console.log('Starting Notion data fetch...');
  console.log('Token present:', !!NOTION_TOKEN);

  const [journal, ideas_db, health, writing, ideas, impossible] = await Promise.all([
    queryDB(DATABASES.journal,   'journal',   20),
    queryDB(DATABASES.ideas_db,  'ideas_db',  30),
    queryDB(DATABASES.health,    'health',    20),
    queryDB(DATABASES.writing,   'writing',   20),
    queryDB(DATABASES.ideas,     'ideas',     30),
    queryDB(DATABASES.impossible,'impossible',50),
  ]);

  // Merge both ideas databases
  const allIdeas = [...ideas, ...ideas_db]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 40);

  const data = {
    _updated: new Date().toISOString(),
    journal:   journal.slice(0, 20),
    ideas:     allIdeas,
    health:    health.slice(0, 20),
    writing:   writing.slice(0, 20),
    impossible: impossible,
  };

  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync('data.json', json);
  console.log('\ndata.json written successfully!');
  console.log(`  Journal:    ${data.journal.length} items`);
  console.log(`  Ideas:      ${data.ideas.length} items`);
  console.log(`  Health:     ${data.health.length} items`);
  console.log(`  Writing:    ${data.writing.length} items`);
  console.log(`  Impossible: ${data.impossible.length} items`);
  console.log(`  Updated at: ${data._updated}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
