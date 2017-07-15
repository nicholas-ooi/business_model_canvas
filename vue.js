import Vue from 'vue'
import BMC from './components/bmc.vue'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
Vue.use(Element)
new Vue({
  el: '#nick',
  render: h => h(BMC)
})
