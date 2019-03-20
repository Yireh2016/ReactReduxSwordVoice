const initialState = {
  date: "",
  html: "",
  author: "",
  title: "",
  description: "",
  keywords: ""
};
//estado inicial viene del CONFIG REDUCER.JS
const article = (state = initialState, action) => {
  let newState = { ...state };
  console.log("action.type", action.type);
  switch (action.type) {
    case "GET_ARTICLE": {
      console.log("action.payload", action.payload);

      newState = action.payload;
      console.log("newstate", newState);

      break;
    }

    case "DEFAULT": {
      break;
    }
  }

  return newState;
};

export default article;
