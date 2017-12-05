<template>
  <b-container>
    <main>
      <b-form @submit="addModel" v-if="model">
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
                      <b-form-input id="tab_no" type="number"></b-form-input>
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
                    <b-form-group horizontal label="Дата выхода на работу:" label-for="workFrom">
                      <b-form-input id="workFrom" plaintext type="date" v-model="model.work_from"></b-form-input>
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
            <b-tab title="Паспорт">
              <b-card no-body>
                <b-tabs small card ref="tabs" v-model="tabIndexPass">
                  <b-tab title="Личность">
                    <div class="main-tab pass-tab">
                      <b-card v-if="model.person">
                        {{ model.person }}
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
                          <b-card title="Место" v-if="model.person.address">
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
                          <b-form-input id="given_at" type="date" v-model="model.document.given_at"></b-form-input>
                        </b-form-group>                                                      
                      </b-card>
                      <b-card title="Регистрация" v-if="model.person.document.registration">
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

          if (!model.person) {
            model.person = new Db.PersonModel()
          }

          doc.model = model
          /*
          if (!model.address) {
            model.address = new Db.AddressModel()
          }
          if (!model.document) {
            model.document = new Db.DocumentModel()
          }
          */

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
