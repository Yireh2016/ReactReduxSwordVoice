import axios from 'axios'

const uploadAvatar = (userName, base64) => {
  return axios
    .post(`${process.env.CDN_URL}/cdn/uploadAvatar?userName=${userName}`, {
      base64
    })
    .then(res => {
      return {status: 'OK', avatarURL: res.data.avatarURL}
    })
    .catch(err => {
      console.log('err on uploadAvatar', err.data)

      return {status: err}
    })
}

export default uploadAvatar
