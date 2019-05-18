//modules
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "@babel/polyfill"; //para que axios funcione en ie11
import "raf/polyfill";
import { CookiesProvider } from "react-cookie";
import { ConnectedRouter } from "connected-react-router";
import { StyleRoot } from "radium";
//components
import App from "./app";
import ScrollToTop from "../app.client/components/general/scrollToTop/scrollToTop.component";
//Store
import { store, history } from "../app.redux.store/store/configStore";

//layouts

hydrate(
  <CookiesProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <Router history={history}> */}
        <Router>
          <ScrollToTop>
            <StyleRoot>
              <App />
            </StyleRoot>
          </ScrollToTop>
        </Router>
      </ConnectedRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
