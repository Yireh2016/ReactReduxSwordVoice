import mongoose from "mongoose";
import fs, { readFile } from "fs";

// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

let articleModel = mongoose.model("Article");

export const createPostCtrl = (req, res) => {
  const projectData = req.body;
  let article = new articleModel(projectData.article);

  article.save((err, data) => {
    if (err) {
      console.log(`hubo error creando articulo ${err}`);
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

export const addClassToPostCtrl = (req, res) => {
  const { url, filename, classes } = req.body;

  fs.writeFile(
    `./dist/assets/uploads/${url}/${filename}.css`,
    classes,
    "utf-8",
    function(err) {
      if (err) {
        throw err;
      } else {
        res.json(200, "Classes Added");
      }
    }
  );
};
export const getClassFromPostCtrl = (req, res) => {
  const { filename } = req.params;
  const url = filename;
  const path = `./dist/assets/uploads/${url}/${filename}.css`;
  const readFile = () => {
    fs.readFile(
      `./dist/assets/uploads/${url}/${filename}.css`,
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("there was an error reading file", err);
          res.json(404);
        } else {
          res.json(200, data);
        }
      }
    );
  };

  fs.access(path, fs.F_OK, err => {
    if (err) {
      console.log("file do not exist", err);
      res.json(404);
      return;
    }

    readFile();
  });
};

export const uploadTempFileCtrl = (req, res) => {
  let fileObj = req.file;
  const fileURL = req.body.fileURL;

  fs.rename(
    `./dist/assets/uploads/${fileObj.filename}`,
    `./dist/assets/uploads/${fileURL}/${fileObj.originalname}`,
    err => {
      if (err) {
        res.json(`error copiando archivo ${err}`);
      } else {
        res.json(200, "file was uploaded");
      }
    }
  );
};

// export const deleteTempFileCtrl = (req, res) => {
//   const filename = req.body.filename;
//   const url = req.body.url;
//   fs.unlink(`./dist/assets/uploads/${url}/${filename}`, err => {
//     if (err) {
//       res.json(400);
//     } else {
//       res.json(200, `file ${filename} erased`);
//     }
//   });
// };

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
            `url(/uploads/${posts[i].url}/${posts[i].thumbnail.name})`,
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
  console.log("updatePostCtrl programDate", data.programDate);

  articleModel.find({ projectName: projectName }).exec(function(err, article) {
    if (err) {
      console.log(err);
    } else {
      // let stats = fs.lstatSync(`./dist/assets/uploads/${data.url}`);
      fs.readdir(`./dist/assets/uploads/${data.url}`, (err, files) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("files", files);
        files.forEach(file => {
          let found = false;
          for (let i = 0; i < data.files.length; i++) {
            if (file === data.files[i]) {
              found = true;
            }
          }
          if (!found) {
            fs.unlink(`./dist/assets/uploads/${data.url}/${file}`, err => {
              err && console.log("error eliminando archivo", err);
            });
          }
        });
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

  // articleModel.findOneAndUpdate(
  //   { projectName: projectName },//   data,
  //   { new: true },
  //   function(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // let stats = fs.lstatSync(`./dist/assets/uploads/${data.url}`);
  //       fs.readdir(`./dist/assets/uploads/${data.url}`, (err, files) => {
  //         if (err) {
  //           console.log(err);
  //           return;
  //         }
  //         console.log("files", files);
  //         files.forEach(file => {
  //           let found = false;
  //           for (let i = 0; i < data.files.length; i++) {
  //             if (file === data.files[i]) {
  //               found = true;
  //             }
  //           }
  //           if (!found) {
  //             fs.unlink(`./dist/assets/uploads/${data.url}/${file}`, err => {
  //               err && console.log("error eliminando archivo", err);
  //             });
  //           }
  //         });
  //       });
  //       res.json(200);
  //     }
  //   }
  // );
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
