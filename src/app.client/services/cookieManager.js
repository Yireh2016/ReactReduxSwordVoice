import uuid from 'uuid/v1'
export const sessionCookie = (props, username, id, uuid) => {
  //get this.props.cookies
  const {cookies} = props
  //setting a cookie
  //verifica si el cookie de session existe

  uuid &&
    cookies.set('sessionId', uuid, {path: '/', maxAge: 60 * 60 * 24 * 365})
  cookies.set('username', username, {path: '/', maxAge: 60 * 60 * 24 * 365})
  cookies.set('usernameID', id, {path: '/', maxAge: 60 * 60 * 24 * 365})
}

export const guestCookie = props => {
  const {cookies} = props
  if (sessionStorage.getItem('guestID')) {
    cookies.set('guestID', sessionStorage.getItem('guestID'), {path: '/'})
    return
  }

  cookies.set('guestID', uuid(), {path: '/'})
  sessionStorage.setItem('guestID', cookies.get('guestID'))
}
export const removeCookie = (props, cookieName) => {
  let {cookies} = props

  cookies.remove(cookieName, {
    path: '/'
  })
}
