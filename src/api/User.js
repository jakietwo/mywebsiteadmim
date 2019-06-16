/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";

async function getUserList() {
  let response = await axios.get("/api/v1/users");
  return response.data;
}

async function createUser(data) {
  let response = await axios.post("/api/v1/users", data);
  return response.data;
}

async function deleteUser(id) {
  let response = await axios.delete("/api/v1/users/" + id);
  return response.data;
}

async function updateUser(id, data) {
  let response = await axios.put("/api/v1/users/" + id, data);
  return response.data;
}
export { getUserList, createUser, deleteUser, updateUser };
