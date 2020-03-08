import express from "express";
import mongoose from "mongoose";
// import fs from "fs";

//controllers
import {
  signUpCtrl,
  signUpEmailConfirmCtrl,
  emailVerificationCtrl,
  recoveryPasswdCtrl,
  recoveryUsernameCtrl,
  passwordRecoverCtrl,
  updatePasswdCtrl,
  loginCtrl,
  logoutCtrl,
  autoLogin,
  sendUserTempImageCtrl
} from "../controllers/client/user";

import {
  createPostCtrl,
  uploadTempFileCtrl,
  deletePostCtrl,
  addClassToPostCtrl,
  getClassFromPostCtrl,
  getPostCtrl,
  updatePostCtrl,
  getArticleCtrl,
  addToSiteMapCtrl,
  removeSiteMapCtrl,
  createSiteMapCtrl
} from "../controllers/cms/postsControllers";
import {
  socialCtrl,
  getMoreCommentsCtrl,
  getMoreResponsesCtrl,
  getMorePostsCtrl,
  getMoreSimilarPostsCtrl,
  setCommentCtrl,
  setReplyCtrl,
  updateCommentClaps,
  updateReplyClaps,
  deleteCommentCtrl,
  filterPopularCtrl,
  searchArticleCtrl,
  searchLastArticlesCtrl,
  advancedSearchDbCtrl
} from "../controllers/client/articleCtrl";

import {
  sendContactFormCtrl,
  emailNewsVerificationCtrl
} from "../controllers/visitor/visitorCtrl";

import { updateUserCtrl } from "../controllers/cms/usersControllers";

let routerAPI = express.Router();
let usersModel = mongoose.model("User");

function authAPI(req, res, next) {
  if (req.signedCookies.sessionID) {
    return next();
  }

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // res.redirect("/");
}

function guestAPI(req, res, next) {
  if (req.signedCookies.guestID) {
    return next();
  }

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // res.redirect("/");
}

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    POST C of CRUD   /////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// insertar usuario en la DB en el SIGN UP
//se usa en: signUpForm
routerAPI.post("/signup", guestAPI, signUpCtrl);

routerAPI.post("/createSiteMap", createSiteMapCtrl); //FIXME erase

routerAPI.post("/signUpEmailConfirm", signUpEmailConfirmCtrl);

routerAPI.post("/addToSiteMap", authAPI, addToSiteMapCtrl);
// hacer Login
//se usa en: logInForm
routerAPI.post("/login", guestAPI, loginCtrl);

routerAPI.post("/sendUserTempImage", guestAPI, sendUserTempImageCtrl);

routerAPI.post("/sendContactForm", guestAPI, sendContactFormCtrl);

routerAPI.post("/getMoreSimilarPosts/", guestAPI, getMoreSimilarPostsCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    GET R of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.get("/logout", guestAPI, logoutCtrl);

routerAPI.get("/emailVerification", emailVerificationCtrl);
routerAPI.get("/passwordRecover", passwordRecoverCtrl);

routerAPI.get("/emailNewsVerification", emailNewsVerificationCtrl);

routerAPI.get("/recoveryPasswd", guestAPI, recoveryPasswdCtrl);
routerAPI.get("/recoveryUsername", guestAPI, recoveryUsernameCtrl);

// obtener todos MUST BE AUTH
//se usa en: DEVELOPMENT ONLY
routerAPI.get("/users", authAPI, (req, res) => {
  const { limit, skip } = req.body;
  usersModel
    .find()
    .select(
      "userName _id userAvatar userCountry userFirstName userLastName userEmail userBirthDate userGender userInterests userOtherInterests userType isUserActive userCreationDate"
    )
    .limit(limit)
    .skip(skip)
    .exec((err, users) => {
      if (err) {
        console.log("err", err);
        res.status(404).json(err);
        return;
      }

      res.status(200).json(users);
    });

  // const users = await usersModel.find();

  // console.log('users', users);
  // res.status().json(users);
});

// obtener usuario especifico must be AUTH
//se usa en: signUpForm
routerAPI.get("/users/:userId", authAPI, (req, res) => {
  usersModel
    .findById(req.params.userId)
    .select(
      "userName _id userAvatar userCountry userFirstName userLastName userEmail userBirthDate userGender userInterests userOtherInterests userType isUserActive userCreationDate"
    )
    .exec((err, user) => {
      if (err) {
        res.status(501).json(`thre was an error: ${err}`);
      } else {
        res.status(200).json(user);
      }
    });
});

// Obtener email
//se usa en: signUpForm
// para verificar, en tiempo real, que el email del usuario no se encuentre duplicado
routerAPI.get("/searchEmail/:email", guestAPI, (req, res) => {
  const email = req.params.email;
  usersModel.find({ userEmail: email }).exec((err, user) => {
    if (err) {
      res.status(501).json(`thre was an error: ${err}`);
    } else {
      user[0]
        ? res.status(200).json(user[0].userName)
        : res.status(404).json("not found");
    }
  });
});

//obtener  usuario especifico por username AUTH
//se usa en: signUpForm
// para verificar, en tiempo real, que el username del usuario no se encuentre duplicado
routerAPI.get("/searchUser/:userName", guestAPI, (req, res) => {
  const userName = req.params.userName;
  usersModel.find({ userName: userName }).exec(function(err, userName) {
    if (err) {
      res.status(501).json(`thre was an error: ${err}`);
    } else {
      userName[0]
        ? res.status(200).json(userName)
        : res.status(404).json(userName);
    }
  });
});

//obtener  usuario especifico por SessionID AUTH
//se usa en: login del CMS
// obtiene datos de usuario para hacer login en CMS
routerAPI.get("/searchSessionID/", authAPI, autoLogin);

routerAPI.get("/getMoreComments/", guestAPI, getMoreCommentsCtrl);
routerAPI.get("/getMoreResponses/", guestAPI, getMoreResponsesCtrl);
routerAPI.get("/getMorePosts/", guestAPI, getMorePostsCtrl);
routerAPI.get("/searchArticle/", guestAPI, searchArticleCtrl);
routerAPI.get("/searchLastArticles/", guestAPI, searchLastArticlesCtrl);
routerAPI.get("/advancedSearchDb/", guestAPI, advancedSearchDbCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
/////////  DELETE d of CRUD //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
// Eliminar usuario unico
//se usa en contact y deberia usarse en PROFILE
//para eliminar usuario de la DB

routerAPI.delete("/removeSiteMap", authAPI, removeSiteMapCtrl);
routerAPI.delete("/users/:userId", authAPI, (req, res) => {
  usersModel.findOneAndDelete({ userName: req.params.userId }).exec(err => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(204).json({ message: "user removed" });
  });
});

routerAPI.delete("/deleteComment", authAPI, deleteCommentCtrl);

// Eliminar todos
//se usa en: DEVELOPMENT ONLY
// routerAPI.delete("/allUsers", (req, res) => {
//   usersModel.remove({}, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.end("success");
//     }
//   });
// });

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
/////////  UPDATE U of CRUD //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.put("/sessionUpdate/:username", guestAPI, (req, res) => {
  const username = req.params.username;
  const sessionId = req.cookies.sessionId;
  usersModel.findOneAndUpdate(
    { userName: username },
    {
      userSessionId: sessionId
    },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("NEW SESSION ID ", sessionId);

        res.end("success");
      }
    }
  );
});

routerAPI.put("/updatePasswd", updatePasswdCtrl);

//add comments
routerAPI.put("/setComment", authAPI, setCommentCtrl);
routerAPI.put("/updateCommentClaps", authAPI, updateCommentClaps);
routerAPI.put("/updateReplyClaps", authAPI, updateReplyClaps);

routerAPI.put("/setReply", authAPI, setReplyCtrl);

//update post Social ej claps,share,comments
routerAPI.put("/socialCounter", guestAPI, socialCtrl);
routerAPI.put("/filterPopular", guestAPI, filterPopularCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////       API CMS       /////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    POST C of CRUD   /////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//Crear un nuevo proyecto para crear un articulo
routerAPI.post("/createPost", authAPI, createPostCtrl);
routerAPI.post("/uploadTempFile", authAPI, uploadTempFileCtrl);
routerAPI.post("/addClass", authAPI, addClassToPostCtrl);
// routerAPI.post("/deleteTempFile", authAPI, deleteTempFileCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    GET R of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// obtener todos MUST BE AUTH
//se usa en: DEVELOPMENT ONLY
routerAPI.get("/getPosts", guestAPI, getPostCtrl);

routerAPI.get("/getPosts/:projectName", authAPI, getPostCtrl);

routerAPI.get("/getArticle/:projectName", guestAPI, getArticleCtrl);

routerAPI.get("/getClasses/:filename", authAPI, getClassFromPostCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    UPDATE U of CRUD   ///////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.put("/updatePost", authAPI, updatePostCtrl);
routerAPI.put("/updateUserProfile/:userName", authAPI, updateUserCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    DELETE D of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.delete("/deletePost/:projectName", authAPI, deletePostCtrl);

// routerAPI.get("/generateContent/", (req, res) => {
//   articleModel.find({}).exec((err, articles) => {
//     if (err) {
//       res.status(404).json(err);
//       return;
//     }
//     for (let index = 0; index < articles.length; index++) {
/*       const content = articles[index].html.replace(
        />undefined|<\/?html|<\/?xmp|<\/?wbr|<\/?video|<\/?var|<\/?ul|<\/?u|<\/?tt|<\/?track|<\/?tr|<\/?title|<\/?time|<\/?thead|<\/?th|<\/?tfoot|<\/?textarea|<\/?template|<\/?td|<\/?tbody|<\/?table|<\/?sup|<\/?summary|<\/?sub|<\/?style|<\/?strong|<\/?strike|<\/?span|<\/?spacer|<\/?source|<\/?small|<\/?slot|<\/?shadow|<\/?select|<\/?section|<\/?script|<\/?samp|<\/?s|<\/?ruby|<\/?rtc|<\/?rt|<\/?rp|<\/?rb|<\/?q|<\/?progress|<\/?pre|<\/?plaintext|<\/?picture|<\/?param|<\/?p|<\/?output|<\/?option|<\/?optgroup|<\/?ol|<\/?object|<\/?noscript|<\/?noframes|<\/?noembed|<\/?nobr|<\/?nextid|<\/?nav|<\/?multicol|<\/?meter|<\/?meta|<\/?menuitem|<\/?menu|<\/?marquee|<\/?mark|<\/?map|<\/?main|<\/?listing|<\/?link|<\/?li|<\/?legend|<\/?label|<\/?keygen|<\/?kbd|<\/?isindex|<\/?ins|<\/?input|<\/?img|<\/?image|<\/?iframe|<\/?i|<\/?hr|<\/?hgroup|<\/?header|<\/?head|<\/?frameset|<\/?frame|<\/?form|<\/?footer|<\/?font|<\/?figure|<\/?figcaption|<\/?fieldset|<\/?embed|<\/?em|<\/?element|<\/?dt|<\/?dl|<\/?div|<\/?dir|<\/?dialog|<\/?dfn|<\/?details|<\/?del|<\/?dd|<\/?datalist|<\/?data|<\/?content|<\/?command|<\/?colgroup|<\/?col|<\/?code|<\/?cite|<\/?center|<\/?caption|<\/?canvas|<\/?button|<\/?br|<\/?body|<\/?blockquote|<\/?blink|<\/?big|<\/?bgsound|<\/?bdo|<\/?bdi|<\/?basefont|<\/?base|<\/?b|<\/?audio|<\/?aside|<\/?article|<\/?area|<\/?applet|<\/?address|<\/?acronym|<\/?abbr|<\/?a|[\w-]+="?'?[\w:;.\/&()%#?@\s,\\-]*"?'?|<\/?h[1-6]|\/?>/gi,
*/
//         ""
//       );

//       console.log(content);

//       articles[index].content = content;

//       articles[index].save();
//     }
//     res.status(200).send("ready");
//   });
// });

export default routerAPI;
