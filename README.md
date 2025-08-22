# The Amazing Calculator

![GitHub release (latest by date)](https://img.shields.io/github/v/release/DanMit-Dev/the-amazing-calculator)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/DanMit-Dev/the-amazing-calculator/release.yml)
![GitHub repo size](https://img.shields.io/github/repo-size/DanMit-Dev/the-amazing-calculator)
![License](https://img.shields.io/github/license/DanMit-Dev/the-amazing-calculator)
![GitHub issues](https://img.shields.io/github/issues/DanMit-Dev/the-amazing-calculator)
![GitHub pull requests](https://img.shields.io/github/issues-pr/DanMit-Dev/the-amazing-calculator)
![Platform](https://img.shields.io/badge/platform-linux%20|%20win%20|%20mac-lightgrey)
![Downloads](https://img.shields.io/github/downloads/DanMit-Dev/the-amazing-calculator/total)

**The best offline, open-source calculator app in the world.**  
Built with **Electron + TypeScript + Webpack**, featuring:

- ✅ Basic arithmetic  
- ✅ Advanced solvers: 1º, 2º, 3º degree equations  
- ✅ Rule of Three auto solver  
- ✅ Dark/Light mode toggle  
- ✅ Keyboard support (numbers, Enter, Backspace, Escape)  
- ✅ Offline-only, no cloud dependencies  
- ✅ Open source & MIT licensed  

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20  
- npm >= 9  

### Clone the Repo
git clone https://github.com/YOUR_GITHUB_USERNAME/the-amazing-calculator.git
cd the-amazing-calculator
*Install Dependencies*
npm install
*Run in Dev Mode*
npm start

## **🛠 Build for Distribution**
Build cross-platform executables (Linux, Windows, macOS):
npm run build
Output files will be placed inside dist/.

## **📦 CI/CD with GitHub Actions**
Every push to main triggers a GitHub Actions workflow (.github/workflows/release.yml) that:

Installs dependencies

Builds the app

Uploads cross-platform binaries as artifacts

Attaches installers to the GitHub Release page

You can download the installers directly from Releases.
End-users never need npm start — they just install and run.

## **🔒 Security**
See SECURITY.md.
Key points:

No external APIs, cloud services, or AI.

Offline by design.

Dependencies audited (uses mathjs only).

## **📜 License**
MIT License — see LICENSE.md.
You are free to use, modify, and distribute.

## **❤️ Contributing**

PRs welcome. Fork → Branch → Commit → PR.
Please give your feedback, suggestions, ideas, or code solutions/innovations.

## **📖Thanks by Reading**
Feel free to connect with DanMit-Dev (🔎The Amazing Calculator Creator🔍)
