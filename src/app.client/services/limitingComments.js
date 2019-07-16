const limitingComments = (commentsArr, commentsCount) => {
  const RESPONSES_LIMIT = 3;
  const COMMENT_LIMIT = 5;
  commentsCount = parseInt(commentsCount, 10);

  const totalCommentsCount = commentsArr.length;

  let resultArr = [];

  for (
    let i = 0;
    i < commentsCount + COMMENT_LIMIT && i < commentsArr.length;
    i++
  ) {
    const comment = commentsArr[i];
    //counting responses
    const responsesCount = comment.responses.length;

    //limiting responses

    commentsArr[i].responses = commentsArr[i].responses.slice(
      0,
      RESPONSES_LIMIT
    );

    commentsArr[i] = {
      _id: commentsArr[i]._id,
      userID: commentsArr[i].userID,
      userName: commentsArr[i].userName,
      message: commentsArr[i].message,
      date: commentsArr[i].date,
      responses: commentsArr[i].responses,
      claps: commentsArr[i].claps,
      responsesCount
    };
  }

  console.log("limitingComments commentsArr Len", commentsArr.length);
  //limiting Comments
  console.log("COMMENT_LIMIT + commentsCount", COMMENT_LIMIT + commentsCount);

  if (commentsCount + COMMENT_LIMIT <= commentsArr.length) {
    resultArr = commentsArr.slice(0, COMMENT_LIMIT + commentsCount);
  } else {
    resultArr = commentsArr;
  }

  console.log(
    "limitingComments after limitting resultArr Len",
    resultArr.length
  );

  return { totalCommentsCount, commentsArr: resultArr };
};

export default limitingComments;
