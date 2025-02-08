const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false, // Borderless window
    resizable: true, // Allow resizing
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Enforce aspect ratio (e.g., 4:3)
  mainWindow.setAspectRatio(4 / 3);

  mainWindow.loadFile('index.html');

  // Make the window movable
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('window-movable', true);
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
