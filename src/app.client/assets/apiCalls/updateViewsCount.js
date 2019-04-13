import axios from "axios";

const updateViewsCount = (title, viewsCount) => {
  axios
    .put(`api/socialCounter?title=${title}&views=${viewsCount}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export default updateViewsCount;
