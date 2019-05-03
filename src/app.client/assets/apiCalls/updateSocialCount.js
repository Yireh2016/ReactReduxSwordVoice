import axios from "axios";

const updateSocialCount = (title, socialCount) => {
  axios

    .put(`api/socialCounter?title=${title}`, socialCount)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export default updateSocialCount;
