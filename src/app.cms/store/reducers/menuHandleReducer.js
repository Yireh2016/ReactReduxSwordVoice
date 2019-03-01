const initialState = {
  main: true,
  create: false
};
//estado inicial viene del CONFIG REDUCER.JS
const menuHandleReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case "CHANGE_MENU": {
      newState = action.payload;
      break;
    }
  }

  return newState;
};

export default menuHandleReducer;
