// var passport = require('passport');
import passport from 'passport'
// let LocalStrategy = require('passport-local').Strategy;
import {Strategy as LocalStrategy} from 'passport-local'
// var mongoose = require('mongoose');
import mongoose from 'mongoose'
let User = mongoose.model('User')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'userPassword'
    },
    async function (username, password, done) {
      try {
        const user = await User.findOne({userName: username})

        if (!user) {
          return done(null, false, {
            message: 'Incorrect username or password. '
          })
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: 'Incorrect username or password.'
          })
        }
        return done(null, user)
      } catch (error) {
        if (error) {
          console.log('error encontrando usuario', error)
          return done(error)
        }
      }
    }
  )
)
