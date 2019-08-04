import mongoose from "mongoose";
//services
import {
  limitingComments,
  limitingResponses
} from "../../../app.client/services/limitingCommentsAndResponses";
import {
  updateArticleAvatars,
  updateReplyAvatars
} from "../../../services/updateArticleAvatars";

import paragraphService from "../../../services/paragraphService";
import dbDateToNormalDate from "../../../services/dbDateToNormalDate";
import keywordsToArr from "../../../services/keywordsToArr";
import getPopularPosts from "../../../app.server/controllers/queries/getPopularPosts";
//queries
import searchLastArticlesQuery from "../../../common/queries/searchLastArticlesQuery";

const articleModel = mongoose.model("Article");
const userModel = mongoose.model("User");

export const socialCtrl = (req, res) => {
  const { id, prop } = req.query;
  const { socialCount } = req.body;

  articleModel.find({ _id: id }).exec((err, article) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      switch (prop) {
        case "claps":
          article[0].socialCount.claps =
            article[0].socialCount.claps + socialCount;
          break;

        case "share":
          article[0].socialCount.share =
            article[0].socialCount.share + socialCount;
          break;

        case "comments":
          article[0].socialCount.comments =
            article[0].socialCount.comments + socialCount;
          break;

        case "views":
          article[0].socialCount.views =
            article[0].socialCount.views + socialCount;
          break;

        default:
          break;
      }

      article[0].save((err, article) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.status(200).send(article.socialCount);
        }
      });
    }
  });
};

export const getMoreCommentsCtrl = (req, res) => {
  const { id, commentsCount } = req.query;

  articleModel.findById(id, async (err, article) => {
    if (err) {
      res.status(404).json({ status: "not Found" });
      return;
    }

    let articleComments = article.comments;

    let { commentsArr } = limitingComments(articleComments, commentsCount);

    commentsArr = await updateArticleAvatars(commentsArr);

    res.status(200).send({ statusText: "OK", comments: commentsArr });
  });
};

export const getMoreResponsesCtrl = (req, res) => {
  const { id, responsesCount, index } = req.query;

  articleModel.findById(id, async (err, article) => {
    if (err) {
      res.status(404).json({ status: "not Found" });
      return;
    }

    let responses = article.comments[index].responses;

    responses = limitingResponses(responses, responsesCount);

    const updateReplyAvatarsRes = await updateReplyAvatars(responses, []);

    res
      .status(200)
      .send({ statusText: "OK", responses: updateReplyAvatarsRes.replyArr });
  });
};

export const getMorePostsCtrl = (req, res) => {
  const { totalPosts, postsCount } = req.query;
  const limit = totalPosts - postsCount >= 7 ? 7 : totalPosts - postsCount;

  articleModel
    .find({ isPublished: true })
    .select("url thumbnail title date keywords description")
    .skip(parseInt(postsCount))
    .limit(limit)
    .populate("author")
    .sort({ _id: "descending" })
    .exec()
    .then(posts => {
      let postMinimumData = [];
      for (let i = 0; i < posts.length; i++) {
        postMinimumData[i] = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles/${posts[i].url}/${
              posts[i].thumbnail.name
            })`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
              posts[i].thumbnail.color
            } 73.79%)`,
          title: posts[i].title,
          summaryTextHtml: paragraphService(posts[i].description),
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          avatar: posts[i].author.userAvatar,
          date: dbDateToNormalDate(posts[i].date),
          keywords: keywordsToArr(posts[i].keywords[0])
        };
      }

      res.status(200).send(postMinimumData);
    })
    .catch(err => {
      console.log("err", err);
      res.status(404).json(err);
    });
  // resolve();
};

export const setReplyCtrl = async (req, res) => {
  const { userName, title, message, index, userID } = req.body;
  let intIndex = parseInt(index);

  let reply = { userName, message, userID };
  let responses;
  let comments = [];

  articleModel.find({ title }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json(err);
      return;
    }

    comments = article[0].comments;
    comments.forEach((comment, i) => {
      if (i === intIndex) {
        responses = comment.responses;
        responses = [reply, ...responses];
      }
    });
    comments[intIndex].responses = responses;

    article[0].comments[intIndex].responses = responses;

    article[0].save((err, article) => {
      if (err) {
        console.log("err", err);
        res.status(404).json(err);
        return;
      }

      res.status(200).json({
        message: "ok",
        id: article.comments[intIndex].responses[0]._id
      });
    });
  });
};

export const updateCommentClaps = (req, res) => {
  const { id, index } = req.query;
  const { claps } = req.body;

  articleModel.find({ _id: id }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json({ status: "ERR", message: err.message });
      return;
    }

    let comments = article[0].comments;

    comments[index].claps = comments[index].claps + claps;

    articleModel.findOneAndUpdate(
      { _id: id },
      { comments },
      (err, commnets) => {
        if (err) {
          console.log("err", err);
          res.status(404).json({ status: "ERR", message: err.message });
          return;
        }
      }
    );

    res.status(200).json({ status: "OK", result: comments[index].claps });
  });
};

export const updateReplyClaps = (req, res) => {
  const { id, index, commentIndex } = req.query;
  const { claps } = req.body;

  articleModel.find({ _id: id }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json({ status: "ERR", message: err.message });
      return;
    }

    let comments = article[0].comments;

    comments[commentIndex].responses[index].claps =
      comments[commentIndex].responses[index].claps + claps;

    articleModel.findOneAndUpdate(
      { _id: id },
      { comments },
      (err, commnets) => {
        if (err) {
          console.log("err", err);
          res.status(404).json({ status: "ERR", message: err.message });
          return;
        }
      }
    );

    res.status(200).json({
      status: "OK",
      result: comments[commentIndex].responses[index].claps
    });
  });
};

export const setCommentCtrl = (req, res) => {
  const { userID, userName, title, message, commentIndex } = req.body;

  userModel.findById(userID, (err, user) => {
    if (err) {
      console.log("err", err);
      res.status(404).json(err);
      return err;
    }
    let comment = { userAvatar: user.userAvatar, userID, userName, message };

    let comments = [];

    articleModel.find({ title }, (err, article) => {
      if (err) {
        console.log("err", err);
        res.status(404).json(err);
        return;
      }

      if (typeof commentIndex === "number") {
        console.log("Edit comment commentIndex", commentIndex);
        //edit comment
        let comment;
        comment = article[0].comments[commentIndex];
        comment.message = message;
        article[0].comments[commentIndex] = comment;

        article[0].save((err, article) => {
          if (err) {
            console.log("err SAVING ARTICLE", err);
            res.status(404).json(err);
            return;
          }

          res.status(200).json({ message: "ok", id: article.comments[0]._id });
        });

        return;
      }

      //create Comment

      console.log("create comment commentIndex", commentIndex);

      comments = article[0].comments;

      if (comments) {
        article[0].comments = [comment, ...comments];
      } else {
        article[0].comments = [comment];
      }

      let socialCount = article[0].socialCount;

      article[0].socialCount.comments = socialCount.comments + 1;

      article[0].save((err, article) => {
        if (err) {
          console.log("err SAVING ARTICLE", err);
          res.status(404).json(err);
          return;
        }

        res.status(200).json({ message: "ok", id: article.comments[0]._id });
      });
    });
  });
};

export const deleteCommentCtrl = (req, res) => {
  const { id } = req.query;

  articleModel.find({ "comments._id": id }).exec((err, articleArr) => {
    if (err) {
      res.status(404).json(err);
      return;
    }

    console.log("articleArr", articleArr);
    if (articleArr.length > 0) {
      articleArr[0].comments.id(id).remove();

      articleArr[0].socialCount.comments = articleArr[0].comments.length;

      articleArr[0].save(err => {
        if (err) {
          res.status(404).json(err);
          return;
        }
      });

      res.status(200).json({ message: "ok" });
    } else {
      res.status(404).json({ message: "no article found" });
    }
  });

  // articleModel.findOneAndDelete({ userName: req.params.userId }).exec(err => {
  //   if (err) {
  //     res.status(404).json(err);
  //     return;
  //   }
  //   res.status(204).json({ message: "user removed" });
  // }
};

export const filterPopularCtrl = (req, res) => {
  const { filter, popularTotalCount, popularCount } = req.body;

  getPopularPosts(
    articleModel,
    `${filter}`,
    popularTotalCount,
    popularCount,
    posts => {
      let postMinimumData = [];
      for (let i = 0; i < posts.length; i++) {
        postMinimumData[i] = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles//${posts[i].url}/${
              posts[i].thumbnail.name
            })`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
              posts[i].thumbnail.color
            } 73.79%)`,
          title: posts[i].title,
          summaryTextHtml: paragraphService(posts[i].description),
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          avatar: posts[i].author.userAvatar,
          date: dbDateToNormalDate(posts[i].date),
          keywords: keywordsToArr(posts[i].keywords[0])
        };
      }

      res.status(200).send({ statusText: "OK", popularArr: postMinimumData });
    },
    err => {
      console.log("error en blog ", err);
      res.status(404).json(err);
    }
  );
};

export const searchArticleCtrl = (req, res) => {
  const { searchValue } = req.query;
  const errHandler = err => {
    console.log("searchArticleCtrl err", err);
    res.status(404).json(err);
  };

  articleModel
    .find(
      { $text: { $search: `${searchValue}` } },
      { score: { $meta: "textScore" } }
    )
    .select("url thumbnail title date keywords description")
    .populate({
      path: "author",
      select: "userFirstName userLastName userAvatar userName"
    })
    .sort({ score: { $meta: "textScore" } })
    .exec()
    .then(posts => {
      let postMinimumData = [];
      for (let i = 0; i < posts.length; i++) {
        postMinimumData[i] = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles//${posts[i].url}/${
              posts[i].thumbnail.name
            })`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
              posts[i].thumbnail.color
            } 73.79%)`,
          title: posts[i].title,
          summaryTextHtml: paragraphService(posts[i].description),
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          avatar: posts[i].author.userAvatar,
          date: dbDateToNormalDate(posts[i].date),
          keywords: keywordsToArr(posts[i].keywords[0])
        };
      }

      res.status(200).send({ statusText: "OK", searchArr: postMinimumData });
    })
    .catch(err => {
      errHandler(err);
    });
};

export const searchLastArticlesCtrl = (req, res) => {
  searchLastArticlesQuery(
    articleModel,
    (articlesTotalCount, articlesArr) => {
      res.status(200).send({ articlesTotalCount, articlesArr });
    },
    err => {
      res.status(404).json(err);
    }
  );
};

export const advancedSearchDbCtrl = (req, res) => {
  let { author, dateFrom, dateTo } = req.query;

  if (!dateTo) {
    dateTo = new Date();
  }
  if (!dateFrom) {
    dateFrom = new Date("1990");
  }

  let populateObj;

  if (!author) {
    populateObj = {
      path: "author",
      select: "userFirstName userLastName userAvatar userName"
    };
  } else {
    const authorWordsArr = author.match(/[^\s]+/g);
    let authorPattern = "";

    for (let index = 0; index < authorWordsArr.length; index++) {
      if (index === authorWordsArr.length - 1) {
        authorPattern = authorPattern + `${authorWordsArr[index]}`;
      } else {
        authorPattern = authorPattern + `${authorWordsArr[index]}|`;
      }
    }

    populateObj = {
      path: "author",
      match: {
        $or: [
          { userFirsName: { $regex: authorPattern, $options: "i" } },
          { userLastName: { $regex: authorPattern, $options: "i" } },
          { userName: { $regex: authorPattern, $options: "i" } }
        ]
      },
      select: "userFirstName userLastName userAvatar userName"
    };
  }

  articleModel
    .find({
      date: {
        $gt: dateFrom,
        $lt: dateTo
      }
    })
    .sort({ date: "descending" })
    .select("url thumbnail title date keywords description")
    .populate(populateObj)
    .exec((err, posts) => {
      if (err) {
        console.log("advancedSearchDbCtrl err ", err);

        res.status(404).send(err);
        return;
      }

      let postMinimumData = [];
      for (let i = 0; i < posts.length; i++) {
        postMinimumData[i] = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles//${posts[i].url}/${
              posts[i].thumbnail.name
            })`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
              posts[i].thumbnail.color
            } 73.79%)`,
          title: posts[i].title,
          summaryTextHtml: paragraphService(posts[i].description),
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          avatar: posts[i].author.userAvatar,
          date: dbDateToNormalDate(posts[i].date),
          keywords: keywordsToArr(posts[i].keywords[0])
        };
      }

      console.log("articles", postMinimumData);
      res.status(200).send({ advancedArr: postMinimumData });
    });
};
