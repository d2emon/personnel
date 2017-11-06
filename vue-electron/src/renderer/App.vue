<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron',
    data: function () {
      return {
        message: 'Hello world!'
      }
    }
  }
</script>

<style>
  /* CSS */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.right {
  border-right: 1px solid #ccc;
}

body {
  padding-top: 30px;
  /* Required padding for .navbar-fixed-top. Remove if using .navbar-static-top. Change if height of navigation changes. */
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



  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
