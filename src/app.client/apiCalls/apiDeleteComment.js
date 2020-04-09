import axios from 'axios'

const apiDeleteComment = (id, callback) => {
  return axios
    .delete(`api/deleteComment?&id=${id}`)
    .then(res => {
      if (res.data.message === 'ok') {
        callback()
      }
    })
    .catch(err => {
      console.log('err on apiDeleteComment', err)
    })
}

export default apiDeleteComment
