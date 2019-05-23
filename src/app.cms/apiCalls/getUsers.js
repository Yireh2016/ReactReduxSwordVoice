import axios from "axios";

const getUsers = (limit = 10, skip = 0) => {
  return axios("/api/users", { limit, skip })
    .then(res => {
      return { status: res.statusText, data: res.data };
    })
    .catch(err => {
      return { status: "err", data: err };
    });
};

export default getUsers;
