const initialState = {
  articlesArr: []
};
//estado inicial viene del CONFIG REDUCER.JS
const blogReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "ARTICLES_ARR": {
      newState.articlesArr = action.payload;
      break;
    }
  }

  return newState;
};

export default blogReducer;
