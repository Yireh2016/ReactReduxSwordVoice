import mongoose from "mongoose";
import passport from "passport";
import axios from "axios";
import crypto from "crypto";
import nodemailer from "nodemailer";
import uuid from "uuid/v1";

//apiCalls
import uploadAvatar from "../../../apiCalls/uploadAvatar";
//services
import {
  sessionCookie,
  deleteCookie
} from "../../services/serverCookieManager";
import { readToken } from "../../services/tokenHandler";
import sendUserVerificationCode from "../../services/sendUserVerificationCode";

let usersModel = mongoose.model("User");

export const signUpCtrl = async (req, res) => {
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

  let uploadAvatarRes;
  if (userData.userAvatar) {
    uploadAvatarRes = await uploadAvatar(
      userData.userName,
      userData.userAvatar
    );
  }

  if (uploadAvatarRes && uploadAvatarRes.status === "OK") {
    userData.userAvatar = uploadAvatarRes.avatarURL;
  } else {
    userData.userAvatar = "";
  }

  const userVerificationCode = uuid();

  userData = {
    ...userData,
    _id: mongoose.Types.ObjectId(),
    userVerificationCode
  };

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
      try {
        await sendUserVerificationCode(userVerificationCode, {
          firstName: userData.userFirstName,
          email: userData.userEmail
        });

        res.status(200).json({
          code: 200,
          message: `Verification email sent`
        });
      } catch (error) {
        res.status(404).json({
          code: 404,
          message: `Error sending email ${error}`
        });
      }

      //TODO this code create and send the cookie session

      // try {
      //   await sessionCookie(req, res, {
      //     userName: savedUser.userName,
      //     id: savedUser._id,
      //     userFullName: `${savedUser.userFirstName} ${savedUser.userLastName}`,
      //     userType: savedUser.userType
      //   });

      //   const responseUserData = {
      //     id: savedUser._id,
      //     userName: savedUser.userName,
      //     userType: savedUser.userType,
      //     userFullName: `${savedUser.userFirstName} ${savedUser.userLastName}`,
      //     userAvatar: savedUser.userAvatar
      //   };
      //   console.log("sending responseUserData signup[] ", responseUserData);
      //   res.status(200).json(responseUserData); //user ID is returned to use it later for avatar upload
      // } catch (err) {
      //   console.log("err on user catch on login", err);
      // }
    }
  });
};

export const loginCtrl = (req, res) => {
  const userData = req.body;
  console.log("userData", userData);

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
    console.log(`on login: \n err ${err}
                info ${info}\n
                user ${user}`);
    if (user && !user.isUserActive) {
      res.status(401).json("user is not active");
      return;
    }
    if (user) {
      // token = user.generateJwt();
      try {
        await sessionCookie(req, res, {
          userName: user.userName,
          id: user._id,
          userFullName: `${user.userFirstName} ${user.userLastName}`,
          userType: user.userType,
          userAvatar: user.userAvatar
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
  res.status(200).json({ status: "OK", message: "Log Out Successful" });
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

export const sendUserTempImageCtrl = (req, res) => {
  const data = req.body;
  if (!data.userName) {
    const hash = crypto
      .pbkdf2Sync(data.base64Img.url, "salt", 1000, 64, null)
      .toString("hex");
    data.userName = hash + "_original";
  } else {
    data.userName = data.userName + "_original";
  }

  axios
    .post(`${process.env.CDN_URL}/cdn/sendUserImage`, data)
    .then(sendRes => {
      if (sendRes.status === 200) {
        res.status(200).json({ status: "OK", filename: sendRes.data.filename });
      }
    })
    .catch(err => {
      res.status(404).json({ status: err });
    });
};

export const signUpEmailConfirmCtrl = (req, res) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = {
      user: "jainer@swordvoice.com",
      pass: "J0MCalv3tt5."
    };

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "swordvoice.com",
      port: 587, //587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      },
      requireTLS: true,
      debug: true,
      logger: true
    });

    // send mail with defined transport object

    transporter.verify(function(error) {
      if (error) {
        console.log(error);
        res.status(404).json(error);
      } else {
        console.log("Server is ready to take our messages");
        res.status(200).send("Server is ready to take our messages");
      }
    });

    let info = await transporter.sendMail({
      from: '"Swordvoice" <jainer@swordvoice.com>', // sender address
      to: "jainer.calvetti@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world? from noreply  nodemailer</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(err => {
    console.log("error sending mail", err);
    res.status(404).json(err);
  });
};
