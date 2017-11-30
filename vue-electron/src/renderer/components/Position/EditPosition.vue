<template>
  <b-container>
    <main>
      <p>M:{{ model }}</p>
      <p>B:{{ isBusy }}</p>
      <b-form @submit="addModel" v-if="model">
        <b-form-group label="Отдел:" label-for="department">
          <b-row>
            <b-col md="8">
              <b-form-select id="department" type="text" v-model="departmentId" placeholder="Отдел">
                <option v-for="department in departments" :value="department.id">{{department.title}}</option>
              </b-form-select>
            </b-col>
            <b-button variant="primary" to="/department/edit/0" class="col-2">Новый</b-button>
            <b-button variant="primary" to="/departments" class="col-2">Справочник</b-button>
          </b-row>
          <b-row v-if="model">
            <div v-if="model.department">
              Отдел: {{ model.department.title }}
            </div>
          </b-row>
        </b-form-group>
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
              Должность: {{ model.job.category.title }}
            </div>
          </b-row>
        </b-form-group>

        <!-- // Sovmeshenie -->

        <b-form-group label="Вакансий:" label-for="vacancies">
          <b-form-input id="vacancies" type="number" step="0.25" v-model="model.vacancies"></b-form-input>
        </b-form-group>
        <b-form-group label="Оклад:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25" v-model="model.wages"></b-form-input>
        </b-form-group>

        <!-- // Schedule -->

        <b-form-group label="Приказ:" label-for="orderNo">
          <b-form-input id="orderNo" type="text" v-model="model.orderNo"></b-form-input>
          <span>от</span>
          <b-form-input id="orderFrom" type="date" v-model="model.orderFrom"></b-form-input>
        </b-form-group>
        <b-form-group label="Дата выхода на работу:" label-for="workFrom">
          <b-form-input id="workFrom" type="date" v-model="model.workFrom"></b-form-input>
        </b-form-group>
        <b-form-group label="Основание:" label-for="base">
          <b-form-input id="base" type="text" v-model="model.base"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Сохранить</b-button>
        <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>
      </b-form>
    </main>
  </b-container>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'vacancy',
  data: function () {
    var model = null
    // this.departmentId = this.$route.params.id

    /*
    if (this.value) {
      model = this.value
    } else {
      model = new Db.EmploymentModel()
    }
    */

    this.fetchData()

    return {
      isBusy: true,
      model: model,
      departments: [],
      jobs: [],
      jobId: null,
      department: null
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      this.isBusy = true
      if (this.$route.params.id !== '0') {
        Db.EmploymentModel.findById(this.$route.params.id).exec(function (err, model) {
          alert(model)
          if (err) {
            alert(err)
            return
          }

          console.log('Vacancy')
          console.log(doc.$route.params.id)
          if (!model) {
            model = new Db.PositionModel()
          }
          console.log(model)
          doc.model = model
          doc.isBusy = false

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
