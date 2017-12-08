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
                <b-row v-if="position">
                  <div v-if="position.job">
                    Должность: {{ position.job.title }}
                  </div>
                  <div v-if="position.job">
                    Должность: {{ position.job.category.title }}
                  </div>
                </b-row>
              </b-form-group>

              <b-form-group horizontal label="Совмещение:" label-for="connection">
                <b-form-select id="connection" size="sm" v-model="position.partnership_id">
                  <option value="0">Постоянный</option>
                  <option value="1">Совмещение</option>
                  <option value="2">Договорник</option>
                </b-form-select>
              </b-form-group>

              <b-form-group horizontal label="Вакансий:" label-for="vacancies">
                <b-form-input id="vacancies" size="sm" type="number" step="0.25" v-model="position.vacancies"></b-form-input>
              </b-form-group>
              <b-form-group horizontal label="Оклад:" label-for="salary">
                <b-form-input id="salary" size="sm" type="number" step="0.25" v-model="position.salary"></b-form-input>
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
                  <b-form-input id="orderNo" size="sm" type="text" v-model="position.order_no" md="5"></b-form-input>
                  <span class="col-md-1">от</span>
                  <b-form-input id="orderFrom" size="sm" type="date" v-model="orderFrom" md="5"></b-form-input>
                </b-input-group>
              </b-form-group>
              {{ position.order_from }} :: {{ position.work_from }}
              <b-form-group horizontal label="Дата выхода на работу:" label-for="workFrom">
                <b-form-input id="workFrom" size="sm" type="date" v-model="workFrom"></b-form-input>
              </b-form-group>
              <b-form-group horizontal label="Основание:" label-for="base">
                <b-form-input id="base" size="sm" type="text" v-model="position.base"></b-form-input>
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
var moment = require('moment')

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
    var person = new Db.PersonModel()
    var position = new Db.PositionModel()
    if (person.positions.length > 0) {
      position = person.positions[person.positions.length - 1]
    } else {
      person.positions.push(position)
    }

    return {
      isBusy: true,
      model: person,
      position: position,
      orderFrom: moment(position.order_from).format('YYYY-MM-DD'),
      workFrom: moment(position.work_from).format('YYYY-MM-DD'),

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
      if (!this.model.address) {
        this.model.address = new Db.AddressModel()
      }
      if (!this.model.document) {
        this.model.document = new Db.DocumentModel()
      }

      console.log('Params')
      console.log(this.$route.params)

      if (doc.$route.params.personId !== '0') {
        Db.PersonModel.findById(this.$route.params.personId).exec(function (err, model) {
          if (err) {
            alert(err)
            return
          }

          console.log('Model')
          console.log(model)

          if (model) {
            doc.model = model
          } else {
            doc.model = new Db.PersonModel()
          }
          if (model.position && model.position.job) {
            doc.jobId = model.position.job.id
          }

          doc.isBusy = false

          if (doc.$route.params.id !== '0') {
            let position = doc.model.positions.id(doc.$route.params.id)

            console.log('Position')
            console.log(position)

            doc.position = position
            doc.orderFrom = moment(position.order_from).format('YYYY-MM-DD')
            doc.workFrom = moment(position.work_from).format('YYYY-MM-DD')
          } else {
            doc.position = new Db.PositionModel()
            doc.orderFrom = moment(doc.position.order_from).format('YYYY-MM-DD')
            doc.workFrom = moment(doc.position.work_from).format('YYYY-MM-DD')
            doc.model.positions.push(doc.position)
          }

          if (doc.$route.params.departmentId !== '0') {
            Db.DepartmentModel.findById(doc.$route.params.departmentId).exec(function (err, model) {
              if (err) {
                alert(err)
                return
              }

              console.log('Department')
              console.log(model)

              if (!model) {
                model = new Db.DepartmentModel()
              }

              doc.position.department = model
              doc.departmentId = model.id
            })
          } else {
            doc.model.position.department = new Db.DepartmentModel()
          }
        })
      } else {
        doc.isBusy = false

        doc.model = new Db.PersonModel()
        doc.model.positions.push(new Db.PositionModel())
        doc.position = doc.model.position
        doc.orderFrom = moment(doc.position.order_from).format('YYYY-MM-DD')
        doc.workFrom = moment(doc.position.work_from).format('YYYY-MM-DD')

        if (doc.$route.params.departmentId !== '0') {
          Db.DepartmentModel.findById(doc.$route.params.departmentId).exec(function (err, model) {
            if (err) {
              alert(err)
              return
            }

            if (!model) {
              model = new Db.DepartmentModel()
            }

            doc.position.department = model
            doc.departmentId = model.id
          })
        } else {
          doc.model.position.department = new Db.DepartmentModel()
        }
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
      this.model.position.order_from = this.orderFrom
      this.model.position.work_from = this.workFrom
      Db.JobModel.findById(this.jobId, function (err, job) {
        if (err) {
          alert(err)
          return
        }

        doc.position.job = job

        Db.DepartmentModel.findById(doc.departmentId, function (err, department) {
          if (err) {
            alert(err)
            return
          }

          doc.position.department = department
          doc.model.save()

          // alert(doc.model)
          // alert(doc.model.positions)
          // alert(doc.position)

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