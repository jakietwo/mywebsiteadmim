import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    saveToken(state, data) {
      state.token = data;
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
