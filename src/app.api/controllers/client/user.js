import mongoose from "mongoose";
import passport from "passport";

//services
import {
  sessionCookie,
  deleteCookie
} from "../../services/serverCookieManager";

let usersModel = mongoose.model("User");

export const signUpCtrl = (req, res) => {
  let userData = req.body;

  //Busco la llave de firmado de las cookies en las variables de entorno

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
  userData = { ...userData, _id: mongoose.Types.ObjectId() };
  let user = new usersModel(userData);

  user.setPassword(userData.userPassword);
  user.save(async (err, savedUser) => {
    if (err) {
      console.log(
        `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      );
      res.status(400).json({
        code: 400,
        message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      });
    } else {
      console.log("savedUser", savedUser);
      try {
        await sessionCookie(req, res, {
          username: savedUser.userName,
          id: savedUser._id
        });
        const responseUserData = {
          id: savedUser._id,
          userName: savedUser.userName
        };
        console.log("sending responseUserData signup[] ", responseUserData);
        res.status(200).json(responseUserData); //user ID is returned to use it later for avatar upload
      } catch (err) {
        console.log("err on user catch on login", err);
      }
    }
  });
};

export const loginCtrl = (req, res) => {
  const userData = req.body;
  // let usersModel = mongoose.model("User");

  if (!userData.userName || !userData.userPassword) {
    res.status(400).json({
      message: "All fields required"
    });
    return;
  }

  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      // token = user.generateJwt();
      try {
        await sessionCookie(req, res, {
          username: user.userName,
          id: user._id
        });
      } catch (err) {
        console.log("err on user catch on login", err);
      }

      // usersModel.findOneAndUpdate(
      //   { userName: user.userName },
      //   {
      //     userSessionId: sessionId
      //   },
      //   function(err) {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("NEW SESSION ID ", sessionId);

      //       res.end("success");
      //     }
      //   }
      // );

      res.status(200).json({
        _id: user._id,
        userAvatar: user.userAvatar,
        userName: user.userName,
        userType: user.userType
      });
    } else {
      console.log("dio un 401", info);
      res.status(401).json(info);
    }
  })(req, res);
};

export const logoutCtrl = (req, res) => {
  deleteCookie(req, res);
  res.status(200).json({ status: "OK" });
};
