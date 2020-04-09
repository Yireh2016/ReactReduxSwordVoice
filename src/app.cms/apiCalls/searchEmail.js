import axios from 'axios'

const searchEmail = value => {
  return axios(`/api/searchEmail/${value}`)
    .then(res => {
      if (res.status === 200) {
        return {
          valid: false,
          message: 'This Email address is already being used',
          user: res.data
        }
      }
    })
    .catch(err => {
      if (err) {
        if (JSON.stringify(err).match(/404/g)) {
          return {valid: true}
        }

        return {
          valid: false,
          message: `there was an error ${err}`
        }
      }
    })
}

export default searchEmail
