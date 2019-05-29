<template>
  <div class="login">
    <div class="login-form">
      <h2 style="letter-spacing: 2px; font-weight: 400;font-size: 24px;">
        JAKIETWO博客网站管理端
      </h2>
      <div style="height: 40px;line-height: 40px; color: orangered;">
        {{ errorMsg }}
      </div>
      <a-form
        :form="form"
        @submit="handleSubmit"
        class="form"
        @keyup.enter="handleSubmit"
      >
        <a-form-item
          label="username"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="password"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" html-type="submit" style="width: 80%;">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { login } from "../api/login";
import md5 from "md5";
export default {
  name: "login",
  components: {},
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      errorMsg: ""
    };
  },
  watch: {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          values.password = md5(values.password);
          let response = await login(values);
          console.log("response", response);
          if (response.success) {
            this.$store.commit("saveToken", response.token);
            this.$router.push("/home");
          } else {
            this.errorMsg = response.message;
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.login
  position absolute
  left 0
  bottom 0
  width 100%
  height 100%
  background-color rgb(247,247,247)
  background-image url("./../assets/login-bg.svg")
  background-repeat no-repeat
  background-size 100% 100%
  .login-form
    margin 10% auto
    width 400px
    text-align center
    .form
      width 100%
</style>
