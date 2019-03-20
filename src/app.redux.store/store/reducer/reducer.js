const initialState = {
  isUserLoggedIn: false,
  loggedUserAvatar: undefined,
  loggedUserName: undefined,
  loggedUserID: undefined
};
//estado inicial viene del CONFIG REDUCER.JS
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "LOGGED_IN": {
      newState.isUserLoggedIn = true;
      newState.loggedUserAvatar = action.payload.userAvatar;
      newState.loggedUserName = action.payload.userName;
      newState.loggedUserID = action.payload.userID;

      break;
    }

    case "LOGGED_OUT": {
      newState.isUserLoggedIn = false;
      newState.loggedUserAvatar = undefined;
      newState.loggedUserName = "";
      newState.loggedUserID = undefined;

      break;
    }

    case "DEFAULT": {
      newState.isUserLoggedIn = false;
      newState.loggedUserAvatar = undefined;
      newState.loggedUserName = "";
      break;
    }
  }

  return newState;
};

export default reducer;
