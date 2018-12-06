//modules
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
//reducer
import reducer from "./store/reducer";

//components
import App from "./app";
//main store
const store = createStore(reducer);
hydrate(
  <Provider store={store}>
    <Router>
      <App {...window.__APP_INITIAL_STATE__} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
