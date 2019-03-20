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
  switch (action.type) {
    case "GET_ARTICLE": {

      newState = action.payload;

      break;
    }

    case "DEFAULT": {
      break;
    }
  }

  return newState;
};

export default article;
