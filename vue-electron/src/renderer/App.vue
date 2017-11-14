<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" fixed="top" variant="light">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand to="/" title="Кадры"><i class="fa fa-home"></i></b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar class="mr-auto">
          <b-nav-item to="/departments" title="Отделы"><i class="fa fa-sitemap"></i></b-nav-item>
          <b-nav-item to="/departments" title="Личные карточки"><i class="fa fa-id-card-o"></i></b-nav-item>
          <b-nav-item to="/departments" title="Бланки"><i class="fa fa-file-text-o"></i></b-nav-item>
          <b-nav-item to="/departments" title="Калькулятор"><i class="fa fa-calculator"></i></b-nav-item>
          <b-nav-item to="/departments" title="Календарь"><i class="fa fa-calendar"></i></b-nav-item>
          <b-nav-item to="/departments" title="Рабочая дата"><i class="fa fa-calendar-check-o"></i></b-nav-item>
          <b-nav-item to="/departments" title="Настройки"><i class="fa fa-cog"></i></b-nav-item>
          <b-nav-item @click="reconnect" title="Переподключить БД"><i class="fa fa-refresh"></i></b-nav-item>
          <b-nav-item-dropdown text="Dropdown" title="User">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <i class="fa fa-user"></i>
            </template>
            <b-dropdown-item href="#"><i class="fa fa-tty"></i></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Dropdown" title="User">
            <b-dropdown-item to="/departments"><i class="fa fa-sitemap"></i> Отделы</b-dropdown-item>
            <b-dropdown-item href="#"><i class="fa fa-id-card-o"></i> Личные карточки</b-dropdown-item>
            <b-dropdown-item href="#">Фильтры</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">Должности</b-dropdown-item>
            <b-dropdown-item href="#">Гражданства</b-dropdown-item>
            <b-dropdown-item href="#">Ветераны</b-dropdown-item>
            <b-dropdown-item href="#">Диагнозы</b-dropdown-item>
            <b-dropdown-item href="#">Проценты б/листа</b-dropdown-item>
            <b-dropdown-item href="#">Специальности</b-dropdown-item>
            <b-dropdown-item href="#">Отпуска</b-dropdown-item>
            <b-dropdown-item href="#">Обучение</b-dropdown-item>
            <b-dropdown-item href="#">Инвалидность</b-dropdown-item>
            <b-dropdown-item href="#">Образование</b-dropdown-item>
            <b-dropdown-item href="#">Причина увольнения</b-dropdown-item>
            <b-dropdown-item href="#">Семейное положение</b-dropdown-item>
            <b-dropdown-item href="#">Члены семьи</b-dropdown-item>
            <b-dropdown-item href="#" @click="listJobCategories()">Категории персонала</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">Режим работы</b-dropdown-item>
            <b-dropdown-item href="#">Реквизиты предприятия</b-dropdown-item>
            <!-- Using button-content slot -->
            <template slot="button-content">
              Справочники
            </template>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <b-modal ref="dbError" title="Ошибка" header-bg-variant="warning">
      <p class="my-4">{{ dbErrorText }}</p>
    </b-modal>

    <b-modal ref="dbInfo" title="База Данных" header-bg-variant="info">
      <p class="my-4">{{ dbInfoText }}</p>
    </b-modal>

    <b-modal ref="listJobCategories" title="selectedDepartmentTitle">
      <job-categories></job-categories>
    </b-modal>

    <router-view></router-view>
  </div>
</template>

<script>
import JobCategories from './components/JobCategory/JobCategories'

var Db = require('./db.js')
var connection = Db.connection

export default {
  name: 'vue-electron',
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
    reconnect () {
      var doc = this
      connection.once('disconnected', function () {
        Db.connect()
      })
      connection.once('open', function callback () {
        doc.dbInfoText = 'БД подключена!'
        doc.$refs.dbInfo.show()
      })
      Db.disconnect()
    },
    listJobCategories: function () {
      this.$refs.listJobCategories.show()
    }
  },
  created: function () {
    var doc = this
    connection.on('error', function (err) {
      doc.dbErrorText = err.message
      doc.$refs.dbError.show()
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
</style>
