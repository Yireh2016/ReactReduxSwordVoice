import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

//other Reducers
import reducer from "./reducer";
import article from "./article";
import blog from "./blogReducer";
import responsiveDialog from "./responsiveDialog";
import dialog from "./dialogReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    logInStatus: reducer,
    article: article,
    blog: blog,
    responsiveDialog: responsiveDialog,
    dialog: dialog
  });
