<template>
            <b-tab title="Работа">
              <b-card no-body>
              <b-tabs small card ref="tabs" v-model="tabIndexJob">
                <b-tab title="Назначения" class="main-tab pass-tab">
                  <div v-if="model.positions">
                    <b-table striped hover :items="model.positions" :fields="fields">
                    </b-table>
                  </div>
                  <div v-else>
                    <h5>Назначения отсутствуют</h5>
                  </div>
                </b-tab>
                <b-tab title="Контракты" class="main-tab pass-tab">
                  <div v-if="model.contracts">
                    <b-table striped hover :items="model.contracts" :fields="fields">
                    </b-table>
                  </div>
                  <div v-else>
                    <h5>Контракты отсутствуют</h5>
                  </div>
                </b-tab>
                <b-tab title="ПМР/Стаж" class="main-tab pass-tab">
                  <div v-if="model.jobs">
                    <b-table striped hover :items="model.jobs" :fields="fields">
                    </b-table>
                    <b-card>
                      <b-row>
                        <b-col>Общий стаж работы на сегодня</b-col>
                        <b-col><b-row><b-col>25</b-col><b-col>0</b-col><b-col>4</b-col></b-row></b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <b-form-group label="Непрерывный стаж работы с:" label-for="workFrom">
                            <b-form-input id="workFrom" type="date" v-model="model.work_from"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col><b-row><b-col>25</b-col><b-col>0</b-col><b-col>4</b-col></b-row></b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <b-form-group label="Стаж на предприятии с:" label-for="workFrom">
                            <b-form-input id="workFrom" type="date" v-model="model.work_from"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col><b-row><b-col>25</b-col><b-col>10</b-col><b-col>4</b-col></b-row></b-col>
                      </b-row>
                    </b-card>
                  </div>
                  <div v-else>
                    <h5>Стаж не введен</h5>
                  </div>
                </b-tab>
                <b-tab title="Отпуска" class="main-tab pass-tab">
                  <div v-if="model.vacations">
                    <b-table striped hover :items="model.vacations" :fields="fields">
                    </b-table>
                  </div>
                  <div v-else>
                    <h5>Отпуска не введены</h5>
                  </div>
                </b-tab>
                <b-tab title="Пл/дней" class="main-tab pass-tab">
                  <b-row>
                    <b-col>
                      <b-card>
                        <div v-if="model.vacations">
                          <b-table striped hover :items="model.vacations" :fields="fields">
                          </b-table>
                        </div>
                        <div v-else>
                          <h5>Отпуска не введены</h5>
                        </div>
                      </b-card>
                    </b-col>
                    <b-col>
                      <b-card>
                        <div v-if="model.vacations">
                          <b-table striped hover :items="model.vacations" :fields="fields">
                          </b-table>
                        </div>
                        <div v-else>
                          <h5>Отпуска не введены</h5>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Зарплата" class="main-tab pass-tab">
                  <b-form-group label="Оклад:" label-for="wages">
                    <b-form-input id="wages" type="number" step="0.25" v-model="model.wages"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Оклад с надбавкой:" label-for="wages">
                    <b-form-input id="wages" type="number" step="0.25"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Надбавка:" label-for="wages">
                    <b-form-input id="wages" type="number" step="0.25"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Процент надбаки:" label-for="wages">
                    <b-form-input id="wages" type="number" step="0.25"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Почасовая ставка:" label-for="wages">
                    <b-form-input id="wages" type="number" step="0.25"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Почасовая ставка с надбавкой:" label-for="wages">
                    <b-form-input id="wages" type="number" step="0.25"></b-form-input>
                  </b-form-group>
                </b-tab>
                <b-tab title="Проф. стаж" class="main-tab pass-tab">
                  <div v-if="model.jobs">
                    <b-table striped hover :items="model.jobs" :fields="fields">
                    </b-table>
                    <b-card>
                      <h5>Профессиональный стаж</h5>
                      <b-row>
                        <b-col>
                          <b-row>
                            <b-col>Всего</b-col>
                            <b-col><b-row><b-col>25</b-col><b-col>0</b-col><b-col>4</b-col></b-row></b-col>
                          </b-row>
                        </b-col>
                        <b-col>
                          <b-row>
                            <b-col>На предприятии</b-col>
                            <b-col><b-row><b-col>25</b-col><b-col>0</b-col><b-col>4</b-col></b-row></b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-card>
                  </div>
                  <div v-else>
                    <h5>Стаж не введен</h5>
                  </div>
                </b-tab>
                <b-tab title="Уволен" :disabled="true" class="main-tab pass-tab">
                  <div>department-vacancies</div>
                </b-tab>
              </b-tabs>
              </b-card>
            </b-tab>

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
      tabIndex: 0,
      tabIndexJob: 0,
      tabIndexPass: 0,
      model: model,
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

      if (this.$route.params.id !== '0') {
        Db.PositionModel.findById(this.$route.params.id).exec(function (err, model) {
          doc.isBusy = false

          if (err) {
            alert(err)
            return
          }

          if (!model) {
            model = new Db.PositionModel()
          }

          doc.model = model
          console.log('Position')
          console.log(model)
          if (!model.person) {
            model.person = new Db.PersonModel()
          }
          if (!model.person.address) {
            model.person.address = new Db.AddressModel()
          }
          if (!model.person.document) {
            model.person.document = new Db.DocumentModel()
          }
          if (!model.person.document.registration) {
            model.person.document.registration = new Db.RegistrationModel()
          }

          let job = model.job
          if (job) {
            doc.jobId = job.id
          }

          let department = model.department
          if (department) {
            doc.departmentId = department.id
          }
        })
      } else {
        this.model = new Db.PositionModel()
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
    saveModel: function (e) {
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

          // doc.$router.push('/department/edit/' + doc.department.id)
          doc.$router.go(-1)
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
.overtab {
  overflow: auto;
  height: calc(100vh - 70px);
  font-size: 14px;
}
.overtab .col-form-legend {
  font-size: 14px;
}
.main-tabs {
  min-width: 800px;
}
.main-tab {
  overflow: auto;
  height: calc(100vh - 180px);
  /* width: 650px; */
  width: 100%;
  padding: 0px 20px;
  /* height: 100%; */
}
.pass-tab {
  height: calc(100vh - 250px);
}
.photo-block {
  height: 100%;
}
.form-toolbar {
  padding: 10px 0px;  
}
</style>
