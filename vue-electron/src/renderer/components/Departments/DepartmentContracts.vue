<template>
  <div>
            <b-navbar type="dark" variant="primary" toggleable>
              <b-nav-toggle target="nav_dropdown_collapse"></b-nav-toggle>
              <b-collapse is-nav id="nav_dropdown_collapse">
                <b-nav is-nav-bar>
                  <b-nav-item href="#">Home</b-nav-item>
                  <b-nav-item href="#">Link</b-nav-item>
                  <!-- Navbar dropdowns -->
                  <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                  </b-nav-item-dropdown>
                  <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item href="#">Account</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-nav>
              </b-collapse>
            </b-navbar>
            <div class="overtab">
              <b-table striped hover :items="contracts" :fields="contract_fields"></b-table>
            </div>

  </div>
</template>

<script>
// var Db = require('../../db.js')

var items = []

export default {
  name: 'department-cards',
  computed: {
    selectedDepartmentId: function () {
      if (this.selectedDepartment) {
        return this.selectedDepartment.id
      } else {
        return 0
      }
    }
  },
  data: function () {
    // let selectedDepartmentId = this.$route.params.id

    return {
      selectedDepartment: null, // this.model,

      tabIndex: 0,
      isBusy: false,
      fields2: [
        {
          key: 'show_details',
          label: '&nbsp;'
        },
        {
          key: 'category',
          label: 'Категория персонала',
          sortable: true
        }
      ],
      items2: items,
      modalDetails: { id: '', title: '', data: '' },

      fields: [
        {
          key: 'isFulltime',
          label: 'Совместительство',
          sortable: true
        },
        {
          key: 'tabN',
          label: 'Таб. №',
          sortable: true
        },
        {
          key: 'last_name',
          label: 'Фамилия',
          sortable: true
        },
        {
          key: 'first_name',
          label: 'Имя',
          sortable: true
        },
        {
          key: 'middle_name',
          label: 'Отчество',
          sortable: true
        },
        {
          key: 'date_start',
          label: 'Дата приема',
          sortable: true
        },
        {
          key: 'job',
          label: 'Должность',
          sortable: true
        },
        {
          key: 'department',
          label: 'Подразделение',
          sortable: true
        },
        {
          key: 'date_end',
          label: 'Дата увольнения',
          sortable: true
        }
      ],
      items: [
        {
          isFulltime: 'Постоянный',
          tabN: 1543,
          first_name: 'Любовь',
          middle_name: 'Валентиновна',
          last_name: 'Анохина',
          date_start: '01-02-1995',
          job: 'Инженер по учету площади',
          department: 'Отдел кадров',
          age: 40,
          isActive: true
        },
        { isFulltime: 'Постоянный', isActive: true, age: 40, first_name: 'Dickerson', last_name: 'McDonald' },
        { isFulltime: 'Совместитель', isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isFulltime: 'Постоянный', isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson', _rowVariant: 'danger' },
        { isFulltime: 'Совместитель', isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      staff_fields: [
        {
          key: 'actions',
          label: '&nbsp;'
        },
        {
          key: 'job_id',
          label: 'Код',
          sortable: true
        },
        {
          key: 'job_title',
          label: 'Должность',
          sortable: true
        },
        {
          key: 'vacancy_total',
          label: 'Всего вакансий',
          sortable: true
        },
        {
          key: 'vacancy_filled',
          label: 'Занятых вакансий',
          sortable: true
        },
        {
          key: 'category_title',
          label: 'Категория',
          sortable: true
        },
        {
          key: 'rank',
          label: 'Разряд',
          sortable: true
        },
        {
          key: 'wages',
          label: 'Тарифная ставка',
          sortable: true
        },
        {
          key: 'salary_min',
          label: 'Мин. оклад',
          sortable: true
        },
        {
          key: 'salary_max',
          label: 'Макс. оклад',
          sortable: true
        }
      ],
      contract_fields: [
        {
          key: 'contract_id',
          label: '№ контракта',
          sortable: true
        },
        {
          key: 'contract',
          label: 'Наименование',
          sortable: true
        },
        {
          key: 'date_start',
          label: 'Дата начала',
          sortable: true
        },
        {
          key: 'date_end',
          label: 'Дата окончания',
          sortable: true
        }
      ],
      contracts: [
      ]
    }
  }
}
</script>

<style>
.toolbar {
  padding: 2px 0px;
}
.departments {
  font-size: 14px;
  padding: 5px;
}
.departments .nav-link {
  padding: 2px;
}
.main-part {
  padding: 5px;
  overflow: hidden;
}
.overtab {
  overflow: auto;
  font-size: 12px;
}
</style>
