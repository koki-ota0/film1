#!/usr/bin/env node
/**
 * EigaKit build script (no dependencies).
 * - reads apps.json
 * - copies site/<slug>/ into dist/app/<slug>/
 * - injects shared bar/meta into app pages
 * - generates home, apps listing, per-app SEO page, about, privacy, sitemap, robots
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SRC = path.join(ROOT, 'site');
const P = (...a) => path.join(...a);

const data = JSON.parse(fs.readFileSync(P(ROOT, 'apps.json'), 'utf8'));
const site = data.site || {};
const apps = (data.apps || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const published = apps.filter((a) => a.status === 'published');

const BASE = (site.baseUrl || '/').replace(/\/?$/, '/');
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const abs = (p = '') => BASE + String(p).replace(/^\//, '');
const appRel = (a, depth = 0) => '../'.repeat(depth) + 'app/' + a.slug + '/';
const appUrl = (a) => abs('app/' + a.slug + '/');
const detailUrl = (a) => abs('apps/' + a.slug + '/');
const dateJa = (d) => (d ? d.replace(/-/g, '.') : '');

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function copyDir(src, dest) {
  mkdirp(dest);
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = P(src, ent.name);
    const d = P(dest, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else if (ent.isFile()) fs.copyFileSync(s, d);
  }
}

function head({ title, desc, canonical, image, extra = '', depth = 0 }) {
  const prefix = depth ? '../'.repeat(depth) : '';
  const ogImg = image || abs('assets/ogp-fallback.svg');
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="${esc(site.themeColor || '#0b0b0f')}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name || 'EigaKit')}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogImg)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(ogImg)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%230b0b0f'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%23e8c468' stroke-width='4'/%3E%3Cpath d='M26 24l16 8-16 8z' fill='%23e8c468'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${prefix}assets/site.css">
${extra}
</head>`;
}

function header(active = '', depth = 0) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<header class="h"><div class="wrap">
<a class="logo" href="${p || './'}">${esc(site.name || 'EigaKit')}</a>
<nav>
  <a href="${p}apps/"${active === 'apps' ? ' aria-current="page"' : ''}>ツール一覧</a>
  <a href="${p}about.html"${active === 'about' ? ' aria-current="page"' : ''}>このサイトについて</a>
</nav>
</div></header>`;
}

function footer(depth = 0) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<footer class="f"><div class="wrap">
<div>© ${new Date().getFullYear()} ${esc(site.name || 'EigaKit')}</div>
<div class="f-links">
  <a href="${p}apps/">ツール一覧</a>
  <a href="${p}about.html">このサイトについて</a>
  <a href="${p}privacy-policy.html">プライバシーポリシー</a>
</div>
</div></footer>
</body>
</html>`;
}

const ICONS = { top9: '▦', tier: '≣', ranking: '①' };
function card(a, depth = 0) {
  const icon = ICONS[a.slug] || '✦';
  return `<li><a class="card" href="${esc(appRel(a, depth))}">
  <div class="card-visual"><span class="tag">無料ツール</span><div class="icon" aria-hidden="true">${icon}</div></div>
  <div class="card-body">
    <b>${esc(a.title)}</b>
    <span>${esc(a.catch || '')}</span>
    <div class="meta"><em>${esc(a.facts?.time || '1〜3分')}</em><em>${esc(a.facts?.device || 'スマホ・PC')}</em></div>
  </div>
</a></li>`;
}

function indexPage() {
  return `${head({
    title: `${site.name || 'EigaKit'}｜映画の「好き」を、1枚の画像に。`,
    desc: site.description || '',
    canonical: abs(''),
    image: abs('assets/ogp-fallback.svg')
  })}
<body>
${header('')}
<main>
  <section class="hero"><div class="wrap">
    <div class="eyebrow">映画 × シェアテンプレ</div>
    <h1>映画の「好き」を、<span class="accent">1枚の画像に。</span></h1>
    <p class="lead">${esc(site.description || '')}</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="#tools">テンプレを見る</a>
      <a class="btn btn-ghost" href="about.html">このサイトについて</a>
    </div>
  </div></section>

  <section class="section" id="tools"><div class="wrap">
    <div class="section-head">
      <div>
        <h2>テンプレ作成ツール</h2>
        <p class="sub">作って、保存して、Xに投稿。どれも無料・登録不要です。</p>
      </div>
    </div>
    <ul class="grid">${published.map((a) => card(a, 0)).join('\n')}</ul>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="panel">
      <h2>EigaKit の考え方</h2>
      <ul class="steps">
        <li><strong>1分で作れる。</strong>アカウント登録なし。開いて、入れて、保存するだけ。</li>
        <li><strong>スマホで気持ちいい。</strong>映画を観たあと、布団の中からでも作れるサイズ感。</li>
        <li><strong>端末の中で完結。</strong>入力した内容や画像は、あなたのブラウザの中だけで処理されます。</li>
      </ul>
    </div>
  </div></section>
</main>
${footer(0)}`;
}

function appsPage() {
  return `${head({
    title: `ツール一覧｜${site.name || 'EigaKit'}`,
    desc: `${site.name || 'EigaKit'} の映画テンプレ作成ツール一覧。好きな映画4選・ティア表・ランキングカードを無料で作成できます。`,
    canonical: abs('apps/'),
    image: abs('assets/ogp-fallback.svg'),
    depth: 1
  })}
<body>
${header('apps', 1)}
<main class="wrap">
  <section class="page-hero">
    <div class="eyebrow">Tools</div>
    <h1>ツール一覧</h1>
    <p class="catch">映画の「好き」をシェアするためのテンプレートを集めています。すべて無料・登録不要。</p>
  </section>
  <section class="section">
    <ul class="grid">${published.map((a) => card(a, 1)).join('\n')}</ul>
  </section>
</main>
${footer(1)}`;
}

function detailPage(a) {
  const facts = a.facts || {};
  const featureList = Array.isArray(a.features) ? a.features : [];
  const howto = Array.isArray(a.howto) ? a.howto : [];
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: a.title,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
    url: appUrl(a),
    description: a.summary || a.catch || '',
    inLanguage: 'ja'
  });
  return `${head({
    title: `${a.title}｜${site.name || 'EigaKit'}`,
    desc: a.summary || a.catch || '',
    canonical: detailUrl(a),
    image: abs('assets/ogp-fallback.svg'),
    extra: `<script type="application/ld+json">${ld}</script>`,
    depth: 2
  })}
<body>
${header('apps', 2)}
<main class="wrap">
  <section class="page-hero">
    <div class="eyebrow">Template</div>
    <h1>${esc(a.title)}</h1>
    <p class="catch">${esc(a.catch || '')}</p>
    <div class="badges">
      <span class="badge"><strong>所要時間</strong>${esc(facts.time || '1〜3分')}</span>
      <span class="badge"><strong>対応</strong>${esc(facts.device || 'スマホ・PC')}</span>
      <span class="badge"><strong>料金</strong>${esc(facts.price || '無料')}</span>
    </div>
    <div class="hero-actions">
      <a class="btn btn-primary" href="../../app/${esc(a.slug)}/">このテンプレを使う</a>
      <a class="btn btn-ghost" href="../">ほかのツールを見る</a>
    </div>
  </section>
  <section class="detail">
    <div class="panel">
      <h2>どんなテンプレ？</h2>
      <p style="margin:0;color:#d6cfc2">${esc(a.summary || '')}</p>
      <h2>使い方</h2>
      <ol class="steps">${howto.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      <h2>特徴</h2>
      <ul class="steps">${featureList.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
    <aside class="side-card">
      <div class="cta-box">
        <p>アカウント登録なし。ブラウザだけですぐ作れます。</p>
        <a class="btn btn-primary" href="../../app/${esc(a.slug)}/">${esc(a.title)}を作る</a>
        <p class="note">作成した画像や入力内容は、あなたの端末の中で処理されます。</p>
      </div>
    </aside>
  </section>
</main>
${footer(2)}`;
}

function aboutPage() {
  return `${head({
    title: `このサイトについて｜${site.name || 'EigaKit'}`,
    desc: `${site.name || 'EigaKit'} は映画好きのための無料テンプレ作成ツール集です。`,
    canonical: abs('about.html'),
    image: abs('assets/ogp-fallback.svg')
  })}
<body>
${header('about', 0)}
<main class="wrap prose">
  <h1>このサイトについて</h1>
  <p>${esc(site.name || 'EigaKit')} は、映画の感想や好きを「1枚の画像」にしてXでシェアしやすくするための、小さなWebツール集です。</p>
  <h2>大事にしていること</h2>
  <ul>
    <li><strong>すぐ作れる：</strong>登録不要、開いてすぐ使える。</li>
    <li><strong>スマホ優先：</strong>映画を観た直後にスマホで作れる操作感。</li>
    <li><strong>端末内で完結：</strong>テンプレ作成はブラウザ内で処理されます。</li>
  </ul>
  <h2>運営</h2>
  <p>個人開発のプロジェクトとして運営しています。改善要望はGitHubリポジトリのIssueへお願いします。</p>
</main>
${footer(0)}`;
}

function privacyPage() {
  return `${head({
    title: `プライバシーポリシー｜${site.name || 'EigaKit'}`,
    desc: `${site.name || 'EigaKit'} のプライバシーポリシーです。`,
    canonical: abs('privacy-policy.html'),
    image: abs('assets/ogp-fallback.svg')
  })}
<body>
${header('', 0)}
<main class="wrap prose">
  <h1>プライバシーポリシー</h1>
  <p>${esc(site.name || 'EigaKit')}（以下「当サイト」）は、利用者のプライバシーを尊重します。</p>
  <h2>入力データの扱い</h2>
  <p>テンプレート作成時に入力するテキストやアップロード画像は、原則としてお使いのブラウザ内で処理されます。当サイトのサーバーに送信・保存されることはありません。</p>
  <h2>アクセス解析・広告</h2>
  <p>現時点ではアクセス解析ツールや広告配信ツールは導入していません。将来導入する場合は、本ページを更新してお知らせします。</p>
  <h2>外部サービス</h2>
  <p>X（旧Twitter）など外部サービスへの共有は、利用者自身の操作によって行われます。外部サービスでの情報の取り扱いは、各サービスのポリシーをご確認ください。</p>
  <h2>お問い合わせ</h2>
  <p>ご連絡はGitHubリポジトリのIssueからお願いします。</p>
</main>
${footer(0)}`;
}

function sitemapXml() {
  const urls = [abs(''), abs('apps/'), abs('about.html'), abs('privacy-policy.html')];
  for (const a of published) { urls.push(detailUrl(a)); urls.push(appUrl(a)); }
  const items = urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

function robotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${abs('sitemap.xml')}\n`;
}

// Inject shared meta/bar into app HTML files
function appMeta(a) {
  return `<meta name="description" content="${esc(a.catch || '')}">` +
    `<link rel="canonical" href="${esc(appUrl(a))}">` +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="${esc(site.name || 'EigaKit')}">` +
    `<meta property="og:title" content="${esc(a.title)}｜${esc(site.name || 'EigaKit')}">` +
    `<meta property="og:description" content="${esc(a.catch || '')}">` +
    `<meta property="og:url" content="${esc(appUrl(a))}">` +
    `<meta property="og:image" content="${esc(abs('assets/ogp-fallback.svg'))}">` +
    `<meta name="twitter:card" content="summary_large_image">`;
}

function appBar(a) {
  return `
<style>
#ek-app-header{position:sticky;top:0;z-index:2147483000;background:rgba(11,11,15,.82);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08);font-family:"Hiragino Sans","Noto Sans JP","Yu Gothic",system-ui,sans-serif}
#ek-app-header .ek-wrap{width:min(1100px,calc(100% - 32px));margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0}
#ek-app-header .ek-logo{font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",Georgia,serif;font-size:1.45rem;font-weight:700;color:#f2efe8;text-decoration:none;display:flex;align-items:center;gap:.45rem}
#ek-app-header .ek-logo::before{content:"";width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#e8c468,#ff7a59);box-shadow:0 0 0 4px rgba(232,196,104,.15);flex:0 0 auto}
#ek-app-header nav{display:flex;gap:18px;align-items:center}
#ek-app-header nav a{color:#a8a39a;text-decoration:none;font-size:.9rem;font-weight:600;padding:.35rem .1rem;border-bottom:2px solid transparent}
#ek-app-header nav a:hover{color:#f2efe8;border-bottom-color:#e8c468}
@media(max-width:640px){#ek-app-header .ek-wrap{padding:12px 0}#ek-app-header .ek-logo{font-size:1.28rem}#ek-app-header nav{gap:12px}#ek-app-header nav a{font-size:.82rem}}
</style>
<header id="ek-app-header"><div class="ek-wrap">
  <a class="ek-logo" href="../../">EigaKit</a>
  <nav>
    <a href="../../apps/">ツール一覧</a>
    <a href="../../about.html">このサイトについて</a>
  </nav>
</div></header>`;
}

function injectApp(html, a) {
  if (!html.includes('id="ek-app-header"')) {
    const headerHtml = appBar(a);
    if (/<body[^>]*>/i.test(html)) html = html.replace(/<body[^>]*>/i, (m) => m + '\n' + headerHtml);
    else html = headerHtml + html;
  }
  if (!/og:title/.test(html) && html.includes('</head>')) {
    html = html.replace('</head>', appMeta(a) + '\n</head>');
  }
  return html;
}

function write(file, content) {
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, content);
}

// ---- main ----
rmrf(DIST);
mkdirp(DIST);

// copy assets
if (fs.existsSync(P(ROOT, 'assets'))) copyDir(P(ROOT, 'assets'), P(DIST, 'assets'));
// Inject runtime config (TMDB key comes from env at build time; never hardcode in git).
function readLocalTmdbKey() {
  try {
    const p = P(ROOT, 'assets', 'eigakit-config.js');
    if (!fs.existsSync(p)) return '';
    const m = fs.readFileSync(p, 'utf8').match(/tmdbApiKey\s*:\s*["\']([^"\']+)["\']/);
    return m ? m[1] : '';
  } catch { return ''; }
}
const tmdbApiKey = (process.env.TMDB_API_KEY || readLocalTmdbKey() || '').trim();
const cfg = `window.EIGAKIT_CONFIG = {\n  tmdbApiKey: ${JSON.stringify(tmdbApiKey)}\n};\n`;
write(P(DIST, 'assets', 'eigakit-config.js'), cfg);

// copy app files
for (const a of apps) {
  const srcDir = P(SRC, a.slug);
  const destDir = P(DIST, 'app', a.slug);
  if (!fs.existsSync(srcDir)) { console.warn('skip missing app:', a.slug); continue; }
  copyDir(srcDir, destDir);
  // inject into html files
  for (const ent of fs.readdirSync(destDir)) {
    if (!ent.endsWith('.html')) continue;
    const fp = P(destDir, ent);
    const html = fs.readFileSync(fp, 'utf8');
    fs.writeFileSync(fp, injectApp(html, a));
  }
}

// generated pages
write(P(DIST, 'index.html'), indexPage());
write(P(DIST, 'apps', 'index.html'), appsPage());
write(P(DIST, 'about.html'), aboutPage());
write(P(DIST, 'privacy-policy.html'), privacyPage());
write(P(DIST, 'sitemap.xml'), sitemapXml());
write(P(DIST, 'robots.txt'), robotsTxt());
for (const a of published) write(P(DIST, 'apps', a.slug, 'index.html'), detailPage(a));

// legacy redirect: top4 -> top9
write(P(DIST, 'app', 'top4', 'index.html'), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../top9/"><link rel="canonical" href="../top9/"><title>Redirecting...</title><a href="../top9/">好きな映画9選へ移動</a>');

console.log(`Built ${published.length} apps -> dist/`);
