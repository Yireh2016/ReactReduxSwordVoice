//modules
import React from "react";
import { render } from "react-dom";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

//assets
import "./cms.index.css";

//reducers
import reducer from "./store/reducers/reducer";
import postEditCtlreducer from "./store/reducers/postEditionControlReducer";
//components
import App from "./app.cms";

// other imports
//Store

const rootReducer = combineReducers({
  login: reducer,
  postCreation: postEditCtlreducer
});
const store = createStore(
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
