import axios from 'axios'

const updateReplyClaps = (id, commentIndex, index, claps) => {
  return new Promise((resolve, reject) => {
    axios

      .put(
        `api/updateReplyClaps?id=${id}&index=${index}&commentIndex=${commentIndex}`,
        {
          claps
        }
      )
      .then(res => {
        console.log(res)
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export default updateReplyClaps
