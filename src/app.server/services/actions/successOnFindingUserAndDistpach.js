const successOnFindingUserAndDistpach = (user, store) => {
  let payload;
  if (user) {
    payload = {
      userName: user.userName,
      userID: user._id,
      userAvatar: user.userAvatar,
      userType: user.userType
    };
    store.dispatch({ type: "LOGGED_IN", payload });
  }
  return;
};

export default successOnFindingUserAndDistpach;
