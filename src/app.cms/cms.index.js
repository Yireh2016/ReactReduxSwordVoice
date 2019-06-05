//modules
import React from "react";
import { render } from "react-dom";
import { CookiesProvider } from "react-cookie";
import "raf/polyfill";
import "@babel/polyfill"; //para que axios funcione en ie11
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

//assets
import "./cms.index.css";

//reducers
import reducer from "./store/reducers/reducer";
import postEditCtlreducer from "./store/reducers/postEditionControlReducer";
import menuHandleReducer from "./store/reducers/menuHandleReducer";
import userProfileReducer from "./store/reducers/userProfileReducer";
import dialogReducer from "./store/reducers/dialogReducer";

//components
import App from "./app.cms";

// other imports
//Store

const rootReducer = combineReducers({
  login: reducer,
  postCreation: postEditCtlreducer,
  menu: menuHandleReducer,
  userProfile: userProfileReducer,
  dialog: dialogReducer
});
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
