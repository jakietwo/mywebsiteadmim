/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";

async function getAllArticleList() {
  let response = await axios.get("/api/v1/articles");
  return response.data;
}

export { getAllArticleList };
