import React from "react";
import { Provider } from "react-redux";
import mongoose from "mongoose";
import path from "path";
import { ConnectedRouter } from "connected-react-router";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { StyleRoot } from "radium";
import { ChunkExtractor } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";

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
import { updateArticleAvatars } from "../../services/updateArticleAvatars";
//queries
import getPopularPosts from "./queries/getPopularPosts";
import searchSimilarArticles from "../../common/queries/searchSimilarArticles";

const renderTemplate = (req, store) => {
  const sheet = new ServerStyleSheet();

  const context = {};
  let styleTags2;
  try {
    let html2 = sheet.collectStyles(
      <CookiesProvider cookies={req.universalCookies}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Router location={req.url} context={context}>
              <StyleRoot
                radiumConfig={{ userAgent: req.headers["user-agent"] }}
              >
                <App />
              </StyleRoot>
            </Router>
          </ConnectedRouter>
        </Provider>
      </CookiesProvider>
    );
    renderToString(html2);
    styleTags2 = sheet.getStyleTags();
  } catch (error) {
    // handle error
    console.error("swordvoiceWeb RenderTemplate error", error);
  } finally {
    sheet.seal();
  }

  // This is the stats file generated by webpack loadable plugin
  const statsFile = path.resolve("./dist/assets/loadable-stats.json");
  // We create an extractor from the statsFile
  const extractor = new ChunkExtractor({ statsFile });
  // Wrap your application using "collectChunks"
  const jsx = extractor.collectChunks(
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

  const html = renderToString(jsx);

  // You can now collect your script tags
  const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
  // You can also collect your "preload/prefetch" links
  const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
  // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  let styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();

  styleTags = styleTags + styleTags2;

  return { body: html, scriptTags, linkTags, styleTags };
};

const renderWithPreloadedState = (req, res, store) => {
  let preloadedState = store.getState();
  console.log("RENDERING preloadedState to send to templeta preloadedState");

  const { body, scriptTags, linkTags, styleTags } = renderTemplate(req, store);
  res.send(
    template({
      body,
      scriptTags,
      linkTags,
      styleTags,
      initialState: safeStringify(preloadedState),
      seoID: process.env.SEO_ID
    })
  );
};

const swordvoiceWeb = async (req, res) => {
  let articleModel = mongoose.model("Article");

  const routerPromise = () =>
    new Promise((resolve, reject) => {
      if (req.url.match("/blog/post/")) {
        const RESPONSES_LIMIT = 3;
        const COMMENT_LIMIT = 5;

        const url = req.url.replace("/blog/post/", "");
        articleModel
          .findOne({ url: `${url}` })
          .select(
            "_id date html title description keywords author socialCount url comments isPublished"
          )
          .populate({
            path: "author",
            select: "userFirstName userLastName userAvatar"
          }) //traer solo lo que necesito firstname y lastname
          .exec()
          .then(async completeArticle => {
            if (completeArticle && completeArticle.isPublished) {
              let commentsArr = [...completeArticle.comments];
              const commentsCount = commentsArr.length;

              for (
                let i = 0;
                i < COMMENT_LIMIT && i < commentsArr.length;
                i++
              ) {
                const comment = commentsArr[i];
                //counting responses
                const responsesCount = comment.responses.length;

                //limiting responses

                commentsArr[i].responses = commentsArr[i].responses.slice(
                  0,
                  RESPONSES_LIMIT
                );

                commentsArr[i] = {
                  _id: commentsArr[i]._id,
                  userID: commentsArr[i].userID,
                  userName: commentsArr[i].userName,
                  message: commentsArr[i].message,
                  date: commentsArr[i].date,
                  responses: commentsArr[i].responses,
                  claps: commentsArr[i].claps,
                  responsesCount
                };
              }
              //limiting Comments
              if (COMMENT_LIMIT <= commentsArr.length) {
                commentsArr = commentsArr.slice(0, COMMENT_LIMIT);
              }

              commentsArr = await updateArticleAvatars(commentsArr);

              const {
                date,
                html,
                author,
                title,
                description,
                keywords,
                socialCount,
                url
              } = completeArticle;

              const id = completeArticle._id;

              const article = {
                id,
                title,
                html,
                socialCount,
                url,
                comments: commentsArr,
                commentsCount,
                author: author.userFirstName + " " + author.userLastName,
                summary: description,
                date: dbDateToNormalDate(date),
                categories: keywords,
                avatar: author.userAvatar
              };

              store.dispatch({ type: "SET_ARTICLE", payload: article });

              console.log("SEARCHING SIMILAR ARTICLES");

              let searchStr = `${title} `;
              keywords.forEach(keyword => {
                searchStr = `${searchStr}${keyword} `;
              });

              articleModel
                .find({
                  $and: [
                    {
                      _id: { $ne: id },
                      $text: { $search: `${searchStr}` }
                    },
                    { isPublished: true }
                  ]
                })
                .countDocuments((err, similCount) => {
                  if (err) {
                    console.log("err", err); //TODO erase
                    errFn(err); //FIXME errFn not exist
                    return;
                  }
                  store.dispatch({
                    type: "SET_SIMILAR_ARTICLES_COUNT",
                    payload: similCount
                  });

                  searchSimilarArticles(
                    articleModel,
                    { id, count: 0 },
                    searchStr,
                    arr => {
                      store.dispatch({
                        type: "SET_SIMILAR_ARTICLES",
                        payload: arr
                      });

                      //Getting popular Articles
                      articleModel
                        .find({ isPublished: true })
                        .countDocuments((err, count) => {
                          store.dispatch({
                            type: "SET_ARTICLES_COUNT",
                            payload: count
                          });
                          getPopularPosts(
                            articleModel,
                            "views",
                            count,
                            0,
                            posts => {
                              let postMinimumData = [];
                              for (let i = 0; i < posts.length; i++) {
                                postMinimumData[i] = {
                                  url: posts[i].url,
                                  postImg:
                                    posts[i].thumbnail &&
                                    `url(${process.env.CDN_URL}/articles//${posts[i].url}/${posts[i].thumbnail.name})`,
                                  postGradient:
                                    posts[i].thumbnail &&
                                    `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
                                  title: posts[i].title,
                                  summaryTextHtml: paragraphService(
                                    posts[i].description
                                  ),
                                  author:
                                    `${posts[i].author.userFirstName} ` +
                                    `${posts[i].author.userLastName}`,
                                  avatar: posts[i].author.userAvatar,
                                  date: dbDateToNormalDate(posts[i].date),
                                  keywords: keywordsToArr(posts[i].keywords[0])
                                };
                              }

                              store.dispatch({
                                type: "SET_POPULAR_ARR",
                                payload: postMinimumData
                              });
                              resolve();
                            },
                            err => {
                              console.log("error en blog ", err);
                              reject(err);
                            }
                          );
                        })
                        .catch(err => {
                          console.log("error en blog ", err);
                          reject(err);
                        });
                    },
                    err => {
                      reject(err);
                    }
                  );
                });
            } else {
              console.log(" ARTICLE NOT FOUND");
              store.dispatch({ type: "DEFAULT_ARTICLE" });
              res.redirect("/notFound"); //FIXME it must be reject
            }
          })
          .catch(err => {
            console.log("error on finding article", err);
          });
      } else if (req.url.match("/blog")) {
        articleModel
          .find({ isPublished: true })
          .countDocuments((err, count) => {
            if (err) {
              console.log("error en blog ", err);
              reject(err);
              return;
            }
            console.log("articles count", count);
            store.dispatch({ type: "SET_ARTICLES_COUNT", payload: count });
            articleModel
              .find({ isPublished: true })
              .select("url thumbnail title date keywords description")
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
                      `url(${process.env.CDN_URL}/articles//${posts[i].url}/${posts[i].thumbnail.name})`,
                    postGradient:
                      posts[i].thumbnail &&
                      `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
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
              })
              .then(() => {
                getPopularPosts(
                  articleModel,
                  "views",
                  count,
                  0,
                  posts => {
                    let postMinimumData = [];
                    for (let i = 0; i < posts.length; i++) {
                      postMinimumData[i] = {
                        url: posts[i].url,
                        postImg:
                          posts[i].thumbnail &&
                          `url(${process.env.CDN_URL}/articles//${posts[i].url}/${posts[i].thumbnail.name})`,
                        postGradient:
                          posts[i].thumbnail &&
                          `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
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
                      type: "SET_POPULAR_ARR",
                      payload: postMinimumData
                    });
                    resolve();
                  },
                  err => {
                    console.log("error en blog ", err);
                    reject(err);
                  }
                );
              })
              .catch(err => {
                console.log("error en blog ", err);
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve();
      }
    });

  const userLoggedInPromise = () =>
    new Promise(resolve => {
      if (req.signedCookies.sessionID) {
        const tokenData = readToken(req.signedCookies.sessionID, {
          encryptKey: `${process.env.ENCRYPTKEY}`,
          encryptAlgorithm: "aes-256-cbc"
        });

        const userName = tokenData.data.userName;
        const usernameID = tokenData.data.id;
        const userFullName = tokenData.data.userFullName;
        const userType = tokenData.data.userType;
        const userAvatar = tokenData.data.userAvatar;

        successOnFindingUserAndDistpach(
          { userName, _id: usernameID, userFullName, userType, userAvatar },
          store
        );
        resolve();
      } else {
        store.dispatch({ type: "DEFAULT" });
        resolve("");
      }
    });

  try {
    // await dbRegular();

    //preparing the ssr redux data for state management on server side
    await routerPromise();
    await userLoggedInPromise();

    renderWithPreloadedState(req, res, store);
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
