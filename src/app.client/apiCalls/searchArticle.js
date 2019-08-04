import axios from "axios";

const searchArticle = searchValue => {
  return axios
    .get(`api/searchArticle?searchValue=${searchValue}`)
    .then(res => {
      if (res.statusText === "OK") {
        return { statusText: "OK", searchArr: res.data.searchArr };
      }
    })
    .catch(err => {
      console.log("err on searchArticle", err);
      return { statusText: err };
    });
};

export default searchArticle;
