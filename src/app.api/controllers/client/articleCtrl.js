import mongoose from 'mongoose'
//services
import {
  limitingComments,
  limitingResponses
} from '../../../app.client/services/limitingCommentsAndResponses'
import {updateReplyAvatars} from '../../../services/updateArticleAvatars'

import dbDateToNormalDate from '../../../services/dbDateToNormalDate'
import keywordsToArr from '../../../services/keywordsToArr'
import getPopularPosts from '../../../app.server/controllers/queries/getPopularPosts'
//queries
import searchLastArticlesQuery from '../../../common/queries/searchLastArticlesQuery'
import searchSimilarArticles from '../../../common/queries/searchSimilarArticles'

//redux store

const articleModel = mongoose.model('Article')
const userModel = mongoose.model('User')

export const socialCtrl = async (req, res) => {
  const {id, prop} = req.query
  const {socialCount} = req.body

  try {
    const article = await articleModel.find({_id: id}).exec()

    switch (prop) {
      case 'claps':
      case 'share':
      case 'comments':
      case 'views':
        article[0].socialCount[`${prop}`] =
          article[0].socialCount[`${prop}`] + socialCount
        break

      default:
        break
    }

    await article[0].save()
    res.status(200).send(article.socialCount)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

export const getMoreCommentsCtrl = async (req, res) => {
  const {id, commentsCount} = req.query

  try {
    await articleModel.findById(id)
    let articleComments = article.comments

    let {commentsArr} = limitingComments(articleComments, commentsCount)

    commentsArr = await updateArticleAvatars(commentsArr)

    res.status(200).send({status: 'OK', comments: commentsArr})
  } catch (err) {
    res.status(404).json({status: 'not Found'})
    return
  }
}

export const getMoreResponsesCtrl = (req, res) => {
  const {id, responsesCount, index} = req.query

  articleModel.findById(id, async (err, article) => {
    if (err) {
      res.status(404).json({status: 'not Found'})
      return
    }

    let responses = article.comments[index].responses

    responses = limitingResponses(responses, responsesCount)

    const updateReplyAvatarsRes = await updateReplyAvatars(responses, [])

    res
      .status(200)
      .send({status: 'OK', responses: updateReplyAvatarsRes.replyArr})
  })
}

export const getMorePostsCtrl = (req, res) => {
  const {totalPosts, postsCount} = req.query
  const limit = totalPosts - postsCount >= 7 ? 7 : totalPosts - postsCount

  articleModel
    .find({isPublished: true})
    .select('url thumbnail title date keywords description')
    .skip(parseInt(postsCount))
    .limit(limit)
    .populate('author')
    .sort({_id: 'descending'})
    .exec()
    .then(posts => {
      let postMinimumData = []
      for (let i = 0; i < posts.length; i++) {
        postMinimumData[i] = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles/${posts[i].url}/${posts[i].thumbnail.name})`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
          title: posts[i].title,
          summaryTextHtml: posts[i].description,
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          avatar: posts[i].author.userAvatar,
          date: dbDateToNormalDate(posts[i].date),
          keywords: keywordsToArr(posts[i].keywords[0])
        }
      }

      res.status(200).send(postMinimumData)
    })
    .catch(err => {
      console.log('err', err)
      res.status(404).json(err)
    })
}

export const setReplyCtrl = async (req, res) => {
  const {userName, title, message, index, userID} = req.body
  let intIndex = parseInt(index)

  let reply = {userName, message, userID}
  let responses
  let comments = []

  try {
    const article = await articleModel.find({title})
    comments = article[0].comments
    comments.forEach((comment, i) => {
      if (i === intIndex) {
        responses = comment.responses
        responses = [reply, ...responses]
      }
    })
    comments[intIndex].responses = responses

    article[0].comments[intIndex].responses = responses

    const savedArticle = article[0].save()
    res.status(200).json({
      message: 'ok',
      id: savedArticle.comments[intIndex].responses[0]._id
    })
  } catch (err) {
    res.status(404).json(err)
    return
  }
}

export const updateCommentClaps = async (req, res) => {
  const {id, index} = req.query
  const {claps} = req.body

  try {
    const article = await articleModel.find({_id: id})

    let comments = article[0].comments

    comments[index].claps = comments[index].claps + claps

    await articleModel.findOneAndUpdate({_id: id}, {comments})

    res.status(200).json({status: 'OK', result: comments[index].claps})
  } catch (error) {
    if (err) {
      console.log('err', err)
      res.status(404).json({status: 'ERR', message: err.message})
      return
    }
  }
}

export const updateReplyClaps = async (req, res) => {
  const {id, index, commentIndex} = req.query
  const {claps} = req.body

  try {
    const article = await articleModel.find({_id: id})

    let comments = article[0].comments

    comments[commentIndex].responses[index].claps =
      comments[commentIndex].responses[index].claps + claps

    await articleModel.findOneAndUpdate({_id: id}, {comments})

    res.status(200).json({
      status: 'OK',
      result: comments[commentIndex].responses[index].claps
    })
  } catch (err) {
    console.log('err', err)
    res.status(404).json({status: 'ERR', message: err.message})
  }
}

export const setCommentCtrl = async (req, res) => {
  const {userID, userName, title, message, commentIndex} = req.body

  try {
    const user = await userModel.findById(userID)

    let comment = {userAvatar: user.userAvatar, userID, userName, message}

    let comments = []

    const article = await articleModel.find({title})

    if (typeof commentIndex === 'number') {
      //edit comment
      let comment
      comment = article[0].comments[commentIndex]
      comment.message = message
      article[0].comments[commentIndex] = comment

      const article = await article[0].save()

      res.status(200).json({message: 'ok', id: article.comments[0]._id})

      return
    }

    //create Comment

    comments = article[0].comments

    if (comments) {
      article[0].comments = [comment, ...comments]
    } else {
      article[0].comments = [comment]
    }

    let socialCount = article[0].socialCount

    article[0].socialCount.comments = socialCount.comments + 1

    const savedArticle = await article[0].save()

    res.status(200).json({message: 'ok', id: savedArticle.comments[0]._id})
  } catch (err) {
    console.log('err', err)
    res.status(404).json(err)
    return err
  }
}

export const deleteCommentCtrl = async (req, res) => {
  const {id} = req.query

  try {
    const articleArr = await articleModel.find({'comments._id': id}).exec()

    if (articleArr.length > 0) {
      articleArr[0].comments.id(id).remove()

      articleArr[0].socialCount.comments = articleArr[0].comments.length

      await articleArr[0].save()

      res.status(200).json({message: 'ok'})
    } else {
      res.status(404).json({message: 'no article found'})
    }
  } catch (err) {
    res.status(404).json(err)
    return
  }
}

export const filterPopularCtrl = (req, res) => {
  const {filter, popularTotalCount, popularCount} = req.body

  getPopularPosts(
    articleModel,
    `${filter}`,
    popularTotalCount,
    popularCount,
    posts => {
      let postMinimumData = []
      for (let i = 0; i < posts.length; i++) {
        postMinimumData[i] = {
          url: posts[i].url,
          postImg:
            posts[i].thumbnail &&
            `url(${process.env.CDN_URL}/articles//${posts[i].url}/${posts[i].thumbnail.name})`,
          postGradient:
            posts[i].thumbnail &&
            `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
          title: posts[i].title,
          summaryTextHtml: posts[i].description,
          author:
            `${posts[i].author.userFirstName} ` +
            `${posts[i].author.userLastName}`,
          avatar: posts[i].author.userAvatar,
          date: dbDateToNormalDate(posts[i].date),
          keywords: keywordsToArr(posts[i].keywords[0])
        }
      }

      res.status(200).send({status: 'OK', popularArr: postMinimumData})
    },
    err => {
      console.log('error en blog ', err)
      res.status(404).json(err)
    }
  )
}

export const searchArticleCtrl = (req, res) => {
  const {searchValue, count} = req.query
  const errHandler = err => {
    res.status(404).json(err)
  }

  const successHandler = async arr => {
    try {
      const searchCount = await articleModel
        .find({$text: {$search: `${searchValue}`}})
        .countDocuments()

      res.status(200).send({status: 'OK', searchArr: arr, searchCount})
    } catch (err) {
      errHandler(err)
      return
    }
  }

  searchSimilarArticles(
    articleModel,
    {count: parseInt(count)},
    searchValue,
    successHandler,
    errHandler
  )
}

export const getMoreSimilarPostsCtrl = (req, res) => {
  const {searchStr, articlesShown} = req.body

  const successHandler = similArr => {
    res.status(200).send({similArr, status: 'OK'})
  }

  const errHandler = err => {
    res.status(404).send(err)
  }

  searchSimilarArticles(
    articleModel,
    articlesShown,
    searchStr,
    successHandler,
    errHandler
  )
}

export const searchLastArticlesCtrl = (_, res) => {
  searchLastArticlesQuery(
    articleModel,
    (articlesTotalCount, articlesArr) => {
      res.status(200).send({articlesTotalCount, articlesArr})
    },
    err => {
      res.status(404).json(err)
    }
  )
}

export const advancedSearchDbCtrl = async (req, res) => {
  let {text, author, dateFrom, dateTo} = req.query

  if (!dateTo) {
    dateTo = new Date()
  }
  if (!dateFrom) {
    dateFrom = new Date('1990')
  }

  let populateObj

  if (!author) {
    populateObj = {
      path: 'author',
      select: 'userFirstName userLastName userAvatar userName'
    }
  } else {
    const authorWordsArr = author.match(/[^\s]+/g)
    let authorPattern = ''

    for (let index = 0; index < authorWordsArr.length; index++) {
      if (index === authorWordsArr.length - 1) {
        authorPattern = authorPattern + `${authorWordsArr[index]}`
      } else {
        authorPattern = authorPattern + `${authorWordsArr[index]}|`
      }
    }

    populateObj = {
      path: 'author',
      match: {
        $or: [
          {userFirsName: {$regex: authorPattern, $options: 'i'}},
          {userLastName: {$regex: authorPattern, $options: 'i'}},
          {userName: {$regex: authorPattern, $options: 'i'}}
        ]
      },
      select: 'userFirstName userLastName userAvatar userName'
    }
  }

  let query
  if (text) {
    query = {
      $and: [
        {
          $text: {$search: `${text}`}
        },
        {isPublished: true},
        {
          date: {
            $gt: dateFrom,
            $lt: dateTo
          }
        }
      ]
    }
  } else {
    query = {
      $and: [
        {isPublished: true},
        {
          date: {
            $gt: dateFrom,
            $lt: dateTo
          }
        }
      ]
    }
  }

  try {
    const posts = await articleModel
      .find(query)
      .sort({date: 'descending'})
      .select('url thumbnail title date keywords description')
      .populate(populateObj)
      .exec()

    let postMinimumData = []
    for (let i = 0; i < posts.length; i++) {
      postMinimumData[i] = {
        url: posts[i].url,
        postImg:
          posts[i].thumbnail &&
          `url(${process.env.CDN_URL}/articles//${posts[i].url}/${posts[i].thumbnail.name})`,
        postGradient:
          posts[i].thumbnail &&
          `linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${posts[i].thumbnail.color} 73.79%)`,
        title: posts[i].title,
        summaryTextHtml: posts[i].description,
        author:
          `${posts[i].author.userFirstName} ` +
          `${posts[i].author.userLastName}`,
        avatar: posts[i].author.userAvatar,
        date: dbDateToNormalDate(posts[i].date),
        keywords: keywordsToArr(posts[i].keywords[0])
      }
    }

    res.status(200).send({advancedArr: postMinimumData})
  } catch (err) {
    res.status(404).send(err)
    return
  }
}
