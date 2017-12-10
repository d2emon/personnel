<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" fixed="top" variant="light">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand to="/" title="Кадры"><i class="fa fa-home"></i></b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="mr-auto">
          <b-nav-item to="/departments" title="Отделы"><i class="fa fa-sitemap"></i></b-nav-item>
          <b-nav-item to="/positions" title="Личные карточки"><i class="fa fa-id-card-o"></i></b-nav-item>
          <b-nav-item to="/documents" disabled title="Бланки"><i class="fa fa-file-text-o"></i></b-nav-item>
          <b-nav-item to="/calculator" disabled title="Калькулятор"><i class="fa fa-calculator"></i></b-nav-item>
          <b-nav-item to="/calendar" disabled title="Календарь"><i class="fa fa-calendar"></i></b-nav-item>
          <b-nav-item to="/work-date" disabled title="Рабочая дата"><i class="fa fa-calendar-check-o"></i></b-nav-item>
          <b-nav-item to="/settings" disabled title="Настройки"><i class="fa fa-cog"></i></b-nav-item>
          <b-nav-item @click="reconnect" title="Переподключить БД"><i class="fa fa-refresh"></i></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

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

var database = require('@/store/db')
var connection = database.connection

export default {
  name: 'personnel',
  components: {
    JobCategories
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
    },
    reconnect () {
      console.log('Reconneting')

      var doc = this

      if (!connection) {
        connection = database.connect()
        return
      }

      connection.once('disconnected', function () {
        database.connect()
      })
      connection.once('open', function callback () {
        doc.showDbInfo('БД подключена!')
      })
      database.disconnect()
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

.right {
  border-right: 1px solid #ccc;
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

#custom-search-input {
  margin:0;
  margin-top: 10px;
  padding: 0;
}

#custom-search-input .search-query {
  padding-right: 3px;
  padding-right: 4px \9;
  padding-left: 3px;
  padding-left: 4px \9;
  /* IE7-8 doesn't have border-radius, so don't indent the padding */

  margin-bottom: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

#custom-search-input button {
  border: 0;
  background: none;
  /** belows styles are working good */
  padding: 2px 5px;
  margin-top: 2px;
  position: relative;
  left: -28px;
  /* IE7-8 doesn't have border-radius, so don't indent the padding */
  margin-bottom: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  color:#D9230F;
}

.search-query:focus + button {
  z-index: 3;
}
.container {
  min-width: 900px;
}
</style>
