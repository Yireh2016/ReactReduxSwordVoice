import axios from 'axios'

const uploadPostImage = (
  base64,
  url,
  filename,
  successFn,
  errFn,
  thumbnail
) => {
  axios
    .post(`${process.env.CDN_URL}/cdn/uploadPostImage`, {
      base64,
      url,
      filename,
      thumbnail
    })
    .then(res => {
      alert('file uploaded')
      if (successFn) successFn(res)
    })
    .catch(err => {
      alert('uploadPostImage error on file uploading')
      console.log('uploadPostImage error on file uploading', err)

      if (errFn) {
        errFn(err)
      }
    })
}

export default uploadPostImage
