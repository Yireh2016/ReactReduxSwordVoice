import axios from "axios";

import isBrowser from "../../services/isBrowser";

const sendAvatar = (id, userAvatar) => {
  let form = new FormData();
  form.append("avatar", userAvatar);
  const browser = isBrowser();
  return axios
    .post(`/api/upload/${id}?browser=${browser}`, form) //se sube imagen como avatar del cliente
    .then(res => {
      if (res.status === 200) {
        alert("image submited");

        return {
          status: res.statusText
        };
      }
    })
    .catch(err => {
      console.log("err", err);
      alert(`There was an error uploading foto status:  error:${err}`);
      return {
        status: "error",
        message: err
      };
    });
};

export default sendAvatar;
