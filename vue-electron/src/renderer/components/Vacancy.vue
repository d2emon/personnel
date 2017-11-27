<template>
  <b-container>
    <main>
      <p>P:{{ $route.params }}</p>
      <p>D:{{ department }}</p>
      <p>M:{{ model }}</p>
      <b-form @submit="addModel">
        <b-form-group label="Должность:" label-for="job">
          <b-row>
            <b-col md="8">
              <b-form-select id="job" type="text" v-model="jobId" placeholder="Должность">
                <option v-for="job in jobs" :value="job.id">{{job.title}}</option>
              </b-form-select>
            </b-col>
            <b-button variant="primary" to="/job/edit/0" class="col-2">Новая</b-button>
            <b-button variant="primary" to="/jobs" class="col-2">Справочник</b-button>
          </b-row>
          <b-row v-if="model">
            <div v-if="model.job">
              Категория: {{ model.job.category.title }}
            </div>
          </b-row>
        </b-form-group>
        <b-form-group label="Разряд:" label-for="vacancyRank" v-if="model">
          <b-form-input id="vacancyRank" type="number" v-model="model.rank"></b-form-input>
        </b-form-group>
        <b-form-group label="Тарифная ставка:" label-for="vacancyWages" v-if="model">
          <b-form-input id="vacancyWages" type="number" step="0.25" v-model="model.wages"></b-form-input>
        </b-form-group>
        <b-form-group label="Вакансий всего:" label-for="vacancyTotal" v-if="model">
          <b-form-input id="vacancyTotal" type="number" step="0.25" v-model="model.vacancy_total"></b-form-input>
        </b-form-group>
        <b-form-group label="Занятых вакансий:" label-for="vacancyFilled" v-if="model">
          <b-form-input id="vacancyFilled" type="number" step="0.25" v-model="model.vacancy_filled"></b-form-input>
        </b-form-group>
        <b-form-group label="Оклад (мин.):" label-for="salaryMin" v-if="model">
          <b-form-input id="salaryMin" type="number" step="0.25" v-model="model.salary_min"></b-form-input>
        </b-form-group>
        <b-form-group label="Оклад (макс.):" label-for="salaryMax" v-if="model">
          <b-form-input id="salaryMax" type="number" step="0.25" v-model="model.salary_max"></b-form-input>
        </b-form-group>
        <b-form-group label="Комментарии:" label-for="departmentComment" v-if="model">
          <b-form-textarea id="departmentComment" :rows="3" v-model="model.comment"></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Сохранить</b-button>
        <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>
      </b-form>
    </main>
  </b-container>
</template>

<script>
var Db = require('../db.js')

export default {
  name: 'vacancy',
  props: [
    'value'
  ],
  data: function () {
    var model = null
    // this.departmentId = this.$route.params.id

    if (this.value) {
      model = this.value
    } else {
      model = new Db.VacancyModel()
    }

    this.fetchData()

    return {
      model: model,
      jobs: [],
      jobId: null,
      department: null
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      if (this.$route.params.id !== '0') {
        Db.VacancyModel.findById(this.$route.params.id).exec(function (err, model) {
          if (err) {
            alert(err)
            return
          }

          console.log('Vacancy')
          console.log(doc.$route.params.id)
          if (!model) {
            model = new Db.VacancyModel()
          }
          console.log(model)
          doc.model = model

          let job = model.job
          if (job) {
            doc.jobId = job.id
          }
        })
      }

      if (this.$route.params.department !== '0') {
        Db.DepartmentModel.findById(this.$route.params.department, function (err, model) {
          if (err) {
            alert(err)
            return
          }

          doc.department = model
        })
      }

      Db.JobModel.find({}, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.jobs = model
      })
    },
    addModel: function (e) {
      e.preventDefault()

      let doc = this
      Db.JobModel.findById(this.jobId, function (err, job) {
        if (err) {
          alert(err)
          return
        }

        doc.model.job = job
        doc.model.save()

        doc.department.vacancies.push(doc.model)
        doc.department.save()

        // doc.$router.push('/department/edit/' + doc.department.id)
        doc.$router.go(-1)
      })
    },
    closeEditor: function (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  },
  created: function () {
    this.fetchData()
  }
}
</script>

<style>
</style>
