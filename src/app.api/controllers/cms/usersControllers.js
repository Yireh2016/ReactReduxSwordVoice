import mongoose from "mongoose";

let userModel = mongoose.model("User");

export const updateUserCtrl = (req, res) => {
  const userName = req.params.userName;
  let data = req.body;
  userModel.find({ userName }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user[0].userFirstName =
        user[0].userFirstName !== data.userFirstName
          ? data.userFirstName
          : user[0].userFirstName;

      user[0].userLastName =
        user[0].userLastName !== data.userLastName
          ? data.userLastName
          : user[0].userLastName;

      user[0].userEmail =
        user[0].userEmail !== data.userEmail
          ? data.userEmail
          : user[0].userEmail;

      user[0].userCountry =
        user[0].userCountry !== data.userCountry
          ? data.userCountry
          : user[0].userCountry;

      user[0].userBirthDate =
        user[0].userBirthDate !== data.userBirthDate
          ? data.userBirthDate
          : user[0].userBirthDate;

      user[0].userGender =
        user[0].userGender !== data.userGender
          ? data.userGender
          : user[0].userGender;

      user[0].userInterests =
        user[0].userInterests !== data.userInterests
          ? data.userInterests
          : user[0].userInterests;

      user[0].userOtherInterests =
        user[0].userOtherInterests !== data.userOtherInterests
          ? data.userOtherInterests
          : user[0].userOtherInterests;

      user[0].userType =
        user[0].userType !== data.userType ? data.userType : user[0].userType;

      user[0].isUserActive =
        user[0].isUserActive !== data.isUserActive
          ? data.isUserActive
          : user[0].isUserActive;

      user[0].userPassword = data.userPassword
        ? data.userPassword
        : user[0].userPassword;
      console.log("data.userPassword", data.userPassword);
      data.userPassword && user[0].setPassword(user[0].userPassword);
      // user[0].setPassword(user[0].userPassword);

      user[0].save((err, user) => {
        if (err) {
          console.log(err);
          res.status(404).send(err);

          return;
        }
        console.log("updated user", user);
        res.status(200).send(user);
      });
    }
  });
};
