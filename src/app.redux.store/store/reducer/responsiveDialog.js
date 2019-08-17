const initialState = {
  showResolutionWarning: false
};
//estado inicial viene del CONFIG REDUCER.JS
const responsiveDialogReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case "SET_WARNING": {
      newState.showResolutionWarning = action.payload;
      break;
    }
  }

  return newState;
};

export default responsiveDialogReducer;
