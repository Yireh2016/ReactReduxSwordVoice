import mongoose from "mongoose";

const articleModel = mongoose.model("Article");
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

export const setCommentCtrl = async (req, res) => {
  const { userName, title } = req.query;
  const userAvatar = req.body.avatar;
  const message = req.body.message;

  let comment = { userName, message, userAvatar };
  let comments = [];

  articleModel.find({ title }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json(err);
      return;
    }

    comments = article[0].comments;
    comments = [comment, ...comments];
    let socialCount = article[0].socialCount;

    socialCount.comments = socialCount.comments + 1;

    articleModel.findOneAndUpdate(
      { title },
      { comments, socialCount },
      (err, article) => {
        if (err) {
          console.log("err", err);
          res.status(404).json(err);
          return;
        }
      }
    );

    res.status(200).json({ message: "ok" });
  });
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
