import axios from "axios";

const apiSetComment = (userName, title, avatar, comment, callback) => {
  return axios
    .put(
      `api/setComment`,
      { avatar, message: comment, userName, title },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      if (res.data.message === "ok") {
        callback(res.data.id);
      }
    })
    .catch(err => {
      console.log("err on setComment", err);
    });
};

export default apiSetComment;
