//modules
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.

//components
import PostCard from "../../../components/postCard/PostCard";

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
  background-color: #00171f;
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
  }
`;

const PostCardLay = styled.div`
  display: flex;
  justify-content: center;
`;
const SimilPost = ({ asideTitle, device, article }) => {
  const [similarPostsWidth, setSimilarPostsWidth] = useState(341);

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

  const similarPostArray = article.similarPosts;
  const similarPostsJSX = similarPostArray.map((post, i) => {
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

const mapStateToProps2 = state => {
  return {
    article: state.article,
    device: state.resize.device
  };
};

export default connect(mapStateToProps2)(SimilPost);
