<template>
  <b-container>
    <main>
      <b-card no-body>
        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Отдел">
            <div v-if="model">
              <b-form @submit="addModel">
                <b-form-group label="Название:" label-for="departmentTitle">
                  <b-form-input id="departmentTitle" type="text" v-model="model.title" required placeholder="Название отдела"></b-form-input>
                </b-form-group>
                <b-form-group label="Комментарии:" label-for="departmentComment">
                  <b-form-textarea id="departmentComment" :rows="3" v-model="model.comment"></b-form-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary">Сохранить</b-button>
                <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>
              </b-form>
            </div>
          </b-tab>
          <b-tab title="Вакансии" v-if="model">
            <vacancies :department="model"></vacancies>
          </b-tab>
        </b-tabs>
      </b-card>
    </main>
  </b-container>
</template>

<script>
import Vacancies from '../Vacancies/Vacancies'

var Db = require('../../db.js')

export default {
  name: 'department',
  components: {
    Vacancies
  },
  props: [
    'value'
  ],
  data () {
    console.log('Forming data')

    let department = null
    // this.departmentId = this.$route.params.id

    let job = new Db.JobModel({
      job_code: '02000000',
      title: 'Начальник отдела кадров',
      category: new Db.JobCategoryModel({ title: 'итр' })
    })
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
    console.log(staffTable)

    // this.departmentId = this.$route.params.id

    if (this.value) {
      department = this.value
    } else {
      department = new Db.DepartmentModel()
    }

    var doc = this
    if (this.$route.params.id !== '0') {
      Db.DepartmentModel.findById(this.$route.params.id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.model = model
      })
    }

    Db.VacancyModel.find({}, function (err, models) {
      if (err) {
        alert(err)
        return
      }

      doc.staff = models
      // console.log(models)
    })

    return {
      tabIndex: 0,
      db: Db,
      departments: [],
      model: department,
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
      staff: []
    }
  },
  methods: {
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
    value: function (newValue) {
      // console.log('watch')
      // console.log(newValue)
      if (newValue) {
        this.model = newValue
      } else {
        this.model = new Db.DepartmentModel()
      }
    }
  },
  updated: function () {
    // this.loadDepartment(this.departmentId)
  }
}
</script>

<style>
.toolbar {
  padding: 2px 0px;
}
.overtab {
  overflow: auto;
  font-size: 12px;
}
</style>
