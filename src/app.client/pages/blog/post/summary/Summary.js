import React from "react";
import styled from "styled-components";
import "simplebar";
import ReactHtmlParser from "react-html-parser";

const Layout = styled.div`
  position: relative;

  ::before {
    content: "";
    padding-top: 90%;
    display: block;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const SummaryLay = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: space-around;
  color: #024259;
  padding: ${props => {
    if (props.postW) {
      return 0.042 * props.postW >= 5 ? `${0.042 * props.postW}px` : "5px";
    }
  }};
  background-color: white;

  border: 1.5px solid coral;
  border-radius: 5px;

  box-sizing: border-box;
`;

const SummaryTitle = styled.h2`
  color: #024259;

  margin: 0;

  font-weight: bold;
  font-size: ${props => {
    if (props.postW) {
      return (0.069 * props.postW * 6) / 6 >= 14
        ? `${(0.069 * props.postW * 6) / 6}px`
        : "14px";
    }
  }};
  flex-grow: 5;
`;

const SummarySection = styled.section`
  margin: 10px 0 0 0;
  width: 100%;
  height: 55%;
  font-size: 16px;
  flex-grow: 55;
  overflow: hidden;
`;

const SummaryText = styled.article`
  p {
    font-size: ${props => {
      if (props.postW) {
        return (0.069 * props.postW * 5) / 6 >= 12
          ? `${(0.069 * props.postW * 5) / 6}px`
          : "12px";
      }
    }};
  }
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

const SummaryFooter = styled.section`
  flex-grow: 40;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const SummaryLink = styled.a`
  font-size: ${props => {
    if (props.postW) {
      return (0.069 * props.postW * 4) / 6 >= 10
        ? `${(0.069 * props.postW * 4) / 6}px`
        : "10px";
    }
  }};
  color: #f95f0b;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 0;
`;

const Keyword = styled.span`
  font-size: ${props => {
    if (props.postW) {
      return (0.069 * props.postW * 3) / 6 >= 10
        ? `${(0.069 * props.postW * 3) / 6}px`
        : "10px";
    }
  }};
  background-color: hsla(196, 97%, 72%, 1);
  padding: 5px;
  margin: 0 5px 0 0;
  border-radius: 10px;
`;

const SummaryDate = styled.div`
  font-size: ${props => {
    if (props.postW) {
      return (0.069 * props.postW * 3) / 6 >= 10
        ? `${(0.069 * props.postW * 3) / 6}px`
        : "10px";
    }
  }};
  text-align: right;
  padding: 10px 0 0 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.div`
  width: ${props => {
    if (props.postW) {
      return 0.096 * props.postW >= 30 ? `${0.096 * props.postW}px` : "30px";
    }
  }};
  height: ${props => {
    if (props.postW) {
      return 0.096 * props.postW >= 30 ? `${0.096 * props.postW}px` : "30px";
    }
  }};
  border-radius: 100%;
  background-size: cover;
  background-position: center center;
  background-image: ${props => {
    return "url(" + props.url + ")";
  }};
`;

const Author = styled.span`
  margin-left: 10px;
  font-size: ${props => {
    if (props.postW) {
      return (0.069 * props.postW * 3) / 6 >= 12
        ? `${(0.069 * props.postW * 3) / 6}px`
        : "12px";
    }
  }};
  font-weight: bold;
`;

const Summary = ({
  link,
  size,
  author,
  keywords,
  date,
  avatar,
  summaryTextHtml,
  postW
}) => {
  //maps
  const keywordsMap = keywords.map(word => {
    return (
      <Keyword postW={postW} key={word}>
        {word}
      </Keyword>
    );
  });

  //render
  return (
    <Layout>
      <Container>
        <SummaryLay postW={postW}>
          <SummaryTitle postW={postW} size={size}>
            Summary
          </SummaryTitle>
          <SummarySection>
            <SummaryText postW={postW} size={size}>
              {ReactHtmlParser(summaryTextHtml)}
            </SummaryText>
          </SummarySection>
          <SummaryFooter>
            <SummaryLink postW={postW} href={link}>
              Read More...
            </SummaryLink>
            <div id="keywordsArea">{keywordsMap}</div>
            <SummaryDate postW={postW}>{date}</SummaryDate>
            <AuthorInfo>
              <Avatar postW={postW} url={avatar} id="authorImg" />
              <Author postW={postW}>By {author}</Author>
            </AuthorInfo>
          </SummaryFooter>
        </SummaryLay>
      </Container>
    </Layout>
  );
};

export default Summary;
