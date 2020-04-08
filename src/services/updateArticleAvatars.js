import mongoose from 'mongoose'

const getAvatar = (memoryArray, id) => {
  if (memoryArray[`${id}`]) {
    return memoryArray[`${id}`]
  }

  return false
}

const getAvatarFromDb = id => {
  return new Promise((resolve, reject) => {
    const userModel = mongoose.model('User')

    userModel
      .find({_id: id})
      .select('userAvatar')
      .exec((err, user) => {
        if (err) {
          reject({status: 'err', result: err})
        }
        resolve({status: 'OK', result: user[0].userAvatar})
      })
  })
}

export const updateReplyAvatars = (responses, memoryArray) => {
  return new Promise(async resolve => {
    let replyArr = []
    for (let index = 0; index < responses.length; index++) {
      const reply = responses[index]
      let avatar = getAvatar(memoryArray, reply.userID)

      if (!avatar) {
        const avatarRes = await getAvatarFromDb(reply.userID)
        if (avatarRes.status === 'OK') {
          avatar = avatarRes.result
          memoryArray[`${reply.userID}`] = avatar
        }
      }

      const {date, _id, userName, message, userID, claps} = responses[index]
      replyArr[index] = {
        date,
        _id,
        userName,
        message,
        userID,
        claps,
        userAvatar: avatar
      }
    }
    resolve({replyArr, memoryArray})
  })
}

export const updateArticleAvatars = comments => {
  return new Promise(async resolve => {
    let memoryArray = []
    let commentsHelpArr = []

    if (comments && comments.length > 0) {
      for (let index = 0; index < comments.length; index++) {
        const comment = comments[index]

        if (comment.responses && comment.responses.length > 0) {
          const repliesRes = await updateReplyAvatars(
            comment.responses,
            memoryArray
          )
          memoryArray = repliesRes.memoryArray
          comments[index].responses = repliesRes.replyArr
        }

        let avatar = getAvatar(memoryArray, comment.userID)

        if (!avatar) {
          const avatarRes = await getAvatarFromDb(comment.userID)
          if (avatarRes.status === 'OK') {
            avatar = avatarRes.result
            memoryArray[`${comment.userID}`] = avatar
          }
        }
        const {
          date,
          claps,
          responses,
          _id,
          userName,
          message,
          userID,
          responsesCount
        } = comments[index]
        commentsHelpArr[index] = {
          date,
          claps,
          responses,
          _id,
          userName,
          message,
          userID,
          responsesCount,
          userAvatar: avatar
        }
      }
    }

    resolve(commentsHelpArr)
  })
}
