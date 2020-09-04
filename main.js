
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let win; 

function createWindow(){
    win = new BrowserWindow({
        width:800, 
        height:600, 
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
            // (NOT RECOMMENDED)
            // If true, we can skip attaching functions from ./menu-functions.js to window object in preload.js.
            // And, instead, we can use electron APIs directly in renderer.js
            // From Electron v5, nodeIntegration is set to false by default. And it is recommended to use preload.js to get access to only required Node.js apis.
            // nodeIntegration: true
          },
          frame: false, //Remove frame to hide default menu

        icon:__dirname+ '/img/1200px-Circle-icons-rocket.svg.png'});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true 
        }))

        win.webContents().openDevTools();
        
        win.on('closed', () => {
            win = null;
        });
   }

// Register an event listener. When ipcRenderer sends mouse click co-ordinates, show menu at that position.
ipcMain.on(`display-app-menu`, function(e, args) {
    if (isWindows && mainWindow) {
      menu.popup({
        window: mainWindow,
        x: args.x,
        y: args.y
      });
    }
  });



app.on('ready', createWindow);

app.on('window-all-closed', () => {
   if(process.platform !== 'darwin'){
    app.quit();

   }
});


