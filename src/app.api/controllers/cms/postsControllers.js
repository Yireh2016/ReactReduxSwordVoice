import mongoose from "mongoose";
import fs from "fs";
import axios from "axios";
import { createSitemap } from "sitemap";

import { removeSiteMap, addToSiteMap } from "../../services/sitemapManager";
// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

let articleModel = mongoose.model("Article");

let siteModel = mongoose.model("Site");

export const createPostCtrl = (req, res) => {
  const projectData = req.body;
  let article = new articleModel(projectData.article);

  axios
    .post(`${process.env.CDN_URL}/cdn/createPost/${projectData.article.url}`)
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
      `${process.env.CDN_URL}/cdn/addClass?url=${url}&filename=${filename}&classes=${classes}`
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
    .get(`${process.env.CDN_URL}/cdn/getClasses/${url}`)
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
          res.status(401).json(err);
          return;
        }

        res.status(200).json(post);
      }
    );
    return;
  }

  articleModel
    .find()
    .limit(7)
    .skip(skip)
    .populate("author")
    .sort({ _id: "descending" })
    .exec()
    .then(posts => {
      let postMinimumData = [];
      for (let i = 0; i < posts.length; i++) {
        const post = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles/${posts[i].url}/${posts[i].thumbnail.name})`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
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

        postMinimumData.push(post);
      }
      res.status(200).json(postMinimumData);
    })
    .catch(err => {
      if (err) {
        console.log("err", err);
        res.status(401).json(err);
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
  const { projectName, editionType } = req.query;
  const data = req.body;

  articleModel
    .find({ projectName })
    .then(article => {
      let editionHistoryArr;
      if (data.editionHistory) {
        editionHistoryArr = [...article[0].editionHistory, data.editionHistory];
      }
      data.editionHistory = editionHistoryArr;

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

      //This code remove all html tag for a clear content

      if (html) {
        const content = html.replace(
          />undefined|<\/?html|<\/?xmp|<\/?wbr|<\/?video|<\/?var|<\/?ul|<\/?u|<\/?tt|<\/?track|<\/?tr|<\/?title|<\/?time|<\/?thead|<\/?th|<\/?tfoot|<\/?textarea|<\/?template|<\/?td|<\/?tbody|<\/?table|<\/?sup|<\/?summary|<\/?sub|<\/?style|<\/?strong|<\/?strike|<\/?span|<\/?spacer|<\/?source|<\/?small|<\/?slot|<\/?shadow|<\/?select|<\/?section|<\/?script|<\/?samp|<\/?s|<\/?ruby|<\/?rtc|<\/?rt|<\/?rp|<\/?rb|<\/?q|<\/?progress|<\/?pre|<\/?plaintext|<\/?picture|<\/?param|<\/?p|<\/?output|<\/?option|<\/?optgroup|<\/?ol|<\/?object|<\/?noscript|<\/?noframes|<\/?noembed|<\/?nobr|<\/?nextid|<\/?nav|<\/?multicol|<\/?meter|<\/?meta|<\/?menuitem|<\/?menu|<\/?marquee|<\/?mark|<\/?map|<\/?main|<\/?listing|<\/?link|<\/?li|<\/?legend|<\/?label|<\/?keygen|<\/?kbd|<\/?isindex|<\/?ins|<\/?input|<\/?img|<\/?image|<\/?iframe|<\/?i|<\/?hr|<\/?hgroup|<\/?header|<\/?head|<\/?frameset|<\/?frame|<\/?form|<\/?footer|<\/?font|<\/?figure|<\/?figcaption|<\/?fieldset|<\/?embed|<\/?em|<\/?element|<\/?dt|<\/?dl|<\/?div|<\/?dir|<\/?dialog|<\/?dfn|<\/?details|<\/?del|<\/?dd|<\/?datalist|<\/?data|<\/?content|<\/?command|<\/?colgroup|<\/?col|<\/?code|<\/?cite|<\/?center|<\/?caption|<\/?canvas|<\/?button|<\/?br|<\/?body|<\/?blockquote|<\/?blink|<\/?big|<\/?bgsound|<\/?bdo|<\/?bdi|<\/?basefont|<\/?base|<\/?b|<\/?audio|<\/?aside|<\/?article|<\/?area|<\/?applet|<\/?address|<\/?acronym|<\/?abbr|<\/?a|[\w-]+="?'?[\w:;.\/&()%#?@\s,\\-]*"?'?|<\/?h[1-6]|\/?>/gi,
          ""
        );

        article[0].content = content;
      }

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

      article[0].save(async err => {
        if (err) {
          res.status(401).send(err);
          return;
        }

        switch (editionType) {
          case "unpublish": {
            try {
              await removeSiteMap({
                url: `${process.env.WEB_URL}/blog/post/${article[0].url}`
              });

              res.status(200).send("Unpublishing ready");
            } catch (error) {
              res.status(200).send(error);
            }

            break;
          }

          case "publish": {
            try {
              await addToSiteMap({
                url: `${article[0].url}`,
                date:
                  article[0].date
                    .toISOString()
                    .match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g) + "+00:00"
              });
              res.status(200).send("publish ready");
            } catch (error) {
              res.status(200).send(error);
            }

            break;
          }
          default: {
            res.status(200).send("ok");
            break;
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
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

export const addToSiteMapCtrl = (req, res) => {
  const { date, url } = req.body;

  const newUrl = {
    url: `${process.env.WEB_URL}/blog/post/${url}`,
    changefreq: "monthly",
    priority: 0.64,
    lastmod: date
  };

  siteModel
    .find()
    .then(site => {
      site[0].sitemap.urls = [...site[0].sitemap.urls, newUrl];
      site[0].save((err, newSite) => {
        if (err) {
          res.status(404).send(err);
          return;
        }

        const sitemap = createSitemap(newSite.sitemap);

        res.header("Content-Type", "application/xml");
        res.status(200).send(sitemap.toXML());
      });
    })
    .catch(err => {
      res.status(404).send(err);
    });
};
export const removeSiteMapCtrl = (req, res) => {
  const { url } = req.body;

  siteModel
    .find()
    .then(site => {
      const urlsArr = site[0].sitemap.urls;
      console.log("urlsArr", urlsArr);

      //`${process.env.WEB_URL}/blog/post/${url}`
      const urlsFilterArr = urlsArr.filter(link => {
        return link.url !== `${process.env.WEB_URL}/blog/post/${url}`;
      });

      console.log("urlsFilterArr", urlsFilterArr);

      site[0].sitemap.urls = urlsFilterArr;

      site[0].save((err, newSite) => {
        if (err) {
          res.status(404).send(err);
          return;
        }

        const sitemap = createSitemap(newSite.sitemap);

        res.header("Content-Type", "application/xml");
        res.status(200).send(sitemap.toXML());
      });
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

export const createSiteMapCtrl = (req, res) => {
  const urlArr = [
    {
      url: `${process.env.WEB_URL}`,
      changefreq: "monthly",
      priority: 1,
      lastmod: "2019-09-07T14:09:33+00:00"
    },
    {
      url: `${process.env.WEB_URL}/about`,
      changefreq: "monthly",
      priority: 0.8,
      lastmod: "2019-09-07T14:09:33+00:00"
    },
    {
      url: `${process.env.WEB_URL}/blog`,
      changefreq: "monthly",
      priority: 0.8,
      lastmod: "2019-09-07T14:09:33+00:00"
    },
    {
      url: `${process.env.WEB_URL}/contact`,
      changefreq: "monthly",
      priority: 0.8,
      lastmod: "2019-09-07T14:09:33+00:00"
    }
  ];
  siteModel
    .find()
    .then(site => {
      if (site.length === 0) {
        const siteInstance = new siteModel();
        siteInstance.sitemap.urls = urlArr;
        siteInstance.save((err, newSite) => {
          if (err) {
            res.status(404).send(err);
            return;
          }

          const sitemap = createSitemap(newSite.sitemap);

          res.header("Content-Type", "application/xml");
          res.status(200).send(sitemap.toXML());
        });
        return;
      }

      const sitemap = createSitemap(site[0].sitemap);

      res.header("Content-Type", "application/xml");
      res.status(200).send(sitemap.toXML());
    })
    .catch(err => {
      res.status(404).send(err);
    });
};
