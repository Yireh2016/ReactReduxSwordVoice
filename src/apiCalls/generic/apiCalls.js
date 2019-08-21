import axios from "axios";

export const apiPost = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then(res => {
        resolve({ status: res.data.status, message: res.data.message });
      })
      .catch(err => {
        console.log("error on apiPost", JSON.stringify(err));
        reject({ status: "ERR", message: err.data.response.message });
      });
  });
};

export const apiGet = (url, config) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
