import React from "react";
import { Provider } from "react-redux";
import mongoose from "mongoose";

import { ConnectedRouter } from "connected-react-router";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { StyleRoot } from "radium";

//store
import { store, history } from "../../app.redux.store/store/configStore";
//components
import App from "../../app.client/app";
//assets
import template from "../templates/template";
import dbDateToNormalDate from "../../services/dbDateToNormalDate";
import successOnFindingUserAndDistpach from "../services/actions/successOnFindingUserAndDistpach";

const renderTemplate = (req, store) => {
  const context = {};
  const appString = renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router location={req.url} context={context}>
            <StyleRoot radiumConfig={{ userAgent: req.headers["user-agent"] }}>
              <App />
            </StyleRoot>
          </Router>
        </ConnectedRouter>
      </Provider>
    </CookiesProvider>
  );

  return appString;
};

const renderWithPreloadedState = (req, res, store) => {
  let preloadedState = store.getState();
  console.log("RENDERING preloadedState to send to templeta", preloadedState);
  res.send(
    template({
      body: renderTemplate(req, store),
      title: "Hello World from the server",
      initialState: safeStringify(preloadedState)
    })
  );
};
const swordvoiceWeb = async (req, res) => {
  console.log("swordvoiceWeb INICIO");

  const articlesPromise = () =>
    new Promise(resolve => {
      console.log(" articlesPromise EJECUTANDOSE");

      if (req.url.match("/blog/post/")) {
        const url = req.url.replace("/blog/post/", "");
        let articleModel = mongoose.model("Article");
        articleModel
          .findOne({ url: `${url}` })
          .select("date html title description keywords author")
          .populate({ path: "author", select: "userFirstName userLastName" }) //traer solo lo que necesito firstname y lastname
          .exec()
          .then(completeArticle => {
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
            console.log("ARTICLE FOUND");

            resolve(article);
          })
          .catch(err => {
            console.log("error on finding artice", err);
          });
      } else {
        console.log(" ARTICLE NOT FOUND");
        store.dispatch({ type: "DEFAULT_ARTICLE" });
        resolve("");
      }
    });

  const userLoggedInPromise = () =>
    new Promise(resolve => {
      console.log("EJECUTANDO userLoggedInPromise");

      if (req.cookies.username) {
        console.log("USER  ALREADY GOT HERE BEFORE ");

        console.log(
          "Checkiing if sessionid is updated ",
          req.cookies.sessionId
        );
        const sessionId = req.cookies.sessionId;
        let usersModel = mongoose.model("User");

        usersModel
          .find({ userSessionId: sessionId })
          .select("userName _id")
          .exec()
          .then(user => {
            if (user[0]) {
              successOnFindingUserAndDistpach(user[0], store);
              resolve();
            } else {
              console.log("SessionID OUTDATED");
              store.dispatch({ type: "DEFAULT" });
              resolve("");
            }
          })
          .catch(err => {
            console.log(`Server Error: `, err);
            store.dispatch({ type: "DEFAULT" });
            resolve("");
          });
      } else {
        console.log("USER NOT LOGGUED IN ");
        console.log("ME ESTOY EJECUNTADO store.dispatch DEFAULT");
        store.dispatch({ type: "DEFAULT" });
        resolve("");
      }
    });

  try {
    await articlesPromise();
    console.log("end articlesPromise");
    await userLoggedInPromise();
    console.log("end userLoggedInPromise");

    renderWithPreloadedState(req, res, store);
    console.log("end renderWithPreloadedState");
    console.log("");
  } catch (err) {
    console.log("errors on promises", err);
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
