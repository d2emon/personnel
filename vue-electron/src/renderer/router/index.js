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
      // name: 'Hello',
      // component: HelloWorld
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
