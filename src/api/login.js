import axios from "axios";
async function login(data) {
  let response = await axios.post("/api/v1/users/login", data);
  return response.data;
}

export { login };
