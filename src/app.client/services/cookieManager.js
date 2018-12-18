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
  if (sessionStorage.getItem("guestID")) {
    console.log("sessionStorage existe");
    cookies.set("guestID", sessionStorage.getItem("guestID"), { path: "/" });
    return;
  }

  cookies.set("guestID", uuid(), { path: "/" });
  sessionStorage.setItem("guestID", cookies.get("guestID"));
}
