import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      // component: require('@/components/LandingPage').default
      redirect: '/departments'
      // component: HelloWorld
    },
    {
      path: '/departments',
      name: 'Departments',
      component: require('@/components/Departments').default
    },
    {
      path: '/department/edit/:id',
      // alias: '/department/new',
      name: 'edit-department',
      component: require('@/components/EditDepartment').default
      // component: require('@/components/EditDepartment').default
      // component: HelloWorld
    },
    {
      path: '/position/edit/:id',
      // alias: '/department/new',
      name: 'edit-position',
      component: require('@/components/Position/EditPosition').default
      // component: require('@/components/EditDepartment').default
      // component: HelloWorld
    },

    /**
     * {
     *   path: '/department/:id',
     *   name: 'Department',
     *   component: require('@/components/Departments').default
     * },
     */
    {
      path: '/job-categories',
      name: 'Job Categories',
      component: require('@/components/JobCategory/JobCategories').default
    },
    {
      path: '/job-category/edit/:id',
      // alias: '/job-category/new',
      name: 'Edit Category',
      component: require('@/components/JobCategory/EditJobCategory').default
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: require('@/components/Job/Jobs').default
    },
    {
      path: '/job/edit/:id',
      // alias: '/job-category/new',
      name: 'Edit Job',
      component: require('@/components/Job/EditJob').default
    },
    {
      path: '/vacancy/:department/:id',
      // alias: '/job-category/new',
      name: 'Edit Vacancy',
      component: require('@/components/Vacancy').default
    },
    {
      path: '*',
      redirect: '/departments'
    }
  ]
})
