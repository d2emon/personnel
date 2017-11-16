<template>
  <b-container>
    <main>
      <b-form @submit="addModel">
        <h2>{{ department.title }}</h2>
        <b-form-group label="Должность:" label-for="job">
          <b-form-select id="job" type="text" v-model="jobId" placeholder="Должность">
            <option v-for="job in jobs" :value="job.id">{{job.title}}</option>
          </b-form-select>
        </b-form-group>
        <div v-if="model.job">
          Категория: {{ job.category.title }}
        </div>
        <b-form-group label="Разряд:" label-for="vacancyRank">
          <b-form-input id="vacancyRank" type="text" v-model="model.rank"></b-form-input>
        </b-form-group>
        <b-form-group label="Тарифная ставка:" label-for="vacancyWages">
          <b-form-input id="vacancyWages" type="text" v-model="model.wages"></b-form-input>
        </b-form-group>
        <b-form-group label="Комментарии:" label-for="departmentComment">
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
        Db.VacancyModel.findById(this.$route.params.id, function (err, model) {
          if (err) {
            alert(err)
            return
          }

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
        doc.$router.push('/jobs')
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
