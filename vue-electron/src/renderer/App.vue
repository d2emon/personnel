<template>
  <div id="app">
    <nav-bar></nav-bar>

    <b-modal ref="dbError" id="dbError" title="Ошибка" header-bg-variant="warning">
      <p class="my-4">{{ dbErrorText }}</p>
    </b-modal>

    <b-modal ref="dbInfo" id="dbInfo" title="База Данных" header-bg-variant="info">
      <p class="my-4">{{ dbInfoText }}</p>
    </b-modal>

    <div>
      <router-view></router-view>    
    </div>
  </div>
</template>

<script>
import JobCategories from './components/JobCategory/JobCategories'
import NavBar from './components/NavBar'

var database = require('@/store/db')
var connection = database.connection

export default {
  name: 'personnel',
  components: {
    JobCategories,
    NavBar
  },
  data () {
    return {
      dbInfoText: '',
      dbErrorText: 'Неизвестная ошибка'
    }
  },
  methods: {
    showDbInfo (message) {
      this.dbInfoText = message
      this.$refs.dbInfo.show()
    },
    showDbError (message) {
      this.dbErrorText = message
      this.$refs.dbError.show()
    }
  },
  created: function () {
    var doc = this
    connection.on('error', function (err) {
      doc.showDbError(err.message)
      console.log(err.message)
    })
  }
}
</script>

<style>
  @import './assets/font-awesome/css/font-awesome.min.css';
  @import './assets/bootstrap/css/bootstrap.css';

  /* CSS */
  body {
    margin-top: 60px;
    /* Required padding for .navbar-fixed-top. Remove if using .navbar-static-top. Change if height of navigation changes. */
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    font-size: 16px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }

.full-h {
  overflow: auto;
  height: calc(100vh - 70px);
}

.bs-example{
  margin: 0px;
}

#side-nav{
  background-color: lightblue;
}

.und {
  border-bottom: 1px solid #ccc;
  background-color: white;
}

.container {
  min-width: 900px;
}
</style>
