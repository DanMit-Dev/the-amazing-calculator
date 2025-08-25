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

## Maintainer build (if you will use a real machine for contributions)
```bash
npm install
npm run build
npm run dist
License
MIT — see LICENSE.md