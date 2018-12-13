import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import passport from "passport";

let upload = multer({ dest: "dist/assets/uploads/" });

let routerAPI = express.Router();
let usersModel = mongoose.model("User");

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////    POST C of CRUD   /////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// cargar imagen de avatar
routerAPI.post("/upload/:userID", upload.single("avatar"), (req, res) => {
  const { file } = req;
  const userID = req.params.userID;

  fs.readFile(`${file.path}`, (err, data) => {
    if (err) {
      console.log("error leyendo archivo", err);
      throw err;
    }
    console.log("typeof", typeof data);
    console.log("imagen antes de meterla a la DB", data);
    usersModel.findOneAndUpdate(
      { _id: userID },
      { $set: { userAvatar: data } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        fs.unlink(`${file.path}`, err => {
          if (err) throw err;
          console.log(`successfully deleted ${file.path}`);
        });
      }
    );
  });
  res.json(200);
});
// insertar usuario en la DB
routerAPI.post("/signup", (req, res) => {
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
    !userData.userGender ||
    !userData.userSessionId
  ) {
    res.json(400, {
      message: "All fields required"
    });
    return;
  }

  let user = new usersModel(userData);

  user.setPassword(userData.userPassword);

  user.save((err, data) => {
    if (err) {
      res.json(400, { code: 400, message: `there was an error: ${err}` });
    } else {
      const responseUserData = {
        id: data._id,
        userName: data.userName
        // token: user.generateJwt()
      };
      res.json(200, responseUserData); //user ID is returned to use it later for avatar upload
    }
  });
});

// hacer Login
routerAPI.post("/login", (req, res) => {
  const userData = req.body;
  console.log("userData del post login", userData);

  if (!userData.userName || !userData.userPassword) {
    res.json(400, {
      message: "All fields required"
    });
    return;
  }

  passport.authenticate("local", function(err, user, info) {
    // let token;
    if (err) {
      res.json(404, err);
      return;
    }
    if (user) {
      console.log("api.index user.userAvatar", user.userAvatar);
      // token = user.generateJwt();
      res.json(200, { userName: user.userName, userAvatar: user.userAvatar });
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

// obtener todos los usuarios
routerAPI.get("/users", async (req, res) => {
  usersModel.find().exec((err, users) => {
    console.log("searching users");
    if (err) {
      console.log("err", err);
      res.json(err);
      return;
    }

    console.log("users", users);
    res.json(users);
  });

  // const users = await usersModel.find();

  // console.log('users', users);
  // res.json(users);
});

// obtener usuario especifico
routerAPI.get("/users/:userId", (req, res) => {
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
routerAPI.get("/searchEmail/:email", (req, res) => {
  const email = req.params.email;
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
routerAPI.get("/searchUser/:username", (req, res) => {
  const username = req.params.username;
  usersModel.find({ userName: username }).exec((err, username) => {
    if (err) {
      res.json(501, `thre was an error: ${err}`);
    } else {
      console.log("specific email", username[0]);
      username[0] ? res.json(200, username) : res.json(404, username);
    }
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
routerAPI.delete("/users/:userId", (req, res) => {
  usersModel.findByIdAndRemove(req.params.userId).exec(err => {
    if (err) {
      res.json(404, err);
      return;
    }
    res.json(204, { message: "user removed" });
  });
});

// Eliminar todos
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

routerAPI.put("/sessionUpdate/:username", (req, res) => {
  const username = req.params.username;
  const sessionId = req.query.sessionId;
  console.log("username", username);
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

export default routerAPI;
