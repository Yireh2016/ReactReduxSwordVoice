import axios from "axios";

const updateClapsCount = (title, clapsCount) => {
  axios
    .put(`api/socialCounter?title=${title}&claps=${clapsCount}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export default updateClapsCount;
