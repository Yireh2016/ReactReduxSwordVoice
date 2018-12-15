import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import crypto from "crypto";

const userSchema = new Schema({
  userAvatar: { type: { data: Buffer, contentType: String }, required: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userEmail: { type: String, unique: true, required: true },
  userCountry: { type: String, required: true },
  userBirthDate: { type: Date, required: true },
  userGender: { type: String, required: true },
  userInterests: { type: [String] },
  userOtherInterests: { type: [String] },
  userName: { type: String, unique: true, required: true },
  userPassword: { type: String, required: true },
  userSalt: { type: String, required: true }
  // userSessionId: { type: String, required: true }
});

userSchema.methods.setPassword = function(password) {
  this.userSalt = crypto.randomBytes(16).toString("hex");
  this.userPassword = crypto
    .pbkdf2Sync(password, this.userSalt, 1000, 64, null)
    .toString("hex");
};

userSchema.methods.verifyPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.userSalt, 1000, 64, null)
    .toString("hex");
  return this.userPassword === hash;
};

userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 1); //expire after 1 day
  return jwt.sign(
    {
      userAvatar: this.userAvatar,
      name: this.userName, //using the uniques userName and email as payload for
      ramdomSeed: Math.random(),
      exp: parseInt(expiry.getTime() / 1000)
    },
    process.env.JWT_SECRET //secret for signning JWT
  );
};
// module.exports = mongoose.model('User', userSchema);
mongoose.model("User", userSchema);
