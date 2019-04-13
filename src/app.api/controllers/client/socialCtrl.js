import mongoose from "mongoose";

const articleModel = mongoose.model("Article");

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
