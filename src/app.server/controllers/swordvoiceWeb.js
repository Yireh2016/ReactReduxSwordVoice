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
import paragraphService from "../../services/paragraphService";
import keywordsToArr from "../../services/keywordsToArr";

//services
import { readToken } from "../../app.api/services/tokenHandler";
import updateArticleAvatars from "../../services/updateArticleAvatars";

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
  console.log("RENDERING preloadedState to send to templeta preloadedState");
  res.send(
    template({
      body: renderTemplate(req, store),
      title: "Hello World from the server",
      initialState: safeStringify(preloadedState)
    })
  );
};
const swordvoiceWeb = async (req, res) => {
  let articleModel = mongoose.model("Article");

  console.log("swordvoiceWeb INICIO");

  const routerPromise = () =>
    new Promise((resolve, reject) => {
      console.log(" routerPromise EJECUTANDOSE");

      if (req.url.match("/blog/post/")) {
        const url = req.url.replace("/blog/post/", "");
        articleModel
          .findOne({ url: `${url}` })
          .select(
            "_id date html title description keywords author socialCount comments"
          )
          .populate({
            path: "author",
            select: "userFirstName userLastName userAvatar"
          }) //traer solo lo que necesito firstname y lastname
          .exec()
          .then(async completeArticle => {
            if (completeArticle) {
              let commentsArr = [...completeArticle.comments];

              commentsArr = await updateArticleAvatars(commentsArr);

              const {
                date,
                html,
                author,
                title,
                description,
                keywords,
                socialCount
              } = completeArticle;
              const id = completeArticle._id;

              const article = {
                id,
                title,
                html,
                socialCount,
                comments: commentsArr,
                author: author.userFirstName + " " + author.userLastName,
                summary: description,
                date: dbDateToNormalDate(date),
                categories: keywords,
                avatar: author.userAvatar
              };
              store.dispatch({ type: "SET_ARTICLE", payload: article });

              console.log("ARTICLE FOUND");

              console.log("SEARCHING SIMILAR ARTICLES");
              articleModel
                .find()
                .select()
                .limit(7)
                .populate("author")
                .sort({ _id: "descending" })
                .exec()
                .then(posts => {
                  let postMinimumData = [];
                  for (let i = 0; i < posts.length; i++) {
                    postMinimumData[i] = {
                      url: posts[i].url,
                      postImg:
                        posts[i].thumbnail &&
                        `url(http://localhost:3000/articles/${posts[i].url}/${
                          posts[i].thumbnail.name
                        })`,
                      postGradient:
                        posts[i].thumbnail &&
                        `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
                          posts[i].thumbnail.color
                        } 73.79%)`,
                      title: posts[i].title,
                      summaryTextHtml: paragraphService(posts[i].description),
                      author:
                        `${posts[i].author.userFirstName} ` +
                        `${posts[i].author.userLastName}`,
                      avatar: posts[i].author.userAvatar,
                      date: dbDateToNormalDate(posts[i].date),
                      keywords: keywordsToArr(posts[i].keywords[0])
                    };
                  }

                  store.dispatch({
                    type: "ARTICLES_ARR",
                    payload: postMinimumData
                  });
                  resolve();
                });
              // resolve();
            } else {
              console.log(" ARTICLE NOT FOUND");
              store.dispatch({ type: "DEFAULT_ARTICLE" });
              res.redirect("/notFound");
            }
          })
          .catch(err => {
            console.log("error on finding article", err);
          });
      } else if (req.url.match("/blog")) {
        console.log("entrando a /BLOG");
        articleModel
          .find({ isPublished: true })
          .select()
          .limit(7)
          .populate("author")
          .sort({ _id: "descending" })
          .exec()
          .then(posts => {
            let postMinimumData = [];
            for (let i = 0; i < posts.length; i++) {
              postMinimumData[i] = {
                url: posts[i].url,
                postImg:
                  posts[i].thumbnail &&
                  `url(http://localhost:3000/articles//${posts[i].url}/${
                    posts[i].thumbnail.name
                  })`,
                postGradient:
                  posts[i].thumbnail &&
                  `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
                    posts[i].thumbnail.color
                  } 73.79%)`,
                title: posts[i].title,
                summaryTextHtml: paragraphService(posts[i].description),
                author:
                  `${posts[i].author.userFirstName} ` +
                  `${posts[i].author.userLastName}`,
                avatar: posts[i].author.userAvatar,
                date: dbDateToNormalDate(posts[i].date),
                keywords: keywordsToArr(posts[i].keywords[0])
              };
            }

            store.dispatch({ type: "ARTICLES_ARR", payload: postMinimumData });
            resolve();
          })
          .catch(err => {
            console.log("error en blog ", err);
            reject(err);
          });
      } else {
        resolve();
      }
    });

  const userLoggedInPromise = () =>
    new Promise(resolve => {
      console.log("EJECUTANDO userLoggedInPromise ");

      if (req.signedCookies.sessionID) {
        const tokenData = readToken(req.signedCookies.sessionID, {
          encryptKey: `${process.env.ENCRYPTKEY}`,
          encryptAlgorithm: "aes-256-cbc"
        });

        console.log("Checkiing token ", tokenData);

        const userName = tokenData.data.userName;
        const usernameID = tokenData.data.id;
        const userFullName = tokenData.data.userFullName;
        const userType = tokenData.data.userType;

        successOnFindingUserAndDistpach(
          { userName, _id: usernameID, userFullName, userType },
          store
        );
        resolve();
      } else {
        console.log("USER NOT LOGGUED IN ");
        store.dispatch({ type: "DEFAULT" });
        resolve("");
      }
    });

  try {
    // await dbRegular();
    await routerPromise();
    console.log("end routerPromise");
    await userLoggedInPromise();
    console.log("end userLoggedInPromise");

    renderWithPreloadedState(req, res, store);
    console.log("end renderWithPreloadedState");
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

// const dbRegular = () => {
//   new Promise((resolve, reject) => {
//     let articleModel = mongoose.model("Article");

//     articleModel
//       .find({ "comments.message": { $exists: true } })
//       .select("comments userAvatar ")
//       .exec((err, articles) => {
//         if (err) {
//           reject(err);
//         }

//         console.log("articles length", articles.length);
//         console.log("articles", articles);
//         articles.forEach(async (article, i) => {
//           const editArticle = new Promise(resolve => {
//             // let commentsArr = article.comments;..

//             article.comments
//               ? console.log(
//                   "article.comments len dentro del foreach",
//                   article.comments.length
//                 )
//               : console.log(
//                   "article.comments dentro del foreach",
//                   article.comments
//                 );

//             for (let index = 0; index < article.comments.length; index++) {
//               if (typeof article.comments[index].userAvatar === "string") {
//                 const avatarExists = article.comments[index].userAvatar.match(
//                   "data"
//                 );
//                 console.log("dentro del FOR", index);
//                 avatarExists
//                   ? console.log("avatarExists length", avatarExists.length)
//                   : console.log("avatarExists ", avatarExists);

//                 // const article = article.comments[index];

//                 if (!avatarExists) {
//                   article.comments[
//                     index
//                   ].userAvatar = `data:image/jpeg;base64,${
//                     article.comments[index].userAvatar
//                   }`;
//                 }

//                 console.log(
//                   "new user avatart ",
//                   article.comments[index].userAvatar.match("data").length
//                 );
//               } else {
//                 article.comments[index].userAvatar = "";
//                 console.log("avatar was binary ");
//               }

//               // userModel
//               //   .find({ userName: article.comments[index].userName })
//               //   .select("_id")
//               //   .exec((err, user) => {
//               //     let newComment = article.comments[index];
//               //     if (!newComment.userID) {
//               //       newComment.userID = user[0]._id;
//               //       article.comments[index] = newComment;
//               //       console.log(
//               //         "comment userid",
//               //         article.comments[index].userID
//               //       );
//               //       console.log("saving", index);
//               //       resolve();
//               //     } else {
//               //       resolve();
//               //     }
//               //   });
//             }

//             article.save(() => {
//               console.log("finished saving", i);
//               resolve();
//             });
//           });

//           await editArticle;
//           console.log("finish editing one article");
//         });

//         resolve();
//       });
//   });
// };

export default swordvoiceWeb;
