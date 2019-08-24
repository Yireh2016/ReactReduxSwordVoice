export const limitingResponses = (responses, responsesCount) => {
  const RESPONSES_LIMIT = 3;
  let resultResponsesArr = [];
  responsesCount = parseInt(responsesCount, 10);

  if (RESPONSES_LIMIT + responsesCount < responses.length) {
    resultResponsesArr = responses.slice(0, RESPONSES_LIMIT + responsesCount);
  } else {
    resultResponsesArr = responses;
  }

  return resultResponsesArr;
};

export const limitingComments = (commentsArr, commentsCount) => {
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

    commentsArr[i].responses = limitingResponses(comment.responses, 0);

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

  ;
  //limiting Comments


  if (commentsCount + COMMENT_LIMIT <= commentsArr.length) {
    resultArr = commentsArr.slice(0, COMMENT_LIMIT + commentsCount);
  } else {
    resultArr = commentsArr;
  }



  return { totalCommentsCount, commentsArr: resultArr };
};
