import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import passport from "passport";
//controllers
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
import { socialCtrl, setCommentCtrl } from "../controllers/client/articleCtrl";

// import axios from "axios";

let upload = multer({ dest: "dist/assets/uploads/" });

let routerAPI = express.Router();
let usersModel = mongoose.model("User");
// let articleModel = mongoose.model("Article");

function authAPI(req, res, next) {
  if (req.cookies.sessionId) {
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
routerAPI.post(
  "/upload/:userID",
  authAPI,
  upload.single("avatar"),
  (req, res) => {
    const { file } = req;
    const userID = req.params.userID;

    fs.readFile(`${file.path}`, (err, data) => {
      if (err) {
        console.log("error leyendo archivo", err);
        throw err;
      }

      usersModel.findOneAndUpdate(
        { _id: userID },
        { $set: { userAvatar: data } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!", err);
            return;
          }
          fs.unlink(`${file.path}`, err => {
            if (err) throw err;
            console.log(`successfully deleted ${file.path}`);
          });

          res.status(200).json({ doc });
        }
      );
    });
  }
);
// insertar usuario en la DB en el SIGN UP
//se usa en: signUpForm
routerAPI.post("/signup", guestAPI, (req, res) => {
  let userData = req.body;
  console.log("userData on server sign up", userData);

  if (
    //verfing required fields
    !userData.userName ||
    !userData.userEmail ||
    !userData.userPassword ||
    !userData.userFirstName ||
    !userData.userLastName ||
    !userData.userCountry ||
    !userData.userBirthDate ||
    !userData.userGender ||
    !userData.userSessionId
  ) {
    res.status(400).json({
      message: "All fields required"
    });
    return;
  }
  //en caso de que no se suba avatar ninguno almaceno un buffer vacio en la DB

  console.log("all required fields are CORRECT");
  if (userData.userAvatar === "") {
    userData.userAvatar = new Buffer([]);
  }
  console.log("userdata with AVATAR");
  userData = { ...userData, _id: mongoose.Types.ObjectId() };
  let user = new usersModel(userData);

  user.setPassword(userData.userPassword);
  console.log("userData with crypto passwd and salt to save on SIGN UP", user);
  user.save((err, data) => {
    if (err) {
      console.log(
        `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      );
      res.status(400).json({
        code: 400,
        message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      });
    } else {
      const responseUserData = {
        id: data._id,
        userName: data.userName
      };
      res.status(200).json(responseUserData); //user ID is returned to use it later for avatar upload
    }
  });
});

// hacer Login
//se usa en: logInForm
routerAPI.post("/login", guestAPI, (req, res) => {
  const userData = req.body;

  if (!userData.userName || !userData.userPassword) {
    res.status(400).json({
      message: "All fields required"
    });
    return;
  }

  passport.authenticate("local", function(err, user, info) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      // token = user.generateJwt();
      res.status(200).json({
        _id: user._id,
        userAvatar: user.userAvatar,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userEmail: user.userEmail,
        userCountry: user.userCountry,
        userBirthDate: user.userBirthDate,
        userGender: user.userGender,
        userInterests: user.userInterests,
        userOtherInterests: user.userOtherInterests,
        userName: user.userName,
        userSessionId: user.userSessionId,
        userType: user.userType,
        userCreationDate: user.userCreationDate
      });
    } else {
      console.log("dio un 401", info);
      res.status(401).json(info);
    }
  })(req, res);
});

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    GET R of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// obtener todos MUST BE AUTH
//se usa en: DEVELOPMENT ONLY
routerAPI.get("/users", (req, res) => {
  usersModel.find().exec((err, users) => {
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
  usersModel.findById(req.params.userId).exec((err, user) => {
    if (err) {
      res.status(501).json(`thre was an error: ${err}`);
    } else {
      console.log("specific user", user);
      res.status(200).json(user);
    }
  });
});

// Obtener email
//se usa en: signUpForm
// para verificar, en tiempo real, que el email del usuario no se encuentre duplicado
routerAPI.get("/searchEmail/:email", guestAPI, (req, res) => {
  const email = req.params.email;
  usersModel.find({ userEmail: email }).exec((err, email) => {
    if (err) {
      res.status(501).json(`thre was an error: ${err}`);
    } else {
      email[0] ? res.status(200).json(email) : res.status(404).json(email);
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
routerAPI.get("/searchSessionID/:sessionID", authAPI, (req, res) => {
  const sessionID = req.params.sessionID;
  usersModel.find({ userSessionId: sessionID }).exec(function(err, data) {
    if (err) {
      res.status(501).json(`thre was an error: ${err}`);
    }
    if (data.length > 0) {
      res.status(200).json(data[0]);
      return;
    }
    res.status(404).json("not found");
  });
});

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

// Eliminar todos
//se usa en: DEVELOPMENT ONLY
routerAPI.delete("/allUsers", (req, res) => {
  usersModel.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
});

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
    function(err, doc) {
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

//update post Social ej claps,share,comments
routerAPI.put("/socialCounter", authAPI, socialCtrl);

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
routerAPI.post(
  "/uploadTempFile",
  authAPI,
  upload.single("file"),
  uploadTempFileCtrl
);
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
export default routerAPI;

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    DELETE D of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.delete("/deletePost/:projectName", authAPI, deletePostCtrl);
