const initialState = {
  isUserLoggedIn: false,
  loggedUserAvatar: undefined,
  loggedUserName: undefined
};
//estado inicial viene del CONFIG REDUCER.JS
const reducer = (state = initialState, action) => {
  const newState = { ...state };

  console.log("action.payload", action.payload);
  switch (action.type) {
    case "LOGGED_IN": {
      newState.isUserLoggedIn = true;
      newState.loggedUserAvatar = action.payload.loggedUserAvatar;
      newState.loggedUserName = action.payload.loggedUserName;

      break;
    }

    case "LOGGED_OUT": {
      newState.isUserLoggedIn = false;
      newState.loggedUserAvatar = undefined;
      newState.loggedUserName = "";
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
