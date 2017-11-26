<template>
  <div>
    <b-modal id="infoMessage" :title="infoMessage.title" header-bg-variant="info" ok-only>
      <p>{{ infoMessage.message }}</p>
    </b-modal>

    <b-modal id="editModal" ref="editJobCategory" :title="modalDetails.title" @hide="resetModal" ok-only>
      <!-- h1 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.title }}</h1 -->
      <edit-department v-model="modalDetails.data"></edit-department>
    </b-modal>

    <b-modal id="delQuery" title="Вы уверены?" @ok="delModel(modalDetails)" header-bg-variant="danger" ok-title="Да" cancel-title="Нет">
      <!-- h1 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.title }}</h1 -->
      <p>Вы действительно хотите удалить запись "{{ modalDetails.title }}"?</p>
    </b-modal>

    <main>
      <b-container>
        <b-row>
          <b-col md="3">
            <departments-list @select="selectModel"></departments-list>
          </b-col>
          <b-col md="9">
            <h2>1 Details</h2>
            <department-details :model="selectedDepartment"></department-details>
            <h2>2 Details</h2>
            <b-card no-body class="full-h main-part">
              <b-row>
                <b-col md="9">
                  <h2 v-if="modalDetails.id">{{ modalDetails.title }}</h2>
                  <h2 v-else>Все</h2>
                </b-col>
                <b-col md="3" class="text-sm-right" v-if="modalDetails.id">
                  <b-button size="sm" variant="outline-primary" title="Изменить"  :to="'/department/edit/' + selectedDepartment.id"><i class="fa fa-sm fa-edit"></i></b-button>
                  <b-button size="sm" variant="outline-primary" title="Удалить" @click="delModel(selectedDepartment)"><i class="fa fa-sm fa-trash"></i></b-button>
                </b-col>
              </b-row>
              <b-card no-body>
                  <b-tabs small card ref="tabs" v-model="tabIndex">
                    <b-tab title="Личные карточки">
                      <div class="toolbar">
                        <b-button size="sm" variant="outline-primary"><i class="fa fa-sm fa-plus"></i></b-button>
                      </div>
                      <div class="overtab">
                        <b-table striped hover :items="items2" :fields="fields2"></b-table>
                        <b-table striped hover id="personal-cards-table" :busy.sync="isBusy" :items="items" :fields="fields">
                          <template slot="show_details" scope="row" sm="3">
                            <b-button-group>
                              <b-btn size="sm" variant="primary" title="Изменить" :to="'/job-category/edit/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-btn>
                              <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelModel(row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
                            </b-button-group>
                          </template>
                          <template slot="category" scope="row">{{ row.item.title }}</template>
                        </b-table>
                      </div>
                    </b-tab>
                    <b-tab title="Штат">
                      <div class="toolbar">
                        <b-button size="sm" variant="primary"><i class="fa fa-sm fa-plus"></i></b-button>
                      </div>
                      <div class="overtab" v-if="selectedDepartment">
                        <b-table striped hover :items="selectedDepartment.vacancies" :fields="staff_fields">
                          <template slot="actions" scope="row">
                            <b-button-group>
                              <b-btn size="sm" variant="primary" title="Изменить" :to="'/vacancy/' + selectedDepartment.id + '/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-btn>
                              <b-btn size="sm" variant="primary" title="Удалить" href="#"><i class="fa fa-sm fa-trash"></i></b-btn>
                            </b-button-group>
                          </template>
                          <template slot="job_id" scope="row">{{ row.item.job.job_code }}</template>
                          <template slot="job_title" scope="row">{{ row.item.job.title }}</template>
                          <template slot="category_title" scope="row">{{ row.item.job.category.title }}</template>
                        </b-table>
                      </div>
                    </b-tab>
                    <b-tab title="Контракт" class="overtab" :disabled="true">
                      <b-navbar type="dark" variant="primary" toggleable>
                        <b-nav-toggle target="nav_dropdown_collapse"></b-nav-toggle>
                        <b-collapse is-nav id="nav_dropdown_collapse">
                          <b-navbar-nav>
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
                          </b-navbar-nav>
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
import DepartmentsList from './Departments/DepartmentsList'
import DepartmentDetails from './Departments/DepartmentDetails'

var Db = require('../db.js')

var items = []

export default {
  name: 'departments',
  components: {
    DepartmentsList,
    DepartmentDetails,
    EditDepartment
  },
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
      msg: 'Departments list',
      departments: [],
      selectedDepartment: 'Все',

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
      infoMessage: { title: '', message: '' },

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
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    showMessage: function (title, message) {
      this.infoMessage.title = title
      this.infoMessage.message = message
      this.$root.$emit('bv::show::modal', 'infoMessage')
    },
    fetchData: function () {
      let doc = this
      this.isBusy = true
      Db.DepartmentModel.find({}, function (err, models) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.items = []
          return
        }

        doc.items = models
        console.log(models)
      })
    },
    selectModel: function (model) {
      alert(model)
      this.selectedDepartment = model

      if (!model) {
        this.modalDetails.id = 0
        this.modalDetails.title = ''
        this.modalDetails.data = ''
        return
      }
      this.modalDetails.id = model.id
      this.modalDetails.title = model.title
      this.modalDetails.data = JSON.stringify(model, null, 2)

      // this.viewDepartment(department)
      // this.$refs.editDepartment.show()

      /**
       * if (department) {
       *   this.selectedDepartment = department
       * } else {
       *   this.selectedDepartment = null
       * }
       */
    },
    queryDelModel: function (model) {
      if (!model) { return false }

      this.selectModel(model)
      this.$root.$emit('bv::show::modal', 'delQuery')
    },
    delModel: function (model) {
      let doc = this
      this.isBusy = true
      Db.DepartmentModel.findByIdAndRemove(model.id, function (err) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.items = []
          return
        }

        doc.showMessage('База Данных', 'Запись "' + model.title + '" удалена')
        doc.resetModal()
      })
    },
    resetModal: function () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
      this.fetchData()
    }
  },
  created: function () {
    this.fetchData()
    // this.loadDepartments()
  },
  watch: {
    '$route': 'fetchData'
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
