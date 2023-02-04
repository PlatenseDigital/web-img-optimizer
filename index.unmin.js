const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 800,
    height: 600,
    icon: __dirname + '/favicon.ico',
  })
  win.setMenuBarVisibility(false)
  win.loadFile('index-min.html')
}


app.whenReady().then(() => {
  createWindow()

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});