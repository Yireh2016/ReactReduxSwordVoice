import axios from "axios";

const apiLogout = () => {
  return axios(`api/logout`)
    .then(() => {
      return { status: "OK" };
    })
    .catch(err => {
      console.log("err on logout", err);

      return { status: err };
    });
};

export default apiLogout;
