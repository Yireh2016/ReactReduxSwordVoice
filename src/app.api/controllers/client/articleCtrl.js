import mongoose from "mongoose";

const articleModel = mongoose.model("Article");
// const commentModel = mongoose.model("Comment");
// const usersModel = mongoose.model("User");

export const socialCtrl = (req, res) => {
  const title = req.query.title;
  const socialCount = req.body;

  console.log("title", title);
  console.log("socialCount", socialCount);

  articleModel.findOneAndUpdate(
    { title },
    {
      socialCount
    },
    function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.sendStatus(200);
        res.end("success");
      }
    }
  );
};

export const setReplyCtrl = async (req, res) => {
  const { userName, title, message, index } = req.query;
  let intIndex = parseInt(index);
  const userAvatar = req.body.userAvatar;

  let reply = { userName, message, userAvatar };
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
      res.status(404).json(err);
      return;
    }

    let comments = article[0].comments;

    comments[index].claps = claps;

    articleModel.findOneAndUpdate({ title }, { comments }, err => {
      if (err) {
        console.log("err", err);
        res.status(404).json(err);
        return;
      }
    });

    res.status(200).json({ message: "ok" });
  });
};

export const setCommentCtrl = async (req, res) => {
  const { userAvatar, userName, title, message } = req.body;

  let comment = { userName, message, userAvatar };
  let comments = [];
  console.log("title", title);

  articleModel.find({ title }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json(err);
      return;
    }
    console.log("article", article);
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
        console.log("err", err);
        res.status(404).json(err);
        return;
      }

      res.status(200).json({ message: "ok", id: article.comments[0]._id });
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
