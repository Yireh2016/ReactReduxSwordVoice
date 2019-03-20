import uuid from "uuid/v1";
export const sessionCookie = props => {
  //get this.props.cookies
  const { cookies } = props;
  //setting a cookie
  //verifica si el cookie de session existe

  cookies.set("sessionId", uuid(), { path: "/", maxAge: 60 * 60 * 24 * 365 });
};

export const guestCookie = props => {
  const { cookies } = props;
  if (sessionStorage.getItem("guestID")) {
    console.log("sessionStorage existe");
    cookies.set("guestID", sessionStorage.getItem("guestID"), { path: "/" });
    return;
  }

  cookies.set("guestID", uuid(), { path: "/" });
  sessionStorage.setItem("guestID", cookies.get("guestID"));
};
export const removeCookie = (props, cookieName) => {
  console.log("document.cookie", document.cookie);
  document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  let { cookies } = props;
  console.log("cookies", cookies);
  console.log("props", props);

  cookies.remove(cookieName, {
    path: "/"
  });
};
