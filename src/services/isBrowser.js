import is from 'is_js'
const isBrowser = () => {
  let result
  if (is.chrome()) {
    result = 'chrome'
    return result
  }

  if (is.edge()) {
    result = 'edge'
    return result
  }

  if (is.ie()) {
    result = 'ie'
    return result
  }

  if (is.firefox()) {
    result = 'firefox'
    return result
  }

  return result
}

export default isBrowser
