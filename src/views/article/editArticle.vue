<template>
  <div class="editArticle">
    <div class="header-wrapper">
      <a-button
        style="float: left; height: 40px;"
        type="primary"
        icon="left-square"
        @click="goBack"
        >返回</a-button
      >
      <a-input
        class="input"
        v-model="data.title"
        placeholder="请输入标题"
      ></a-input>
    </div>
    <mavon-editor
      class="mavenEditor"
      @change="changeEditorValue"
      v-model="data.content"
    ></mavon-editor>
    <div class="select-wrapper">
      <div class="category">
        <h4>选择分类</h4>
        <a-input
          v-if="selectCategory.length"
          style="width: 120px;"
          v-model="selectCategory[0].name"
          placeholder="输入分类"
        ></a-input>
      </div>
      <div class="tag">
        <a-tag
          closable
          color="pink"
          v-for="(tag, index) in selectTagValue"
          :key="index"
          @close="closeTag(tag)"
          >{{ tag && tag.name }}</a-tag
        >
        <a-input
          class="input-tag"
          @pressEnter="enterValue"
          v-model="inputTagValue"
          placeholder="请输入标签"
        ></a-input>
      </div>
    </div>
    <a-button type="primary" class="confirm-btn" @click="confirm">
      确定
    </a-button>
  </div>
</template>
<script>
import { createTag, deleteTag } from "../../api/Tag";
import { updateArticle } from "../../api/Article";
import { updateCategory } from "../../api/Category";

export default {
  name: "editArticle",
  components: {},
  data() {
    return {
      titleValue: "",
      data: {},
      selectCategory: "",
      selectTagValue: "",
      inputTagValue: ""
    };
  },
  computed: {
    record() {
      return this.$store.state.record;
    }
  },
  watch: {
    record: {
      handler(newval) {
        if (newval.content) {
          this.data = newval;
          console.log("newval", newval);
          this.data.content = JSON.parse(this.data.content);
          if (this.data.categorys.length) {
            this.selectCategory = this.data.categorys;
          } else {
            this.selectCategory = [
              {
                name: ""
              }
            ];
          }
          this.selectTagValue = this.data.tags;
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeEditorValue() {},
    // 点击确定
    async confirm() {
      if (!this.data.content || !this.data.title) {
        this.$message.error("请输入标题和内容");
        return;
      }
      let res = await updateArticle(this.data.id, this.data);
      if (res.success) {
        let res = await updateCategory(this.selectCategory[0].id, {
          name: this.selectCategory[0].name
        });
        this.$notification.success({
          message: "提示!",
          description: "更新文章成功!"
        });
        this._updateDATA();
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    async closeTag(tag) {
      let res = await deleteTag(tag.id);
      if (res.success) {
        this._updateDATA();
      } else {
        this.$message.error("删除标签失败!");
      }
    },
    handleChangeTag() {},
    async enterValue() {
      if (!this.inputTagValue) return;
      let res = await createTag({
        name: this.inputTagValue,
        articleId: this.data.id
      });
      if (res.success) {
        this.selectTagValue.push({
          name: this.inputTagValue,
          id: res.tagId,
          articleId: this.data.id
        });
        this.inputTagValue = "";
        this._updateDATA();
      } else {
        this.$message.error("增加标签失败!");
      }
    },
    _updateDATA() {
      this.$store.dispatch("getArticleList");
      this.$store.dispatch("getCategoryList");
      this.$store.dispatch("getTagList");
    }
  }
};
</script>

<style scoped lang="stylus">
.editArticle
  .header-wrapper
    display flex
    align-items center
    justify-content flex-start
    flex-direction row
    width 100%
    text-align center
    height 50px;
    line-height 40px
    margin-bottom 10px;
    padding-right  50px;
  .input
    margin-left 20px;
    height 40px;
  .mavenEditor
    position relative
    z-index 50 !important
    width 100%
    max-height 400px
  .select-wrapper
    position relative
    width 100%
    height 80px;
    display flex
    justify-content center
    align-items center
    .category
      flex 1
      position relative
      z-index 9999
    .tag
      flex 1
      .input-tag
        display block
        margin-top 5px
        width 200px
  .confirm-btn
    width 120px
    height 40px
</style>
