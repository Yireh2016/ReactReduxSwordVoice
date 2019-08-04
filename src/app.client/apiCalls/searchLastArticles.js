import axios from "axios";

const searchLastArticles = () => {
  return axios
    .get(`api/searchLastArticles`)
    .then(res => {
      if (res.statusText === "OK") {
        return {
          statusText: "OK",
          articlesArr: res.data.articlesArr,
          articlesTotalCount: res.data.articlesTotalCount
        };
      }
    })
    .catch(err => {
      console.log("err on searchLastArticles", err);
      return { statusText: err };
    });
};

export default searchLastArticles;
