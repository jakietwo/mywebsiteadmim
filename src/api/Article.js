/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";

async function getAllArticleList() {
  let response = await axios.get("/api/v1/articles");
  return response.data;
}
async function createArticle(data) {
  let response = await axios.post("/api/v1/articles", data);
  return response.data;
}
async function deleteArticle(id) {
  let response = await axios.delete("/api/v1/articles/" + id);
  return response.data;
}
export { getAllArticleList, createArticle, deleteArticle };
