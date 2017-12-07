<template>
  <div>
    <div class="toolbar">
      <b-button size="sm" variant="outline-primary" :to="'/position/edit/' + selectedDepartmentId + '/0/0'"><i class="fa fa-sm fa-plus"></i></b-button>
    </div>
    <div class="overtab">
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
            {{ row.item.id }}
          </template>
          <template slot="is_fulltime" scope="row">{{ partnerships[row.item.position.partnership_id] }}</template>
          <template slot="tab_no" scope="row">{{ row.item.position.tab_no }}</template>
          <template slot="work_from_text" scope="row">{{ workFromText(row.item.position) }}</template>
          <template slot="job" scope="row">{{row.item.position.job}}::<span v-if="row.item.position.job">{{row.item.position.job.title}}</span><span v-else>&nbsp;</span></template>
          <template slot="department" scope="row"><span v-if="row.item.position.department">{{row.item.position.department.title}}</span><span v-else>&nbsp;</span></template>
        </b-table>
      </div>
      <div v-else>
        <b-jumbotron header="Данные отсутствуют" lead="Вы еще не добавили ни одного работника" >
          <b-btn size="lg" variant="primary" title="Добавить" :to="'/position/edit/' + selectedDepartmentId + '/0/0'" v-if="selectedDepartmentId">Добавить</b-btn>
          <b-button size="lg" variant="primary" title="Обновить"  @click="fetchData">Обновить</b-button>
        </b-jumbotron>        
      </div>
    </div>
  </div>
</template>

<script>
var Db = require('../../db.js')
var moment = require('moment')

// var items = []

export default {
  name: 'department-cards',
  props: [
    'department'
  ],
  computed: {
    selectedDepartmentId: function () {
      if (this.department) {
        console.log('depatment=')
        console.log(this.department.id)
        return this.department.id
      } else {
        return 0
      }
    }
  },
  data: function () {
    // let selectedDepartmentId = this.$route.params.id

    return {
      selectedDepartment: null, // this.model,
      isBusy: false,

      partnerships: [
        'Постоянный',
        'Совместитель',
        'Договорник'
      ],
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
          key: 'work_from_text',
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
      positions: []
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      console.log('Search by:')
      console.log(this.departmentId)
      Db.PersonModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        console.log('Persons loaded')
        console.log(models)
        doc.positions = models
      })
    },
    workFromText: function (item) {
      return moment(item.work_from).format('DD.MM.YYYY')
      //
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
