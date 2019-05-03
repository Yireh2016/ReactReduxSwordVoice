import axios from "axios";

const updateCommentClaps = (title, index, claps) => {
  axios

    .put(`api/updateCommentClaps?title=${title}&index=${index}`, {
      claps: claps
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export default updateCommentClaps;
