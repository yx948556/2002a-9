import Vue from 'vue'
import home from './index.vue'
// import list from './a.vue'
export default new Vue({
  components: {
    home,
    // list
  },
  template: `
  <div>
   <home id="home" style="display:none"/>
  </div>
 `
})