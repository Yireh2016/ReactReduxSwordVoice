const successOnFindingUserAndDistpach = (user, store) => {
  let payload;
  if (user) {
    payload = {
      userName: user.userName,
      userID: user._id,
      userType: user.userType,
      userFullName: user.userFullName
    };
    store.dispatch({ type: "LOGGED_IN", payload });
  }
  return;
};

export default successOnFindingUserAndDistpach;
