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
        <a-select
          labelInValue
          style="width: 120px"
          @change="handleChangeCategory"
        >
          <a-select-option
            :value="category.id"
            v-for="(category, index) in Categorys"
            v-bind:key="index"
            >{{ category.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="tag">
        <h4>选择标签</h4>
        <a-select
          labelInValue
          mode="multiple"
          style="min-width: 120px;"
          @change="handleChangeTag"
        >
          <a-select-option
            :value="tag.id"
            v-for="(tag, index1) in Tags"
            v-bind:key="index1"
            >{{ tag.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <a-button type="primary" class="confirm-btn" @click="confirm"
      >确定</a-button
    >
  </div>
</template>
<script>
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
      selectTagValue: undefined
    };
  },
  computed: {
    Categorys() {
      return this.$store.state.CategoryList;
    },
    Tags() {
      return this.$store.state.TagList;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChangeCategory(value) {
      console.log("change", value.label.trim());
      this.selectCategoryValue = value.label.trim();
    },
    handleChangeTag(value) {
      //  value 是个数组
      console.log("change", value);
      this.selectTagValue = value;
    },
    changeEditorValue(value, render) {
      console.log("value", value);
      console.log("render", render);
      this.articleContent = render;
    },
    goBack() {
      this.$router.go(-1);
    },
    confirm() {
      let data = {};
      if (!this.titleValue || !this.articleContent) {
        this.$message.error("请输入标题或文章内容");
        return;
      }
      data.title = this.titleValue;
      data.content = JSON.stringify(this.articleContent);
      console.log("data", data);
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
    width 100%
    height 80px;
    display flex
    justify-content center
    align-items center
    .category
      flex 1
    .tag
      flex 1
  .confirm-btn
    width 120px
    height 40px
</style>
