<template>
  <b-container>
    <main>
      <b-form @submit="addModel" v-if="model">
        <b-card no-body>
          <b-tabs small card>
            <b-tab title="Назначение">
              <b-form-group horizontal v-if="departments.length > 0" label="Отдел:" label-for="department">
                <b-input-group size="sm">
                  <b-form-select id="department" v-model="departmentId" placeholder="Отдел">
                    <option v-for="department in departments" :value="department.id">{{department.title}}</option>
                  </b-form-select>
                  <b-input-group-button>
                    <b-button to="/department/edit/0">Новый</b-button>
                    <b-button to="/departments">Справочник</b-button>                
                  </b-input-group-button>  
                </b-input-group>
              </b-form-group>
              <b-form-group horizontal v-if="jobs.length > 0" label="Должность:" label-for="job">
                <b-input-group size="sm">
                  <b-form-select id="job" type="text" v-model="jobId" placeholder="Должность">
                    <option v-for="job in jobs" :value="job.id">{{job.title}}</option>
                  </b-form-select>
                  <b-input-group-button>
                    <b-button to="/job/edit/0">Новая</b-button>
                    <b-button to="/jobs">Справочник</b-button>
                  </b-input-group-button>  
                </b-input-group>
                <b-row v-if="model">
                  <div v-if="model.job">
                    Должность: {{ model.job.title }}
                  </div>
                  <div v-if="model.job">
                    Должность: {{ model.job.category.title }}
                  </div>
                </b-row>
              </b-form-group>

              <b-form-group horizontal label="Совмещение:" label-for="connection">
                <b-form-select id="connection" size="sm" value="0">
                  <option value="0">Постоянный</option>
                  <option value="1">Совмещение</option>
                  <option value="2">Договорник</option>
                </b-form-select>
              </b-form-group>

              <b-form-group horizontal label="Вакансий:" label-for="vacancies">
                <b-form-input id="vacancies" size="sm" type="number" step="0.25" v-model="model.position.vacancies"></b-form-input>
              </b-form-group>
              <b-form-group horizontal label="Оклад:" label-for="salary">
                <b-form-input id="salary" size="sm" type="number" step="0.25" v-model="model.position.salary"></b-form-input>
              </b-form-group>

              <b-form-group horizontal label="Режим работы:" label-for="schedule">
                <b-form-select id="schedule" size="sm" value="0" placeholder="">
                  <option value="0">5-ти дневка</option>
                  <option value="1">Полный рабочий день</option>
                  <option value="2">Неполный рабочий день</option>
                </b-form-select>
              </b-form-group>

              <b-form-group horizontal label="Приказ:" label-for="orderNo">
                <b-input-group>
                  <span class="col-md-1">№</span>
                  <b-form-input id="orderNo" size="sm" type="text" v-model="model.position.order_no" md="5"></b-form-input>
                  <span class="col-md-1">от</span>
                  <b-form-input id="orderFrom" size="sm" type="date" v-model="model.position.order_from" md="5"></b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group horizontal label="Дата выхода на работу:" label-for="workFrom">
                <b-form-input id="workFrom" size="sm" type="date" v-model="model.position.work_from"></b-form-input>
              </b-form-group>
              <b-form-group horizontal label="Основание:" label-for="base">
                <b-form-input id="base" size="sm" type="text" v-model="model.position.base"></b-form-input>
              </b-form-group>
            </b-tab>
            <b-tab title="Комментарий">
              уу
            </b-tab>          
          </b-tabs>
        </b-card>
        <br>
        <b-button type="submit" variant="primary">Сохранить</b-button>
        <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>            

      </b-form>
    </main>
  </b-container>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'add-position',
  data: function () {
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
      model: new Db.PersonModel(),
      departments: [],
      jobs: [],
      department: null,
      jobId: null,
      departmentId: null
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      this.isBusy = true

      if (!this.model) {
        this.model = new Db.PersonModel()
      }
      if (!this.model.position) {
        this.model.position = new Db.PositionModel()
      }
      if (!this.model.address) {
        this.model.address = new Db.AddressModel()
      }
      if (!this.model.document) {
        this.model.document = new Db.DocumentModel()
      }

      if (this.$route.params.departmentId !== '0') {
        Db.DepartmentModel.findById(this.$route.params.departmentId).exec(function (err, model) {
          if (err) {
            alert(err)
            return
          }

          if (!model) {
            model = new Db.DepartmentModel()
          }

          doc.isBusy = false

          doc.model.position.department = model
          doc.departmentId = model.id

          /*
          let job = model.job
          if (job) {
            doc.jobId = job.id
          }

          let department = model.department
          if (department) {
            doc.departmentId = department.id
          }
          */
        })
      } else {
        this.model.position.department = new Db.DepartmentModel()
      }
      if (this.$route.params.personId !== '0') {
        Db.PersonModel.findById(this.$route.params.personId).exec(function (err, model) {
          if (err) {
            alert(err)
            return
          }

          doc.model = model
        })
      }
      if (this.$route.params.id !== '0') {
        Db.PositionModel.findById(this.$route.params.id).exec(function (err, model) {
          if (err) {
            alert(err)
            return
          }

          doc.model.position = model
        })
      }

      this.departments = []
      Db.DepartmentModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.departments = models
      })

      this.jobs = []
      Db.JobModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.jobs = models
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

        Db.DepartmentModel.findById(doc.departmentId, function (err, department) {
          if (err) {
            alert(err)
            return
          }

          doc.model.department = department
          doc.model.save()

          doc.$router.push('/person/edit/' + doc.model.id)
          // doc.$router.go(-1)
        })
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