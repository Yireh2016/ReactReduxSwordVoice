import axios from 'axios'

const sendUserProfile = userProfile => {
  const userName = userProfile.userName
  return axios
    .put(`/api/updateUserProfile/${userName}`, userProfile)
    .then(res => {
      if (res.status === 200) {
        return {status: 'OK', message: res.data}
      }
    })
    .catch(err => {
      console.log('sendUserProfile err', JSON.stringify(err))
      if (err.message) {
        return {status: 'error', message: err.message}
      }
    })
}

export default sendUserProfile
