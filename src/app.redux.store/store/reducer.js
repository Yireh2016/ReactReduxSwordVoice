const initialState = {
  isUserLoggedIn: false,
  loggedUserAvatar: undefined,
  loggedUserName: undefined
};

const reducer = (state = initialState, action) => {
  console.log("state on reducer before action", state);
  const newState = { ...state };
  console.log("cloned state on reducer before action", state);

  if (action.type === "LOGGED_IN") {
    // logear al usuario
    newState.isUserLoggedIn = true;
    newState.loggedUserAvatar = action.payload.loggedUserAvatar;
    newState.loggedUserName = action.payload.userName;

    console.log("action", action);
    // console.log("action.payload.loggedUserName", action.payload.loggedUserName);
  }

  if (action.type === "LOGGED_OUT") {
    // deslogear al usuario
    newState.isUserLoggedIn = false;
    // newState.loggedUserAvatar = undefined;
    // newState.loggedUserName = "";
  }

  console.log(`LOGGED_IN action newState`, newState);
  return newState;
};

export default reducer;
