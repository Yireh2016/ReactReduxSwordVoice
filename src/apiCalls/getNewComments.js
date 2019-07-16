import axios from "axios";

const getNewComments = (id, commentsCount) => {
  return axios
    .get(`api/getMoreComments?id=${id}&commentsCount=${commentsCount}`)
    .then(res => {
      console.log("getNewComments res", res);
      return { status: res.statusText, comments: res.data.comments };
    })
    .catch(err => {
      console.log("err on logout", err);

      return { status: err };
    });
};

export default getNewComments;
