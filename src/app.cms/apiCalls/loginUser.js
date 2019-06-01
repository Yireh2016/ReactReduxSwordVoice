import axios from "axios";

const loginUser = (username, password) => {
  const data = {
    userName: username,
    userPassword: password
  };

  return axios
    .post("/api/login", data)
    .then(res => {
      return { status: res.statusText, data: res.data };
    })
    .catch(err => {
      return { status: "err", data: err };
    });
};

export default loginUser;
