<template>
  <b-container>
    <main>
      <b-card no-body>
        <department-cards></department-cards>
      </b-card>
    </main>
  </b-container>
</template>

<script>
import DepartmentCards from '../Departments/DepartmentCards'

export default {
  name: 'positions-list',
  components: {
    DepartmentCards
  }
}
</script>

<style>
</style>
