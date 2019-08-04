import axios from "axios";

const advancedSearchDb = (author, dateFrom, dateTo) => {
  return axios
    .get(
      `api/advancedSearchDb?author=${author}&dateFrom=${dateFrom}&dateTo=${dateTo}`
    )
    .then(res => {
      if (res.statusText === "OK") {
        return {
          statusText: "OK",
          advancedArr: res.data.advancedArr,
          advancedCount: res.data.advancedArr.length
        };
      }
    })
    .catch(err => {
      console.log("err on advancedSearchDb", err);
      return { statusText: err };
    });
};

export default advancedSearchDb;
