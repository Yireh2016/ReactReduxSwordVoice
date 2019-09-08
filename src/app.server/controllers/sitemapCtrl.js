import mongoose from "mongoose";
import { createSitemap } from "sitemap";

let siteModel = mongoose.model("Site");

const sitemapCtrl = (req, res) => {
  siteModel
    .find()
    .then(site => {
      if (site.length === 0) {
        res.status(404).send("File Not Found");
        return;
      }
      console.log("sitemap", site[0].sitemap);
      const sitemapCreated = createSitemap(site[0].sitemap);

      res.status(200).send(sitemapCreated.toXML());
    })
    .catch(() => {
      res.status(404).send("File Not Found");
    });
};

export default sitemapCtrl;

/*function(req, res) {
  try {
    const xml = sitemap.toXML()
    res.header('Content-Type', 'application/xml');
    res.send( xml );
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
  });
}*/
