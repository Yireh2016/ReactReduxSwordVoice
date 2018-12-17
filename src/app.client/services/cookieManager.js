import uuid from "uuid/v1";
export function sessionCookie(props) {
  //get this.props.cookies
  const { cookies } = props;
  //setting a cookie
  //verifica si el cookie de session existe

  cookies.set("sessionId", uuid(), { path: "/" });
}

export function guestCookie(props) {
  const { cookies } = props;
  cookies.set("guestID", uuid(), { path: "/" });
}
