<template>

            <b-tab title="Паспорт">
              <b-card no-body>
                <b-tabs small card ref="tabs" v-model="tabIndexPass">
                  <b-tab title="Личность">
                    <div class="main-tab pass-tab">
                      <b-card v-if="model.person">
                        <b-row>
                          <b-col>
                            <b-form-group horizontal label="Фамилия:" label-for="last_name">
                              <b-form-input id="last_name" v-model="model.person.last_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Имя:" label-for="first_name">
                              <b-form-input id="first_name" v-model="model.person.first_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Отчество:" label-for="second_name">
                              <b-form-input id="second_name" v-model="model.person.second_name"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col>
                            <b-form-group horizontal label="Фамилия:" label-for="last_name">
                              <b-form-input id="last_name" v-model="model.person.last_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Имя:" label-for="first_name">
                              <b-form-input id="first_name" v-model="model.person.first_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Отчество:" label-for="second_name">
                              <b-form-input id="second_name" v-model="model.person.second_name"></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-card>
                      <br>
                      <b-row>
                        <b-col>
                          <b-card title="Место">
                            <b-form-group horizontal label="Город:" label-for="city">
                              <b-form-input id="city" v-model="model.person.address.city"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Район:" label-for="district">
                              <b-form-input id="district" v-model="model.person.address.district"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Область:" label-for="region">
                              <b-form-input id="region" v-model="model.person.address.region"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Страна:" label-for="country">
                              <b-form-input id="country" v-model="model.person.address.country"></b-form-input>
                            </b-form-group>
                            <hr>                         
                            <b-form-group horizontal label="Проживает:" label-for="fact">
                              <b-form-input id="fact" v-model="model.person.address.fact"></b-form-input>
                            </b-form-group>
                          </b-card>
                        </b-col>
                        <b-col>
                          <b-card>
                            <b-form-group horizontal label="Пол:" label-for="sex">
                              <b-form-select id="sex" v-model="model.person.sex_id">
                                <option value="0">М</option>
                                <option value="1">Ж</option>
                              </b-form-select>
                            </b-form-group>                              
                            <hr>                         
                            <b-form-group horizontal label="Дата рождения:" label-for="birthday">
                              <b-form-input id="birthday" type="date" v-model="model.person.birthday"></b-form-input>
                            </b-form-group>                              
                            <div v-if="model.person.birthday">
                              <b-table striped hover :items="model.person" :fields="fields">
                              </b-table>
                            </div>                              
                          </b-card>
                        </b-col>
                      </b-row>                          
                    </div>
                  </b-tab>

                  <b-tab title="Документ" :disabled="!model.person.document">
                    <div class="main-tab pass-tab" v-if="model.person.document">
                      <b-card>
                        <b-form-group horizontal label="Серия:" label-for="series">
                          <b-form-input id="series" v-model="model.person.document.series"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Номер:" label-for="document_no">
                          <b-form-input id="document_no" v-model="model.person.document.document_no"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Кем выдан:" label-for="given_by">
                          <b-form-input id="given_by" v-model="model.person.document.given_by"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Дата выдачи:" label-for="given_at">
                          <b-form-input id="given_at" type="date" v-model="model.person.document.given_at"></b-form-input>
                        </b-form-group>                                                      
                      </b-card>
                      <b-card title="Регистрация">
                        <b-form-group horizontal label="Адрес:" label-for="address">
                          <b-form-input id="address" v-model="model.person.document.registration.address"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Дата с:" label-for="date_from">
                          <b-form-input id="date_from" type="date" v-model="model.person.document.registration.date_from"></b-form-input>
                        </b-form-group>                                                      
                        <b-form-group horizontal label="Дата по:" label-for="date_to">
                          <b-form-input id="date_to" type="date" v-model="model.person.document.registration.date_to"></b-form-input>
                        </b-form-group>                                                      
                        <b-form-group horizontal label="Телефон:" label-for="phone">
                          <b-form-input id="phone" v-model="model.person.phone"></b-form-input>
                        </b-form-group>
                     </b-card>
                    </div>
                  </b-tab>
                  <b-tab title="Семейное положение">
                    <div class="main-tab pass-tab">
                      <b-form-group horizontal label="Семейное положение:" label-for="family">
                        <b-form-select id="family" v-model="model.person.sex_id">
                          <option value="0">М</option>
                          <option value="1">Ж</option>
                        </b-form-select>
                      </b-form-group>                              
                      <div v-if="model.vacations">
                        <b-table striped hover :items="model.vacations" :fields="fields">
                        </b-table>
                      </div>
                      <div v-else>
                        <h5>Родственники отсутствуют</h5>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Страховое">
                    <div class="main-tab pass-tab">
                      <b-form-group horizontal label="№ страхового свидетельства:" label-for="phone">
                        <b-form-input id="phone" v-model="model.person.phone"></b-form-input>
                      </b-form-group>
                      <b-form-group horizontal label="ИНН:" label-for="phone">
                        <b-form-input id="phone" v-model="model.person.phone"></b-form-input>
                      </b-form-group>
                    </div>
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
