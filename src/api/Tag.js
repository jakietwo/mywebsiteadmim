/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";
async function getAllTagList() {
  let response = await axios.get("/api/v1/tags");
  return response.data;
}

export { getAllTagList };
