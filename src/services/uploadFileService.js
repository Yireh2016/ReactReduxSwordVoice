import axios from 'axios'

const uploadFileService = (fileData, successFn, errFn) => {
  let data = new FormData()

  data.append('file', fileData.file)
  data.append('filename', fileData.name)
  data.append('fileURL', fileData.url)
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

  console.log('uploadFileService sending file')

  axios
    .post(`${process.env.CDN_URL}/cdn/uploadTempFile`, data)
    .then(res => {
      alert('file uploaded')
      if (successFn) successFn(res)
    })
    .catch(err => {
      alert('uploadFileService error on file uploading', err)
      if (errFn) {
        errFn(err)
      }
    })
}

export default uploadFileService
