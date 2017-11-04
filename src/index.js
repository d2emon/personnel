const {app, shell, Menu, BrowserWindow} = require('electron');

const template = [
  {
    label: 'Выход',
    role: 'close'
  },
  {
    label: 'Правка',
    submenu: [{
      label: 'Отменить',
      role: 'undo'
    }, {
      label: 'Повторить',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Вырезать',
      role: 'cut'
    }, {
      label: 'Копировать',
      role: 'copy'
    }, {
      label: 'Вставить',
      role: 'paste'
    }, {
      role: 'pasteandmatchstyle'
    }, {
      role: 'delete'
    }, {
      label: 'Выделить Все',
      role: 'selectall'
    }]
  },
  {
    label: 'Отчеты',
  },
  {
    label: 'Вид',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]    
  },
  {
    label: 'Справочники',
  },
  {
    label: 'Сервис',
  },
  {
    label: 'Формат',
  },
  {
    label: 'Окно',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]    
  },
  {
    label: 'Помощь',
    submenu: [
      {
        label: 'Learn More',
        click () { shell.openExternal('https://electron.atom.io'); }
      }
    ]    
  }
];
 
if(process.platform === 'darwin'){
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {role: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  });
   
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  );
   
  template[7].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ];
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

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