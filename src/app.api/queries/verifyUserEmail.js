const verifyUserEmail = (userModel, userVerificationCode, success, errfn) => {
  return userModel
    .find({ userVerificationCode })
    .exec()
    .then(user => {
      success(user);
    })
    .catch(err => {
      errfn(err);
    });
};

export default verifyUserEmail;
