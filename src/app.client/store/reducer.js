const initialState = {
  isUserLoggedIn: false
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === "LOGGED_IN") {
    // logear al usuario
    newState.isUserLoggedIn = true;
  }

  if (action.type === "LOGGED_OUT") {
    // logear al usuario
    newState.isUserLoggedIn = false;
  }

  return newState;
};

export default reducer;
