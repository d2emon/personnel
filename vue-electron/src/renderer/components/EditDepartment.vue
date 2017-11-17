<template>
  <b-container>
    <main>
      <b-card no-body>
        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Отдел">
            <div>
              <b-form @submit="addModel">
                <b-form-group label="Название:" label-for="departmentTitle">
                  <b-form-input id="departmentTitle" type="text" v-model="model.title" required placeholder="Название отдела"></b-form-input>
                </b-form-group>
                <b-form-group label="Комментарии:" label-for="departmentComment">
                  <b-form-textarea id="departmentComment" :rows="3" v-model="model.comment"></b-form-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary">Сохранить</b-button>
                <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>
              </b-form>
            </div>
          </b-tab>
          <b-tab title="Вакансии">
            <div class="toolbar">
              <b-button size="sm" variant="outline-primary" :to="'/vacancy/' + model.id + '/0'"><i class="fa fa-sm fa-plus"></i></b-button>
            </div>
            <div class="overtab">
              <b-table striped hover :items="staff" :fields="staff_fields">
                <template slot="actions" scope="row">
                  <b-button size="sm" variant="outline-primary" :to="'/vacancy/' + model.id + '/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-button>
                </template>
                <template slot="job_id" scope="row">{{ row.item.job.job_code }}</template>
                <template slot="job_title" scope="row">{{ row.item.job.title }}</template>
                <template slot="category_title" scope="row">{{ row.item.job.category.title }}</template>
              </b-table>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </main>
  </b-container>
</template>

<script>
var Db = require('../db.js')

export default {
  name: 'department',
  props: [
    'value'
  ],
  data () {
    console.log('Forming data')

    let department = null
    // this.departmentId = this.$route.params.id

    let job = new Db.JobModel({
      job_code: '02000000',
      title: 'Начальник отдела кадров',
      category: new Db.JobCategoryModel({ title: 'итр' })
    })
    let staff = {
      job: job,
      rank: '',
      wages: 0.0,
      vacancy_total: 3.0,
      vacancy_filled: 2.25,
      salary_min: 0.0,
      salary_max: 0.0,

      category_title: job.category.title,
      job_code: job.job_code,
      job_title: job.title
    }
    let staffTable = [
      staff,
      staff,
      staff
    ]
    console.log(staffTable)

    // this.departmentId = this.$route.params.id

    if (this.value) {
      department = this.value
    } else {
      department = new Db.DepartmentModel()
    }

    if (this.$route.params.id !== '0') {
      var doc = this
      Db.DepartmentModel.findById(this.$route.params.id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.model = model
      })
    }

    Db.VacancyModel.find({}, function (err, models) {
      if (err) {
        alert(err)
        return
      }

      doc.staff = models
      console.log(models)
    })

    return {
      tabIndex: 0,
      db: Db,
      departments: [],
      model: department,
      staff_fields: [
        {
          key: 'actions',
          label: '&nbsp;'
        },
        {
          key: 'job_id',
          label: 'Код',
          sortable: true
        },
        {
          key: 'job_title',
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
          key: 'category_title',
          label: 'Категория',
          sortable: true
        },
        {
          key: 'rank',
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
      staff: []
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    addDepartment (e) {
      e.preventDefault()
      this.model.save()
      // this.$router.push('/departments')
    },
    loadDepartment: function (id) {
      let c = this
      Db.DepartmentModel.findById(id, function (err, department) {
        if (!err) {
          c.value = department
          console.log(department)
          console.log(department.title)
        } else {
          alert(err)
        }
      })
    },
    addModel: function (e) {
      e.preventDefault()
      this.model.save()
      this.$router.push('/departments')
    },
    closeEditor: function (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  },
  watch: {
    value: function (newValue) {
      console.log('watch')
      console.log(newValue)
      if (newValue) {
        this.model = newValue
      } else {
        this.model = new Db.DepartmentModel()
      }
    }
  },
  updated: function () {
    // this.loadDepartment(this.departmentId)
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
