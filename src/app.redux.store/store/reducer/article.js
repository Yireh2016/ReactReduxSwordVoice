const initialState = {
  id: "",
  date: "",
  html: "",
  author: "",
  title: "",
  description: "",
  keywords: "",
  comments: [
    {
      _id: "",
      userName: "",
      message: "",
      date: new Date(),
      responses: [
        { _id: "", userName: "", message: "", date: new Date(), claps: 0 }
      ],
      claps: 0
    }
  ],
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
    case "SET_COMMENT_CLAPS": {
      const { index, count } = action.payload;
      newState.comments[index].claps = count;
      break;
    }

    case "SET_RESPONSE_CLAPS": {
      const { iComment, iResponse, count } = action.payload;
      newState.comments[iComment].response[iResponse].claps = count;
      break;
    }

    case "SET_ARTICLE": {
      newState = action.payload;

      break;
    }

    case "ADD_VIEWS_COUNT": {
      newState.socialCount.views = action.payload;
      break;
    }

    case "ADD_CLAPS_COUNT": {
      newState.socialCount.claps = action.payload;
      break;
    }

    case "SET_SHARE_COUNT": {
      newState.socialCount.share = action.payload;
      break;
    }
    case "SET_COMMENTS_COUNT": {
      newState.socialCount.comments = action.payload;
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
