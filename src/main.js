import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)
Vue.use(PortalVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
