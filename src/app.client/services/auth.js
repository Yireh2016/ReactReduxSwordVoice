export function saveToken(token) {
  window.localStorage["swordVoice-token"] = token;
}
export function getToken() {
  return window.localStorage["swordVoice-token"];
}

export function getUserFromToken(token) {
  let payload = JSON.parse(window.atob(token.split(".")[1]));
  return payload._id;
}

export function isLoggedIn() {
  let token = getToken();
  if (token) {
    let payload = JSON.parse(window.atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
}
