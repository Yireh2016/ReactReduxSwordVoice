import mongoose from "mongoose";

const articleModel = mongoose.model("Article");
// const usersModel = mongoose.model("User");

export const socialCtrl = (req, res) => {
  const claps = req.query.claps;
  const share = req.query.share;
  const comments = req.query.claps;
  const views = req.query.views;

  const title = req.query.title;

  let socialObj;
  if (claps) {
    socialObj = { claps: parseInt(claps) };
  } else if (share) {
    socialObj = { share: parseInt(share) };
  } else if (comments) {
    socialObj = { comments: parseInt(comments) };
  } else if (views) {
    socialObj = { views: parseInt(views) };
  }

  articleModel.findOneAndUpdate(
    { title },
    {
      socialCount: socialObj
    },
    function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("NEW claps count");
        res.sendStatus(200);
        res.end("success");
      }
    }
  );
};

export const setCommentCtrl = async (req, res) => {
  const { userName, title, message } = req.query;
  console.log("req.body on setCommentCtrl", req.body);
  const userAvatar = req.body.loggedUserAvatar;

  let comment = { userName, message, userAvatar };
  console.log(`comment to save on article ${title}`, comment);
  let comments = [];

  articleModel.find({ title }, (err, article) => {
    if (err) {
      console.log("err", err);
      res.status(404).json(err);
      return;
    }

    console.log("article.comments", article[0].comments);
    console.log("comment", comment);
    comments = article[0].comments;
    comments = [comment, ...comments];
    console.log("comments", comments);

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
