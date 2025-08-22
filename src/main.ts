
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 640,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  const indexPath = url.pathToFileURL(path.join(app.getAppPath(), 'index.html')).toString();
  win.loadURL(indexPath);
  win.setMenu(null);
  win.on('closed', () => { win = null; });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
