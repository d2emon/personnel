<template>
  <b-card no-body class="full-h main-part">
    <b-modal id="departmentDelQuery" title="Вы уверены?"" ok-title="Да" cancel-title="Нет" header-bg-variant="danger" v-if="selectedDepartment" @ok="delModel(selectedDepartment)">
      <p>Вы действительно хотите удалить отдел "{{ selectedDepartment.title }}"?</p>
    </b-modal>

    <b-row>
      <b-col md="9">
        <h2 v-if="selectedDepartment">{{ selectedDepartment.title }}</h2>
        <h2 v-else>Все</h2>
      </b-col>
      <b-col md="3" class="text-sm-right" v-if="selectedDepartment">
        <b-button size="sm" variant="outline-primary" title="Изменить" :to="'/department/edit/' + selectedDepartment.id"><i class="fa fa-sm fa-edit"></i></b-button>
        <b-button size="sm" variant="outline-primary" title="Удалить" @click="queryDelModel(selectedDepartment)"><i class="fa fa-sm fa-trash"></i></b-button>
      </b-col>
    </b-row>
    <b-card no-body>
        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Личные карточки">
            <department-cards></department-cards>
          </b-tab>
          <b-tab title="Штат">
            <department-staff></department-staff>
          </b-tab>
          <b-tab title="Контракт" class="overtab" :disabled="true">
            <department-contracts></department-contracts>
          </b-tab>
        </b-tabs>
    </b-card>
  </b-card>
</template>

<script>
import DepartmentCards from './DepartmentCards'
import DepartmentStaff from './DepartmentStaff'
import DepartmentContracts from './DepartmentContracts'

var Db = require('../../db.js')

export default {
  name: 'department-details',
  components: {
    DepartmentCards,
    DepartmentStaff,
    DepartmentContracts
  },
  props: [
    'model'
  ],
  computed: {
    selectedDepartmentId: function () {
      if (this.model) {
        return this.model.id
      } else {
        return 0
      }
    }
  },
  data: function () {
    return {
      selectedDepartment: this.model,
      tabIndex: 0,
      isBusy: false
    }
  },
  methods: {
    queryDelModel: function (model) {
      if (!model) { return false }

      // this.$root.$emit('bv::show::modal', 'delQuery')
    },
    delModel: function (model) {
      // let doc = this
      this.isBusy = true
      // Db.JobCategoryModel.findById(model.id, function (err) {
      Db.JobCategoryModel.findByIdAndRemove(model.id, function (err) {
        if (err) {
          alert(err)
          return
        }

        this.$emit('reset')
      })
    }
    /*
    resetModal: function () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
    }
    */
  },
  watch: {
    'model': function (val) {
      this.selectedDepartment = val
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
