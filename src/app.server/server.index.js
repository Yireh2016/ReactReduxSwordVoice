import express from "express";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducer from "../app.redux.store/store/reducer";
require("dotenv").config();
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import morgan from "morgan";

import App from "../app.client/app";
import template from "./template";
import passport from "passport"; //modulo debe estar declarado antes que los modelos
import "../app.api/models/db";
import "../app.api/config/passport"; //modulo debe estar importado despues de los modelos
import routerAPI from "../app.api/routes/api.index";

const server = express();

//middlewares
server.use(morgan("dev"));
server.use(express.json());

//static files
server.use(express.static("dist/assets"));
//Passport initializing for authentication
server.use(passport.initialize());

//routes
server.use("/api", routerAPI);

server.get("/*", (req, res) => {
  //Redux on server side
  const store = createStore(reducer);
  // const isMobile = false;
  const context = {};
  // const initialState = { isMobile };
  const appString = renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <Provider store={store}>
        <Router location={req.url} context={context}>
          {/* <App {...initialState} /> */}
          <App />
        </Router>
      </Provider>
    </CookiesProvider>
  );

  const preloadedState = store.getState();

  res.send(
    template({
      body: appString,
      title: "Hello World from the server",
      initialState: safeStringify(preloadedState)
    })
  );
});

//starting server
server.listen(8080);
console.log("listening");

//Note: For each of these examples, to avoid XSS attacks (as per Ben Alpert's blog post), you should use a safeStringify function, rather than JSON.stringify
function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/gi, "<\\/$1")
    .replace(/<!--/g, "<\\!--")
    .replace(/\u2028/g, "\\u2028") // Only necessary if interpreting as JS, which we do
    .replace(/\u2029/g, "\\u2029"); // Ditto
}
