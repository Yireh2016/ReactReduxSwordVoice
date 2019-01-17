// var passport = require('passport');
import passport from "passport";
// let LocalStrategy = require('passport-local').Strategy;
import { Strategy as LocalStrategy } from "passport-local";
// var mongoose = require('mongoose');
import mongoose from "mongoose";
let User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "userPassword"
    },
    function(username, password, done) {
      User.findOne({ userName: username }, function(err, user) {
        if (err) {
          console.log("error encontrando usuario", err);
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password."
          });
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: "Incorrect username or password."
          });
        }
        console.log("usuario encontrado Login correcto");
        return done(null, user);
      });
    }
  )
);
