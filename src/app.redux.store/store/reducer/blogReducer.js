const initialState = {
  articlesCount: 0,
  popularFilter: {
    views: true,
    shares: false,
    comments: false,
    claps: false
  },
  popularArticlesArr: [
    {
      title: "",
      postImg: "",
      postGradient: "",
      keywords: [],
      author: "",
      date: "",
      url: "",
      avatar: "",
      summaryTextHtml: ""
    }
  ],
  articlesArr: [
    {
      title: "",
      postImg: "",
      postGradient: "",
      keywords: [],
      author: "",
      date: "",
      url: "",
      avatar: "",
      summaryTextHtml: ""
    }
  ]
};
//estado inicial viene del CONFIG REDUCER.JS
const blogReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "ARTICLES_ARR": {
      newState.articlesArr = action.payload;
      break;
    }
    case "SET_POPULAR_ARR": {
      newState.popularArticlesArr = action.payload;
      break;
    }

    case "SET_ARTICLES_COUNT": {
      newState.articlesCount = action.payload;
      break;
    }

    case "SET_POPULAR_FILTER": {
      newState.popularFilter = action.payload;
      break;
    }
  }

  return newState;
};

export default blogReducer;
