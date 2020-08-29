import mongoose from 'mongoose'

const checkPostStatus = () => {
  const articleModel = mongoose.model('Article')

  let now = new Date()
  articleModel
    .find({isPublished: false})
    .where('programDate')
    .lt(now)
    .exec((err, articles) => {
      if (err || articles.length === 0) {
        return
      }
      articles.forEach(article => {
        article.isPublished = true
        article.programDate = null
        article.date = now
        article.save(err => {
          if (err) {
            console.log(err)
            return
          }

          addToSiteMap({
            url: `${process.env.WEB_URL}/blog/post/${this.props.project.url}`,
            date:
              date.toISOString().match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g) +
              '+00:00'
          })
        })

        //ispublished true
        //programDate null
        //date now
      })
    })
  // }
}

export default checkPostStatus
