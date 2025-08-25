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