<template>
  <b-container class="overtab">
    <b-modal id="infoMessage" :title="infoMessage.title" header-bg-variant="info" ok-only>
      <p>{{ infoMessage.message }}</p>
    </b-modal>

    <b-modal id="editModal" ref="editJobCategory" :title="modalDetails.title" @hide="resetModal" ok-only>
      <!-- h1 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.title }}</h1 -->
      <edit-job-category v-model="modalDetails.data"></edit-job-category>
    </b-modal>

    <b-modal id="delQuery" title="Вы уверены?" @ok="delModel(modalDetails)" header-bg-variant="danger" ok-title="Да" cancel-title="Нет">
      <!-- h1 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.title }}</h1 -->
      <p>Вы действительно хотите удалить запись "{{ modalDetails.title }}"?</p>
    </b-modal>

    <div v-if="items.length > 0">
      <div class="toolbar">
        <b-button size="sm" variant="primary" title="Добавить"  to="/job-category/edit/0"><i class="fa fa-sm fa-plus"></i></b-button>
        <b-button size="sm" variant="primary" title="Обновить"  @click="fetchData"><i class="fa fa-sm fa-refresh"></i></b-button>
      </div>
      <b-table striped hover id="items-table" :busy.sync="isBusy" :items="items" :fields="fields">
        <template slot="show_details" scope="row" sm="3">
          <b-button-group>
            <b-btn size="sm" variant="primary" title="Изменить" :to="'/job-category/edit/' + row.item.id"><i class="fa fa-sm fa-edit"></i></b-btn>
            <b-btn size="sm" variant="primary" title="Удалить" @click.stop="queryDelModel(row.item)"><i class="fa fa-sm fa-trash"></i></b-btn>
          </b-button-group>
        </template>
        <template slot="category" scope="row">{{ row.item.title }}</template>
      </b-table>
    </div>
    <div v-else>
      <b-jumbotron header="Данные отсутствуют" lead="Вы еще не добавили ни одной категории персонала" >
        <b-btn size="lg" variant="primary" title="Добавить" to="/job-category/edit/0">Добавить</b-btn>
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
      modalDetails: { id: '', title: '', data: '' },
      infoMessage: { title: '', message: '' }
    }
  },
  methods: {
    showMessage: function (title, message) {
      this.infoMessage.title = title
      this.infoMessage.message = message
      this.$root.$emit('bv::show::modal', 'infoMessage')
    },
    fetchData: function () {
      let doc = this
      this.isBusy = true
      Db.JobCategoryModel.find({}, function (err, categories) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.items = []
          return
        }

        doc.items = categories
      })
    },
    selectModel: function (model) {
      this.modalDetails.id = model.id
      this.modalDetails.title = model.title
      this.modalDetails.data = JSON.stringify(model, null, 2)
    },
    /**
     * addModel: function () {
     *   this.$root.$emit('bv::show::modal', 'editModal')
     *   // this.fetchData()
     * },
     * editModel: function (item, button) {
     *   this.selectModel(item)
     *   this.$root.$emit('bv::show::modal', 'editModal', button)
     *   // this.fetchData()
     * },
     */
    queryDelModel: function (model) {
      if (!model) { return false }

      this.selectModel(model)
      this.$root.$emit('bv::show::modal', 'delQuery')
    },
    delModel: function (model) {
      let doc = this
      this.isBusy = true
      Db.JobCategoryModel.findByIdAndRemove(model.id, function (err) {
        // Db.JobCategoryModel.findById(model.id, function (err) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.items = []
          return
        }

        doc.showMessage('База Данных', 'Запись "' + model.title + '" удалена')
        doc.resetModal()
      })
    },
    resetModal: function () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
      this.fetchData()
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
</style>
