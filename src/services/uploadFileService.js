import axios from "axios";

const uploadFileService = (fileData, successFn, errFn) => {
  let data = new FormData();

  data.append("file", fileData.file);
  data.append("filename", fileData.name);
  data.append("fileURL", fileData.url);
  // axios
  //   .post("/api/uploadTempFile", data)
  //   .then(res => {
  //     alert("file uploaded");
  //     if (successFn) successFn(res);
  //   })
  //   .catch(err => {
  //     alert("uploadFileService error on file uploading", err);
  //     if (errFn) {
  //       errFn(err);
  //     }
  //   });

  axios
    .post("http://localhost:3000/cdn/uploadTempFile", data)
    .then(res => {
      alert("file uploaded");
      if (successFn) successFn(res);
    })
    .catch(err => {
      alert("uploadFileService error on file uploading", err);
      if (errFn) {
        errFn(err);
      }
    });
};

export default uploadFileService;
