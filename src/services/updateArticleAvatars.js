import mongoose from "mongoose";

const getAvatar = (memoryArray, id) => {
  for (let index = 0; index < memoryArray.length; index++) {
    const memo = memoryArray[index];

    if (JSON.stringify(memo.id) === JSON.stringify(id)) {
      return memo.avatar;
    }
  }
  return false;
};

const getAvatarFromDb = id => {
  return new Promise((resolve, reject) => {
    const userModel = mongoose.model("User");

    userModel
      .find({ _id: id })
      .select("userAvatar")
      .exec((err, avatar) => {
        if (err) {
          reject({ status: "err", result: err });
        }
        console.log("se consulto a la DB");
        resolve({ status: "OK", result: avatar[0].userAvatar });
      });
  });
};

const updateReplyAvatars = (responses, memoryArray) => {
  return new Promise(async resolve => {
    for (let index = 0; index < responses.length; index++) {
      const reply = responses[index];
      let avatar = getAvatar(memoryArray, reply.userID);

      if (avatar) {
        reply.userAvatar = avatar;
      } else {
        const avatarRes = await getAvatarFromDb(reply.userID);
        if (avatarRes.status === "OK") {
          avatar = avatarRes.result;
          reply.userAvatar = avatar;
          memoryArray.push({ id: reply.userID, avatar });
        }
      }
    }

    resolve({ responses, memoryArray });
  });
};

const updateArticleAvatars = comments => {
  return new Promise(async resolve => {
    let memoryArray = [];

    if (comments && comments.length > 0) {
      for (let index = 0; index < comments.length; index++) {
        const comment = comments[index];

        if (comment.responses && comment.responses.length > 0) {
          const repliesRes = await updateReplyAvatars(
            comment.responses,
            memoryArray
          );
          memoryArray = repliesRes.memoryArray;
          comment.responses = repliesRes.responses;
        }

        let avatar = getAvatar(memoryArray, comment.userID);

        if (avatar) {
          comment.userAvatar = avatar;
        } else {
          const avatarRes = await getAvatarFromDb(comment.userID);
          if (avatarRes.status === "OK") {
            avatar = avatarRes.result;
            comment.userAvatar = avatar;
            memoryArray.push({ id: comment.userID, avatar });
          }
        }
      }
    }

    resolve(comments);
  });
};

export default updateArticleAvatars;
