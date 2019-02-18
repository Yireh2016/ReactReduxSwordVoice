import mongoose from "mongoose";
import fs from "fs";
import multer from "multer";

// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

let articleModel = mongoose.model("Article");

export const createPostCtrl = (req, res) => {
  const projectData = req.body;
  console.log("projectData", projectData.article);
  let article = new articleModel(projectData.article);

  article.save((err, data) => {
    if (err) {
      res.json(400, { code: 400, message: `there was an error: ${err}` });
    } else {
      //creando carpeta con nuevo proyecto
      if (!fs.existsSync(`./dist/assets/uploads/${projectData.article.url}`)) {
        fs.mkdirSync(`./dist/assets/uploads/${projectData.article.url}`);
      }

      res.json(200, data);
    }
  });
};

export const uploadFileCtrl = (req, res) => {
  let fileObj = req.file;
  const filename = req.body.filename;
  const fileURL = req.body.fileURL;
  console.log("fileObj REQUESTTTTTTTTt", fileObj);

  fs.rename(
    `./dist/assets/uploads/${fileObj.filename}`,
    `./dist/assets/uploads/${fileURL}/${fileObj.originalname}`,
    err => {
      if (err) {
        res.json(err);
      } else {
        res.json(200, "file was uploaded");
      }
    }
  );
};

export const getPostCtrl = (req, res) => {
  if (req.params.projectName) {
    articleModel.findOne(
      { projectName: req.params.projectName },
      (err, post) => {
        if (err) {
          console.log("err", err);
          res.json(err);
          return;
        }

        res.json(post);
      }
    );
    return;
  }

  articleModel.find().exec((err, posts) => {
    if (err) {
      console.log("err", err);
      res.json(err);
      return;
    }
    let postMinimumData = [];
    for (let i = 0; i < posts.length; i++) {
      postMinimumData[i] = {
        projectName: posts[i].projectName,
        title: posts[i].title,
        description: posts[i].description,
        author: posts[i].author,
        date: posts[i].date,
        keywords: posts[i].keywords[0]
      };
    }
    res.json(postMinimumData);
  });
};

export const updatePostCtrl = (req, res) => {
  const projectName = req.params.projectName;
  let data = req.body;
  console.log("data to update", data);
  articleModel.findOneAndUpdate(
    { projectName: projectName },
    {
      elements: data.elements,
      files: data.files,
      keywords: data.keywords,
      author: data.author,
      date: data.date,
      html: data.html,
      description: data.description,
      title: data.title,
      url: data.url
    },
    { new: true },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        res.end("success");
      }
    }
  );
};
