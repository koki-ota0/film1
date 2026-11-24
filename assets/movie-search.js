(() => {
  const KEY_STORE = 'eigakit_tmdb_key';
  const BASE = 'https://api.themoviedb.org/3';
  const IMG = 'https://image.tmdb.org/t/p/w500';

  function getKey() { try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; } }
  function setKey(v) { try { localStorage.setItem(KEY_STORE, v.trim()); } catch {} }

  function ensureStyle() {
    if (document.getElementById('ekms-style')) return;
    const s = document.createElement('style');
    s.id = 'ekms-style';
    s.textContent = `
#ekms-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;padding:16px;}
@media(min-width:720px){#ekms-backdrop{align-items:center}}
#ekms-modal{width:min(760px,100%);max-height:min(86vh,760px);overflow:hidden;background:#17171e;color:#f2efe8;border:1px solid rgba(255,255,255,.1);border-radius:20px;box-shadow:0 24px 80px rgba(0,0,0,.55);font-family:"Hiragino Sans","Noto Sans JP",system-ui,sans-serif;display:flex;flex-direction:column}
#ekms-head{padding:18px 18px 12px;border-bottom:1px solid rgba(255,255,255,.08)}
#ekms-head h3{margin:0 0 4px;font-size:1.1rem;line-height:1.3}
#ekms-head p{margin:0;color:#a8a39a;font-size:.84rem;line-height:1.5}
#ekms-close{float:right;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#f2efe8;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:18px;line-height:1}
#ekms-body{padding:14px 18px 18px;overflow:auto}
#ekms-row{display:flex;gap:8px;margin-bottom:12px}
#ekms-q{flex:1;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#0f0f14;color:#f2efe8;font:inherit}
#ekms-q:focus{outline:2px solid rgba(232,196,104,.45);border-color:rgba(232,196,104,.5)}
.ekms-btn{padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#f2efe8;font:700 .88rem inherit;cursor:pointer;white-space:nowrap}
.ekms-btn.primary{background:linear-gradient(135deg,#e8c468,#f0d78a);color:#1a1408;border-color:transparent}
#ekms-status{font-size:.83rem;color:#a8a39a;min-height:1.4em;margin:4px 0 10px}
#ekms-results{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px}
.ekms-card{background:#111118;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;cursor:pointer;text-align:left;padding:0;color:inherit;font:inherit}
.ekms-card:hover{border-color:rgba(232,196,104,.45);transform:translateY(-1px)}
.ekms-poster{aspect-ratio:2/3;background:#20202a;display:grid;place-items:center;color:#8a847a;font-size:.75rem}
.ekms-poster img{width:100%;height:100%;object-fit:cover;display:block}
.ekms-meta{padding:9px}
.ekms-title{font-size:.82rem;font-weight:700;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ekms-year{font-size:.74rem;color:#a8a39a;margin-top:2px}
#ekms-keybox{background:#111118;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px;margin-bottom:12px}
#ekms-keybox label{display:block;font-size:.8rem;color:#a8a39a;font-weight:700;margin-bottom:6px}
#ekms-key{width:100%;padding:11px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#0f0f14;color:#f2efe8;font:inherit;margin-bottom:8px}
#ekms-keyrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#ekms-keyrow a{color:#e8c468;font-size:.82rem}
#ekms-small{font-size:.75rem;color:#a8a39a;margin-top:8px;line-height:1.5}
`;
    document.head.appendChild(s);
  }

  async function searchTMDB(query, key) {
    const url = `${BASE}/search/movie?api_key=${encodeURIComponent(key)}&language=ja-JP&query=${encodeURIComponent(query)}&include_adult=false&page=1`;
    const res = await fetch(url);
    if (!res.ok) {
      let msg = `TMDBエラー (${res.status})`;
      try { const j = await res.json(); if (j.status_message) msg = j.status_message; } catch {}
      throw new Error(msg);
    }
    const data = await res.json();
    return (data.results || []).slice(0, 20).map(r => ({
      title: r.title || r.original_title || '',
      year: (r.release_date || '').slice(0, 4),
      poster: r.poster_path ? IMG + r.poster_path : '',
      id: r.id
    }));
  }

  function open(opts = {}) {
    ensureStyle();
    const onPick = opts.onPick || (() => {});
    const backdrop = document.createElement('div');
    backdrop.id = 'ekms-backdrop';
    backdrop.innerHTML = `
      <div id="ekms-modal" role="dialog" aria-modal="true" aria-label="映画検索">
        <div id="ekms-head">
          <button id="ekms-close" type="button" aria-label="閉じる">×</button>
          <h3>映画を検索</h3>
          <p>TMDBから映画ポスターを検索します（無料APIキーが必要）。キーはこのブラウザにのみ保存されます。</p>
        </div>
        <div id="ekms-body">
          <div id="ekms-keybox">
            <label for="ekms-key">TMDB APIキー</label>
            <input id="ekms-key" type="password" placeholder="TMDB API Key (v3 auth)" autocomplete="off">
            <div id="ekms-keyrow">
              <button class="ekms-btn primary" id="ekms-save" type="button">保存</button>
              <button class="ekms-btn" id="ekms-clear" type="button">削除</button>
              <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener">無料キーを取得</a>
            </div>
            <div id="ekms-small">TMDBの無料アカウントでAPIキーを発行できます。キーは端末のlocalStorageに保存され、検索時にTMDBへ送信されます。</div>
          </div>
          <div id="ekms-row">
            <input id="ekms-q" type="search" placeholder="映画タイトルを入力（例：君の名は。）" maxlength="80">
            <button class="ekms-btn primary" id="ekms-go" type="button">検索</button>
          </div>
          <div id="ekms-status"></div>
          <div id="ekms-results"></div>
        </div>
      </div>`;

    function close() { backdrop.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(backdrop);

    const keyInput = backdrop.querySelector('#ekms-key');
    const qInput = backdrop.querySelector('#ekms-q');
    const status = backdrop.querySelector('#ekms-status');
    const results = backdrop.querySelector('#ekms-results');
    keyInput.value = getKey();

    backdrop.querySelector('#ekms-close').onclick = close;
    backdrop.querySelector('#ekms-save').onclick = () => { setKey(keyInput.value); status.textContent = keyInput.value.trim() ? 'APIキーを保存しました。' : 'APIキーを空にしました。'; };
    backdrop.querySelector('#ekms-clear').onclick = () => { keyInput.value=''; setKey(''); status.textContent='APIキーを削除しました。'; };

    async function run() {
      const q = qInput.value.trim();
      const k = keyInput.value.trim() || getKey();
      if (!q) { status.textContent = '映画タイトルを入力してください。'; return; }
      if (!k) { status.textContent = 'TMDB APIキーを入力して保存してください。'; keyInput.focus(); return; }
      setKey(k);
      status.textContent = '検索中...';
      results.innerHTML = '';
      try {
        const items = await searchTMDB(q, k);
        if (!items.length) { status.textContent = '見つかりませんでした。別のキーワードで試してください。'; return; }
        status.textContent = `${items.length}件見つかりました。ポスターをタップして選択。`;
        for (const it of items) {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'ekms-card';
          card.innerHTML = `
            <div class="ekms-poster">${it.poster ? `<img src="${it.poster}" alt="" loading="lazy" crossorigin="anonymous">` : '<span>No Poster</span>'}</div>
            <div class="ekms-meta"><div class="ekms-title"></div><div class="ekms-year"></div></div>`;
          card.querySelector('.ekms-title').textContent = it.title;
          card.querySelector('.ekms-year').textContent = it.year || '';
          card.onclick = () => { onPick(it); close(); };
          results.appendChild(card);
        }
      } catch (e) {
        status.textContent = `検索に失敗しました: ${e.message || e}`;
      }
    }

    backdrop.querySelector('#ekms-go').onclick = run;
    qInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); run(); } });
    setTimeout(() => qInput.focus(), 50);
  }

  window.EigaKitMovieSearch = { open, getKey, setKey };
})();
