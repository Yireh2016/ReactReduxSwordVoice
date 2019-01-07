import React from "react";
import { Provider } from "react-redux";
import mongoose from "mongoose";

import { ConnectedRouter } from "connected-react-router";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
//store
import { store, history } from "../../app.redux.store/store/configStore";
//components
import App from "../../app.client/app";
import ScrollToTop from "../../app.client/components/general/scrollToTop/scrollToTop.component";
//assets
import template from "../templates/template";

const swordvoiceWeb = (req, res) => {
  // const isMobile = false;
  const context = {};
  // const initialState = { isMobile };
  let renderTemplate = store => {
    const appString = renderToString(
      <CookiesProvider cookies={req.universalCookies}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Router location={req.url} context={context}>
              <ScrollToTop>
                <App />
              </ScrollToTop>
            </Router>
          </ConnectedRouter>
        </Provider>
      </CookiesProvider>
    );

    return appString;
  };
  let preloadedState;
  let payload;
  console.log("req.cookies.sessionId", req.cookies.sessionId);
  if (req.cookies.sessionId) {
    console.log("usuario esta logeuado");
    const sessionId = req.cookies.sessionId;
    let usersModel = mongoose.model("User");
    let query = usersModel.find({ userSessionId: sessionId });
    query.exec((err, user) => {
      if (err) {
        console.log(`Server Error: Cannot Find Session ID ${sessionId}`, err);
      } else {
        payload = {
          // loggedUserAvatar: JSON.stringify(user[0].userAvatar).replace(
          //   /\"/g,
          //   ``
          // ),
          userName: user[0].userName
        };
        console.log("payload de usuario logueado");
        store.dispatch({ type: "LOGGED_IN", payload });
        preloadedState = store.getState();
        console.log("preloadedState logueado", preloadedState);
        res.send(
          template({
            body: renderTemplate(store),
            title: "Hello World from the server",
            initialState: safeStringify(preloadedState)
          })
        );
      }
    });
  } else {
    //se renderiza el estado inicial por defecto
    store.dispatch({ type: "DEFAULT" });
    preloadedState = store.getState();

    res.send(
      template({
        body: renderTemplate(store),
        title: "Hello World from the server",
        initialState: safeStringify(preloadedState)
      })
    );
  }
};

//Note: For each of these examples, to avoid XSS attacks (as per Ben Alpert's blog post), you should use a safeStringify function, rather than JSON.stringify
function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/gi, "<\\/$1")
    .replace(/<!--/g, "<\\!--")
    .replace(/\u2028/g, "\\u2028") // Only necessary if interpreting as JS, which we do
    .replace(/\u2029/g, "\\u2029"); // Ditto
}

export default swordvoiceWeb;
