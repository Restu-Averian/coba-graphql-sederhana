import Vue from 'vue'
import Vuex from 'vuex'
import todo from '@/store/todo'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key:"dataUser"
  })],
  modules: {
    todo:{
      namespaced:false,
      ...todo
    }
    
  }
})
