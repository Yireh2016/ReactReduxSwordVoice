import axios from "axios";

const updateSocialCount = (id, prop, socialCount) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`api/socialCounter?id=${id}&prop=${prop}`, { socialCount })
      .then(res => {
        resolve({ status: "OK", result: res.data });
      })
      .catch(err => {
        console.log(err);
        reject({ status: "ERR", result: err.message });
      });
  });
};

export default updateSocialCount;
