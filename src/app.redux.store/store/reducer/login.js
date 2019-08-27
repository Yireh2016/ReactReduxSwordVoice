const initialState = {
  isUserLoggedIn: false,
  loggedUserFullName: undefined,
  loggedUserAvatar: undefined,
  loggedUserName: undefined,
  loggedUserID: undefined,
  userType: "user",
  showSignUp: false,
  showLogIn: false
};
//estado inicial viene del CONFIG REDUCER.JS
const login = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "LOGGED_IN": {
      newState.isUserLoggedIn = true;
      newState.loggedFullName = action.payload.userFullName;
      newState.loggedUserAvatar = action.payload.userAvatar;
      newState.loggedUserName = action.payload.userName;
      newState.loggedUserID = action.payload.userID;
      newState.userType = action.payload.userType;

      break;
    }

    case "SET_AVATAR": {
      newState.loggedUserAvatar = action.payload;
      break;
    }

    case "LOGGED_OUT": {
      newState.isUserLoggedIn = false;
      newState.loggedUserAvatar = undefined;
      newState.loggedUserName = "";
      newState.loggedUserID = undefined;

      break;
    }

    case "SET_SHOW_SIGNUP": {
      newState.showSignUp = action.payload;

      break;
    }

    case "SET_SHOW_LOGIN": {
      newState.showLogIn = action.payload;

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

export default login;
