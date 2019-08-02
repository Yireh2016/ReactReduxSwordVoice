import axios from "axios";

const filterPopular = filter => {
  return axios
    .put(`api/filterPopular`, { filter })
    .then(res => {
      if (res.statusText === "OK") {
        return { statusText: "OK", popularArr: res.data.popularArr };
      }
    })
    .catch(err => {
      console.log("err on filterPopular", err);
      return { statusText: err };
    });
};

export default filterPopular;
