import mongoose, {Schema} from 'mongoose'
import crypto from 'crypto'

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userAvatar: {type: String},
  userFirstName: {type: String, required: true},
  userLastName: {type: String, required: true},
  userEmail: {type: String, unique: true, required: true},
  userEmailVerified: {type: Boolean, default: false},
  userVerificationCode: {type: String},
  userPasswdRecoverDate: {type: Date},
  userCountry: {type: String, required: true},
  userBirthDate: {type: Date, required: true},
  userGender: {type: String, required: true},
  userInterests: {type: [String]},
  userOtherInterests: {type: [String]},
  userName: {type: String, unique: true, required: true},
  userPassword: {type: String, required: true}, //
  userSalt: {type: String, required: true}, //
  userType: {type: String, required: true, default: 'user'},
  isUserActive: {type: Boolean, required: true, default: true},
  userCreationDate: {type: Date, required: true, default: Date.now()} //
})

userSchema.methods.setPassword = function (password) {
  this.userSalt = crypto.randomBytes(16).toString('hex')
  this.userPassword = crypto
    .pbkdf2Sync(password, this.userSalt, 1000, 64, 'SHA1')
    .toString('hex')
}

userSchema.methods.verifyPassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this.userSalt, 1000, 64, 'SHA1')
    .toString('hex')
  return this.userPassword === hash
}

userSchema.index({
  userName: 'text'
})

mongoose.model('User', userSchema)
