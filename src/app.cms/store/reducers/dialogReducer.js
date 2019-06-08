const initialState = {
  title: "",
  body: "",
  status: "",
  show: false
};
//estado inicial viene del CONFIG REDUCER.JS
const dialogReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case "SET_DIALOG_SHOW": {
      newState.show = action.payload;
      break;
    }

    case "SET_DIALOG_STATUS": {
      newState.status = action.payload;
      break;
    }

    case "SET_DIALOG_TITLE": {
      newState.title = action.payload;
      break;
    }

    case "SET_DIALOG":
      newState = action.payload;
      break;

    case "SET_DIALOG_BODY": {
      newState.body = action.payload;
      break;
    }
  }

  return newState;
};

export default dialogReducer;
