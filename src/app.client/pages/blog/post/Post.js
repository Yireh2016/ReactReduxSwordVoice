import React, { useState, useEffect } from "react";
import styled from "styled-components";

//components
import Summary from "./summary/Summary";
//assets
import { threeDotsBtn } from "./icons/svgIcons";

const Layout = styled.div`
  position: relative;

  ::before {
    content: "";
    padding-top: 90%;
    display: block;
  }

  background-image: ${props => {
    return `${props.backgroundURL}`;
  }};
  background-size: cover;
  background-position: center center;

  border-radius: 5px;
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
`;

const ForeGround = styled.div`
  border-radius: 5px;
  background-image: ${props => {
    return props.postGradient;
  }};

  position: relative;

  height: 100%;

  a {
    width: 100%;
    text-decoration: none;
    position: absolute;
    bottom: 0;
  }
`;

const Title = styled.h2`
  color: white;
  padding: 0 3.8% 4.8% 3.8%;
  font-family: "Work Sans";
  
  /* ${props => {
    if (props.size === "md") {
      return "0 20px 25px 20px";
    } else if (props.size === "sm") {
      return "0 15px 17px 15px";
    } else {
      return "0 25px 35px 25px";
    }
  }}; */
  margin: 0;
  font-size: ${props => {
    if (props.postW) {
      return (0.069 * props.postW * 6) / 6 >= 20
        ? `${(0.069 * props.postW * 6) / 6}px`
        : "20px";
    }
  }} 
`;

const SlideCont = styled.div`
  position: absolute;
  top: ${props => (props.isDetail ? "0" : "100%")};

  transition: all 500ms cubic-bezier(0.75, -0.6, 0.35, 1.65);

  background: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 100%;
`;

const ActionBtnContainer = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;

  transform: ${props => (props.isDetail ? "rotate(90deg)" : "rotate(0deg)")};
  top: ${props => (!props.isDetail ? "calc(100% + 5px)" : "5%")};

  transition: all 500ms cubic-bezier(0.75, -0.6, 0.35, 1.65);

  svg {
    width: ${props => {
      if (props.size === "md") {
        return "calc(47px /1.15 )";
      } else if (props.size === "sm") {
        return "calc(47px / 2.4)";
      } else {
        return "47px";
      }
    }};
    height: ${props => {
      if (props.size === "md") {
        return "calc(25px / 1.15)";
      } else if (props.size === "sm") {
        return "calc(25px / 2.4)";
      } else {
        return "25px";
      }
    }};
  }
  svg:hover {
    cursor: pointer;
  }
`;

const Post = ({
  author,
  avatar,
  date,
  keywords,
  title,
  backgroundURL,
  size,
  link,
  summaryTextHtml,
  postGradient,
  id
}) => {
  const [isDetail, setIsDetail] = useState(false);
  const [postW, setPostW] = useState(false);
  const postRef = React.createRef();

  useEffect(() => {
    window.addEventListener("resize", () => {
      postRef.current && setPostW(postRef.current.clientWidth);
    });
    postRef.current && setPostW(postRef.current.clientWidth);
  }, [postRef]);
  return (
    <Layout size={size} backgroundURL={backgroundURL}>
      <Container>
        <ForeGround postGradient={postGradient} ref={postRef} size={size}>
          <a aria-label="go and read this article" href={link}>
            <Title postW={postW} size={size}>
              {title}
            </Title>
          </a>
        </ForeGround>
        <SlideCont isDetail={isDetail}>
          <Summary
            id={id}
            size={size}
            postW={postW}
            keywords={keywords}
            date={date}
            avatar={avatar}
            summaryTextHtml={summaryTextHtml}
            author={author}
          />
        </SlideCont>
      </Container>

      <ActionBtnContainer
        size={size}
        isDetail={isDetail}
        onClick={() => {
          setIsDetail(!isDetail);
        }}
      >
        {threeDotsBtn}
      </ActionBtnContainer>
    </Layout>
  );
};

export default Post;
