/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";
async function getAllCategoryList() {
  let response = await axios.get("/api/v1/categorys");
  return response.data;
}
async function createCategory(data) {
  let response = await axios.post("/api/v1/categorys", data);
  return response.data;
}
async function deleteCategory(id) {
  let response = await axios.delete("/api/v1/categorys/" + id);
  return response.data;
}
export { getAllCategoryList, createCategory, deleteCategory };
