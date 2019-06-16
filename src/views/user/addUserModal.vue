<template>
  <div class="addUserModal">
    <a-modal
      title="增加用户"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-input
        class="input-user"
        style="margin: 20px 0;"
        v-model="username"
        placeholder="请输入用户名"
      ></a-input>
      <a-input
        class="input-user"
        v-model="password"
        placeholder="请输入密码"
        type="password"
      ></a-input>
      <a-select
        defaultValue="0"
        style="width: 120px; margin-top: 20px;"
        @change="handleChange"
      >
        <a-select-option value="0">正常用户</a-select-option>
        <a-select-option value="1">管理员</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>
<script>
import md5 from "md5";
import { createUser } from "../../api/User";

export default {
  name: "addUserModal",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      username: "",
      password: "",
      auth: ""
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    handleChange(value) {
      this.auth = value;
    },
    async handleOk() {
      if (!this.password || !this.username) {
        this.$message.error("请输入用户名和密码!");
        return;
      }
      let password = md5(this.password);
      let data = {
        username: this.username,
        password: password,
        auth: this.auth
      };
      let res = await createUser(data);
      if (res.success) {
        this.$notification.success({
          message: "提示!",
          description: "新增用户成功!"
        });
        this.closeModal();
      } else {
        this.$notification.error({
          message: "提示!",
          description: "新增用户失败!"
        });
      }
    },
    handleCancel() {
      this.closeModal();
    }
  }
};
</script>

<style scoped lang="stylus">
.addUserModal
  .input-user
    width 300px
    margin 20px
</style>
