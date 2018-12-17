const initialState = {
  isUserLoggedIn: false,
  loggedUserAvatar: undefined,
  loggedUserName: undefined
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  console.log("reducer payload", action.payload);
  if (action.type === "LOGGED_IN") {
    // logear al usuario
    newState.isUserLoggedIn = true;
    newState.loggedUserAvatar = action.payload.loggedUserAvatar;
    newState.loggedUserName = action.payload.userName;

    // console.log("action.payload.loggedUserName", action.payload.loggedUserName);
  }

  if (action.type === "LOGGED_OUT") {
    // deslogear al usuario
    newState.isUserLoggedIn = false;
    newState.loggedUserAvatar = undefined;
    newState.loggedUserName = "";
  }

  return newState;
};

export default reducer;
