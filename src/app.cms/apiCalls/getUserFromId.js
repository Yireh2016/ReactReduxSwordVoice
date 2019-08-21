import axios from "axios";

const getUserFromId = id => {
  return axios(`/api/users/${id}`)
    .then(res => {
      return { status: "OK", data: res.data };
    })
    .catch(err => {
      return { status: "err", data: err };
    });
};

export default getUserFromId;
