const initialState = {
  elements: []
};
//estado inicial viene del CONFIG REDUCER.JS
const postEditCtlreducer = (state = initialState, action) => {
  let newState = state;

  console.log("action.payload", action.payload);
  switch (action.type) {
    case "ADD_ELEMENT": {
      newState.elements.push(action.payload);
      break;
    }

    case "DEFAULT": {
      newState = state;
      break;
    }
  }

  return newState;
};

export default postEditCtlreducer;
