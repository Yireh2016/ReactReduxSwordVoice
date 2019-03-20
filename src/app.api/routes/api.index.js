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
  getClassFromPostCtrl
} from "../controllers/cms/postsControllers";
import {
  getPostCtrl,
  updatePostCtrl,
  getArticleCtrl
} from "../controllers/cms/postsControllers";
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

          res.json(200, { doc });
        }
      );
    });
  }
);
// insertar usuario en la DB en el SIGN UP
//se usa en: signUpForm
routerAPI.post("/signup", guestAPI, (req, res) => {
  const userData = req.body;

  if (
    //verfing required fields
    !userData.userName ||
    !userData.userEmail ||
    !userData.userPassword ||
    !userData.userFirstName ||
    !userData.userLastName ||
    !userData.userCountry ||
    !userData.userBirthDate ||
    !userData.userGender
  ) {
    res.json(400, {
      message: "All fields required"
    });
    return;
  }
  //en caso de que no se suba avatar ninguno almaceno un buffer vacio en la DB
  if (userData.userAvatar === "") {
    userData.userAvatar = new Buffer([]);
  }
  let user = new usersModel(userData);

  user.setPassword(userData.userPassword);

  user.save((err, data) => {
    if (err) {
      res.json(400, { code: 400, message: `there was an error: ${err}` });
    } else {
      const responseUserData = {
        id: data._id,
        userName: data.userName,
        token: user.generateJwt()
      };
      res.json(200, responseUserData); //user ID is returned to use it later for avatar upload
    }
  });
});

// hacer Login
//se usa en: logInForm
routerAPI.post("/login", guestAPI, (req, res) => {
  const userData = req.body;

  if (!userData.userName || !userData.userPassword) {
    res.json(400, {
      message: "All fields required"
    });
    return;
  }

  passport.authenticate("local", function(err, user, info) {
    let token;
    if (err) {
      res.json(404, err);
      return;
    }
    if (user) {
      // token = user.generateJwt();
      res.json(200, {
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
      res.json(401, info);
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
      res.json(err);
      return;
    }

    res.json(users);
  });

  // const users = await usersModel.find();

  // console.log('users', users);
  // res.json(users);
});

// obtener usuario especifico must be AUTH
//se usa en: signUpForm
routerAPI.get("/users/:userId", authAPI, (req, res) => {
  usersModel.findById(req.params.userId).exec((err, user) => {
    if (err) {
      res.json(501, `thre was an error: ${err}`);
    } else {
      console.log("specific user", user);
      res.json(user);
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
      res.json(501, `thre was an error: ${err}`);
    } else {
      email[0] ? res.json(200, email) : res.json(404, email);
    }
  });
});

// Obtener username
// routerAPI.get("/searchUser/:username", guestAPI, (req, res) => {
//   const username = req.params.username;
//   usersModel.find({ username }).exec((err, username) => {
//     if (err) {
//       res.json(501, `thre was an error: ${err}`);
//     } else {
//       console.log("specific user", username[0]);
//       username[0] ? res.json(200, username) : res.json(404, username);
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
      res.json(501, `thre was an error: ${err}`);
    } else {
      userName[0] ? res.json(200, userName) : res.json(404, userName);
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
      res.json(501, `thre was an error: ${err}`);
    }
    if (data.length > 0) {
      res.json(200, data[0]);
      return;
    }
    res.json(404, "not found");
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
      res.json(404, err);
      return;
    }
    res.json(204, { message: "user removed" });
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
    function(err) {
      if (err) {
        console.log(err);
      } else {
        res.end("success");
      }
    }
  );
});

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
