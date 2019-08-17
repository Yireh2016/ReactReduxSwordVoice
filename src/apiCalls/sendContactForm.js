import axios from "axios";

const sendContactForm = form => {
  return axios
    .post(`api/sendContactForm`, form)
    .then(res => {
      console.log("sendContactForm res", res);
      return { status: res.statusText, message: res.data.message };
    })
    .catch(err => {
      if (!err.response) {
        return { status: err, message: "Network Error" };
      }
      return { status: err, message: err.response.data.message };
    });
};

export default sendContactForm;
