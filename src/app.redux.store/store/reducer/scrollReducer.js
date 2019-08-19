const initialState = {
  scrollTop: 0,
  delta: 0
};
//estado inicial viene del CONFIG REDUCER.JS
const scrollReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case "SET_SCROLL_TOP": {
      newState.scrollTop = action.payload;
      break;
    }
    case "SET_DELTA_SCROLL": {
      newState.delta = action.payload;
      break;
    }
  }

  return newState;
};

export default scrollReducer;
