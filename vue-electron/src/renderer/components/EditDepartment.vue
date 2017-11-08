<template>
  <div>
    <main>
      <b-card no-body>
        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Отдел">
            <div class="overtab">
              <form>
                <b-container>
                  <b-row>
                    <b-col md="4">
                      Наименование
                      {{ department_comments }} 
                    </b-col>
                    <b-col md="8">
                      <input type="text" v-model="department_title">
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                      Комментарий
                      {{ department_title }}
                    </b-col>
                    <b-col md="8">
                      <textarea v-model="department_comments">{{ department_comments }}</textarea>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="4">
                    </b-col>
                    <b-col md="8">
                      <input type="submit" value="Ок" class="btn btn-sm btn-success" @click="addDepartment">                
                    </b-col>
                  </b-row>
                </b-container>
              </form>
            </div>
          </b-tab>
          <b-tab title="Вакансии">
            <div class="toolbar">
              <b-button size="sm" variant="outline-primary"><i class="fa fa-sm fa-plus"></i></b-button>
            </div>
            <div class="overtab">
              <b-table striped hover :items="staff" :fields="staff_fields"></b-table>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </main>
  </div>
</template>

<script>
var Db = require('../db.js')

export default {
  name: 'department',
  data () {
    return {
      tabIndex: 0,
      db: Db,
      departments: [],
      department_title: 'iii',
      department_comments: '',
      staff_fields: [
        {
          key: 'job_code',
          label: 'Код',
          sortable: true
        },
        {
          key: 'job_name',
          label: 'Должность',
          sortable: true
        },
        {
          key: 'vacancy_total',
          label: 'Всего вакансий',
          sortable: true
        },
        {
          key: 'vacancy_filled',
          label: 'Занятых вакансий',
          sortable: true
        },
        {
          key: 'category_code',
          label: 'Код',
          sortable: true
        },
        {
          key: 'category_title',
          label: 'Категория',
          sortable: true
        },
        {
          key: 'level',
          label: 'Разряд',
          sortable: true
        },
        {
          key: 'wages',
          label: 'Тарифная ставка',
          sortable: true
        },
        {
          key: 'salary_min',
          label: 'Мин. оклад',
          sortable: true
        },
        {
          key: 'salary_max',
          label: 'Макс. оклад',
          sortable: true
        }
      ],
      staff: [
        {
          job_code: '02000000',
          job_name: 'Начальник отдела кадров',
          vacancy_total: 3.0,
          vacancy_filled: 2.25,
          category_code: 1,
          category_title: 'итр',
          level: '',
          wages: 0.0,
          salary_min: 0.0,
          salary_max: 0.0
        },
        {
          job_code: '0201000',
          job_name: 'Специалист по работе с кадрами',
          vacancy_total: 2.0,
          vacancy_filled: 1.0,
          category_code: 3,
          category_title: 'МОП',
          level: '',
          wages: 0.0,
          salary_min: 100.0,
          salary_max: 200.0
        },
        {
          job_code: '02020000',
          job_name: 'Инспектор отдела кадров',
          vacancy_total: 15.0,
          vacancy_filled: 9.5,
          category_code: 2,
          category_title: 'служащие',
          level: '',
          wages: 0,
          salary_min: 0,
          salary_max: 0
        }
      ]
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    addDepartment (e) {
      e.preventDefault()

      let d = new Db.DepartmentModel({
        title: this.department_title,
        comments: this.department_comments
      })
      d.save()
    }
  }
}
</script>

<style>
.toolbar {
  padding: 2px 0px;
}
.departments {
  font-size: 14px;
  padding: 5px;
  height: 500px;
}
.departments .nav-link {
  padding: 2px;
}
.overtab {
  overflow: auto;
  font-size: 12px;
}
</style>
