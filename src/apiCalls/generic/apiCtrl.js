import {apiGet, apiPost, apiPut, apiDelete} from './apiCalls'

const apiCtrl = async ({url, data, method = 'get', config}, success, error) => {
  let response

  const isOnline = navigator.onLine
  if (!isOnline) {
    error({response: {data: {message: 'NetworK Error'}}})
    return
  }

  try {
    switch (method) {
      case 'get': {
        response = await apiGet(url, config)
        break
      }

      case 'post': {
        response = await apiPost(url, data, config)
        break
      }

      case 'put': {
        response = await apiPut(url, data, config)
        break
      }

      case 'delete': {
        response = await apiDelete(url, data, config)
        break
      }
    }
  } catch (err) {
    error(err)
    return
  }

  if (response.data.status === 'OK') {
    success(response)

    return
  }
}

export default apiCtrl
