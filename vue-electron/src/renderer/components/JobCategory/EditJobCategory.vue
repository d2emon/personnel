<template>
  <b-container>
    <main>
      <b-form @submit="addCategory" v-if="category">
        <b-form-group label="Название:" label-for="categoryTitle">
          <b-form-input id="categoryTitle" type="text" v-model="category.title" required placeholder="Категория персонала"></b-form-input>
        </b-form-group>
        <b-form-group label="Комментарии:" label-for="categoryComment">
          <b-form-textarea id="categoryComment" :rows="3" v-model="category.comment"></b-form-textarea>
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
  name: 'job-category-edit',
  props: [
    'value'
  ],
  data: function () {
    var category = null
    // this.departmentId = this.$route.params.id

    if (this.value) {
      category = this.value
    } else {
      category = new Db.JobCategoryModel()
    }

    if (this.$route.params.id !== '0') {
      var doc = this
      Db.JobCategoryModel.findById(this.$route.params.id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.category = model
      })
    }

    return {
      category: category
    }
  },
  methods: {
    addCategory: function (e) {
      e.preventDefault()
      this.category.save()
      this.$router.push(-1)
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
