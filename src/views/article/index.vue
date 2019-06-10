<template>
  <div class="index">
    <a-button class="editable-add-btn" @click="handleAdd">添加文章</a-button>
    <a-table :columns="columns" :dataSource="articleList" bordered rowKey="id">
      <template slot="operation" slot-scope="text, record">
        <a-button type="danger" @click="editArticle(record)">编辑</a-button>
        <a-button type="danger" style="margin-left: 10px;">删除</a-button>
      </template>
      <span slot="categorys" slot-scope="categorys">
        <a-tag v-for="category in categorys" color="blue" :key="category.id">
          {{ category.name }}
        </a-tag>
      </span>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag.id">
          {{ tag.name }}
        </a-tag>
      </span>
    </a-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { handleCreateTime } from "../../common/handleTime";
import { deepClone } from "../../common/deepClone";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    scopedSlots: { customRender: "title" }
  },
  {
    title: "内容",
    dataIndex: "content",
    scopedSlots: { customRender: "content" }
  },
  {
    title: "分类",
    dataIndex: "categorys",
    key: "categorys",
    scopedSlots: { customRender: "categorys" }
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "创建时间",
    dataIndex: "createtime",
    scopedSlots: { customRender: "createTime" }
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
  components: {},
  data() {
    return {
      columns,
      articleList: [],
      showAddModal: false
    };
  },
  computed: {
    ...mapState({
      ArticleList: state => state.ArticleList,
      CategoryList: state => state.CategoryList,
      TagList: state => state.TagList,
      UserList: state => state.UserList
    })
  },
  watch: {
    ArticleList: {
      handler(newval) {
        if (!newval.length) {
          return;
        }
        this.articleList = deepClone(newval);
        this.articleList = handleCreateTime(this.articleList);
        this.articleList = this._addCategoryToArticle(
          this.articleList,
          this.CategoryList
        );
        this.articleList = this._addTagToArticle(
          this.articleList,
          this.TagList
        );
      },
      immediate: true,
      deep: true
    },
    UserList: {
      handler(newval) {},
      immediate: true,
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleAdd() {
      this.$router.push("addArticle");
    },
    closeModal() {
      this.showAddModal = false;
    },
    onDelete() {},
    editArticle(record) {
      console.log("record", record);
    },
    /**
     * 将category 分类添加到文章里面
     * @param articles
     * @param categorys
     * @returns {*}
     * @private
     */
    _addCategoryToArticle(articles, categorys) {
      for (let article of articles) {
        article.categorys = [];
        for (let category of categorys) {
          if (category.articleId === article.id) {
            article.categorys.push(category);
          }
        }
      }
      return articles;
    },
    /**
     * 将tag 标签添加到文章
     * @param articles
     * @param tags
     * @returns {*}
     * @private
     */
    _addTagToArticle(articles, tags) {
      for (let article of articles) {
        article.tags = [];
        for (let tag of tags) {
          if (tag.articleId === article.id) {
            article.tags.push(tag);
          }
        }
      }
      return articles;
    }
  }
};
</script>

<style scoped lang="stylus">
.index
  .editable-add-btn
    margin-bottom 10px;
</style>
