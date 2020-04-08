const initialState = {
  articlesCount: 0,
  searchCount: 0,
  searchValue: "",
  popularFilter: {
    views: true,
    shares: false,
    comments: false,
    claps: false,
  },
  popularArticlesArr: [
    {
      title: null,
      postImg: "",
      postGradient: "",
      keywords: [],
      author: "",
      date: "",
      url: "",
      avatar: "",
      summaryTextHtml: "",
    },
  ],
  articlesArr: [
    {
      title: null,
      postImg: "",
      postGradient: "",
      keywords: [],
      author: "",
      date: "",
      url: "",
      avatar: "",
      summaryTextHtml: "",
    },
  ],
  searchArticles: [],
};
//estado inicial viene del CONFIG REDUCER.JS
const blogReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "ARTICLES_ARR": {
      newState.articlesArr = action.payload;
      break;
    }

    case "SET_SEARCH_ARTICLES": {
      newState.searchArticles = action.payload;
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
    } //searchCount

    case "SET_SEARCH_COUNT": {
      newState.searchCount = action.payload;
      break;
    }

    case "SET_SEARCH_VALUE": {
      newState.searchValue = action.payload;
      break;
    }
  }

  return newState;
};

export default blogReducer;
