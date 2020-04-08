export function saveToken(token) {
  sessionStorage.setItem('swordvoice-token', token)
}
export function getToken() {
  return sessionStorage.getItem('swordvoice-token')
}

export function getTokenData(token) {
  let payload = JSON.parse(window.atob(token.split('.')[1]))
  return payload
}

export function isLoggedIn() {
  let token = getToken()
  if (token) {
    let payload = JSON.parse(window.atob(token.split('.')[1]))
    return payload.exp > Date.now() / 1000
  } else {
    return false
  }
}
