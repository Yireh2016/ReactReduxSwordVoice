const initialState = {
  date: "",
  html: "",
  author: "",
  title: "",
  description: "",
  keywords: "",
  socialCount: {
    like: 0,
    dislike: 0,
    share: 0,
    comments: 0
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

    case "SET_LIKE_COUNT": {
      console.log("action.payload", action.payload);
      newState.socialCount.like = newState.socialCount.like + action.payload;
      break;
    }
    case "SET_DISLIKE_COUNT": {
      newState.socialCount.dislike =
        newState.socialCount.dislike + action.payload;
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

    case "DEFAULT_ARTICLE": {
      break;
    }
  }

  return newState;
};

export default article;
