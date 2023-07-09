import mongoose from 'mongoose'

let siteModel = mongoose.model('Site')

export const removeSiteMap = ({url}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [site] = await siteModel.find()

      if (!site) {
        resolve('no site created yet')
        return
      }
      const urlsArr = site.sitemap.urls
      console.log('urlsArr', urlsArr)

      const urlsFilterArr = urlsArr.filter(link => {
        return link.url !== `${process.env.WEB_URL}/blog/post/${url}`
      })

      console.log('urlsFilterArr', urlsFilterArr)

      site.sitemap.urls = urlsFilterArr

      await site.save()
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

export const addToSiteMap = ({url, date}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [site] = await siteModel.find()

      if (!site) {
        const urlArr = [
          {
            url: `${process.env.WEB_URL}`,
            changefreq: 'monthly',
            priority: 1,
            lastmod: '2019-09-07T14:09:33+00:00'
          },
          {
            url: `${process.env.WEB_URL}/about`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: '2019-09-07T14:09:33+00:00'
          },
          {
            url: `${process.env.WEB_URL}/blog`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: '2019-09-07T14:09:33+00:00'
          },
          {
            url: `${process.env.WEB_URL}/contact`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: '2019-09-07T14:09:33+00:00'
          },
          {
            url: `${process.env.WEB_URL}/blog/post/${url}`,
            changefreq: 'monthly',
            priority: 0.64,
            lastmod: date
          }
        ]
        const siteInstance = new siteModel()
        siteInstance.sitemap.urls = urlArr
        await siteInstance.save()

        resolve()
        return
      }

      const newUrl = {
        url: `${process.env.WEB_URL}/blog/post/${url}`,
        changefreq: 'monthly',
        priority: 0.64,
        lastmod: date
      }

      site.sitemap.urls = [...site.sitemap.urls, newUrl]
      await site.save()
      resolve()
    } catch (error) {
      reject(err)
    }
  })
}
