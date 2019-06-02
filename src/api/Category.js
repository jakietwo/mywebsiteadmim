/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";
async function getAllCategoryList() {
  let response = await axios.get("/api/v1/categorys");
  return response.data;
}

export { getAllCategoryList };
