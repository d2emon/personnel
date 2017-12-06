<template>
  <main>
    <b-modal id="infoMessage" :title="infoMessage.title" header-bg-variant="info" ok-only>
      <p>{{ infoMessage.message }}</p>
    </b-modal>

    <b-modal id="editModal" ref="editJobCategory" :title="modalDetails.title" @hide="resetModal" ok-only>
      <edit-department v-model="modalDetails.data"></edit-department>
    </b-modal>

    <b-modal id="delQuery" title="Вы уверены?" @ok="delModel(modalDetails)" header-bg-variant="danger" ok-title="Да" cancel-title="Нет">
      <p>Вы действительно хотите удалить запись "{{ modalDetails.title }}"?</p>
    </b-modal>

    <b-container class="main-body">
      <b-row>
        <b-col md="3">
          <departments-list @select="selectModel"></departments-list>
        </b-col>
        <b-col md="9" v-if="isBusy">
          <b-card no-body class="full-h main-part">
            <h5>Загрузка данных...</h5>            
          </b-card>
        </b-col>
        <b-col md="9" v-else>
          <department-details :model="selected"  @reset="fetchData"></department-details>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import EditDepartment from './Departments/EditDepartment'
import DepartmentsList from './Departments/DepartmentsList'
import DepartmentDetails from './Departments/DepartmentDetails'

var Db = require('../db.js')

export default {
  name: 'departments',
  components: {
    DepartmentsList,
    DepartmentDetails,
    EditDepartment
  },
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

      isBusy: true,
      tabIndex: 0,

      modalDetails: { index: '', title: '', data: '' },
      infoMessage: { title: '', message: '' }
    }
  },
  methods: {
    showMessage: function (title, message) {
      this.infoMessage.title = title
      this.infoMessage.message = message
      this.$root.$emit('bv::show::modal', 'infoMessage')
    },
    showError: function (message) {
      alert(message)
      this.items = []
      return true
    },
    setModal: function (model) {
      if (!model) {
        this.modalDetails.index = 0
        this.modalDetails.title = ''
        this.modalDetails.data = ''
        return true
      }
      this.modalDetails.index = model.id
      this.modalDetails.title = model.title
      this.modalDetails.data = JSON.stringify(model, null, 2)
      return false
    },
    resetModal: function () {
      this.setModal(null)
      this.fetchData()
    },
    fetchData: function () {
      var doc = this
      this.isBusy = true
      // var busy = this.isBusy
      // busy = true
      Db.DepartmentModel.find({}, function (err, models) {
        doc.isBusy = false
        if (err) { return doc.showError() }
        doc.items = models
      })
    },
    selectModel: function (model) {
      this.selected = model
      return this.setModal(model)

      // this.viewDepartment(department)
      // this.$refs.editDepartment.show()

      /**
       * if (department) {
       *   this.selectedDepartment = department
       * } else {
       *   this.selectedDepartment = null
       * }
       */
    },
    queryDelModel: function (model) {
      if (!this.selectModel(model)) {
        return false
      }
      this.$root.$emit('bv::show::modal', 'delQuery')
    },
    delModel: function (model) {
      var doc = this
      this.isBusy = true
      Db.DepartmentModel.findByIdAndRemove(model.id, function (err) {
        doc.isBusy = false

        if (err) { return doc.showError() }

        doc.showMessage('База Данных', 'Запись "' + model.title + '" удалена')
        doc.resetModal()
      })
    }
  },
  created: function () {
    this.fetchData()
  }
}
</script>

<style>
.toolbar {
  padding: 2px 0px;
}
.main-part {
  padding: 5px;
  overflow: hidden;
}
.overtab {
  overflow: auto;
  font-size: 12px;
}
.main-body {
  overflow: auto;
  height: calc(100vh - 70px);
  /* width: 100%; */
}
.main-card {
  padding: 5px;  
}
</style>
