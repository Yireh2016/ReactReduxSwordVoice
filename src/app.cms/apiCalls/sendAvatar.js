import axios from "axios";

const sendAvatar = (id, userAvatar) => {
  console.log(
    "salvar este avatar en este id",
    JSON.stringify({ id, userAvatar })
  );

  return axios
    .post(`/api/upload/${id}`, { userAvatar }) //se sube imagen como avatar del cliente
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
