<template>
  <div>
    <div class="toolbar">
      <b-button size="sm" variant="outline-primary" to="/position/edit/0"><i class="fa fa-sm fa-plus"></i></b-button>
    </div>
    <div class="overtab">
      {{ positions.length }}
      <div v-if="positions.length > 0">
        <b-table striped hover :items="positions" :fields="fields">
          <template slot="actions" scope="row">
            <b-button-group v-if="row.item">
              <b-btn size="sm" variant="primary" title="Изменить" :to="'/person/edit/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-btn>
              <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelByIndex(row.index, row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
            </b-button-group>
            <b-button-group v-else>
              <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelModel(row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
            </b-button-group>
          </template>
          <template slot="is_fulltime" scope="row">Постоянный</template>
          <template slot="tab_no" scope="row"><span v-if="row.item.person">{{ row.item.person.tab_no }}</span><span v-else>&nbsp;</span></template>
          <template slot="last_name" scope="row"><span v-if="row.item.person">{{ row.item.person.last_name }}</span><span v-else>&nbsp;</span></template>
          <template slot="first_name" scope="row"><span v-if="row.item.person">{{ row.item.person.first_name }}</span><span v-else>&nbsp;</span></template>
          <template slot="second_name" scope="row"><span v-if="row.item.person">{{ row.item.person.second_name }}</span><span v-else>&nbsp;</span></template>
          <template slot="job" scope="row"><span v-if="row.item.job">{{row.item.job.title}}</span><span v-else>&nbsp;</span></template>
          <template slot="department" scope="row"><span v-if="row.item.department">{{row.item.department.title}}</span><span v-else>&nbsp;</span></template>
        </b-table>
      </div>
      <div v-else>
        <b-jumbotron header="Данные отсутствуют" lead="Вы еще не добавили ни одного работника" >
          <b-btn size="lg" variant="primary" title="Добавить" to="/position/edit/0">Добавить</b-btn>
          <b-button size="lg" variant="primary" title="Обновить"  @click="fetchData">Обновить</b-button>
        </b-jumbotron>        
      </div>
      {{ positions }}
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
  </div>
</template>

<script>
var Db = require('../../db.js')

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
          key: 'actions',
          label: '&nbsp;'
        },
        {
          key: 'is_fulltime',
          label: 'Совместительство',
          sortable: true
        },
        {
          key: 'tab_no',
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
          key: 'second_name',
          label: 'Отчество',
          sortable: true
        },
        {
          key: 'work_from',
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
      positions: []
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      Db.PositionModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        console.log('Positions loaded')
        console.log(models)
        doc.positions = models
      })
    }
  },
  created: function () {
    this.fetchData()
  }
}
</script>

<style>
.toolbar {
  padding: 2px 0px;
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
