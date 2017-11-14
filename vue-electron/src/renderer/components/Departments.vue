<template>
  <div>
      <b-modal ref="editDepartment" :title="selectedDepartmentTitle">
        <edit-department v-model="selectedDepartment"></edit-department>
      </b-modal>

      <main>
        <b-container>
          <b-row>
            <b-col md="3">
              <b-card no-body class="full-h departments">
                <div class="toolbar">
                  <b-button size="sm" variant="outline-primary" title="Добавить" @click="editDepartment(null)"><i class="fa fa-sm fa-plus"></i></b-button>
                </div>
                <b-nav vertical pills>
                  <b-nav-item @click="viewDepartment(null)" :active="!selectedDepartmentId">Все</b-nav-item>
                  <b-nav-item v-for="department in departments" @click="viewDepartment(department)" :active="selectedDepartmentId == department.id">{{ department.title }}</b-nav-item>
                </b-nav>
              </b-card>
            </b-col>
            <b-col md="9">
              <b-card no-body class="full-h main-part">
                <b-row>
                  <b-col md="9">
                    <h2 v-if="selectedDepartmentId">{{ selectedDepartment.title }}</h2>
                    <h2 v-else>Все</h2>
                  </b-col>
                  <b-col md="3" class="text-sm-right" v-if="selectedDepartmentId">
                    <b-button size="sm" variant="outline-primary" title="Изменить" @click="editDepartment(selectedDepartment)"><i class="fa fa-sm fa-edit"></i></b-button>
                    <b-button size="sm" variant="outline-primary" title="Удалить" @click="delDepartment(selectedDepartment)"><i class="fa fa-sm fa-trash"></i></b-button>
                  </b-col>
                </b-row>
                <b-card no-body>
                  <b-tabs small card ref="tabs" v-model="tabIndex">
                    <b-tab title="Личные карточки">
                      <div class="toolbar">
                        <b-button size="sm" variant="outline-primary"><i class="fa fa-sm fa-plus"></i></b-button>
                      </div>
                      <div class="overtab">
                        <b-table striped hover :items="items" :fields="fields"></b-table>
                      </div>
                    </b-tab>
                    <b-tab title="Штат">
                      <div class="toolbar">
                        <b-button size="sm" variant="outline-primary"><i class="fa fa-sm fa-plus"></i></b-button>
                      </div>
                      <div class="overtab">
                        <b-table striped hover :items="staff" :fields="staff_fields"></b-table>
                      </div>
                    </b-tab>
                    <b-tab title="Контракт" class="overtab" :disabled="true">
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
                    </b-tab>
                  </b-tabs>
                </b-card>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </main>
  </div>
</template>

<script>
  import EditDepartment from './EditDepartment'

  var Db = require('../db.js')

  export default {
    name: 'departments',
    // name: 'HelloWorld',
    components: [
      EditDepartment
    ],
    computed: {
      selectedDepartmentTitle: function () {
        if (this.selectedDepartment) {
          return this.selectedDepartment.title
        } else {
          return 'Новый отдел'
        }
      },
      selectedDepartmentId: function () {
        if (this.selectedDepartment) {
          return this.selectedDepartment.id
        } else {
          return 0
        }
      }
    },
    data () {
      let category = {
        title: 'итр'
      }
      let job = {
        job_code: '02000000',
        title: 'Начальник отдела кадров',
        category: category
      }
      let staff = {
        job: job,
        rank: '',
        wages: 0.0,
        vacancy_total: 3.0,
        vacancy_filled: 2.25,
        salary_min: 0.0,
        salary_max: 0.0,

        category_title: job.category.title,
        job_code: job.job_code,
        job_title: job.title
      }
      let staffTable = [
        staff,
        staff,
        staff
      ]
      // let selectedDepartmentId = this.$route.params.id

      return {
        msg: 'Departments list',
        departments: [],
        selectedDepartment: 'Все',
        tabIndex: 0,
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
            key: 'job_code',
            label: 'Код',
            sortable: true
          },
          {
            key: 'job_name',
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
            key: 'category_code',
            label: 'Код',
            sortable: true
          },
          {
            key: 'category_title',
            label: 'Категория',
            sortable: true
          },
          {
            key: 'level',
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
        staff: staffTable,
        staff1: [
          {
            job_code: '02000000',
            job_name: 'Начальник отдела кадров',
            vacancy_total: 3.0,
            vacancy_filled: 2.25,
            category_code: 1,
            category_title: 'итр',
            level: '',
            wages: 0.0,
            salary_min: 0.0,
            salary_max: 0.0
          },
          {
            job_code: '0201000',
            job_name: 'Специалист по работе с кадрами',
            vacancy_total: 2.0,
            vacancy_filled: 1.0,
            category_code: 3,
            category_title: 'МОП',
            level: '',
            wages: 0.0,
            salary_min: 100.0,
            salary_max: 200.0
          },
          {
            job_code: '02020000',
            job_name: 'Инспектор отдела кадров',
            vacancy_total: 15.0,
            vacancy_filled: 9.5,
            category_code: 2,
            category_title: 'служащие',
            level: '',
            wages: 0,
            salary_min: 0,
            salary_max: 0
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
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      loadDepartments () {
        let c = this
        Db.DepartmentModel.find({}, function (err, departments) {
          if (!err) {
            // c.departments = c.basic_departments + departments
            c.departments = departments
            console.log('Departments reloaded')
          } else {
            alert(err)
          }
        })
      },
      viewDepartment: function (department) {
        if (department) {
          this.selectedDepartment = department
        } else {
          this.selectedDepartment = null
        }
      },
      editDepartment: function (department) {
        this.viewDepartment(department)
        this.$refs.editDepartment.show()
      },
      delDepartment: function (department) {
        if (department) {
          let doc = this
          Db.DepartmentModel.findByIdAndRemove(department.id, function (err) {
            if (!err) {
              alert('Запись удалена')
              doc.loadDepartments()
            } else {
              alert(err)
            }
          })
        }
      }
    },
    created: function () {
      this.loadDepartments()
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
