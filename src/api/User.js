/**
 * author:jakietwo
 * time: 2019/6/2
 */
import axios from "axios";

async function getUserList() {
  let response = await axios.get("/api/v1/users");
  return response.data;
}

export { getUserList };
