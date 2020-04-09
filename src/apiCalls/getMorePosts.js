import axios from 'axios'

const getMorePosts = (totalPosts, postsCount) => {
  return axios
    .get(`api/getMorePosts?totalPosts=${totalPosts}&postsCount=${postsCount}`)
    .then(res => {
      console.log('getMorePosts res', res)
      return {status: res.statusText, articles: res.data}
    })
    .catch(err => {
      console.log('err on getMorePosts', err)

      return {status: err}
    })
}

export default getMorePosts
