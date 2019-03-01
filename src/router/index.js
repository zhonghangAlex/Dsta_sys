import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/Welcome'
import OrdIndex from '@/views/OrdIndex'
import SuperIndex from '@/views/SuperIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/ordindex',
      name: 'OrdIndex',
      component: OrdIndex
    }
  ]
})
