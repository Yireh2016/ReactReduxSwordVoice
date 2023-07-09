import mongoose from 'mongoose'

const checkPostStatus = async () => {
  const articleModel = mongoose.model('Article')

  let now = new Date()

  try {
    const articles = await articleModel
      .find({isPublished: false})
      .where('programDate')
      .lt(now)
      .exec()

    if (articles.length === 0) {
      return
    }

    for (const article of articles) {
      article.isPublished = true
      article.programDate = null
      article.date = now
      await article.save()

      addToSiteMap({
        url: `${process.env.WEB_URL}/blog/post/${this.props.project.url}`,
        date:
          date.toISOString().match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g) +
          '+00:00'
      })
    }
  } catch (err) {
    console.log(err)
    return
  }
}

export default checkPostStatus
