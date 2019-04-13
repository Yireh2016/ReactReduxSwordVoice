import mongoose from "mongoose";

const articleModel = mongoose.model("Article");

export const socialCtrl = (req, res) => {
  console.log("req.query", req.query);

  const claps = parseInt(req.query.claps);
  const title = req.query.title;

  articleModel.findOneAndUpdate(
    { title },
    {
      socialCount: { claps: claps }
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
