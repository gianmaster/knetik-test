import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Devices from './views/Devices.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Devices',
      component: Devices
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
