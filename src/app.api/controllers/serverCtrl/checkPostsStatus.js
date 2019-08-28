import mongoose from "mongoose";

const checkPostStatus = () => {
  const articleModel = mongoose.model("Article");

  let now = new Date();
  articleModel
    .find({ isPublished: false })
    .where("programDate")
    .lt(now)
    .exec((err, articles) => {
      if (err || articles.length === 0) {
        return;
      }
      articles.forEach(article => {
        console.log("article.programDate  ", article.programDate);
        console.log("article.title where programDate< now  ", article.title);
        article.isPublished = true;
        article.programDate = null;
        article.date = now;
        article.save();

        //ispublished true
        //programDate null
        //date now
      });
    });
  // }
};

export default checkPostStatus;
