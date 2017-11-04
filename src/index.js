const {app, Menu, BrowserWindow} = require('electron');

/**
 * const template = [
 *  {
 *    label: 'Edit',
 *    submenu: [
 *      {role: 'undo'},
 *      {role: 'redo'}
 *    ]
 *  },
 *  {
 *    label: 'View',
 *    submenu: [
 *      {role: 'reload'},
 *      {role: 'forcereload'}
 *    ]
 *  },
 * ]
 * 
 * if(process.platform === 'darwin'){
 *   template.unshift({
 *     label: app.getName(),
 *     submenu: [
 *       {role: 'about'},
 *       {role: 'separator'}
 *     ]
 *   });
 *   template[1].submenu.push(
 *     {type: 'separator'},
 *     {
 *       label: 'Speech',
 *       submenu: [
 *         {role: 'startspeaking'},
 *         {role: 'stopspeaking'}
 *       ]
 *     }
 *   );
 * }
 *
 * const menu = Menu.buildFromTemplate(template);
 * Menu.setApplicationMenu(menu);
 */

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