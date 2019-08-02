const getPopularPosts = (articleModel, filter, callback, errCallback) => {
  let sort;

  switch (filter) {
    case "views":
      sort = { "socialCount.views": "descending" };
      break;
    case "shares":
      sort = { "socialCount.shares": "descending" };
      break;
    case "comments":
      sort = { "socialCount.comments": "descending" };
      break;
    case "claps":
      sort = { "socialCount.claps": "descending" };
      break;

    default:
      sort = { "socialCount.views": "descending" };
      break;
  }

  return articleModel
    .find({ isPublished: true })
    .select("url thumbnail title date keywords description")
    .limit(7)
    .populate("author")
    .sort(sort)
    .exec()
    .then(posts => {
      callback(posts);
    })
    .catch(err => {
      errCallback(err);
    });
};

export default getPopularPosts;
