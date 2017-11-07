import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// require('./assets/bootstrap/js/bootstrap.js')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

let originalVueComponent = Vue.component
Vue.component = function (name, definition) {
  if (Array.isArray(definition.components) && definition.components.length === 1) {
    definition.components = {[name]: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}

Vue.use(BootstrapVue)
Vue.component = originalVueComponent

// var fs = require('fs')
// var sql = require('sql.js')
// var bfr = fs.readFileSync('/tmp/db.sqlite')
// var db = new sql.Database(bfr)
// var db = new sql.Database()
/* db.each('SELECT * FROM test', function (row) {
  console.log(row)
}) */

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
