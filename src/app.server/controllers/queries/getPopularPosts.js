const getPopularPosts = (
  articleModel,
  filter,
  totalCount,
  count,
  callback,
  errCallback
) => {
  console.log("functions", filter, totalCount, count);

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

    // default:
    //   sort = { "socialCount.views": "descending" };
    //   break;
  }
  const limit = totalCount - count >= 7 ? 7 : totalCount - count;
  console.log("totalCount", totalCount);
  console.log("limit", limit);
  console.log("count", count);
  return articleModel
    .find({ isPublished: true })
    .select("url thumbnail title date keywords description")
    .limit(limit)
    .skip(count)
    .populate({
      path: "author",
      select: "userFirstName userLastName userAvatar userName"
    })
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
