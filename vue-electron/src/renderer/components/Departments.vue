<template>
  <div>
    <b-modal id="infoMessage" :title="infoMessage.title" header-bg-variant="info" ok-only>
      <p>{{ infoMessage.message }}</p>
    </b-modal>

    <b-modal id="editModal" ref="editJobCategory" :title="modalDetails.title" @hide="resetModal" ok-only>
      <!-- h1 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.title }}</h1 -->
      <edit-department v-model="modalDetails.data"></edit-department>
    </b-modal>

    <b-modal id="delQuery" title="Вы уверены?" @ok="delModel(modalDetails)" header-bg-variant="danger" ok-title="Да" cancel-title="Нет">
      <!-- h1 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.title }}</h1 -->
      <p>Вы действительно хотите удалить запись "{{ modalDetails.title }}"?</p>
    </b-modal>

    <main>
      <b-container>
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
            <department-details :model="selectedDepartment"  @reset="fetchData"></department-details>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import EditDepartment from './EditDepartment'
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
    selectedDepartmentId: function () {
      if (this.selectedDepartment) {
        return this.selectedDepartment.id
      } else {
        return 0
      }
    }
  },
  data: function () {
    return {
      items: [],
      selectedDepartment: null,

      tabIndex: 0,
      isBusy: true,
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
      Db.DepartmentModel.find({}, function (err, models) {
        doc.isBusy = false

        if (err) {
          alert(err)
          doc.items = []
          return
        }

        doc.items = models
      })
    },
    selectModel: function (model) {
      this.selectedDepartment = model

      if (!model) {
        this.modalDetails.id = 0
        this.modalDetails.title = ''
        this.modalDetails.data = ''
        return
      }
      this.modalDetails.id = model.id
      this.modalDetails.title = model.title
      this.modalDetails.data = JSON.stringify(model, null, 2)

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
      if (!model) { return false }

      this.selectModel(model)
      this.$root.$emit('bv::show::modal', 'delQuery')
    },
    delModel: function (model) {
      let doc = this
      this.isBusy = true
      Db.DepartmentModel.findByIdAndRemove(model.id, function (err) {
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
.main-part {
  padding: 5px;
  overflow: hidden;
}
.overtab {
  overflow: auto;
  font-size: 12px;
}
</style>
