<template>
  <b-container>
    <main>
      <b-form @submit="addModel">
        <b-form-group label="Код:" label-for="jobCode">
          <b-form-input id="jobCode" type="text" v-model="model.job_code" required placeholder="Код должности"></b-form-input>
        </b-form-group>
        <b-form-group label="Должность:" label-for="jobTitle">
          <b-form-input id="jobTitle" type="text" v-model="model.title" required placeholder="Название должности"></b-form-input>
        </b-form-group>
        <b-form-group label="Категория:" label-for="jobCategory">
          <b-row>
            <b-col md="8">
              <b-form-select id="jobCategorySelect" type="text" v-model="categoryId" placeholder="Категория должности">
                <option v-for="category in categories" :value="category.id">{{category.title}}</option>
              </b-form-select>
            </b-col>
            <b-button variant="primary" to="/job-categories/edit/0" class="col-2">Новая</b-button>
            <b-button variant="primary" to="/job-categories" class="col-2">Справочник</b-button>
          </b-row>
        </b-form-group>
        <b-button type="submit" variant="primary">Сохранить</b-button>
        <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>
      </b-form>
    </main>
  </b-container>
</template>

<script>
var Db = require('../../db.js')

export default {
  name: 'job-edit',
  props: [
    'value'
  ],
  data: function () {
    var model = null
    // this.departmentId = this.$route.params.id

    if (this.value) {
      model = this.value
    } else {
      model = new Db.JobModel()
    }

    var doc = this
    if (this.$route.params.id !== '0') {
      Db.JobModel.findById(this.$route.params.id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.model = model

        let category = model.category
        if (category) {
          doc.categoryId = category.id
        }
      })
    }

    Db.JobCategoryModel.find({}, function (err, model) {
      if (err) {
        alert(err)
        return
      }

      doc.categories = model
      console.log(doc.categories)
    })

    return {
      model: model,
      categories: [],
      categoryId: null
    }
  },
  methods: {
    addModel: function (e) {
      e.preventDefault()

      let doc = this
      Db.JobCategoryModel.findById(this.categoryId, function (err, category) {
        if (err) {
          alert(err)
          return
        }

        doc.model.category = category
        doc.model.save()
        doc.$router.push('/jobs')
      })
    },
    closeEditor: function (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
