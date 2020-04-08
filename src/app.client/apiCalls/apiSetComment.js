import axios from 'axios'

const apiSetComment = (
  userID,
  userName,
  title,
  comment,
  commentIndex,
  callback
) => {
  return axios
    .put(
      `api/setComment`,
      {userID, message: comment, userName, title, commentIndex},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      if (res.data.message === 'ok') {
        callback(res.data.id)
      }
    })
    .catch(err => {
      console.log('err on setComment', err)
    })
}

export default apiSetComment
