import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//assets
import {
  like as like2,
  comments as comments2,
  share as share2
} from "../../assets/svgIcons/SvgIcons";

// {
//   // article
//   // likeCount = 0,
//   // dislikeCount = 0,
//   // commentCount = 0,
//   // shareCount = 0,
//   // setLikeCount,
//   // setDislikeCount,
//   // setCommentsCount,
//   // setShareCount
// }
const SocialBar = ({
  socialCount,
  setLikeCount,
  setDislikeCount,
  setCommentsCount,
  setShareCount
}) => {
  const BarContainer = styled.div`
    display: inline-block;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.09);
    border-radius: 5px;
    margin: 15px 15px 0 15px;
  `;
  const BarLayout = styled.div`
    display: flex;
    padding: 15px;
  `;
  const SocialItem = styled.div`
    margin: 0 8px;
    display: inline-flex;
    align-items: center;
  `;
  const Icon = styled.span`
    transform: ${props =>
      props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
    svg {
      height: 20px;
      width: 20px;
      fill: #f95f0b;
      margin: 0 8px;

      &:hover {
        cursor: pointer;
      }
    }
  `;
  const Counter = styled.span`
    color: #004059;
    font-weight: bold;
    font-size: 0.7rem;
  `;

  const like = (
    <Icon
      id="like"
      onClick={() => {
        setLikeCount();
      }}
    >
      {like2}
    </Icon>
  );
  const dislike = (
    <Icon
      id="dislike"
      rotate="true"
      onClick={() => {
        setDislikeCount();
      }}
    >
      {like2}
    </Icon>
  );
  const share = (
    <Icon
      id="share"
      onClick={() => {
        setShareCount();
      }}
    >
      {share2}
    </Icon>
  );
  const comments = (
    <Icon
      id="comments"
      onClick={() => {
        setCommentsCount();
      }}
    >
      {comments2}
    </Icon>
  );

  const socialItems = [
    {
      icon: like,
      socialCount: socialCount.like
    },
    {
      icon: dislike,
      socialCount: socialCount.dislike
    },
    {
      icon: comments,
      socialCount: socialCount.comments
    },
    {
      icon: share,
      socialCount: socialCount.share
    }
  ];

  const socialItemsMap = socialItems.map((socialItem, i) => {
    return (
      <SocialItem key={i}>
        {socialItem.icon}
        <Counter>{socialItem.socialCount}</Counter>
      </SocialItem>
    );
  });
  return (
    <BarContainer id="barContainer">
      <BarLayout id="barLayout">{socialItemsMap}</BarLayout>
    </BarContainer>
  );
};

const mapStateToProps = state => {
  return {
    socialCount: state.article.socialCount
  };
};
const mapDispachToProps = dispatch => {
  return {
    setLikeCount: (count = 1) =>
      dispatch({ type: "SET_LIKE_COUNT", payload: count }),
    setDislikeCount: (count = 1) =>
      dispatch({ type: "SET_DISLIKE_COUNT", payload: count }),
    setShareCount: (count = 1) =>
      dispatch({ type: "SET_SHARE_COUNT", payload: count }),
    setCommentsCount: (count = 1) =>
      dispatch({ type: "SET_COMMENTS_COUNT", payload: count })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SocialBar);
