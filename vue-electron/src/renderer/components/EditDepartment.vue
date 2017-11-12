<template>
  <div>
    <main>
      <b-card no-body>
        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Отдел">
            <div>
              <b-form @submit="addDepartment">
                <b-form-group label="Название:" label-for="departmentTitle">
                  <b-form-input id="departmentTitle" type="text" v-model="department.title" required placeholder="Название отдела"></b-form-input>
                </b-form-group>
                <b-form-group label="Комментарии:" label-for="departmentComment">
                  <b-form-textarea id="departmentComment" :rows="3" v-model="department.comment"></b-form-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary">Сохранить</b-button>
                <b-button type="reset" variant="secondary" @click="closeDepartmentEditor">Отмена</b-button>
              </b-form>
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
  props: [
    'value'
  ],
  data () {
    let department = null
    // this.departmentId = this.$route.params.id
    if (this.value) {
      department = this.value
    } else {
      department = new Db.DepartmentModel()
    }

    let category = {
      title: 'итр'
    }
    let job = {
      job_code: '02000000',
      title: 'Начальник отдела кадров',
      category: category
    }
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

    return {
      tabIndex: 0,
      db: Db,
      departments: [],
      department: department,
      staff_fields: [
        {
          key: 'job_code',
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
      staff: staffTable
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    addDepartment (e) {
      e.preventDefault()
      this.department.save()
      // this.$router.push('/departments')
    },
    closeDepartmentEditor (e) {
      e.preventDefault()
      console.log('Cancel')
      console.log(this.value)
      console.log(this.departmentId)
      alert(this.value)
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
    }
  },
  watch: {
    value: function (newValue) {
      if (newValue) {
        this.department = newValue
      } else {
        this.department = new Db.DepartmentModel()
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
