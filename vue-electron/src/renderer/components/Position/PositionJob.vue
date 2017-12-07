<template>
  <b-card no-body>
    <b-tabs small card ref="tabs" v-model="tabIndex">
      <b-tab card title="Назначения" class="pass-tab">
        <div v-if="model.positions">
          <div class="toolbar">
            <b-button size="sm" variant="outline-primary" to="/position/edit/0"><i class="fa fa-sm fa-plus"></i></b-button>
          </div>
          <b-card class="overtab" no-body>
            <b-table striped hover :items="model.positions" :fields="positionFields">
              <template slot="actions" scope="row">
                  <b-button-group v-if="row.item">
                    <b-btn size="sm" variant="primary" title="Изменить" :to="'/person/edit/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-btn>
                    <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelByIndex(row.index, row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
                  </b-button-group>
                  <b-button-group v-else>
                    <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelModel(row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
                  </b-button-group>
              </template>                
              <template slot="work_from" scope="row">{{row.item.work_from_text}}</template>
              <template slot="department" scope="row"><span v-if="row.item.department">{{row.item.department.title}}</span><span v-else>&nbsp;</span></template>
              <template slot="job" scope="row">{{row.item}}::{{row.item.job}}::<span v-if="row.item.job">{{row.item.job.title}}</span><span v-else>&nbsp;</span></template>
              <template slot="order_from" scope="row">{{row.item.order_from_text}}</template>
            </b-table>
          </b-card>
        </div>
        <div v-else>
          <b-jumbotron header="Назначения отсутствуют">
            <b-btn size="lg" variant="primary" title="Добавить" :to="'/position/add/' + selectedDepartmentId" v-if="selectedDepartmentId">Добавить</b-btn>
          </b-jumbotron>        
        </div>
      </b-tab>
      <b-tab title="Контракты" class="pass-tab">
        <div v-if="model.contracts">
          <b-table striped hover :items="model.contracts" :fields="fields">
          </b-table>
        </div>
        <div v-else>
          <h5>Контракты отсутствуют</h5>
        </div>
      </b-tab>
      <b-tab title="ПМР/Стаж" class="pass-tab">
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
      <b-tab title="Отпуска" class="pass-tab">
        <div v-if="model.vacations">
          <b-table striped hover :items="model.vacations" :fields="fields">
          </b-table>
        </div>
        <div v-else>
          <h5>Отпуска не введены</h5>
        </div>
      </b-tab>
      <b-tab title="Пл/дней" class="pass-tab">
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
      <b-tab title="Зарплата" class="pass-tab">
        <b-form-group horizontal label="Оклад:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25" v-model="model.wages"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Оклад с надбавкой:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Надбавка:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Процент надбаки:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Почасовая ставка:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Почасовая ставка с надбавкой:" label-for="wages">
          <b-form-input id="wages" type="number" step="0.25"></b-form-input>
        </b-form-group>
      </b-tab>
      <b-tab title="Проф. стаж" class="pass-tab">
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
      <b-tab title="Уволен" :disabled="true" class="pass-tab">
        <div>department-vacancies</div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'position-job',
  props: [
    'model'
  ],
  data: function () {
    return {
      isBusy: true,
      tabIndex: 0,
      person: null,

      positionFields: [
        {
          key: 'actions',
          label: '&nbsp;'
        },
        {
          key: 'work_from',
          label: 'Дата',
          sortable: true
        },
        {
          key: 'department',
          label: 'Отдел',
          sortable: true
        },
        {
          key: 'job',
          label: 'Должность',
          sortable: true
        },
        {
          key: 'vacancies',
          label: 'Вакансии',
          sortable: true
        },
        {
          key: 'salary',
          label: 'Оклад',
          sortable: true
        },
        {
          key: 'order_no',
          label: '№ приказа',
          sortable: true
        },
        {
          key: 'order_from',
          label: 'Дата приказа',
          sortable: true
        }
      ],

      departments: [],
      jobs: [],
      department: null,
      jobId: null,
      departmentId: null
    }
  },
  methods: {
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
  watch: {
    model: function (val) {
      console.log({
        title: 'Person',
        val: val,
        person: this.person
      })
      this.person = val
    }
  }
}
</script>

<style>
.pass-tab {
  height: calc(100vh - 250px);
}
.form-toolbar {
  padding: 10px 0px;  
}
</style>
