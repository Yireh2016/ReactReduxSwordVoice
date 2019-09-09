import mongoose from "mongoose";

let siteModel = mongoose.model("Site");

export const removeSiteMap = ({ url }) => {
  return new Promise((resolve, reject) => {
    siteModel
      .find()
      .then(site => {
        if (site.length === 0) {
          resolve("no site created yet");
          return;
        }
        const urlsArr = site[0].sitemap.urls;
        console.log("urlsArr", urlsArr);

        //`${process.env.WEB_URL}/blog/post/${url}`
        const urlsFilterArr = urlsArr.filter(link => {
          return link.url !== `${process.env.WEB_URL}/blog/post/${url}`;
        });

        console.log("urlsFilterArr", urlsFilterArr);

        site[0].sitemap.urls = urlsFilterArr;

        site[0].save(err => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const addToSiteMap = ({ url, date }) => {
  return new Promise((resolve, reject) => {
    siteModel
      .find()
      .then(site => {
        if (site.length === 0) {
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
            },
            {
              url: `${process.env.WEB_URL}/blog/post/${url}`,
              changefreq: "monthly",
              priority: 0.64,
              lastmod: date
            }
          ];
          const siteInstance = new siteModel();
          siteInstance.sitemap.urls = urlArr;
          siteInstance.save(err => {
            if (err) {
              reject(err);
              return;
            }
          });

          resolve();
          return;
        }

        const newUrl = {
          url: `${process.env.WEB_URL}/blog/post/${url}`,
          changefreq: "monthly",
          priority: 0.64,
          lastmod: date
        };

        site[0].sitemap.urls = [...site[0].sitemap.urls, newUrl];
        site[0].save(err => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
