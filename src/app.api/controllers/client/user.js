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

import emailHintConverter from "../../services/emailHintConverter";

//queries
import verifyUserEmail from "../../queries/verifyUserEmail";
import sendNoReplyEmail from "../../services/sendNoReplyEmail";

//Email templates
import passwdRecoveryTemplate from "../../templates/passwdRecoveryTemplate";

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

  if (!userData.userName || !userData.userPassword) {
    res.status(401).json("All fields required");
    return;
  }

  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      res.status(404).json(`${err.response.data}`);
      return;
    }
    console.log(`on login: \n err ${err}
                info ${info}\n
                user ${user}`);
    if (user && !user.isUserActive) {
      res
        .status(401)
        .json(
          `Your Account is **Not Active** because it is unsubscribe from our service. Please, Contact Us [Here](${process.env.WEB_URL}/contact) if you want to activate it again`
        );
      return;
    } else if (user && !user.userEmailVerified) {
      res
        .status(401)
        .json(
          "User Email is **Not Verified** yet, Please check your email's inbox or **SPAM** folder and follow the instructions"
        );
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
      res.status(401).json(info.message);
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

export const emailVerificationCtrl = (req, res) => {
  const { id } = req.query;

  const success = user => {
    if (user.length === 0) {
      errFn(`User verification time expired`);
      return;
    }

    if (user[0].userEmailVerified) {
      errFn(`Email already verified`);
      return;
    }

    user[0].userEmailVerified = true;

    user[0].save((err, newUser) => {
      if (err) {
        errFn(`Email not verified error: ${err}`);
        return;
      }

      emailVerified(newUser);
    });
  };

  const errFn = msg => {
    res.status(401).send(msg);
  };

  const emailVerified = async newUser => {
    try {
      await sessionCookie(req, res, {
        userName: newUser.userName,
        id: newUser._id,
        userFullName: `${newUser.userFirstName} ${newUser.userLastName}`,
        userType: newUser.userType,
        userAvatar: newUser.userAvatar
      });
    } catch (err) {
      console.log("err on user catch on login", err);
      errFn(`Email not verified error: ${err}`);
      return;
    }

    res.redirect(process.env.WEB_URL).json({
      _id: newUser._id,
      userAvatar: newUser.userAvatar,
      userName: newUser.userName,
      userType: newUser.userType,
      userFullName: `${newUser.userFirstName} ${newUser.userLastName}`
    });
  };

  verifyUserEmail(usersModel, id, success, errFn);
};

export const recoveryPasswdCtrl = (req, res) => {
  const { email } = req.query;

  usersModel
    .find({ userEmail: email })
    .exec()
    .then(user => {
      if (user.length === 0) {
        res.status(401).send("Email not found");
        return;
      }

      user[0].userPasswdRecoverDate = new Date();

      user[0].save((err, newUser) => {
        if (err) {
          res.status(401).send(err);
          return;
        }
        console.log("newUser", newUser); //TODO:erase
        sendNoReplyEmail(
          passwdRecoveryTemplate(newUser._id, newUser.userFirstName),
          "SwordVoice Password Recovery ✔",
          email
        );
        res.status(200).send({ status: "OK", user });
      });
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

export const recoveryUsernameCtrl = (req, res) => {
  const { userName } = req.query;

  usersModel
    .find({ userName })
    .exec()
    .then(user => {
      if (user.length === 0) {
        res.status(401).send("User not found");
        return;
      }

      const emailHint = emailHintConverter(user[0].userEmail);

      res.status(200).send({ status: "OK", emailHint });
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

export const passwordRecoverCtrl = (req, res) => {
  const { id } = req.query;

  usersModel
    .find({ _id: id })
    .exec()
    .then(user => {
      if (user.length === 0) {
        res.status(401).send("User not found");
        return;
      }

      const newDate = new Date();
      const diff = Math.abs(newDate - user[0].userPasswdRecoverDate);
      console.log("diff", diff);
      if (diff > 86400000) {
        res.status(401).send("Password Recovery Link Expired.");
        return;
      }

      console.log(" passwd recovery form sent");

      res.redirect(`${process.env.WEB_URL}/passwdRecoveryForm?id=${id}`);
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

export const updatePasswdCtrl = (req, res) => {
  const { passwd, id } = req.body;

  usersModel.find({ _id: id }).exec((err, user) => {
    if (err) {
      res.status(401).send(err);
      return;
    }
    const passwdRecoveryDate = user[0].userPasswdRecoverDate;

    if (passwdRecoveryDate === "") {
      res.status(401).send({
        status: "ERR",
        message: `Your Email Link is outdated, click [Here](${process.env.WEB_URL}) and recover your credentials in the Login area`
      });
      return;
    }

    const newDate = new Date();
    const diff = Math.abs(newDate - passwdRecoveryDate);

    console.log("diff", diff);
    if (diff > 86400000) {
      res
        .status(401)
        .send({ status: "ERR", message: "Password Recovery Link Expired." });
      return;
    }

    user[0].setPassword(passwd);

    user[0].userPasswdRecoverDate = "";

    user[0].save(async (err, savedUser) => {
      if (err) {
        console.log(
          `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
        );
        res.status(400).json({
          status: "ERR",
          message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
        });
      } else {
        try {
          // await sessionCookie(req, res, {
          //   userName: savedUser.userName,
          //   id: savedUser._id,
          //   userFullName: `${savedUser.userFirstName} ${savedUser.userLastName}`,
          //   userType: savedUser.userType
          // });

          res.status(200).send({
            status: "OK",
            message: "Your password was successfully changed"
          }); //user ID is returned to use it later for avatar upload
        } catch (err) {
          console.log("err on user catch on login", err);
        }
      }
    });
  });
};
