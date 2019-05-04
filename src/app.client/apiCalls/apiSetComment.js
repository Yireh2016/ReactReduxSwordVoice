import axios from "axios";

const apiSetComment = (userName, title, avatar, comment, callback) => {
  return axios
    .put(`api/setComment?userName=${userName}&title=${title}`, {
      headers: {
        "Content-Type": "application/json"
      },
      avatar,
      message: comment
    })
    .then(res => {
      if (res.data.message === "ok") {
        callback();
      }
    })
    .catch(err => {
      console.log("err on setComment", err);
    });
};

export default apiSetComment;
