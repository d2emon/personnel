<template>
  <b-container>
    <main>
      <b-form @submit="saveModel" v-if="model">
        <b-button-toolbar class="form-toolbar">
          <b-button-group>
            <b-button type="submit" variant="primary">Сохранить</b-button>
            <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>                        
          </b-button-group>
        </b-button-toolbar>
        <b-card no-body class="overtab">
          <div class="main-tabs">
          <b-tabs small card ref="tabs" v-model="tabIndex">
            <b-tab title="Карточки">
              <div class="main-tab">
              <b-row>
                <b-col md="8">
                  <b-card>
                    <b-form-group horizontal label="Табельный номер:" label-for="tab_no">
                      <b-form-input id="tab_no" type="number" v-model="model.tab_no"></b-form-input>
                    </b-form-group>
                    <div v-if="model.person">
                      <b-form-group horizontal label="Фамилия:" label-for="last_name">
                        <b-form-input id="last_name" plaintext v-model="model.person.last_name"></b-form-input>
                      </b-form-group>
                      <b-form-group horizontal label="Имя:" label-for="first_name">
                        <b-form-input id="first_name" plaintext v-model="model.person.first_name"></b-form-input>
                      </b-form-group>
                      <b-form-group horizontal label="Отчество:" label-for="second_name">
                        <b-form-input id="second_name" plaintext v-model="model.person.second_name"></b-form-input>
                      </b-form-group>                      
                    </div>
                  </b-card>
                  <b-card>
                    <b-form-group horizontal label="Отдел:" label-for="department" v-if="model.department">
                      <b-form-input id="department" plaintext v-model="model.department.title"></b-form-input>
                    </b-form-group>
                    <b-form-group horizontal label="Должность:" label-for="job" v-if="model.job">
                      <b-form-input id="department" plaintext v-model="model.job.title"></b-form-input>
                    </b-form-group>
                    <b-form-group horizontal label="Совместительство:" label-for="department" v-if="model.department">
                      <b-form-input id="department" plaintext v-model="model.department.title"></b-form-input>
                    </b-form-group>
                  </b-card>
                  <b-card>
                    <b-form-group horizontal label="Приказ:" label-for="orderNo">
                      <b-form-input id="orderNo" plaintext type="text" v-model="model.order"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Приказ:" label-for="orderNo">
                      <b-form-input id="orderNo" type="text" v-model="model.orderNo"></b-form-input>
                      <span>от</span>
                      <b-form-input id="orderFrom" type="date" v-model="model.orderFrom"></b-form-input>
                    </b-form-group>                    
                    <b-form-group horizontal label="Дата выхода на работу:" label-for="workFrom">
                      <b-form-input id="workFrom" type="date" v-model="model.work_from"></b-form-input>
                    </b-form-group>
                  </b-card>
                </b-col>
                <b-col md="4">
                  <b-card class="photo-block">
                    <div>ФОТО</div>
                  </b-card>
                </b-col>
              </b-row>
              <b-form-group horizontal label="Комментарий:" label-for="comment">
                <b-form-input id="comment" type="text" v-model="model.comment"></b-form-input>
              </b-form-group>
              </div>
            </b-tab>
            <!-- Job -->
            <!-- Pass -->
            <b-tab title="Образование" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="ВУ" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="Поощрения" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="Разное" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="Трудовые" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab> 
            <!--
            <b-tab title="Дополнительно" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>
            --> 

          </b-tabs>
          </div>
        </b-card>

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
  /* height: calc(100vh - 70px); */
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
