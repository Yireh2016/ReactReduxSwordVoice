import uuid from "uuid/v1";
export function sessionCookie(props) {
  //get this.props.cookies
  const { cookies } = props;
  //setting a cookie
  //verifica si el cookie de session existe

  cookies.set("sessionId", uuid(), { path: "/" });

  //verifica si el cookie de session es igual al session storage
  // if (
  //   sessionStorage.getItem("swordvoice-sessionID") === cookies.get("sessionId")
  // ) {
  //   return;
  // }

  //si el cookie existe pero no es igual al session storage, acutualiza el session storage con el valor del cookie de sesion
  // sessionStorage.setItem("swordvoice-sessionID", cookies.cookies.sessionId);
}
