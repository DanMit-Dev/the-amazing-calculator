.assets/
  └── .gitkeep
.gitignore
package.json
package-lock.json (optional placeholder - see instructions)
tsconfig.json
webpack.main.config.js
webpack.renderer.config.js
index.html
styles.css
src/main.ts
src/renderer.ts
src/math.ts
.github/workflows/release.yml
README.md
LICENSE.md
SECURITY.md







6) webpack.renderer.config.js
js
Copiar
Editar
// webpack.renderer.config.js - compile renderer TS and CSS to build/renderer.js
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'electron-renderer',
  entry: './src/renderer.ts',
  output: { path: path.resolve(__dirname, 'build'), filename: 'renderer.js' },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  }
};
7) .github/workflows/release.yml
(copy exactly — uses v4 upload/download artifact)

yaml
Copiar
Editar
name: Build and Publish Release

on:
  push:
    tags:
      - "v*.*.*"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-22.04, windows-2022, macos-14]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build (main + renderer)
        run: npm run build

      - name: Package (Linux)
        if: runner.os == 'Linux'
        run: npm run dist:linux

      - name: Package (Windows)
        if: runner.os == 'Windows'
        run: npm run dist:win

      - name: Package (macOS)
        if: runner.os == 'macOS'
        run: npm run dist:mac

      - name: Upload installer artifacts (v4)
        uses: actions/upload-artifact@v4
        with:
          name: ${{ runner.os }}-installer
          path: dist/**

  release:
    needs: build
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Download all artifacts
        uses: actions/download-artifact@v4
        with:
          path: ./artifacts

      - name: Create GitHub Release and upload installers
        uses: softprops/action-gh-release@v1
        with:
          files: ./artifacts/**/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
8) index.html
html
Copiar
Editar
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>The Amazing Calculator</title>
<link rel="stylesheet" href="styles.css">
</head>
<body data-theme="light">
  <main style="width:100%;max-width:540px;margin:24px auto;">
    <input id="display" type="text" readonly />
    <div class="buttons" id="buttons"></div>
    <div class="special-buttons">
      <button id="linear-btn">1º degree</button>
      <button id="quadratic-btn">2º degree</button>
      <button id="cubic-btn">3º degree</button>
      <button id="rule3-btn">Rule of Three</button>
    </div>
    <div class="toolbar">
      <button id="theme-toggle">Toggle Dark/Light</button>
    </div>
  </main>

  <script src="build/renderer.js"></script>
</body>
</html>
9) styles.css
css
Copiar
Editar
:root{--bg:#f3f3f3;--text:#222;--btn:#e0e0e0;--hover:#d0d0d0;--accent:#6c63ff;--accent-hover:#574fd6}
[data-theme="dark"]{--bg:#1e1e1e;--text:#f3f3f3;--btn:#333;--hover:#444;--accent:#8e83ff;--accent-hover:#6c63ff}
body{font-family:Inter,system-ui,Segoe UI,Roboto,Arial;margin:0;background:var(--bg);color:var(--text);display:flex;align-items:center;justify-content:center;height:100vh}
main{width:95%;max-width:540px}
#display{width:100%;font-size:1.8rem;padding:12px;border-radius:10px;border:1px solid #aaa;background:#fff;text-align:right;box-sizing:border-box;margin-bottom:10px}
.buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px}
button{padding:12px;font-size:1.05rem;border-radius:10px;border:none;background:var(--btn);cursor:pointer;transition:transform .08s,background .15s}
button:hover{background:var(--hover)}
.special-buttons{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:10px}
.special-buttons button{background:var(--accent);color:#fff}
.toolbar{display:flex;gap:8px;justify-content:flex-end}
10) src/main.ts
ts
Copiar
Editar
// src/main.ts
// Main process for Electron. Creates window and wires auto-update via electron-updater.

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { autoUpdater } from 'electron-updater';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 640,
    resizable: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
    show: false
  });

  const indexPath = `file://${path.join(app.getAppPath(), 'index.html')}`;
  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => mainWindow?.show());
  mainWindow.on('closed', () => { mainWindow = null; });
}

autoUpdater.autoDownload = true;
autoUpdater.on('update-available', () => console.log('Update available — downloading...'));
autoUpdater.on('update-downloaded', () => console.log('Update downloaded — will install on quit.'));

app.whenReady().then(() => {
  createWindow();
  if (!app.isPackaged) console.log('Dev mode — skipping auto-update.');
  else autoUpdater.checkForUpdatesAndNotify().catch(err => console.warn('Auto-update failed', err));
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
11) src/renderer.ts
ts
Copiar
Editar
// src/renderer.ts
import { evaluateExpression, solveLinear, solveQuadratic, solveCubic, ruleOfThree } from './math';

function safeParse(n: string | null): number {
  const v = parseFloat((n ?? '').trim());
  if (Number.isNaN(v) || !Number.isFinite(v)) throw new Error('Invalid number');
  return v;
}

window.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display') as HTMLInputElement;
  const buttonsContainer = document.getElementById('buttons')!;
  const themeToggle = document.getElementById('theme-toggle')!;
  const linearBtn = document.getElementById('linear-btn')!;
  const quadBtn = document.getElementById('quadratic-btn')!;
  const cubicBtn = document.getElementById('cubic-btn')!;
  const rule3Btn = document.getElementById('rule3-btn')!;
  const body = document.body;

  const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'];
  keys.forEach(k => {
    const b = document.createElement('button');
    b.textContent = (k === '/' ? '÷' : k === '*' ? '×' : k);
    b.dataset.value = k;
    b.addEventListener('click', () => {
      const val = b.dataset.value!;
      if (val === '=') {
        try { display.value = evaluateExpression(display.value || '0'); } catch { display.value = 'Error'; }
      } else display.value += val;
    });
    buttonsContainer.appendChild(b);
  });

  const clear = document.createElement('button');
  clear.textContent = 'Clear';
  clear.style.gridColumn = 'span 4';
  clear.addEventListener('click', () => { display.value = ''; });
  buttonsContainer.appendChild(clear);

  window.addEventListener('keydown', (e) => {
    if (/^[0-9+\-*/.=]$/.test(e.key)) {
      if (e.key === '=' || e.key === 'Enter') {
        try { display.value = evaluateExpression(display.value || '0'); } catch { display.value = 'Error'; }
      } else display.value += e.key;
    } else if (e.key === 'Backspace') display.value = display.value.slice(0,-1);
    else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') display.value = '';
  });

  linearBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax + b = 0):'));
      const b = safeParse(prompt('Enter b (ax + b = 0):'));
      display.value = solveLinear(a, b);
    } catch { display.value = 'Error'; }
  });

  quadBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax² + bx + c = 0):'));
      const b = safeParse(prompt('Enter b (ax² + bx + c = 0):'));
      const c = safeParse(prompt('Enter c (ax² + bx + c = 0):'));
      display.value = solveQuadratic(a, b, c);
    } catch { display.value = 'Error'; }
  });

  cubicBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax³ + bx² + cx + d = 0):'));
      const b = safeParse(prompt('Enter b (ax³ + bx² + cx + d = 0):'));
      const c = safeParse(prompt('Enter c (ax³ + bx² + cx + d = 0):'));
      const d = safeParse(prompt('Enter d (ax³ + bx² + cx + d = 0):'));
      display.value = solveCubic(a, b, c, d);
    } catch { display.value = 'Error'; }
  });

  rule3Btn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a:'));
      const b = safeParse(prompt('Enter b:'));
      const c = safeParse(prompt('Enter c:'));
      display.value = ruleOfThree(a, b, c).toString();
    } catch { display.value = 'Error'; }
  });

  themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
});
12) src/math.ts
ts
Copiar
Editar
// src/math.ts - mathsolvers and expression evaluator
import { create, all } from 'mathjs';
const math = create(all);

export function evaluateExpression(expr: string): string {
  try { return math.evaluate(expr).toString(); } catch { return 'Error'; }
}

export function solveLinear(a: number, b: number): string {
  if (a === 0) return b === 0 ? 'Infinite solutions' : 'No solution';
  return (-b / a).toString();
}

export function solveQuadratic(a: number, b: number, c: number): string {
  if (a === 0) return solveLinear(b, c);
  const D = b*b - 4*a*c;
  if (D < 0) return 'No real solution';
  const sqrtD = Math.sqrt(D);
  const x1 = (-b + sqrtD) / (2*a);
  const x2 = (-b - sqrtD) / (2*a);
  return `${x1}, ${x2}`;
}

export function solveCubic(a: number, b: number, c: number, d: number): string {
  if (a === 0) return solveQuadratic(b, c, d);
  const f = ((3*c/a) - (b*b)/(a*a)) / 3;
  const g = ((2*b*b*b)/(a*a*a) - (9*b*c)/(a*a) + (27*d)/a) / 27;
  const h = g*g/4 + f*f*f/27;

  if (h > 0) {
    const R = -(g/2) + Math.sqrt(h);
    const S = Math.cbrt(R);
    const T = -(g/2) - Math.sqrt(h);
    const U = Math.cbrt(T);
    const x = S + U - b/(3*a);
    return `${x}`;
  } else {
    const i = Math.sqrt((g*g/4) - h);
    const j = Math.cbrt(i);
    const k = Math.acos(-(g/(2*i)));
    const p = -b/(3*a);
    const x1 = 2*j*Math.cos(k/3) + p;
    const x2 = -j*(Math.cos(k/3) + Math.sqrt(3)*Math.sin(k/3)) + p;
    const x3 = -j*(Math.cos(k/3) - Math.sqrt(3)*Math.sin(k/3)) + p;
    return `${x1}, ${x2}, ${x3}`;
  }
}

export function ruleOfThree(a: number, b: number, c: number): number {
  if (a === 0) throw new Error('Division by zero');
  return (b*c)/a;
}
13) assets/.gitkeep
text
Copiar
Editar
# placeholder - replace with your icons:
# assets/icon.png
# assets/icon.ico
# assets/icon.icns
14) README.md
markdown
Copiar
Editar
# The Amazing Calculator

[![CI](https://img.shields.io/github/actions/workflow/status/DanMit-Dev/the-amazing-calculator/release.yml?label=CI&style=for-the-badge)](https://github.com/DanMit-Dev/the-amazing-calculator/actions)
[![Releases](https://img.shields.io/github/v/release/DanMit-Dev/the-amazing-calculator?style=for-the-badge)](https://github.com/DanMit-Dev/the-amazing-calculator/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE.md)

Offline cross-platform calculator with advanced solvers and auto-update.

## Quick web-only setup (create files via GitHub Web)

1. Create files/folders in GitHub Web exactly as in repo tree above.
2. Add `assets/icon.png`, `assets/icon.ico`, `assets/icon.icns` later via Upload.
3. (Optional) Create `package-lock.json` placeholder file (provided) if you want Actions silently accept a lockfile.
4. Create a Release (tag `v1.0.0`) to trigger Actions that build & publish installers.

## Download (end users)
Go to Releases: https://github.com/DanMit-Dev/the-amazing-calculator/releases and download the installer for your OS.

## Maintainer build (if you later use a real machine)
```bash
npm install
npm run build
npm run dist
License
MIT — see LICENSE.md

yaml
Copiar
Editar

---

### 15) `LICENSE.md`  
Paste the standard MIT license and set copyright to:
Copyright (c) 2025 daniel mitsuo / danmit

yaml
Copiar
Editar

---

### 16) `SECURITY.md`
```markdown
# Security Policy

- Offline-first app. No remote content loaded by default.
- Renderer runs with nodeIntegration=false and contextIsolation=true.
- Report vulnerabilities via GitHub Issues.