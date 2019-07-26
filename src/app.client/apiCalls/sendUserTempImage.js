import axios from "axios";

const sendUserTempImage = (base64Img, userName) => {
  return axios
    .post(`api/sendUserTempImage`, { base64Img, userName })
    .then(res => {
      console.log("sendUserTempImage", res);
      if (res.statusText === "OK") {
        return { filename: res.data.filename, status: res.statusText };
      }
    })
    .catch(err => {
      console.log("err on setComment", err);
    });
};

export default sendUserTempImage;
