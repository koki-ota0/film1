#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [slug, title, catchCopy] = process.argv.slice(2);
if (!slug || !/^[a-z0-9-]+$/.test(slug)) { console.error('usage: npm run new -- <slug> "タイトル" "キャッチ"'); process.exit(1); }
const dir = path.join(ROOT, 'site', slug);
if (fs.existsSync(dir)) { console.error('already exists:', dir); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title||slug}</title>
<style>body{margin:0;font-family:system-ui;background:#0b0b0f;color:#f2efe8;display:grid;place-items:center;min-height:100vh}main{padding:24px;max-width:720px}</style>
</head><body><main><h1>${title||slug}</h1><p>${catchCopy||''}</p><p>TODO: implement app</p></main></body></html>
`);
const appsPath = path.join(ROOT, 'apps.json');
const data = JSON.parse(fs.readFileSync(appsPath,'utf8'));
data.apps.push({ slug, title: title||slug, catch: catchCopy||'', date: new Date().toISOString().slice(0,10), status:'draft', summary:'', howto:[], features:[], facts:{time:'約1分',device:'スマホ・PC',price:'無料'} });
fs.writeFileSync(appsPath, JSON.stringify(data, null, 2) + '\n');
console.log('created', dir);
