import axios from "axios";

const updateCommentClaps = (title, index, claps) => {
  return new Promise((resolve, reject) => {
    axios

      .put(`api/updateCommentClaps?title=${title}&index=${index}`, {
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
