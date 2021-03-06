import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import antd from "ant-design-vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { axios } from "./api/axios";
import "ant-design-vue/dist/antd.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.state.token) {
    next("/login");
  } else {
    next();
  }
});
Vue.use(antd);
Vue.use(mavonEditor);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
