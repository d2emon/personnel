<template>
  <b-card no-body class="departments">
    <div class="toolbar">
      <b-button size="sm" variant="primary" title="Добавить" to="/department/edit/0"><i class="fa fa-sm fa-plus"></i></b-button>
      <b-button size="sm" variant="primary" title="Обновить" @click="fetchData"><i class="fa fa-sm fa-refresh"></i></b-button>
    </div>
    <div v-if="isBusy">
      <b-nav vertical pills>
        <b-nav-item @click="selectModel(null)" :active="!selectedId">Все</b-nav-item>
      </b-nav>
      <h5>Загрузка данных...</h5>
    </div>
    <div v-else>
      <b-nav vertical pills>
        <b-nav-item @click="selectModel(null)" :active="!selectedId">Все</b-nav-item>
        <b-nav-item v-for="department in items" @click="selectModel(department)" :active="selectedId == department.id">{{ department.title }}</b-nav-item>
      </b-nav>
    </div>
  </b-card>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'departments-list',
  computed: {
    selectedId: function () {
      if (this.selected) {
        return this.selected.id
      } else {
        return 0
      }
    }
  },
  data: function () {
    return {
      items: [],
      selected: null,
      isBusy: true
    }
  },
  methods: {
    fetchData: function () {
      // let doc = this
      this.isBusy = true
      Db.DepartmentModel.find({}, this.onFind)
      /*
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
      */
    },
    onFind: function (err, models) {
      this.isBusy = false

      if (err) {
        alert(err)
        this.items = []
        return
      }

      this.items = models
      console.log('Models found:')
      console.log(models)
    },
    selectModel: function (model) {
      this.selected = model

      this.$emit('select', model)
    }
  },
  created: function () {
    this.fetchData()
  }
  /*
  watch: {
    '$route': 'fetchData'
  }
  */
}
</script>

<style>
.toolbar {
  padding: 2px 0px;
}
.departments {
  font-size: 14px;
  padding: 5px;
  height: 100%;
}
.departments .nav-link {
  padding: 2px;
}
</style>
