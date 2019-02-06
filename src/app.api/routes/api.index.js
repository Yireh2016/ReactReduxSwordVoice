import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import passport from "passport";
//controllers
import { createPostCtrl } from "../controllers/cms/postsControllers";
import {
  getPostCtrl,
  updatePostCtrl
} from "../controllers/cms/postsControllers";
// import axios from "axios";

let upload = multer({ dest: "dist/assets/uploads/" });

let routerAPI = express.Router();
let usersModel = mongoose.model("User");
// let articleModel = mongoose.model("Article");

function authAPI(req, res, next) {
  console.log("req.cookies.sessionId AL HACER POST", req.cookies.sessionId);
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
            console.log("Something wrong when updating data!");
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
  console.log("userData en POST sign up", userData);
  //en caso de que no se suba avatar ninguno almaceno un buffer vacio en la DB
  if (userData.userAvatar === "") {
    userData.userAvatar = new Buffer([]);
    console.log("userData.userAvatar en IF de api sign up", userData);
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
  console.log("userData del post login", userData);

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
    console.log("searching users");
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
  console.log("usuario guest intentando hacer sigun up");
  usersModel.find({ userEmail: email }).exec((err, email) => {
    if (err) {
      res.json(501, `thre was an error: ${err}`);
    } else {
      console.log("specific email", email[0]);
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
  console.log("buscando usuario en DB");
  usersModel.find({ userName: userName }).exec(function(err, userName) {
    if (err) {
      res.json(501, `thre was an error: ${err}`);
    } else {
      console.log("specific userName", userName[0]);
      userName[0] ? res.json(200, userName) : res.json(404, userName);
    }
  });
});

//obtener  usuario especifico por SessionID AUTH
//se usa en: login del CMS
// obtiene datos de usuario para hacer login en CMS
routerAPI.get("/searchSessionID/:sessionID", authAPI, (req, res) => {
  const sessionID = req.params.sessionID;
  console.log("buscando sessionID en DB");
  usersModel.find({ userSessionId: sessionID }).exec(function(err, data) {
    if (err) {
      res.json(501, `thre was an error: ${err}`);
    }
    if (data.length > 0) {
      console.log("db data ", data);
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
  console.log("username on PUT", username);
  console.log("sessionId", sessionId);
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

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    GET R of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// obtener todos MUST BE AUTH
//se usa en: DEVELOPMENT ONLY
routerAPI.get("/getPosts", authAPI, getPostCtrl);

routerAPI.get("/getPosts/:projectName", authAPI, getPostCtrl);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    GET U of CRUD   //////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

routerAPI.put("/updatePost/:projectName", authAPI, updatePostCtrl);
export default routerAPI;
