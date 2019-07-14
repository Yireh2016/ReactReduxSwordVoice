import express from "express";
import mongoose from "mongoose";
// import fs from "fs";

//controllers
import {
  signUpCtrl,
  loginCtrl,
  logoutCtrl,
  autoLogin
} from "../controllers/client/user";

import {
  createPostCtrl,
  uploadTempFileCtrl,
  deletePostCtrl,
  addClassToPostCtrl,
  getClassFromPostCtrl,
  getPostCtrl,
  updatePostCtrl,
  getArticleCtrl
} from "../controllers/cms/postsControllers";
import {
  socialCtrl,
  setCommentCtrl,
  setReplyCtrl,
  updateCommentClaps,
  deleteCommentCtrl
} from "../controllers/client/articleCtrl";

import { updateUserCtrl } from "../controllers/cms/usersControllers";

// import axios from "axios";

let routerAPI = express.Router();
let usersModel = mongoose.model("User");
// let articleModel = mongoose.model("Article");

function authAPI(req, res, next) {
  if (req.signedCookies.sessionID) {
    return next();
  }

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // res.redirect("/");
}

function guestAPI(req, res, next) {
  if (req.cookies.guestID) {
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

// cargar imagen de avatar AUTH
//se usa en: signUpForm
routerAPI.post("/upload/:userID", authAPI, (req, res) => {
  console.log("api/upload/ req.body", req.body);
  const { userAvatar } = req.body;
  const userID = req.params.userID;

  usersModel.findByIdAndUpdate(
    userID,
    { userAvatar },

    (err, user) => {
      if (err) {
        console.log("Something wrong when updating data!", err);
        res.status(404).json(err);
        return err;
      }
      console.log("avatar actualizado", user[0]);
      res.status(200).json("avatar uploaded");
    }
  );
});
// insertar usuario en la DB en el SIGN UP
//se usa en: signUpForm
routerAPI.post("/signup", guestAPI, signUpCtrl);

// hacer Login
//se usa en: logInForm
routerAPI.post("/login", guestAPI, loginCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    GET R of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.get("/logout", guestAPI, logoutCtrl);

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

// Obtener username
// routerAPI.get("/searchUser/:username", guestAPI, (req, res) => {
//   const username = req.params.username;
//   usersModel.find({ username }).exec((err, username) => {
//     if (err) {
//       res.status().json(501, `thre was an error: ${err}`);
//     } else {
//       console.log("specific user", username[0]);
//       username[0] ? res.status().json(200, username) : res.status().json(404, username);
//     }
//   });
// });

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

//add comments
routerAPI.put("/setComment", authAPI, setCommentCtrl);
routerAPI.put("/updateCommentClaps", authAPI, updateCommentClaps);

routerAPI.put("/setReply", authAPI, setReplyCtrl);

//update post Social ej claps,share,comments
routerAPI.put("/socialCounter", guestAPI, socialCtrl);

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

routerAPI.put("/updatePost/:projectName", authAPI, updatePostCtrl);
routerAPI.put("/updateUserProfile/:userName", authAPI, updateUserCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    DELETE D of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.delete("/deletePost/:projectName", authAPI, deletePostCtrl);

export default routerAPI;
