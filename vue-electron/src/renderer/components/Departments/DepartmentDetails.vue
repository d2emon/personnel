<template>
  <b-card no-body class="full-h main-part">
    <b-row>
      <b-col md="9">
        <h2 v-if="model">{{ model.title }}</h2>
        <h2 v-else>Все</h2>
      </b-col>
      <b-col md="3" class="text-sm-right" v-if="model">
        <b-button size="sm" variant="outline-primary" title="Изменить" :to="'/department/edit/' + selectedDepartment.id"><i class="fa fa-sm fa-edit"></i></b-button>
        <b-button size="sm" variant="outline-primary" title="Удалить" @click="delModel(selectedDepartment)"><i class="fa fa-sm fa-trash"></i></b-button>
      </b-col>
    </b-row>
    {{ model }}
    <b-card no-body>
        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Личные карточки">
            <department-cards></department-cards>
          </b-tab>
          <b-tab title="Штат">
            <department-staff></department-staff>
          </b-tab>
          <b-tab title="Контракт" class="overtab" :disabled="true">
            <department-contracts></department-contracts>
          </b-tab>
        </b-tabs>
    </b-card>
  </b-card>
</template>

<script>
import DepartmentCards from './DepartmentCards'
import DepartmentStaff from './DepartmentStaff'
import DepartmentContracts from './DepartmentContracts'

// var Db = require('../../db.js')

var items = []

export default {
  name: 'department-details',
  components: {
    DepartmentCards,
    DepartmentStaff,
    DepartmentContracts
  },
  props: [
    // 'model'
  ],
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
  },
  methods: {
    /*
    selectModel: function (model) {
      alert(model)
      this.selectedDepartment = model
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
    }
    */
  }
  /*
  ,
  watch: {
    'model': function (val) {
      alert(val)
    }
  }
  */
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
