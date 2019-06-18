import mongoose from "mongoose";
import fs from "fs";
import axios from "axios";
import formidable from "formidable";

// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

let articleModel = mongoose.model("Article");

export const createPostCtrl = (req, res) => {
  const projectData = req.body;
  let article = new articleModel(projectData.article);

  axios
    .post(`http://localhost:3000/cdn/createPost/${projectData.article.url}`)
    .then(result => {
      console.log("respuesta correcta del post", result);

      article.save(err => {
        if (err) {
          console.log(`hubo error creando articulo ${err}`);
          res.json(400, { code: 400, message: `there was an error: ${err}` });
        } else {
          //creando carpeta con nuevo proyecto

          res.status(200).send();
        }
      });
    })
    .catch(err => {
      console.log("err en create post", err.message);
      res.status(401).send(err.message);
    });
};

export const addClassToPostCtrl = (req, res) => {
  const { url, filename, classes } = req.body;

  axios
    .post(
      `http://localhost:3000/cdn/addClass?url=${url}&filename=${filename}&classes=${classes}`
    )
    .then(apiRes => {
      if (apiRes.status === 200) {
        res.status(200).send("Classes Added");
      }
    })
    .catch(err => {
      console.log("error on addClass", err);
    });
};
export const getClassFromPostCtrl = (req, res) => {
  const { filename } = req.params;
  const url = filename;
  // const readFile = () => {
  //   fs.readFile(
  //     "utf-8",
  //     (err, data) => {
  //       if (err) {
  //         console.log("there was an error reading file", err);
  //         res.status(404);
  //       } else {
  //         res.status(200).send(data);
  //       }
  //     }
  //   );
  // };

  axios
    .get(`http://localhost:3000/cdn/getClasses/${url}`)
    .then(apiRes => {
      if (apiRes.status === 404) {
        return;
      }
      if (apiRes.status === 200) {
        res.status(200).send(apiRes.data);
        // res.status(200).send(data);

        fs.access(path, fs.F_OK, err => {
          if (err) {
            console.log("file do not exist", err);
            res.status(404).send();
            return;
          }

          // readFile();
        });
      }
    })
    .catch(err => {
      console.log(`error getting classes ${err}`);
    });
};

export const uploadTempFileCtrl = (req, res) => {
  const fileURL = req.body.fileURL;
  const file = req.file;

  // fs.rename(
  //   err => {
  //     if (err) {
  //       res.json(`error copiando archivo ${err}`);
  //     } else {
  //       res.json(200, "file was uploaded");
  //     }
  //   }
  // );
};

export const getPostCtrl = (req, res) => {
  let { skip } = req.query;

  skip = skip ? parseInt(skip) : 0; //default number of post to fetch 7

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

  articleModel
    .find()
    .select()
    .limit(7)
    .skip(skip)
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
            `url(http:/localhost:3000/articles/${posts[i].url}/${
              posts[i].thumbnail.name
            })`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
              posts[i].thumbnail.color
            } 73.79%)`,
          projectName: posts[i].projectName,
          isPublished: posts[i].isPublished,
          title: posts[i].title,
          description: posts[i].description,
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          authorAvatar: posts[i].author.userAvatar,
          date: posts[i].date,
          programDate: posts[i].programDate,
          editionHistory: posts[i].editionHistory,
          keywords: posts[i].keywords[0]
        };
      }
      res.json(postMinimumData);
    })
    .catch(err => {
      if (err) {
        console.log("err", err);
        res.json(err);
        return;
      }
    });
};

export const getArticleCtrl = (req, res) => {
  const projectName = req.params.projectName;

  articleModel
    .findOne({ url: `${projectName}` })
    .select()
    .populate("author")
    .exec()
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      if (err) {
        console.log("err", err);
        res.json(err);
        return;
      }
    });
};
export const updatePostCtrl = (req, res) => {
  const projectName = req.params.projectName;
  const data = req.body;

  articleModel.find({ projectName: projectName }).exec(function(err, article) {
    if (err) {
      console.log(err);
    } else {
      console.log(article);

      axios
        .delete(`http://localhost:3000/cdn/deleteFiles/${data.url}`, data)
        .then(() => {
          console.log("files erased");
        })
        .catch(err => {
          console.log("error erasing files", err);
        });

      let editionHistoryArr;
      if (data.editionHistory) {
        editionHistoryArr = [...article[0].editionHistory, data.editionHistory];
      }
      data.editionHistory = editionHistoryArr;

      console.log("postcontroller data.editionHistory", data.editionHistory);

      const {
        elements,
        files,
        keywords,
        html,
        projectName,
        description,
        title,
        url,
        thumbnail,
        programDate,
        date,
        isPublished
      } = data;

      article[0].elements = elements ? elements : article[0].elements;
      article[0].files = files ? files : article[0].files;
      article[0].keywords = keywords ? keywords : article[0].keywords;
      article[0].html = html ? html : article[0].html;
      article[0].projectName = projectName
        ? projectName
        : article[0].projectName;
      article[0].description = description
        ? description
        : article[0].description;
      article[0].title = title ? title : article[0].title;
      article[0].url = url ? url : article[0].url;
      article[0].thumbnail = thumbnail ? thumbnail : article[0].thumbnail;

      article[0].editionHistory = data.editionHistory
        ? data.editionHistory
        : article[0].edtionHistory;
      article[0].programDate = programDate
        ? programDate
        : article[0].programDate;
      article[0].date = date ? date : article[0].date;
      article[0].isPublished =
        isPublished === undefined ? article[0].isPublished : isPublished;

      article[0].save();
      res.json(200);
    }
  });
};

export const deletePostCtrl = (req, res) => {
  articleModel
    .findOneAndDelete({ projectName: req.params.projectName })
    .exec(err => {
      if (err) {
        res.json(404, err);
        return;
      }
      res.json(204, { message: "Post removed" });
    });
};
