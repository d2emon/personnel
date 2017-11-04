const {app, Menu, shell} = require('electron');

const template = [
  {
    label: 'Выход',
    role: 'close'
  },
  {
    label: 'Правка',
    submenu: [
      {
        label: 'Отменить',
        role: 'undo'
      }, 
      {
        label: 'Повторить',
        role: 'redo'
      }, 
      {
        type: 'separator'
      }, 
      {
        label: 'Вырезать',
        role: 'cut'
      }, 
      {
        label: 'Копировать',
        role: 'copy'
      }, 
      {
        label: 'Вставить',
        role: 'paste'
      }, 
      {
        role: 'pasteandmatchstyle'
      }, 
      {
        role: 'delete'
      }, 
      {
        label: 'Выделить Все',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'Отчеты',
  },
  {
    label: 'Вид',
    submenu: [
      {
        label: 'Обновить',
        role: 'reload'
      },
      {
        label: 'Принудительное Обновление',
        role: 'forcereload'
      },
      {
        label: 'Инструменты Разработчика',
        role: 'toggledevtools'
      },
      {type: 'separator'},
      {
        label: 'Размер по умолчанию',
        role: 'resetzoom'
      },
      {
        label: 'Увеличить',
        role: 'zoomin'
      },
      {
        label: 'Уменьшить',
        role: 'zoomout'
      },
      {type: 'separator'},
      {
          label: 'Полный экран',
          role: 'togglefullscreen'
      }
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
      {
        label: 'Свернуть',
        role: 'minimize'
      },
      {
        label: 'Закрыть',
        role: 'close'
      }
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

exports.main_menu = Menu.buildFromTemplate(template);