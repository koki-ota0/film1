#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
let errors = 0;
const err = (m) => { console.error('ERROR:', m); errors++; };
const warn = (m) => { console.warn('WARN:', m); };

if (!fs.existsSync(DIST)) { err('dist/ not found. Run npm run build'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'apps.json'), 'utf8'));
const apps = data.apps || [];
for (const a of apps) {
  if (!a.slug || !/^[a-z0-9-]+$/.test(a.slug)) err(`invalid slug: ${a.slug}`);
  const src = path.join(ROOT, 'site', a.slug, 'index.html');
  if (!fs.existsSync(src)) err(`missing site/${a.slug}/index.html`);
  if (a.status === 'published') {
    const built = path.join(DIST, 'app', a.slug, 'index.html');
    const detail = path.join(DIST, 'apps', a.slug, 'index.html');
    if (!fs.existsSync(built)) err(`missing dist/app/${a.slug}/index.html`);
    if (!fs.existsSync(detail)) err(`missing dist/apps/${a.slug}/index.html`);
  }
}
for (const req of ['index.html','apps/index.html','about.html','privacy-policy.html','sitemap.xml','robots.txt']) {
  if (!fs.existsSync(path.join(DIST, req))) err(`missing dist/${req}`);
}
// basic link sanity for generated pages
function walk(dir, out=[]) {
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p = path.join(dir,e.name);
    if (e.isDirectory()) walk(p,out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
for (const f of walk(DIST)) {
  const html = fs.readFileSync(f,'utf8');
  if (!/<title>.+<\/title>/.test(html)) warn(`no title: ${path.relative(DIST,f)}`);
  if (f.includes(`${path.sep}app${path.sep}`)) {
    const size = fs.statSync(f).size;
    if (size > 3 * 1024 * 1024) warn(`large app html (${Math.round(size/1024)}KB): ${path.relative(DIST,f)}`);
  }
}
if (errors) { console.error(`\n${errors} error(s)`); process.exit(1); }
console.log('check ok');
