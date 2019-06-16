import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getAllTagList } from "./api/Tag";
import { getAllCategoryList } from "./api/Category";
import { getUserList } from "./api/User";
import { getAllArticleList } from "./api/Article";
import { axios } from "./api/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    username: "",
    UserList: [],
    TagList: [],
    CategoryList: [],
    ArticleList: [],
    record: {}
  },
  mutations: {
    saveToken(state, data) {
      state.token = data;
    },
    saveUsername(state, data) {
      this.state.username = data;
    },
    setUserList(state, data) {
      this.state.UserList = data;
    },
    setArticleList(state, data) {
      state.ArticleList = data;
    },
    setCategoryList(state, data) {
      state.CategoryList = data;
    },
    setTagList(state, data) {
      state.TagList = data;
    },
    setRecord(state, data) {
      state.record = data;
    }
  },
  actions: {
    async getUserList({ commit }) {
      let response = await getUserList();
      commit("setUserList", response);
    },
    async getArticleList({ commit }) {
      let response = await getAllArticleList();
      commit("setArticleList", response);
    },
    async getCategoryList({ commit }) {
      let response = await getAllCategoryList();
      commit("setCategoryList", response);
    },
    async getTagList({ commit }) {
      let response = await getAllTagList();
      commit("setTagList", response);
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
