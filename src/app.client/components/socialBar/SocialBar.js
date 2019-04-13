import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

//assets
import {
  claps as claps2,
  comments as comments2,
  share as share2
} from "../../assets/svgIcons/SvgIcons";
import updateClapsCount from "../../assets/apiCalls/updateClapsCount";

// {
//   // article
//   // likeCount = 0,
//   // dislikeCount = 0,
//   // commentCount = 0,
//   // shareCount = 0,
//   // addClapsCount,
//   // ,
//   // setCommentsCount,
//   // setShareCount
// }
const SocialBar = ({
  socialCount,
  addClapsCount,
  setCommentsCount,
  setShareCount,
  title
}) => {
  const [clapsAdder, setClapsAdder] = useState(0);
  const [clapsTimer, setClapsTimer] = useState();
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
    user-select: none;
  `;

  const clapsAdderHandler = () => {
    if (clapsTimer) {
      clearTimeout(clapsTimer);
    }
    setClapsAdder(clapsAdder + 1);
    const timer = setTimeout(() => {
      //call axios api to add
      console.log(`Se ha sumado ${clapsAdder + 1} claps al store en DB`);
      addClapsCount(clapsAdder + 1);

      setClapsAdder(0);

      updateClapsCount(title, socialCount.claps);

      return;
    }, 1000);
    setClapsTimer(timer);
  };
  const claps = (
    <Icon
      style={{ position: "relative" }}
      id="claps"
      onClick={() => {
        clapsAdderHandler();
      }}
    >
      {clapsAdder !== 0 && (
        <Counter
          style={{
            position: "absolute",
            backgroundColor: "#004059",
            color: "white",
            borderRadius: "100%",
            padding: "7px",
            top: "-30px"
          }}
        >
          +{clapsAdder}
        </Counter>
      )}
      {claps2}
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
    <Link
      scroll={el => el.scrollIntoView({ behavior: "smooth", block: "start" })}
      to="#commentsSection"
    >
      <Icon
        id="comments"
        onClick={() => {
          setCommentsCount();
        }}
      >
        {comments2}
      </Icon>
    </Link>
  );

  const socialItems = [
    {
      icon: claps,
      socialCount: socialCount.claps
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
    socialCount: state.article.socialCount,
    title: state.article.title
  };
};
const mapDispachToProps = dispatch => {
  return {
    addClapsCount: (count = 1) =>
      dispatch({ type: "ADD_CLAPS_COUNT", payload: count }),

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
