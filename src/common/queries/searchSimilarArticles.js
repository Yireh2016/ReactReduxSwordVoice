import paragraphService from "../../services/paragraphService";
import dbDateToNormalDate from "../../services/dbDateToNormalDate";
import keywordsToArr from "../../services/keywordsToArr";

const searchSimilarArticles = (
  articleModel,
  articlesShown,
  searchValue,
  successFn,
  errFn
) => {
  console.log("searchValue", searchValue); //TODO rm
  console.log("articlesShown", articlesShown); //TODO rm
  const query = {
    isPublished: true,
    $text: { $search: `${searchValue}` }
  };

  const options = {
    score: { $meta: "textScore" }
  };
  return articleModel
    .find(query, options)
    .select("url thumbnail title date keywords description")
    .populate({
      path: "author",
      select: "userFirstName userLastName userAvatar userName"
    })
    .sort({ score: { $meta: "textScore" } })
    .skip(articlesShown.count)
    .limit(7) // FIXME change it to 7
    .exec()
    .then(queryPosts => {
      let posts;
      if (queryPosts.length > 1 && articlesShown.id) {
        posts = queryPosts.filter(post => {
          return post._id !== articlesShown.id;
        });
      } else {
        posts = queryPosts;
      }

      let postMinimumData = [];
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
        };
      }

      successFn(postMinimumData);
    })
    .catch(err => {
      errFn(err);
    });
};

export default searchSimilarArticles;
