//modules
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { CookiesProvider } from "react-cookie";
// import { syncHistoryWithStore, routerReducer } from "react-router-redux";
//reducer
import reducer from "../app.redux.store/store/reducer";

//components
import App from "./app";
//main store
// const store = createStore(
//   combineReducers({
//     ...reducer,
//     routing: routerReducer
//   }),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const history = syncHistoryWithStore(browserHistory, store);

hydrate(
  <CookiesProvider>
    <Provider store={store}>
      {/* <Router history={history}> */}
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
