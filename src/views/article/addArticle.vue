<template>
  <div class="addArticle">
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
        v-model="titleValue"
        placeholder="请输入标题"
      ></a-input>
    </div>
    <mavon-editor
      class="mavenEditor"
      @change="changeEditorValue"
      v-model="editorValue"
    ></mavon-editor>
    <div class="select-wrapper">
      <div class="category">
        <h4>选择分类</h4>
        <a-input
          style="width: 120px;"
          v-model="selectCategoryValue"
          placeholder="输入分类"
        ></a-input>
      </div>
      <div class="tag">
        <h4>选择标签</h4>
        <a-select
          labelInValue
          mode="tags"
          style="min-width: 120px;"
          @change="handleChangeTag"
        >
        </a-select>
      </div>
    </div>
    <a-button type="primary" class="confirm-btn" @click="confirm">
      确定
    </a-button>
  </div>
</template>
<script>
import { createArticle } from "../../api/Article";
import { createCategory } from "../../api/Category";
import { createTag } from "../../api/Tag";
export default {
  name: "addArticle",
  props: {},
  components: {},
  data() {
    return {
      editorValue: "",
      titleValue: "",
      articleContent: "",
      selectCategoryValue: "",
      selectTagValue: undefined,
      Categorys: [
        { value: "CSS", label: "CSS" },
        { value: "Node", label: "Node" },
        { value: "HTML", label: "HTML" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "Vue", label: "Vue" },
        { value: "React", label: "React" }
      ]
    };
  },
  computed: {
    Tags() {
      return this.$store.state.TagList;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChangeCategory(value) {
      this.selectCategoryValue = value.label.trim();
    },
    handleChangeTag(value) {
      //  value 是个数组
      this.selectTagValue = value;
    },
    changeEditorValue(value, render) {
      this.articleContent = value;
    },
    goBack() {
      this.$router.go(-1);
    },
    async confirm() {
      let data = {};
      if (!this.titleValue || !this.articleContent) {
        this.$message.error("请输入标题或文章内容");
        return;
      }
      data.title = this.titleValue;
      data.content = JSON.stringify(this.articleContent);
      let response = await createArticle(data);
      if (response.success) {
        let articleId = response.articleId;
        if (this.selectCategoryValue) {
          let categoryData = {
            articleId: articleId,
            name: this.selectCategoryValue.trim()
          };
          await createCategory(categoryData);
        }
        if (this.selectTagValue && this.selectTagValue.length) {
          this.selectTagValue.forEach(async tag => {
            let tagData = {
              name: tag.label.trim(),
              articleId: articleId
            };
            let res = await createTag(tagData);
            if (!res.success) {
              tagSuccess = false;
            }
          });
        }
        this.$notification.success({
          message: "提示!",
          description: "添加文章成功!"
        });
        this.$store.dispatch("getArticleList");
        this.$store.dispatch("getCategoryList");
        this.$store.dispatch("getTagList");
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.addArticle
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
  .confirm-btn
    width 120px
    height 40px
</style>
