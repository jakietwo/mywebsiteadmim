<template>
  <div class="home">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        class="slider"
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo">
          <img src="./../assets/logo.png" alt="logo" width="40" height="32" />
        </div>
        <a-menu
          theme="dark"
          mode="inline"
          :defaultSelectedKeys="['1']"
          @click="handleClick"
        >
          <a-menu-item key="myhome">
            <a-icon type="appstore" />
            <span>首页</span>
          </a-menu-item>
          <a-sub-menu key="sub1" @titleClick="titleClick">
            <span slot="title"
              ><a-icon type="mail" /><span>博客管理</span>
            </span>
            <a-menu-item key="article">文章管理</a-menu-item>
            <a-menu-item key="category">分类管理</a-menu-item>
            <a-menu-item key="tag">标签管理</a-menu-item>
            <a-menu-item key="reply">回复管理</a-menu-item>
            <a-menu-item key="comment">评论管理</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="user">
            <a-icon type="video-camera" />
            <span>用户管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          style="background: #fff; padding: 0; display: flex; justify-content: flex-start;align-items: center;"
        >
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <MyHeader></MyHeader>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px'
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from "@/components/MyHeader";
export default {
  name: "home",
  components: {
    MyHeader
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleClick(e) {
      console.log("click", e);
      this.$router.push({ name: e.key });
    },
    titleClick(e) {
      console.log("titleClick", e);
    }
  }
};
</script>
<style lang="stylus" scoped>
.home
  width 100vw
  height 100vh
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
  .slider
    height 100vh
  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    line-height 32px
    margin: 16px;
  }
</style>
