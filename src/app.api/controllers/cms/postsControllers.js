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
        console.log("filelistAsync complete");
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

  console.log("getting data for classes handler");
};

export const uploadTempFileCtrl = (req, res) => {
  let fileObj = req.file;
  const fileURL = req.body.fileURL;

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
        // let stats = fs.lstatSync(`./dist/assets/uploads/${data.url}`);
        fs.readdir(`./dist/assets/uploads/${data.url}`, (err, files) => {
          files.forEach(file => {
            console.log(file);
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
        res.json(200);
      }
    }
  );
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
