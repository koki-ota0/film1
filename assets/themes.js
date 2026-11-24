(() => {
  // Each theme: { id, name, group:'style'|'movie', desc, bg:[c1,c2,c3?], panel, accent, accent2, text, muted, frame, fontHead, fontBody, badge }
  const serif = '"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",Georgia,serif';
  const sans = '"Hiragino Sans","Noto Sans JP","Yu Gothic",system-ui,sans-serif';
  const mono = '"SF Mono","Menlo","Consolas",monospace';

  const styleThemes = [
    {id:'cinema-dark',name:'Cinema Dark',group:'style',desc:'定番のダークシネマ',bg:['#1c1912','#0b0b0f','#15121a'],accent:'#e8c468',accent2:'#ff7a59',text:'#f2efe8',muted:'rgba(242,239,232,.62)',frame:'rgba(232,196,104,.22)',fontHead:serif,fontBody:sans},
    {id:'minimal-light',name:'Minimal Light',group:'style',desc:'余白のある白基調',bg:['#f7f4ee','#efeae0','#f7f4ee'],accent:'#1f1f1f',accent2:'#b59b5b',text:'#1d1b18',muted:'rgba(29,27,24,.58)',frame:'rgba(29,27,24,.12)',fontHead:serif,fontBody:sans},
    {id:'noir',name:'Film Noir',group:'style',desc:'高コントラストの白黒',bg:['#1a1a1a','#050505','#111111'],accent:'#f5f5f5',accent2:'#9e9e9e',text:'#f5f5f5',muted:'rgba(245,245,245,.58)',frame:'rgba(245,245,245,.25)',fontHead:serif,fontBody:sans},
    {id:'neon-night',name:'Neon Night',group:'style',desc:'ネオンの夜',bg:['#0a0014','#050010','#001018'],accent:'#ff4fd8',accent2:'#4df3ff',text:'#f7f2ff',muted:'rgba(247,242,255,.62)',frame:'rgba(255,79,216,.35)',fontHead:sans,fontBody:sans},
    {id:'pastel-pop',name:'Pastel Pop',group:'style',desc:'やわらかいパステル',bg:['#fff3f7','#f3f8ff','#fff9ee'],accent:'#ff6fa3',accent2:'#6bb8ff',text:'#2e2a32',muted:'rgba(46,42,50,.58)',frame:'rgba(255,111,163,.25)',fontHead:sans,fontBody:sans},
    {id:'editorial',name:'Editorial',group:'style',desc:'雑誌風の洗練',bg:['#f2efe9','#e8e2d8','#f2efe9'],accent:'#b21f2d',accent2:'#1e1e1e',text:'#1e1e1e',muted:'rgba(30,30,30,.58)',frame:'rgba(178,31,45,.25)',fontHead:serif,fontBody:sans},
    {id:'retro-70s',name:'Retro 70s',group:'style',desc:'70sの温かいレトロ',bg:['#2b1d12','#1a120b','#332313'],accent:'#f0b04c',accent2:'#d96c4f',text:'#f6ecd8',muted:'rgba(246,236,216,.62)',frame:'rgba(240,176,76,.28)',fontHead:serif,fontBody:sans},
    {id:'bauhaus',name:'Bauhaus',group:'style',desc:'幾何学的で大胆',bg:['#f5f0e6','#efe6d6','#f5f0e6'],accent:'#d62828',accent2:'#1d3557',text:'#1d1d1d',muted:'rgba(29,29,29,.58)',frame:'rgba(29,53,87,.25)',fontHead:sans,fontBody:sans},
    {id:'japanese-washi',name:'和紙',group:'style',desc:'和の静かな質感',bg:['#f5f1e8','#ebe4d6','#f5f1e8'],accent:'#8c3b2f',accent2:'#5d6b4f',text:'#2a2621',muted:'rgba(42,38,33,.58)',frame:'rgba(140,59,47,.22)',fontHead:serif,fontBody:serif},
    {id:'cyber-grid',name:'Cyber Grid',group:'style',desc:'テック感のあるグリッド',bg:['#050d14','#02070c','#081824'],accent:'#00f5d4',accent2:'#4cc9f0',text:'#e8fbff',muted:'rgba(232,251,255,.58)',frame:'rgba(0,245,212,.3)',fontHead:mono,fontBody:sans},
    {id:'sunset',name:'Sunset',group:'style',desc:'夕焼けグラデーション',bg:['#2b1020','#1a0b1e','#3a1b10'],accent:'#ffb347',accent2:'#ff5f6d',text:'#fff4eb',muted:'rgba(255,244,235,.62)',frame:'rgba(255,179,71,.3)',fontHead:serif,fontBody:sans},
    {id:'ocean',name:'Deep Ocean',group:'style',desc:'深い海の青',bg:['#061a24','#031018','#08283a'],accent:'#7edce2',accent2:'#4ea8de',text:'#eafcff',muted:'rgba(234,252,255,.6)',frame:'rgba(126,220,226,.28)',fontHead:serif,fontBody:sans},
    {id:'forest',name:'Forest',group:'style',desc:'森の静けさ',bg:['#121c14','#0a120c','#18261a'],accent:'#b7d3a8',accent2:'#e6c77b',text:'#eff5eb',muted:'rgba(239,245,235,.6)',frame:'rgba(183,211,168,.28)',fontHead:serif,fontBody:sans},
    {id:'rose-gold',name:'Rose Gold',group:'style',desc:'上品なローズゴールド',bg:['#1f1418','#130d10','#2a1a1f'],accent:'#f0b7c3',accent2:'#d4af37',text:'#fff5f7',muted:'rgba(255,245,247,.62)',frame:'rgba(240,183,195,.3)',fontHead:serif,fontBody:sans},
    {id:'monochrome-red',name:'Mono Red',group:'style',desc:'赤のアクセント',bg:['#140809','#0b0405','#1d0c0f'],accent:'#ff3b4e',accent2:'#ffffff',text:'#fff2f3',muted:'rgba(255,242,243,.6)',frame:'rgba(255,59,78,.3)',fontHead:sans,fontBody:sans},
    {id:'newspaper',name:'Newspaper',group:'style',desc:'新聞風モノクロ',bg:['#efefeb','#e3e3dd','#efefeb'],accent:'#111111',accent2:'#555555',text:'#111111',muted:'rgba(17,17,17,.6)',frame:'rgba(17,17,17,.22)',fontHead:serif,fontBody:serif},
    {id:'luxury-gold',name:'Luxury Gold',group:'style',desc:'黒と金の高級感',bg:['#111111','#070707','#1a1a1a'],accent:'#d4af37',accent2:'#f4e2a6',text:'#f7f1de',muted:'rgba(247,241,222,.6)',frame:'rgba(212,175,55,.34)',fontHead:serif,fontBody:sans},
    {id:'candy',name:'Candy',group:'style',desc:'ポップで明るい',bg:['#fff7fb','#f7fbff','#fffaf0'],accent:'#ff4d8d',accent2:'#5ecbff',text:'#2c2430',muted:'rgba(44,36,48,.58)',frame:'rgba(255,77,141,.24)',fontHead:sans,fontBody:sans},
    {id:'blueprint',name:'Blueprint',group:'style',desc:'設計図風ブルー',bg:['#0b2d59','#072346','#0e376b'],accent:'#eaf6ff',accent2:'#9fd3ff',text:'#eaf6ff',muted:'rgba(234,246,255,.66)',frame:'rgba(234,246,255,.3)',fontHead:mono,fontBody:sans},
    {id:'velvet',name:'Velvet Purple',group:'style',desc:'紫のベルベット',bg:['#1a1024','#110816','#241233'],accent:'#d7aefb',accent2:'#f0c987',text:'#f7f0ff',muted:'rgba(247,240,255,.62)',frame:'rgba(215,174,251,.3)',fontHead:serif,fontBody:sans},
  {id:'pixel-art',name:'Pixel Art',group:'style',desc:'レトロゲーム風ドット',bg:['#0f0f1b','#090912','#1a1a2e'],accent:'#00ff90',accent2:'#ffcc00',text:'#f4f4ff',muted:'rgba(244,244,255,.62)',frame:'rgba(0,255,144,.35)',fontHead:'"Press Start 2P","DotGothic16",monospace',fontBody:'"DotGothic16","Noto Sans JP",sans-serif'},
  {id:'chalkboard',name:'ChalkBoard',group:'style',desc:'黒板の手描き風',bg:['#22352b','#1a2b23','#2a4034'],accent:'#f5f5dc',accent2:'#ffd966',text:'#f5f5dc',muted:'rgba(245,245,220,.66)',frame:'rgba(245,245,220,.28)',fontHead:'"Yomogi","Klee One","Hiragino Maru Gothic ProN",cursive',fontBody:'"Yomogi","Klee One","Hiragino Maru Gothic ProN",sans-serif'},
  {id:'glow-sketch',name:'Glow Sketch',group:'style',desc:'黒背景にネオン線画',bg:['#050505','#000000','#0a0a12'],accent:'#7df9ff',accent2:'#ff6ec7',text:'#f5fbff',muted:'rgba(245,251,255,.62)',frame:'rgba(125,249,255,.35)',fontHead:'"Orbitron","Noto Sans JP",sans-serif',fontBody:'"Noto Sans JP",sans-serif'},
  {id:'ps2-style',name:'PS2 Style',group:'style',desc:'ローポリ3D/テック感',bg:['#1a2233','#111827','#23314a'],accent:'#8ec5ff',accent2:'#b8c0cc',text:'#eef4ff',muted:'rgba(238,244,255,.6)',frame:'rgba(142,197,255,.3)',fontHead:'"Orbitron","Hiragino Sans",sans-serif',fontBody:'"Noto Sans JP",sans-serif'},
  {id:'comic-art',name:'Comic Art',group:'style',desc:'ポップアートのコマ割り',bg:['#fff8e1','#ffefc2','#fffdf5'],accent:'#e63946',accent2:'#1d3557',text:'#1a1a1a',muted:'rgba(26,26,26,.62)',frame:'rgba(26,26,26,.35)',fontHead:'"Bangers","RocknRoll One","Noto Sans JP",sans-serif',fontBody:'"RocknRoll One","Noto Sans JP",sans-serif'},
  {id:'flat-vector',name:'Flat Vector',group:'style',desc:'ミニマルな夜景フラット',bg:['#0f1b2d','#162840','#1e3657'],accent:'#ffcc66',accent2:'#6dd3ce',text:'#f3f8ff',muted:'rgba(243,248,255,.62)',frame:'rgba(255,204,102,.28)',fontHead:'"Noto Sans JP","Hiragino Sans",sans-serif',fontBody:'"Noto Sans JP","Hiragino Sans",sans-serif'},
  {id:'dan-koe',name:'Dan Koe Style',group:'style',desc:'設計図・ワイヤーフレーム',bg:['#f6f6f2','#ecece6','#f6f6f2'],accent:'#111111',accent2:'#4a4a4a',text:'#111111',muted:'rgba(17,17,17,.58)',frame:'rgba(17,17,17,.28)',fontHead:'"IBM Plex Mono","SF Mono","Menlo",monospace',fontBody:'"IBM Plex Sans","Noto Sans JP",sans-serif'},
  {id:'cgi-motion',name:'CGI Motion',group:'style',desc:'フォトリアル3Dシネマ',bg:['#0b0f14','#05080c','#151c24'],accent:'#c9d6df',accent2:'#ff8c42',text:'#f2f6fa',muted:'rgba(242,246,250,.6)',frame:'rgba(201,214,223,.28)',fontHead:'"Montserrat","Hiragino Sans",sans-serif',fontBody:'"Noto Sans JP",sans-serif'},
  {id:'lego-style',name:'Lego Style',group:'style',desc:'ブロック造形のポップ',bg:['#f5f5f5','#ffffff','#ececec'],accent:'#d01012',accent2:'#0055bf',text:'#1a1a1a',muted:'rgba(26,26,26,.62)',frame:'rgba(208,16,18,.3)',fontHead:'"Fredoka","RocknRoll One","Noto Sans JP",sans-serif',fontBody:'"Noto Sans JP",sans-serif'},
  {id:'zackd-films',name:'ZackD Films Style',group:'style',desc:'シネマティック3D・ドラマ',bg:['#111318','#090b0f','#1b2028'],accent:'#ff4d2e',accent2:'#f2c14e',text:'#f5f7fa',muted:'rgba(245,247,250,.62)',frame:'rgba(255,77,46,.32)',fontHead:'"Oswald","Impact","Noto Sans JP",sans-serif',fontBody:'"Noto Sans JP",sans-serif'},
  ];

  const movieThemes = [
    {id:'mv-odyssey',name:'2001: A Space Odyssey 風',group:'movie',desc:'宇宙の静謐とモノリス',bg:['#05070f','#000000','#101828'],accent:'#f2f2f2',accent2:'#ff3b30',text:'#f5f5f5',muted:'rgba(245,245,245,.6)',frame:'rgba(245,245,245,.24)',fontHead:sans,fontBody:sans},
    {id:'mv-grand-budapest',name:'The Grand Budapest Hotel 風',group:'movie',desc:'パステルピンクと上品な対称',bg:['#f7d7d9','#f3c9cd','#fae7d8'],accent:'#7a2e3b',accent2:'#d4a373',text:'#4b232b',muted:'rgba(75,35,43,.62)',frame:'rgba(122,46,59,.28)',fontHead:serif,fontBody:serif},
    {id:'mv-blade-runner',name:'Blade Runner 風',group:'movie',desc:'雨のネオンとノワール',bg:['#090015','#04000a','#00131f'],accent:'#ff4db8',accent2:'#42d3ff',text:'#f5ecff',muted:'rgba(245,236,255,.62)',frame:'rgba(66,211,255,.32)',fontHead:sans,fontBody:sans},
    {id:'mv-la-la-land',name:'La La Land 風',group:'movie',desc:'夕暮れの紫とジャズ',bg:['#1b1140','#120a2c','#32124b'],accent:'#ffd166',accent2:'#9b8cff',text:'#fff7ea',muted:'rgba(255,247,234,.64)',frame:'rgba(255,209,102,.3)',fontHead:serif,fontBody:sans},
    {id:'mv-spirited-away',name:'千と千尋の神隠し 風',group:'movie',desc:'湯屋の赤と神秘的な緑',bg:['#1a1410','#0f1a16','#2b1a14'],accent:'#d94f3a',accent2:'#8fd3a6',text:'#f6efe3',muted:'rgba(246,239,227,.62)',frame:'rgba(217,79,58,.3)',fontHead:serif,fontBody:serif},
    {id:'mv-akira',name:'AKIRA 風',group:'movie',desc:'赤い衝撃とコンクリート',bg:['#180305','#080102','#2a0508'],accent:'#ff2d2d',accent2:'#cfcfcf',text:'#fff1f1',muted:'rgba(255,241,241,.6)',frame:'rgba(255,45,45,.35)',fontHead:sans,fontBody:sans},
    {id:'mv-matrix',name:'The Matrix 風',group:'movie',desc:'緑のコードと黒',bg:['#020804','#000000','#041108'],accent:'#7cff7c',accent2:'#1e8f3e',text:'#dfffe0',muted:'rgba(223,255,224,.58)',frame:'rgba(124,255,124,.28)',fontHead:mono,fontBody:mono},
    {id:'mv-moonrise',name:'Moonrise Kingdom 風',group:'movie',desc:'くすみイエローと冒険',bg:['#efe2b8','#e3d39f','#f3ebc8'],accent:'#8b5e34',accent2:'#6b705c',text:'#3f3523',muted:'rgba(63,53,35,.62)',frame:'rgba(139,94,52,.28)',fontHead:serif,fontBody:serif},
    {id:'mv-amelie',name:'Amélie 風',group:'movie',desc:'暖色のパリと緑のアクセント',bg:['#2b1d12','#1e140d','#352415'],accent:'#e6b65c',accent2:'#7aa35a',text:'#fff0d6',muted:'rgba(255,240,214,.62)',frame:'rgba(230,182,92,.3)',fontHead:serif,fontBody:sans},
    {id:'mv-jaws',name:'Jaws 風',group:'movie',desc:'海と緊張の赤',bg:['#062033','#041726','#0a314a'],accent:'#f2f2f2',accent2:'#e63946',text:'#edf8ff',muted:'rgba(237,248,255,.62)',frame:'rgba(230,57,70,.35)',fontHead:sans,fontBody:sans},
    {id:'mv-pulp-fiction',name:'Pulp Fiction 風',group:'movie',desc:'大胆な黄と赤',bg:['#1a1205','#120d03','#241903'],accent:'#f4c430',accent2:'#d7263d',text:'#fff8df',muted:'rgba(255,248,223,.62)',frame:'rgba(244,196,48,.34)',fontHead:sans,fontBody:sans},
    {id:'mv-tron',name:'TRON 風',group:'movie',desc:'黒とシアンの発光',bg:['#02050a','#000000','#05111a'],accent:'#53e7ff',accent2:'#ff9f1c',text:'#e9fcff',muted:'rgba(233,252,255,.58)',frame:'rgba(83,231,255,.34)',fontHead:mono,fontBody:sans},
    {id:'mv-her',name:'Her 風',group:'movie',desc:'やわらかい赤と空気感',bg:['#f7efe8','#f0ddd0','#fbf6f1'],accent:'#d8615b',accent2:'#8e9aaf',text:'#3a2e2a',muted:'rgba(58,46,42,.58)',frame:'rgba(216,97,91,.24)',fontHead:sans,fontBody:sans},
    {id:'mv-godfather',name:'The Godfather 風',group:'movie',desc:'重厚な黒と金',bg:['#141210','#090808','#1e1a17'],accent:'#d0b06a',accent2:'#8a1c1c',text:'#f3ede1',muted:'rgba(243,237,225,.6)',frame:'rgba(208,176,106,.3)',fontHead:serif,fontBody:serif},
    {id:'mv-your-name',name:'君の名は。 風',group:'movie',desc:'黄昏の空と彗星',bg:['#102040','#1b2d5c','#3a2a52'],accent:'#ffd166',accent2:'#7dd3fc',text:'#f7f7ff',muted:'rgba(247,247,255,.64)',frame:'rgba(255,209,102,.3)',fontHead:sans,fontBody:sans},
    {id:'mv-mad-max',name:'Mad Max: Fury Road 風',group:'movie',desc:'砂漠のオレンジと青',bg:['#2d1608','#1a0d05','#3d200b'],accent:'#ff8c42',accent2:'#6ec1e4',text:'#fff1e6',muted:'rgba(255,241,230,.62)',frame:'rgba(255,140,66,.32)',fontHead:sans,fontBody:sans},
    {id:'mv-interstellar',name:'Interstellar 風',group:'movie',desc:'星間の暗さと琥珀',bg:['#0a0f16','#04070c','#151c26'],accent:'#d9a441',accent2:'#7aa6c2',text:'#eef4fa',muted:'rgba(238,244,250,.6)',frame:'rgba(217,164,65,.28)',fontHead:serif,fontBody:sans},
    {id:'mv-shin-godzilla',name:'シン・ゴジラ 風',group:'movie',desc:'緊迫の赤黒と警告',bg:['#140405','#090102','#220608'],accent:'#ff4d4d',accent2:'#b0b0b0',text:'#fff0f0',muted:'rgba(255,240,240,.6)',frame:'rgba(255,77,77,.34)',fontHead:sans,fontBody:sans},
    {id:'mv-before-sunrise',name:'Before Sunrise 風',group:'movie',desc:'夜明け前の柔らかい光',bg:['#1f2438','#151a2b','#2b2f46'],accent:'#f4c95d',accent2:'#f28f8f',text:'#f7f4ef',muted:'rgba(247,244,239,.62)',frame:'rgba(244,201,93,.28)',fontHead:serif,fontBody:sans},
    {id:'mv-asteroid-city',name:'Asteroid City 風',group:'movie',desc:'砂漠のティールとポップ',bg:['#dce7d8','#cfdcc8','#eadfcb'],accent:'#2f6f7e',accent2:'#d97b4a',text:'#24363b',muted:'rgba(36,54,59,.62)',frame:'rgba(47,111,126,.28)',fontHead:sans,fontBody:sans},
  ];

  const allThemes = [...styleThemes, ...movieThemes];
  const byId = Object.fromEntries(allThemes.map(t => [t.id, t]));

  function ensureFonts() {
    if (document.getElementById('ek-theme-fonts')) return;
    const link = document.createElement('link');
    link.id = 'ek-theme-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bangers&family=DotGothic16&family=Fredoka:wght@600;700&family=IBM+Plex+Mono:wght@500;700&family=IBM+Plex+Sans:wght@400;600;700&family=Klee+One:wght@400;600&family=Montserrat:wght@600;700;800&family=Orbitron:wght@600;700&family=Oswald:wght@600;700&family=Press+Start+2P&family=RocknRoll+One&family=Yomogi&display=swap';
    document.head.appendChild(link);
  }
  ensureFonts();

  function ensurePickerStyle() {
    if (document.getElementById('ek-theme-style')) return;
    const s = document.createElement('style');
    s.id = 'ek-theme-style';
    s.textContent = `
.ek-theme-box{margin:0 0 18px}
.ek-theme-trigger{width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#f2efe8;cursor:pointer;text-align:left;font:inherit}
.ek-theme-trigger:hover{border-color:rgba(232,196,104,.4);background:rgba(255,255,255,.05)}
.ek-theme-trigger .sw{width:52px;height:52px;border-radius:12px;border:1px solid rgba(255,255,255,.12);flex:0 0 auto}
.ek-theme-trigger .meta{flex:1;min-width:0}
.ek-theme-trigger .k{font-size:.72rem;color:#a8a39a;font-weight:700;letter-spacing:.06em}
.ek-theme-trigger .v{font-size:.98rem;font-weight:700;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ek-theme-trigger .d{font-size:.76rem;color:#a8a39a;margin-top:2px}
.ek-theme-trigger .chev{color:#a8a39a;font-size:1.2rem}
.ek-theme-backdrop{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px}
@media(min-width:760px){.ek-theme-backdrop{align-items:center}}
.ek-theme-modal{width:min(920px,100%);max-height:min(86vh,760px);overflow:hidden;background:#17171e;color:#f2efe8;border:1px solid rgba(255,255,255,.1);border-radius:20px;box-shadow:0 24px 80px rgba(0,0,0,.55);font-family:"Hiragino Sans","Noto Sans JP",system-ui,sans-serif;display:flex;flex-direction:column}
.ek-theme-modal-head{padding:18px 18px 12px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;gap:12px;align-items:flex-start;justify-content:space-between}
.ek-theme-modal-head h3{margin:0;font-size:1.15rem}
.ek-theme-modal-head p{margin:4px 0 0;color:#a8a39a;font-size:.84rem}
.ek-theme-close{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#f2efe8;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:18px;line-height:1;flex:0 0 auto}
.ek-theme-tabs{display:flex;gap:8px;padding:12px 18px 0;flex-wrap:wrap}
.ek-theme-tab{padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#f2efe8;font:700 .8rem "Hiragino Sans","Noto Sans JP",sans-serif;cursor:pointer}
.ek-theme-tab[aria-selected="true"]{background:linear-gradient(135deg,#e8c468,#f0d78a);color:#1a1408;border-color:transparent}
.ek-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;padding:14px 18px 18px;overflow:auto}
.ek-theme-card{border:1px solid rgba(255,255,255,.1);background:#121218;border-radius:14px;padding:10px;cursor:pointer;text-align:left;color:#f2efe8;transition:transform .12s,border-color .12s}
.ek-theme-card:hover{transform:translateY(-1px);border-color:rgba(232,196,104,.35)}
.ek-theme-card[aria-pressed="true"]{border-color:#e8c468;box-shadow:0 0 0 2px rgba(232,196,104,.25)}
.ek-theme-swatch{height:58px;border-radius:10px;margin-bottom:10px;border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden}
.ek-theme-swatch .a{position:absolute;right:8px;bottom:8px;width:18px;height:18px;border-radius:50%}
.ek-theme-name{font-size:.82rem;font-weight:700;line-height:1.3}
.ek-theme-desc{font-size:.72rem;color:#a8a39a;line-height:1.35;margin-top:3px}
@media(max-width:640px){.ek-theme-grid{grid-template-columns:repeat(2,1fr);gap:10px;padding:12px}}
`;
    document.head.appendChild(s);
  }

  function mountPicker(container, opts = {}) {
    ensurePickerStyle();
    ensureFonts();
    const onChange = opts.onChange || (() => {});
    let current = byId[opts.initial] ? opts.initial : allThemes[0].id;
    let tab = byId[current].group || 'style';
    container.classList.add('ek-theme-box');

    function renderTrigger() {
      const t = byId[current];
      const bg = `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1] || t.bg[0]})`;
      container.innerHTML = `
        <button type="button" class="ek-theme-trigger" aria-label="デザインを変更">
          <div class="sw" style="background:${bg};box-shadow:inset 0 0 0 2px ${t.frame}"></div>
          <div class="meta">
            <div class="k">デザイン</div>
            <div class="v"></div>
            <div class="d"></div>
          </div>
          <div class="chev">▾</div>
        </button>`;
      container.querySelector('.v').textContent = t.name;
      container.querySelector('.d').textContent = t.desc;
      container.querySelector('.ek-theme-trigger').onclick = openModal;
    }

    function openModal() {
      tab = byId[current].group || tab;
      const backdrop = document.createElement('div');
      backdrop.className = 'ek-theme-backdrop';
      backdrop.innerHTML = `
        <div class="ek-theme-modal" role="dialog" aria-modal="true" aria-label="デザインを選ぶ">
          <div class="ek-theme-modal-head">
            <div><h3>デザインを選ぶ</h3><p>書き出し画像の雰囲気を選べます。${styleThemes.length}スタイル + ${movieThemes.length}映画風。</p></div>
            <button type="button" class="ek-theme-close" aria-label="閉じる">×</button>
          </div>
          <div class="ek-theme-tabs">
            <button type="button" class="ek-theme-tab" data-tab="style" aria-selected="${tab==='style'}">スタイル (${styleThemes.length})</button>
            <button type="button" class="ek-theme-tab" data-tab="movie" aria-selected="${tab==='movie'}">映画風 (${movieThemes.length})</button>
          </div>
          <div class="ek-theme-grid"></div>
        </div>`;
      const close = () => { backdrop.remove(); document.removeEventListener('keydown', onKey); };
      const onKey = (e) => { if(e.key==='Escape') close(); };
      backdrop.addEventListener('click', e => { if(e.target===backdrop) close(); });
      backdrop.querySelector('.ek-theme-close').onclick = close;
      document.addEventListener('keydown', onKey);
      document.body.appendChild(backdrop);

      const grid = backdrop.querySelector('.ek-theme-grid');
      const tabs = [...backdrop.querySelectorAll('.ek-theme-tab')];
      function renderGrid() {
        tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.tab===tab?'true':'false'));
        const list = tab==='style' ? styleThemes : movieThemes;
        grid.innerHTML='';
        list.forEach(t => {
          const b = document.createElement('button');
          b.type='button'; b.className='ek-theme-card';
          b.setAttribute('aria-pressed', t.id===current?'true':'false');
          const bg = `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]||t.bg[0]})`;
          b.innerHTML = `<div class="ek-theme-swatch" style="background:${bg};box-shadow:inset 0 0 0 2px ${t.frame}"><span class="a" style="background:${t.accent}"></span></div><div class="ek-theme-name"></div><div class="ek-theme-desc"></div>`;
          b.querySelector('.ek-theme-name').textContent = t.name;
          b.querySelector('.ek-theme-desc').textContent = t.desc;
          b.onclick = () => { current = t.id; renderTrigger(); onChange(byId[current]); close(); };
          grid.appendChild(b);
        });
      }
      tabs.forEach(t => t.onclick = () => { tab=t.dataset.tab; renderGrid(); });
      renderGrid();
    }

    renderTrigger();
    return { get: () => byId[current], set: (id) => { if(byId[id]){ current=id; tab=byId[id].group; renderTrigger(); onChange(byId[current]); } } };
  }

  window.EigaKitThemes = { all: allThemes, style: styleThemes, movie: movieThemes, byId, mountPicker };
})();
