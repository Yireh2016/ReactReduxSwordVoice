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
//assets
import template from "../templates/template";
import dbDateToNormalDate from "../../services/dbDateToNormalDate";

const swordvoiceWeb = (req, res) => {
  console.log("request", req.url);
  // const isMobile = false;
  const context = {};
  // const initialState = { isMobile };
  let preloadedState;
  let payload;

  const renderWithPreloadedState = finalResult => {
    preloadedState = store.getState();
    console.log("preloadedState", preloadedState);
    console.log("sending ..", finalResult);

    res.send(
      template({
        body: renderTemplate(store),
        title: "Hello World from the server",
        initialState: safeStringify(preloadedState)
      })
    );
  };
  const successOnFindingUser = user => {
    if (user[0]) {
      payload = {
        userName: user[0].userName,
        userID: user[0]._id
      };
      store.dispatch({ type: "LOGGED_IN", payload });

      return;
    }
  };
  const renderTemplate = store => {
    console.log("rendering ...");
    const appString = renderToString(
      <CookiesProvider cookies={req.universalCookies}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Router location={req.url} context={context}>
              <App />
            </Router>
          </ConnectedRouter>
        </Provider>
      </CookiesProvider>
    );

    return appString;
  };

  const articlesPromise = () =>
    new Promise(resolve => {
      if (req.url.match("/blog/post/")) {
        const url = req.url.replace("/blog/post/", "");
        console.log("url", url);
        console.log("req.url", req.url);
        let articleModel = mongoose.model("Article");
        articleModel
          .findOne({ url: `${url}` })
          .select("date html title description keywords author")
          .populate("author") //traer solo lo que necesito
          .exec()
          .then(completeArticle => {
            console.log("checking articles first ...");
            console.log("article", completeArticle);
            const {
              date,
              html,
              author,
              title,
              description,
              keywords
            } = completeArticle;
            const article = {
              title,
              html,
              author: author.userFirstName + " " + author.userLastName,
              summary: description,
              date: dbDateToNormalDate(date),
              categories: keywords
            };
            store.dispatch({ type: "GET_ARTICLE", payload: article });
            resolve(article);
          })
          .catch(err => {
            console.log("error on finding artice", err);
          });
      } else {
        console.log("not article found");
        resolve();
      }
    });

  const userLoggedInPromise = article =>
    new Promise(resolve => {
      console.log("checking for users logged  ...");

      if (req.cookies.sessionId) {
        const sessionId = req.cookies.sessionId;
        let usersModel = mongoose.model("User");

        usersModel
          .find({ userSessionId: sessionId })
          .exec()
          .then(user => {
            console.log("user found", user);
            successOnFindingUser(user);
            if (article) {
              resolve({ ...article, user });
            } else {
              resolve(user);
            }
          })
          .catch(err => {
            console.log(
              `Server Error: Cannot Find Session ID ${sessionId}`,
              err
            );
          });
      } else {
        console.log("user not found");

        store.dispatch({ type: "DEFAULT" });
        resolve(res);
      }
    });

  articlesPromise()
    .then(article => {
      userLoggedInPromise(article);
    })
    .then(finalResult => {
      renderWithPreloadedState(finalResult);
    })
    .catch(err => {
      console.log("errors on promises", err);
    });
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
