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
            <b-dropdown-item href="#">Подразделения</b-dropdown-item>
            <b-dropdown-item href="#">Личные карточки</b-dropdown-item>
            <b-dropdown-item href="#">Фильтры</b-dropdown-item>
            <!-- Using button-content slot -->
            <template slot="button-content">
              Справочники
            </template>
          </b-nav-item-dropdown>
          <b-nav-item href="#" disabled title="Disabled"><i class="fa fa-trash"></i></b-nav-item>

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="search" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron'
  }
</script>

<style>
  @import './assets/font-awesome/css/font-awesome.min.css';
  @import './assets/bootstrap/css/bootstrap.css';

  /* CSS */
  body {
    padding-top: 60px;
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