<template>
  <div class="MyHeader">
    <div style="flex: 1;text-align: center; font-size: 24px;">
      JAKIETWO个人博客
    </div>
    <a-dropdown v-model="visible" style="margin-right: 20px; width: 40px;">
      <a-avatar :size="40" style="color: #f56a00; backgroundColor: #fde3cf;">
        {{ username }}
      </a-avatar>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1">个人中心</a-menu-item>
        <a-menu-item key="2" @click="logout"> 退出</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  name: "MyHeader",
  components: {},
  data() {
    return {
      visible: false
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleMenuClick(e) {
      if (e.key === "3") {
        this.visible = false;
      }
    },
    /**
     * 退出登录
     */
    logout() {
      let that = this;
      this.$confirm({
        title: "确定退出当前用户吗",
        content: "",
        onOk() {
          console.log("OK");
          sessionStorage.clear();
          that.$store.commit("saveToken", "");
          that.$router.push("/login");
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.MyHeader
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%
</style>
