import axios from "axios";

const loginUser = (username, password) => {
  const data = {
    userName: username,
    userPassword: password
  };

  return axios
    .post("/api/login", data)
    .then(res => {
      console.log("res on login", res);
      return { status: "OK", data: res.data };
    })
    .catch(err => {
      return { status: err.response.data.message, data: err.response.data };
    });
};

export default loginUser;
