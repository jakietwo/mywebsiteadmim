<template>
  <div class="index">
    <a-button class="editable-add-btn" @click="handleAdd">添加用户</a-button>
    <a-table
      :columns="columns"
      :dataSource="userList"
      bordered
      :pagination="pagination"
      rowKey="id"
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="danger" @click="editUser(record)">编辑</a-button>
        <a-button
          type="danger"
          style="margin-left: 10px;"
          @click="deleteUser(record)"
        >
          删除
        </a-button>
      </template>
    </a-table>
    <add-user-modal
      :visible="showAddUserModal"
      @closeModal="closeModal"
    ></add-user-modal>
    <edit-user-modal
      :visible-edit-modal="showEditModal"
      :user-data="userData"
      @closeModal="closeModal"
    ></edit-user-modal>
  </div>
</template>
<script>
import addUserModal from "./addUserModal";
import editUserModal from "./editUserModal";
import { deleteUser } from "../../api/User";

const columns = [
  {
    title: "姓名",
    dataIndex: "username",
    scopedSlots: { customRender: "title" }
  },
  {
    title: "是否管理员",
    dataIndex: "auth",
    scopedSlots: { customRender: "title" },
    customRender: (value, row, index) => {
      if (value === 1) {
        return "是";
      } else {
        return "否";
      }
    }
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: "20%",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  name: "index",
  components: {
    addUserModal,
    editUserModal
  },
  data() {
    return {
      pagination: {
        pageSize: 6
      },
      columns,
      showAddUserModal: false,
      showEditModal: false,
      userData: {}
    };
  },
  computed: {
    userList() {
      return this.$store.state.UserList;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleAdd() {
      this.showAddUserModal = !this.showAddUserModal;
    },
    closeModal() {
      this.showAddUserModal = false;
      this.showEditModal = false;
    },
    editUser(record) {
      this.showEditModal = true;
      console.log("re", record);
      this.userData = record;
    },
    deleteUser(record) {
      let that = this;
      this.$confirm({
        title: `确定删除用户-${record.username}?`,
        content: "删除后将不能恢复!请谨慎选择",
        async onOk() {
          let userId = record.id;
          let res = await deleteUser(userId);
          if (res.success) {
            that.$notification.success({
              message: "提示!",
              description: "删除用户成功!"
            });
          } else {
            return;
          }
          that.$store.dispatch("getUserList");
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.index
  .editable-add-btn
    width 120px
    margin-bottom 10px;
</style>
