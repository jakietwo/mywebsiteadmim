/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";
async function getAllTagList() {
  let response = await axios.get("/api/v1/tags");
  return response.data;
}

async function createTag(data) {
  let response = await axios.post("/api/v1/tags", data);
  return response.data;
}
async function deleteTag(id) {
  let response = await axios.delete("/api/v1/tags/" + id);
  return response.data;
}
export { getAllTagList, createTag, deleteTag };
