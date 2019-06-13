<template>
  <div class="index">
    <a-button class="editable-add-btn" @click="handleAdd">添加文章</a-button>
    <a-table
      :columns="columns"
      :dataSource="articleList"
      bordered
      :pagination="pagination"
      :rowClassName="rowClassName"
      rowKey="id"
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="danger" @click="editArticle(record)">编辑</a-button>
        <a-button
          type="danger"
          style="margin-left: 10px;"
          @click="deleteArticle(record)"
          >删除</a-button
        >
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
import { handleCreateTime, sortByCreateTime } from "../../common/handleTime";
import { deepClone } from "../../common/deepClone";
import { deleteArticle } from "../../api/Article";
import { deleteTag } from "../../api/Tag";
import { deleteCategory } from "../../api/Category";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    scopedSlots: { customRender: "title" },
    customRender: (value, row, index) => {
      return value.slice(0, 8);
    }
  },
  {
    title: "内容",
    dataIndex: "content",
    scopedSlots: { customRender: "content" },
    customRender: (value, row, index) => {
      return value.slice(0, 35);
    }
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
      showAddModal: false,
      pagination: {
        pageSize: 6
      }
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
        if (!newval.length || !newval) {
          return;
        }
        this.articleList = deepClone(newval);
        this.articleList = handleCreateTime(this.articleList);
        this.articleList = sortByCreateTime(this.articleList);
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
    deleteArticle(record) {
      console.log("record", record);
      let that = this;
      this.$confirm({
        title: `确定删除文章-${record.title}?`,
        content: "删除后将不能恢复!请谨慎选择",
        async onOk() {
          let articleId = record.id;
          let res = await deleteArticle(articleId);
          if (res.success) {
            that.$notification.success({
              message: "提示!",
              description: "删除文章成功!"
            });
          }
          let categorys = record.categorys;
          let tags = record.tags;
          categorys.forEach(async category => {
            let res1 = await deleteCategory(category.id);
          });
          tags.forEach(async tag => {
            let res2 = await deleteTag(tag.id);
          });
          that.$store.dispatch("getArticleList");
          that.$store.dispatch("getCategoryList");
          that.$store.dispatch("getTagList");
        },
        onCancel() {}
      });
    },
    rowClassName() {
      return "rowClassName";
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
  .rowClassName
    max-height 60px !important;
</style>
