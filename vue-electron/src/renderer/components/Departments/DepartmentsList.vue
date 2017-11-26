<template>
  <b-card no-body class="full-h departments">
    <div class="toolbar">
      <b-button size="sm" variant="primary" title="Добавить" to="/department/edit/0"><i class="fa fa-sm fa-plus"></i></b-button>
      <b-button size="sm" variant="primary" title="Обновить" @click="fetchData"><i class="fa fa-sm fa-refresh"></i></b-button>
    </div>
    <div v-if="isBusy">
      <b-nav vertical pills>
        <b-nav-item @click="selectModel(null)" :active="!selectedDepartmentId">Все</b-nav-item>
      </b-nav>
      <h3>Загрузка...</h3>
    </div>
    <div v-else>
      <b-nav vertical pills>
        <b-nav-item @click="selectModel(null)" :active="!selectedDepartmentId">Все</b-nav-item>
        <b-nav-item v-for="department in items" @click="selectModel(department)" :active="selectedDepartmentId == department.id">{{ department.title }}</b-nav-item>
      </b-nav>
    </div>
  </b-card>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'departments-list',
  computed: {
    selectedDepartmentId: function () {
      if (this.selectedDepartment) {
        return this.selectedDepartment.id
      } else {
        return 0
      }
    }
  },
  data: function () {
    // let selectedDepartmentId = this.$route.params.id

    return {
      departments: [],
      selectedDepartment: null,
      isBusy: true
    }
  },
  methods: {
    fetchData: function () {
      let doc = this
      this.isBusy = true
      Db.DepartmentModel.find({}, function (err, models) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.items = []
          return
        }

        doc.items = models
        console.log(models)
      })
    },
    selectModel: function (model) {
      this.selectedDepartment = model

      this.$emit('select', model)
    }
  },
  created: function () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
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
}
.departments .nav-link {
  padding: 2px;
}
</style>
