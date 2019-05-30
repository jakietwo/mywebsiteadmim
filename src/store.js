import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    username: ""
  },
  mutations: {
    saveToken(state, data) {
      state.token = data;
    },
    saveUsername(state, data) {
      this.state.username = data;
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
