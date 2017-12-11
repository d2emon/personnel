'use strict'

// import Menu from 'electron'
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
    label: 'Отчеты',
    submenu: [
      { label: 'Бланк', enabled: false },
      { label: 'Журнал регистрации', enabled: false },
      { label: 'Сохранить', enabled: false },
      { label: 'Добавить', enabled: false },
      { label: 'Закрыть', enabled: false },
      { label: 'Печать', enabled: false },
      {type: 'separator'},
      { label: 'Экспорт', enabled: false },
      {type: 'separator'},
      { label: 'Численность сотрудников по годам', enabled: false },
      { label: 'Штатное расписание', enabled: false },
      { label: 'Штатное расписание (иерарх.)', enabled: false },
      { label: 'Регистрация трудовых книжек', enabled: false },
      { label: 'Книга учета ЛК', enabled: false },
      { label: 'Журнал б/листов', enabled: false }
    ]
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
    label: 'Фильтры',
    submenu: [
      {
        label: 'Уволенные',
        enabled: false
      },
      {type: 'separator'},
      {
        label: 'Все сотрудники',
        enabled: false
      },
      {
        label: 'Постоянные',
        enabled: false
      },
      {
        label: 'Совместители',
        enabled: false
      },
      {
        label: 'Договорники',
        enabled: false
      },
      {type: 'separator'},
      {
        label: 'Последняя выборка',
        enabled: false
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
    label: 'Сервис',
    submenu: [
      {label: 'Редактор бланков', enabled: false},
      {type: 'separator'},
      {label: 'Календарь сообщений', enabled: false},
      {label: 'Калькулятор', enabled: false},
      {label: 'Календарь', enabled: false},
      {type: 'separator'},
      {label: 'Пароль', enabled: false},
      {label: 'Администратор', enabled: false},
      {label: 'Архивация', enabled: false},
      {label: 'Ремонт базы', enabled: false},
      {type: 'separator'},
      {label: 'Рабочая дата', enabled: false},
      {type: 'separator'},
      {label: 'Настройка', enabled: false},
      {label: 'Пересчет оклада', enabled: false},
      {label: 'Конвертор', enabled: false},
      {label: 'Табель', enabled: false},
      {label: 'Слияние', enabled: false},
      {label: 'Уволенные', enabled: false}
    ]
  },
  {
    label: 'Формат',
    submenu: [
      {
        label: 'Свойства',
        enabled: false
      }
    ]
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
        label: 'Electron.js',
        click () { shell.openExternal('https://electron.atom.io') }
        // click () { alert('В случае неполадок стучите в стену') }
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
