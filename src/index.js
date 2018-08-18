import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import { MdApp, MdToolbar, MdDrawer, MdContent, MdIcon, MdList, MdButton, MdCheckbox, MdAvatar, MdTable, MdRipple } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdApp)
Vue.use(MdToolbar)
Vue.use(MdDrawer)
Vue.use(MdContent)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdButton)
Vue.use(MdCheckbox)
Vue.use(MdAvatar)
Vue.use(MdTable)
Vue.use(MdRipple)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    this.$store.dispatch('initDataAsync')
  }
})
