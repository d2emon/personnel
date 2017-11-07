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
      // component: HelloWorld
    },
    {
      path: '/department/edit',
      name: 'EditDepartment',
      component: require('@/components/EditDepartment').default
      // component: HelloWorld
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
