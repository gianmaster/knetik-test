import Vue from 'vue'
import App from './App.vue'
import router from './router'

// styles
import '../src/assets/styles/myStyles.scss'

// helpers - others
import { formatDate } from './utils'
Vue.config.productionTip = false

Vue.filter('formatDate', formatDate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
