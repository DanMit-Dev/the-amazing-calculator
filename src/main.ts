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