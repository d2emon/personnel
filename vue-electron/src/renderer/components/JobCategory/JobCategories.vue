<template>
  <div class="overtab">
    <div class="toolbar">
      <b-button size="sm" variant="outline-primary" title="Добавить" @click="addCategory()"><i class="fa fa-sm fa-plus"></i></b-button>
    </div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import EditJobCategory from './EditJobCategory'

var Db = require('../../db.js')

export default {
  name: 'job-categories',
  components: [
    EditJobCategory
  ],
  data: function () {
    return {
      fields: [
        {
          key: 'controls',
          label: '&nbsp;'
        },
        {
          key: 'job_title',
          label: 'Категория персонала',
          sortable: true
        }
      ],
      items: []
    }
  },
  methods: {
    loadItems: function () {
      let c = this
      Db.JobCategoryModel.find({}, function (err, categories) {
        if (!err) {
          console.log('Departments reloaded')
          c.categories = categories
          for (var i = 0; i < categories.length; i++) {
            let row = {
              controls: '<b-nav vertical pills>\n' +
                '<b-nav-item @click="viewDepartment(null)" :active="!selectedDepartmentId">Все</b-nav-item>\n' +
                '<b-nav-item v-for="department in departments" @click="viewDepartment(department)" :active="selectedDepartmentId == department.id">{{ department.title }}</b-nav-item>\n' +
                '</b-nav>',
              job_title: 'Title'
            }
            console.log(row)
            // c.items += row
          }
          console.log(c.items)
        } else {
          alert(err)
        }
      })
    },
    addCategory: function () {
      alert('added')
      this.loadItems()
    }
  },
  created: function () {
    this.loadItems()
  }
}
</script>

<style>
</style>
