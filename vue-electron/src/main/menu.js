'use strict'

import { Menu, shell } from 'electron'
// const {app, Menu, shell} = require('electron');

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function loadPage (page) {
  return function (item, win) {
    win.loadURL(winURL + '#' + page)
  }
}

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
    label: 'Отчеты'
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
    submenu: [
      {label: 'Отделы', click: loadPage('/departments')},
      {label: 'Личные карточки', enabled: false},
      {label: 'Фильтры', enabled: false},
      {type: 'separator'},
      {label: 'Должности', click: loadPage('/jobs')},
      // <b-dropdown-item href="#" to="/jobs">Должности</b-dropdown-item>
      {label: 'Гражданства', enabled: false},
      {label: 'Ветераны', enabled: false},
      {label: 'Диагнозы', enabled: false},
      {label: 'Проценты б/листа', enabled: false},
      {label: 'Специальности', enabled: false},
      {label: 'Отпуска', enabled: false},
      {label: 'Обучение', enabled: false},
      {label: 'Инвалидность', enabled: false},
      {label: 'Образование', enabled: false},
      {label: 'Причина увольнения', enabled: false},
      {label: 'Семейное положение', enabled: false},
      {label: 'Члены семьи', enabled: false},
      {label: 'Категории персонала', click: loadPage('/job-categories')},
      // <b-dropdown-item href="#" to="/job-categories">Категории персонала</b-dropdown-item>
      {type: 'separator'},
      {label: 'Режим работы', enabled: false},
      {label: 'Реквизиты предприятия', enabled: false}
    ]
  },
  {
    label: 'Сервис'
  },
  {
    label: 'Формат'
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
        click () { shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

// module.exports.template = template
// module.exports.mainMenu = Menu.buildFromTemplate(template)

var mainMenu = Menu.buildFromTemplate(template)

export {
  template,
  mainMenu
}
