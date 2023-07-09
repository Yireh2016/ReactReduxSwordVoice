import mongoose from 'mongoose'
import {createSitemap} from 'sitemap'

let siteModel = mongoose.model('Site')

const sitemapCtrl = (req, res) => {
  siteModel
    .find()
    .then(([site]) => {
      if (!site) {
        res.status(404).send('File Not Found')
        return
      }
      console.log('sitemap', site.sitemap)
      const sitemapCreated = createSitemap(site.sitemap)

      res.header('Content-Type', 'application/xml')
      res.status(200).send(sitemapCreated.toXML())
    })
    .catch(() => {
      res.status(404).send('File Not Found')
    })
}

export default sitemapCtrl
