<template>
  <div class="editUserModal">
    <a-modal
      title="更新用户"
      :visible="visibleEditModal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-input
        class="input-user"
        style="margin: 20px 0;"
        v-model="data.username"
        placeholder="请输入用户名"
      ></a-input>
      <a-select
        :defaultValue="data.auth"
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
import { updateUser } from "../../api/User";

export default {
  name: "editUserModal",
  props: {
    visibleEditModal: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      username: "",
      auth: 0,
      data: {}
    };
  },
  watch: {
    userData: {
      handler(newval) {
        console.log("newva;", newval);
        if (newval) {
          this.data = JSON.parse(JSON.stringify(newval));
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async handleOk() {
      if (!this.userData.username) {
        return;
      } else {
        let data = {
          username: this.data.username,
          auth: this.data.auth
        };
        let res = await updateUser(this.data.id, data);
        console.log("res", res);
        if (res.success) {
          this.$notification.success({
            message: "提示!",
            description: "更新用户信息成功!"
          });
          this.$store.dispatch("getUserList");
          this.handleCancel();
        } else {
          this.$notification.error({
            message: "提示!",
            description: "更新用户信息失败!"
          });
        }
      }
    },
    handleChange(value) {
      this.userData.auth = value;
    },
    handleCancel() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style scoped lang="stylus"></style>
