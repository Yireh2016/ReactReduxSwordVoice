import axios from 'axios'

const errorFn = (err, reject) => {
  console.log('error on apiPost', JSON.stringify(err))
  reject(err)
}

const successFn = (res, resolve) => {
  resolve(res)
}

export const apiPost = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then(res => {
        successFn(res, resolve)
      })
      .catch(err => {
        errorFn(err, reject)
      })
  })
}

export const apiGet = (url, config) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then(res => {
        successFn(res, resolve)
      })
      .catch(err => {
        errorFn(err, reject)
      })
  })
}

export const apiPut = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config)
      .then(res => {
        successFn(res, resolve)
      })
      .catch(err => {
        errorFn(err, reject)
      })
  })
}

export const apiDelete = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, data, config)
      .then(res => {
        successFn(res, resolve)
      })
      .catch(err => {
        errorFn(err, reject)
      })
  })
}
