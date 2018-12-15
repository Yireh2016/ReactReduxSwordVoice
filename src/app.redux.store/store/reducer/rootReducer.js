import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

//other Reducers
import reducer from "./reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    logInStatus: reducer
  });
