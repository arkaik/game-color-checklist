import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Table from '../components/Table'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
