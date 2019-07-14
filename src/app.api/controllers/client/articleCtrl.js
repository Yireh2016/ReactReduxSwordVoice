import mongoose from "mongoose";

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
  const { title, index } = req.query;
  const { claps } = req.body;

  articleModel.find({ title }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json({ status: "ERR", message: err.message });
      return;
    }
    err;
    let comments = article[0].comments;

    comments[index].claps = comments[index].claps + claps;

    articleModel.findOneAndUpdate({ title }, { comments }, (err, commnets) => {
      if (err) {
        console.log("err", err);
        res.status(404).json({ status: "ERR", message: err.message });
        return;
      }
    });

    res.status(200).json({ status: "OK", result: comments[index].claps });
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

      if (commentIndex !== null) {
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
