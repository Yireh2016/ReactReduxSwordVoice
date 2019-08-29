//modules
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.

//components
import PostCard from "../../../components/postCard/PostCard";
import blogReducer from "../../../../app.redux.store/store/reducer/blogReducer";
import Loading from "../../../components/loading/loading";

//api Calls
import apiCtrl from "../../../../apiCalls/generic/apiCtrl";

const SimilPostLay = styled.div`
  padding: 15px;
  min-height: 100vh;
  height: 100%;

  ${"" /* position: sticky; //TODO: check this comment
  top: 0; */}

  @media (max-width: 1050px) {
    padding: 0;
    position: static;
    min-height: unset;
  }
`;

const Aside = styled.aside`
  border-radius: 15px;
  margin: 20px 0 0 0;
  padding: 20px 0;
  background-color: hsla(195, 100%, 9%, 1);
  position: sticky;
  top: 45px;

  > h2 {
    text-align: center;
    padding: 20px 0 30px;
    margin: 0px;
    color: #f95f0b;
  }

  @media (max-width: 1050px) {
    overflow: hidden;
    height: calc(45vw * 1.1 + 80px);
    padding-left: 40px;
    border-radius: 0;

    position: static;
    top: 0;

    > h2 {
      text-align: left;
      padding: 0 0 10px 0;
      margin-left: -10px;
    }
  }

  @media (max-width: 700px) {
    padding: 5px 10px;
    height: calc(60vw * 1.07 + 17vh);
    > h2 {
      margin-left: 0px;
      padding: 10px 0 10px 0;
    }
  }
`;

const Container = styled.div`
  overflow: hidden;
  height: calc(100vh - 225px);

  @media (max-width: 1050px) {
    height: calc((60vw * 1.07) + 22px + 1.8rem + 0.2vh) !important ;
    .simplebar-content {
      overflow: scroll hidden !important;
    }
  }

  @media (max-width: 700px) {
    height: calc((60vw * 1.07) + 22px + 1.8rem + 0.2vh) !important ;
    .simplebar-content {
      overflow: scroll hidden !important;
    }
  }
`;
const Simil = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px) {
    flex-direction: row;

    > div:last-child {
      padding: 5px 10px 5px 10px;
    }
  }
`;

const PostCardLay = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 1050px) {
    align-items: center;
  }
`;

const MorePosts = styled.div`
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border: 2px solid coral;
  border-radius: 8px;
  padding: ${props => (props.noPadding ? "0 20px 0" : "15px 30px 20px 15px")};
  text-align: center;
  box-sizing: border-box;
  background: #00171f;
  color: #00171f;
  color: coral;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }

  @media (max-width: 1050px) {
    height: 54px;
  }
`;

const SimilPost = ({
  asideTitle,
  device,
  article,
  blog,
  setSimilarArticles
}) => {
  const [similarPostsWidth, setSimilarPostsWidth] = useState(341);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let similarPostsWidth;
    if (device === "pc") {
      similarPostsWidth = ((window.outerWidth * 4) / 12) * 0.8;
    } else if (device === "tablet") {
      similarPostsWidth = window.outerWidth / 2;
    } else {
      similarPostsWidth = window.outerWidth * 0.7;
    }

    setSimilarPostsWidth(similarPostsWidth);
  }, [device]);

  const getSimilHandler = response => {
    console.log("getSimilHandler response", response); //TODO erase
    console.log(
      "getSimilHandler response.data.similArr",
      response.data.similArr
    ); //TODO erase

    setSimilarArticles([...article.similarPosts, ...response.data.similArr]);

    setShowLoading(false);
  };

  const errorGettingSimil = err => {
    //trigger dialog FIXME

    console.log("errorGettingSimil err", err);
    setShowLoading(false);
  };

  const MoreSimilPostsHandler = () => {
    console.log("giveme more posts"); //TODO: erase
    setShowLoading(true);
    //api call

    let searchStr = `${article.title} `;
    article.categories.forEach(keyword => {
      searchStr = `${searchStr}${keyword} `;
    });
    const data = {
      searchStr,
      articlesShown: { id: article.id, count: article.similarPosts.length }
    };

    const moreSimilarObj = {
      url: `/api/getMoreSimilarPosts`,
      method: "post",
      data
    };
    apiCtrl(moreSimilarObj, getSimilHandler, errorGettingSimil);
  };

  let similarPostArray = article.similarPosts; //
  // if (similarPostArray.length < blog.articlesCount) {
  if (similarPostArray.length < article.similarPostsCount) {
    //FIXME compare with simil total count
    similarPostArray = [...similarPostArray, "moreBtn"];
  }
  const similarPostsJSX = similarPostArray.map((post, i) => {
    if (post === "moreBtn") {
      return (
        <PostCardLay key={i} className="popularPost-article">
          <MorePosts
            noPadding={showLoading}
            onClick={MoreSimilPostsHandler}
            id="MoreSimilPosts"
          >
            {showLoading ? <Loading></Loading> : "More..."}
          </MorePosts>
        </PostCardLay>
      );
    }

    let avatar;
    if (typeof post.avatar === "object") {
      avatar = JSON.stringify(post.avatar);
    } else if (typeof post.avatar === "string") {
      avatar = post.avatar;
    }

    return (
      <PostCardLay key={i} className="popularPost-article">
        <PostCard
          id={`${i}`}
          title={post.title}
          postH={similarPostsWidth / 1.08}
          postImg={post.postImg.replace(
            `${post.postImg.match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]}`,
            `${post.postImg
              .match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]
              .replace(".", "_mobile.")}`
          )}
          postGradient={post.postGradient}
          hasSummary={true}
          keywords={post.keywords}
          author={post.author}
          date={post.date}
          url={`/blog/post/${post.url}`}
          avatar={avatar}
          summaryTextHtml={post.summaryTextHtml}
        />
      </PostCardLay>
    );
  });

  return (
    <SimilPostLay>
      <Aside>
        <h2>{asideTitle}</h2>
        <Container>
          <div data-simplebar>
            <Simil>{similarPostsJSX}</Simil>
          </div>
        </Container>
      </Aside>
    </SimilPostLay>
  );
};

const mapActionsToProps2 = dispatch => {
  return {
    setSimilarArticles: similarPosts =>
      dispatch({ type: "SET_SIMILAR_ARTICLES", payload: similarPosts })
  };
};

const mapStateToProps2 = state => {
  return {
    article: state.article,
    device: state.resize.device,
    blog: state.blog
  };
};

export default connect(
  mapStateToProps2,
  mapActionsToProps2
)(SimilPost);
