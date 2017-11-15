<template>
  <b-container class="overtab">
    <b-modal ref="editJobCategory" :title="selectedJobCategoryTitle">
      <h1>H1</h1>
      <edit-job-category v-model="selectedJobCategory"></edit-job-category>
    </b-modal>

    <b-modal id="modal1" @hide="resetModal" ok-only>
      <h4 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.index }}</h4>
      <pre>{{ modalDetails.data }}</pre>
    </b-modal>

    <div v-if="items.length > 0">
      <div class="toolbar">
        <b-button size="sm" variant="primary" title="Добавить" @click="addCategory"><i class="fa fa-sm fa-plus"></i></b-button>
      </div>
      <b-table striped hover id="items-table" :busy.sync="isBusy" :items="items" :fields="fields">
        <template slot="show_details" scope="row" sm="3">
          <b-button-group>
            <b-btn size="sm" variant="primary" title="Изменить" @click.stop="details(row.item, row.index, $event.target)"><i class="fa fa-sm fa-edit"></i></b-btn>
            <b-btn size="sm" variant="primary" title="Удалить" @click.stop="delCategory(row.item.id)"><i class="fa fa-sm fa-trash"></i></b-btn>
          </b-button-group>
        </template>
        <template slot="category" scope="row">{{ row.item.title }}</template>
      </b-table>
    </div>
    <div v-else>
      <b-jumbotron header="Данные отсутствуют" lead="Вы еще не добавили ни одной категории персонала" >
        <b-btn size="lg" variant="primary" title="Добавить" to="/job-category/new">Добавить</b-btn>
      </b-jumbotron>
    </div>
  </b-container>
</template>

<script>
import EditJobCategory from './EditJobCategory'

var Db = require('../../db.js')

var items = []

export default {
  name: 'job-categories',
  components: {
    EditJobCategory
  },
  data: function () {
    return {
      selectedJobCategory: null,
      selectedJobCategoryTitle: 'Категория персонала',
      isBusy: false,
      fields: [
        {
          key: 'show_details',
          label: '&nbsp;'
        },
        {
          key: 'category',
          label: 'Категория персонала',
          sortable: true
        }
      ],
      items: items,
      modalDetails: { index: '', data: '' }
    }
  },
  methods: {
    loadItems: function () {
      let c = this
      Db.JobCategoryModel.find({}, function (err, categories) {
        if (!err) {
          console.log('Categories reloaded')
          console.log(categories.length)
          c.items = categories
          for (var i = 0; i < categories.length; i++) {
            let row = {
              category: categories[i]
            }
            console.log(row)
            // c.items.push(row)
          }
          console.log('Items')
          console.log(c.items)
        } else {
          alert(err)
        }
      })
    },
    addCategory: function () {
      console.log('add category')
      console.log(this.$refs.editJobCategory)
      this.$refs.editJobCategory.show()
      console.log('show category')
      // this.loadItems()
    },
    delCategory: function (categoryId) {
      if (!categoryId) { return false }

      let doc = this
      Db.JobCategoryModel.findByIdAndRemove(categoryId, function (err) {
        if (!err) {
          alert('Запись удалена')
          doc.loadItems()
        } else {
          alert(err)
        }
      })
    },
    details: function (item, index, button) {
      item._showDetails = !item._showDetails
      this.modalDetails.data = JSON.stringify(item, null, 2)
      this.modalDetails.index = index
      this.$root.$emit('bv::show::modal', 'modal1', button)
    },
    resetModal: function () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
    }
  },
  created: function () {
    this.loadItems()
  }
}
</script>

<style>
</style>
