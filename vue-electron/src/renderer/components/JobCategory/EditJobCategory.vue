<template>
  <b-container>
    <main>
      <b-card no-body>
        <b-form @submit="addCategory">
          <b-form-group label="Название:" label-for="categoryTitle">
            <b-form-input id="categoryTitle" type="text" v-model="category.title" required placeholder="Категория персонала"></b-form-input>
          </b-form-group>
          <b-form-group label="Комментарии:" label-for="categoryComment">
            <b-form-textarea id="categoryComment" :rows="3" v-model="category.comment"></b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Сохранить</b-button>
          <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>
        </b-form>
      </b-card>
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
    let category = null
    if (this.value) {
      category = this.value
    } else {
      category = new Db.JobCategoryModel()
    }

    return {
      category: category
    }
  },
  methods: {
    addCategory: function (e) {
      e.preventDefault()
      this.category.save()
      this.$router.push('/job-categories')
    },
    closeEditor: function (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  },
  watch: {
    value: function (newValue) {
      console.log('watch')
      console.log(newValue)
      if (newValue) {
        this.category = newValue
      } else {
        this.category = new Db.JobCategoryModel()
      }
    }
  }
}
</script>

<style>
</style>
