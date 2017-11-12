import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
      // component: HelloWorld
    },
    {
      path: '/departments',
      name: 'Departments',
      component: require('@/components/Departments').default
    },
    {
      path: '/department/new',
      name: 'edit-department',
      component: require('@/components/EditDepartment').default
      // component: HelloWorld
    },
    {
      path: '/department/edit/:id',
      name: 'edit-department',
      component: require('@/components/EditDepartment').default
      // component: HelloWorld
    },
    {
      path: '/department/:id',
      name: 'Department',
      component: require('@/components/Departments').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
