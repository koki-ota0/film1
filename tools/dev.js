#!/usr/bin/env node
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
execSync('node tools/build.js', { cwd: ROOT, stdio: 'inherit' });
const DIST = path.join(ROOT, 'dist');
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain','.webp':'image/webp' };
const port = Number(process.env.PORT || 5173);
http.createServer((req,res)=>{
  let p = decodeURIComponent((req.url||'/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(DIST, path.normalize(p));
  if (!fp.startsWith(DIST)) { res.statusCode=403; return res.end('forbidden'); }
  fs.readFile(fp,(e,buf)=>{
    if(e){ res.statusCode=404; return res.end('not found'); }
    res.setHeader('Content-Type', mime[path.extname(fp)] || 'application/octet-stream');
    res.end(buf);
  });
}).listen(port, ()=>console.log(`dev http://localhost:${port}`));
