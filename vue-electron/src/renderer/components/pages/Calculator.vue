<template>
  <main>
    <b-container class="main-body">
      <b-jumbotron header="Калькулятор">
        <div>
          Калькулятор
        </div>
      </b-jumbotron>        
    </b-container>
  </main>
</template>

<script>
export default {
  name: 'calculator'
}
</script>

<style>
.main-body {
  overflow: auto;
  height: calc(100vh - 70px);
  /* width: 100%; */
}
</style>
