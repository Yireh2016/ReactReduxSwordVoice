import mongoose from "mongoose";
import passport from "passport";

//services
import {
  sessionCookie,
  deleteCookie
} from "../../services/serverCookieManager";
import { readToken } from "../../services/tokenHandler";

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
          userName: savedUser.userName,
          id: savedUser._id,
          userFullName: `${savedUser.userFirstName} ${savedUser.userLastName}`,
          userType: savedUser.userType
        });
        const responseUserData = {
          id: savedUser._id,
          userName: savedUser.userName,
          userType: savedUser.userType,
          userFullName: `${savedUser.userFirstName} ${savedUser.userLastName}`
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
          userName: user.userName,
          id: user._id,
          userFullName: `${user.userFirstName} ${user.userLastName}`,
          userType: user.userType
        });
      } catch (err) {
        console.log("err on user catch on login", err);
      }

      res.status(200).json({
        _id: user._id,
        userAvatar: user.userAvatar,
        userName: user.userName,
        userType: user.userType,
        userFullName: `${user.userFirstName} ${user.userLastName}`
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

export const autoLogin = (req, res) => {
  if (req.signedCookies.sessionID) {
    const token = req.signedCookies.sessionID;

    const tokenData = readToken(token, {
      encryptKey: process.env.ENCRYPTKEY,
      encryptAlgorithm: "aes-256-cbc"
    });

    const id = tokenData.data.id;
    usersModel
      .find({ _id: id })
      .select("userAvatar userName _id userType userFirstName userLastName")
      .exec(function(err, data) {
        if (err) {
          res.status(501).json(`thre was an error: ${err}`);
          return;
        }

        if (data.length > 0) {
          res.status(200).send(data[0]);
          return;
        }
      });
  } else {
    res.status(404).json("not found");
  }
};
