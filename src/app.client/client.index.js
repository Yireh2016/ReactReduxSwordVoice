//modules
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "@babel/polyfill"; //para que axios funcione en ie11
import "raf/polyfill";
import { ConnectedRouter } from "connected-react-router";
import { StyleRoot } from "radium";
import { loadableReady } from "@loadable/component";
//components
import App from "./app";
import ScrollToTop from "../app.client/components/general/scrollToTop/scrollToTop.component";

import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
//Store
import { store, history } from "../app.redux.store/store/configStore";

//layouts

loadableReady(() => {
  const root = document.getElementById("main");
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <Router history={history}> */}
        <Router>
          <ScrollToTop>
            <StyleRoot>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </StyleRoot>
          </ScrollToTop>
        </Router>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
    root
  );
});
