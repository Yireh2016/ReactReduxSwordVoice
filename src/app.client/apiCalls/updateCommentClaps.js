import axios from "axios";

const updateCommentClaps = (id, index, claps) => {
  return new Promise((resolve, reject) => {
    axios

      .put(`api/updateCommentClaps?id=${id}&index=${index}`, {
        claps
      })
      .then(res => {
        console.log(res);
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export default updateCommentClaps;
