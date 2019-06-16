import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login"),
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next("/home/index");
        } else {
          next();
        }
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "index",
          name: "myhome",
          component: () => import("@/views/myhome/index")
        },
        {
          path: "article",
          name: "article",
          component: () => import("@/views/article/index")
        },
        {
          path: "addArticle",
          name: "addArticle",
          component: () => import("@/views/article/addArticle")
        },
        {
          path: ":id",
          name: "editArticle",
          component: () => import("@/views/article/editArticle")
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/views/category/index")
        },
        {
          path: "tag",
          name: "tag",
          component: () => import("@/views/tag/index")
        },
        {
          path: "reply",
          name: "reply",
          component: () => import("@/views/reply/index")
        },
        {
          path: "comment",
          name: "comment",
          component: () => import("@/views/comment/index")
        },
        {
          path: "user",
          name: "user",
          component: () => import("@/views/user/index")
        }
      ]
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
