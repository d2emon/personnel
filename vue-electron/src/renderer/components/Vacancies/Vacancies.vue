<template>
  <div>
    <b-modal id="delVacancyQuery" title="Вы уверены?"" ok-title="Да" cancel-title="Нет" header-bg-variant="danger" @ok="delModel(selectedVacancy)">
      <p v-if="selectedVacancy">Вы действительно хотите удалить вакансию "{{ selectedVacancy.job.title }}"?</p>
    </b-modal>

    <div>
      <div v-if="vacancies.length > 0">
        <div class="toolbar" v-if="department">
          <b-button size="sm" variant="primary" :to="'/vacancy/' + department.id + '/0'"><i class="fa fa-sm fa-plus"></i></b-button>
        </div>
        <div class="overtab">
          <b-table striped hover :items="vacancies" :fields="staff_fields">
            <template slot="actions" scope="row">
              <b-button-group>
                <b-btn size="sm" variant="primary" title="Изменить" :to="'/vacancy/0/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-btn>
                <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelModel(row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
              </b-button-group>
            </template>
            <template slot="job_id" scope="row">id {{ row.item.job.job_code }}</template>
            <template slot="job_title" scope="row">{{ row.item.job.title }}</template>
            <template slot="category_title" scope="row">{{ row.item.job.category.title }}</template>
          </b-table>
        </div>
      </div>
      <div v-else>
        <b-jumbotron header="Данные отсутствуют" lead="Вы еще не добавили ни одной вакансии" >
          <b-button v-if="department" size="lg" variant="primary" title="Добавить" :to="'/vacancy/' + department.id + '/0'">Добавить</b-button>
          <b-button size="lg" variant="primary" title="Обновить" @click="fetchData">Обновить</b-button>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'vacancies',
  props: [
    'department'
  ],
  data () {
    console.log('Forming vacancies')

    return {
      tabIndex: 0,
      selectedVacancy: null,
      isBusy: true,
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
      vacancies: []
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      this.isBusy = true
      /*
       var query = {}
       if (this.department) {
         query.department = department
       }
       */
      Db.VacancyModel.find({}).exec(function (err, models) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.staff = []
          return
        }

        console.log('Vacancies loaded')
        console.log(models)
        doc.vacancies = models
      })
    },
    queryDelModel: function (model) {
      // if (!department) { return false }
      if (!model) { return false }

      // this.selectedDepartment = department
      this.selectedVacancy = model
      console.log('Del model')
      console.log(model)
      console.log(this.selectedVacancy)
      this.$root.$emit('bv::show::modal', 'delVacancyQuery')
    },
    delModel: function (model) {
      var doc = this
      this.isBusy = true
      console.log('Deleting')
      console.log(model.id)
      // Db.VacancyModel.findById(model.id, function (err, m) {
      // Db.VacancyModel.findByIdAndRemove(model.id, function (err) {
      model.remove()
      model.save(function (err) {
        if (err) {
          alert(err)
          return
        }

        console.log('Fund')
        // console.log(m)
        // doc.$router.go(-1)
        doc.$emit('refresh')
      })
    },

    addDepartment (e) {
      e.preventDefault()
      this.model.save()
      // this.$router.push('/departments')
    },
    loadDepartment: function (id) {
      let c = this
      Db.DepartmentModel.findById(id, function (err, department) {
        if (!err) {
          c.value = department
          console.log(department)
          console.log(department.title)
        } else {
          alert(err)
        }
      })
    },
    addModel: function (e) {
      e.preventDefault()
      this.model.save()
      this.$router.push('/departments')
    },
    closeEditor: function (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  },
  watch: {
    department: function (newValue) {
      if (newValue) {
        if (newValue.vacancies) {
          this.vacancies = newValue.vacancies
        }
      } else {
        this.vacancies = []
        this.fetchData()
      }
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
.departments {
  font-size: 14px;
  padding: 5px;
  height: 500px;
}
.departments .nav-link {
  padding: 2px;
}
.overtab {
  overflow: auto;
  font-size: 12px;
}
</style>
