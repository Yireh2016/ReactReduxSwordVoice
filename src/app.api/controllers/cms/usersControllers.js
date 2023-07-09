import mongoose from 'mongoose'
import verifyEmailOnEdition from '../../services/verifyEmailOnEdition'
import uuid from 'uuid/v1'

let userModel = mongoose.model('User')

export const updateUserCtrl = async (req, res) => {
  const userName = req.params.userName
  let data = req.body

  try {
    let emailChanged = false

    const user = await userModel.find({userName})

    user[0].userFirstName =
      user[0].userFirstName !== data.userFirstName
        ? data.userFirstName
        : user[0].userFirstName

    user[0].userLastName =
      user[0].userLastName !== data.userLastName
        ? data.userLastName
        : user[0].userLastName

    user[0].userCountry =
      user[0].userCountry !== data.userCountry
        ? data.userCountry
        : user[0].userCountry

    user[0].userBirthDate =
      user[0].userBirthDate !== data.userBirthDate
        ? data.userBirthDate
        : user[0].userBirthDate

    user[0].userGender =
      user[0].userGender !== data.userGender
        ? data.userGender
        : user[0].userGender

    user[0].userInterests =
      user[0].userInterests !== data.userInterests
        ? data.userInterests
        : user[0].userInterests

    user[0].userOtherInterests =
      user[0].userOtherInterests !== data.userOtherInterests
        ? data.userOtherInterests
        : user[0].userOtherInterests

    user[0].userType =
      user[0].userType !== data.userType ? data.userType : user[0].userType

    user[0].isUserActive =
      user[0].isUserActive !== data.isUserActive
        ? data.isUserActive
        : user[0].isUserActive

    user[0].userPassword = data.userPassword
      ? data.userPassword
      : user[0].userPassword

    user[0].userAvatar = data.userAvatar ? data.userAvatar : user[0].userAvatar

    if (user[0].userEmail !== data.userEmail) {
      user[0].userEmail = data.userEmail
      emailChanged = true

      user[0].userEmailVerified = false
      user[0].userVerificationCode = uuid()
    }

    data.userPassword && user[0].setPassword(user[0].userPassword)

    await user[0].save()

    if (emailChanged) {
      await verifyEmailOnEdition(user.userVerificationCode, {
        firstName: user.userFirstName,
        email: user.userEmail
      })

      res
        .status(200)
        .send(
          "User Profile Updated. We've Sent you an email to verify your new email address Note:Check your **SPAM** folder."
        )
      return
    }
    res.status(200).send('User Profile Updated')
  } catch (err) {
    console.error(err)
    res.status(404).send(err)
  }
}
