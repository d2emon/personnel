const {app, Menu, BrowserWindow} = require('electron');
const menu = require('./menu.js');

Menu.setApplicationMenu(menu.main_menu);

// electron.crashReporter.start();

var mainWindow = null;

app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL('file://' + __dirname + '/html/index.html');

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});