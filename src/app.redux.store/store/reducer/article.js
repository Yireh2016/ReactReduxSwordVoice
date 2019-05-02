const initialState = {
  date: "",
  html: "",
  author: "",
  title: "",
  description: "",
  keywords: "",
  comments: [],
  socialCount: {
    claps: 0,
    share: 0,
    comments: 0,
    views: 0
  }
};
//estado inicial viene del CONFIG REDUCER.JS
const article = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_ARTICLE": {
      newState = action.payload;

      break;
    }

    case "ADD_VIEWS_COUNT": {
      newState.socialCount.views = newState.socialCount.views + action.payload;
      break;
    }

    case "ADD_CLAPS_COUNT": {
      newState.socialCount.claps = newState.socialCount.claps + action.payload;
      break;
    }

    case "SET_SHARE_COUNT": {
      newState.socialCount.share = newState.socialCount.share + action.payload;
      break;
    }
    case "SET_COMMENTS_COUNT": {
      newState.socialCount.comments =
        newState.socialCount.comments + action.payload;
      break;
    }
    case "SET_COMMENTS": {
      newState.comments = action.payload;
      break;
    }

    case "DEFAULT_ARTICLE": {
      break;
    }
  }

  return newState;
};

export default article;
