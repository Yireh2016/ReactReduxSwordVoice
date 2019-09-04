import React from "react";

import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import styled from "styled-components";

//components
import DescrptionCard from "./descriptionCard/DescriptionCard";
import SocialBar from "./socialBar/SocialBar";

//services
import keywordsToArr from "../../../../services/keywordsToArr";

const ArticleCont = styled.article`
  padding: 20px 50px 20px 133px;

  h1,
  h2 {
    color: #f95f0b;
    color: var(--orange);
  }
  h2 {
    font-size: 1.8rem;
  }

  figure img,
  img {
    width: 100%;
  }
  figure figcaption {
    text-align: center;
    font-size: 0.7rem;
    color: var(--blueDark);
  }
  p {
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    color: black;
  }

  a {
    color: #2e9ac2;
  }

  blockquote {
    border-left: 8px solid rgba(255, 127, 80, 0.580392);
  }

  blockquote p {
    margin-left: 15px;
  }
  > code,
  p > code,
  pre > code {
    line-height: 2;
    font-family: monospace;
    white-space: pre-wrap;
  }

  pre {
    background: #ff7f507a;
    border: 1px solid coral;
    padding: 3vmin;
    border-radius: 5px;
    overflow-x: scroll;
  }

  p > code {
    background: #ff7f507a;
    border: 1px solid coral;
    padding: 5px;
    border-radius: 5px;
  }

  hr {
    border-top: 3px solid rgba(255, 127, 80, 0.5);
    margin-top: 1rem;
  }

  @media (max-width: 1050px) {
    padding-left: 50px;
    p {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 700px) {
    padding: 12px 14px;
    h2 {
      padding: 15px 0 0 0;
    }
    p {
      font-size: 1.1rem;
      margin: 15px 0;
    }
    figure {
      margin: 0;
    }
    blockquote {
      margin: 0 0 0 10px;
    }
  }
`;

const CategoryLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #004059;
  background: white;
`;

const CategoryTitle = styled.span`
  color: #f95f0b;
  font-size: 0.7rem;
  font-weight: bold;
  margin-right: 10px;
`;
const Category = styled.span`
  font-size: 10px;
  background-color: hsla(196, 97%, 72%, 1);
  padding: 5px;
  margin: 0 10px 0 0;
  border-radius: 10px;
`;

const Article = ({ article }) => {
  let keywordsMap = keywordsToArr(article.categories);
  keywordsMap = keywordsMap.map(word => {
    return <Category key={word}>{word}</Category>;
  });

  return (
    <ArticleCont>
      <h1>{article.title}</h1>
      <DescrptionCard></DescrptionCard>
      {ReactHtmlParser(article.html.replace(/<h1>.*<\/h1>/g, ""))}

      <CategoryLayout>
        <CategoryTitle>Categories:</CategoryTitle>
        {keywordsMap}
      </CategoryLayout>
      <SocialBar />
    </ArticleCont>
  );
};

const mapStateToProps2 = state => {
  return {
    article: state.article
  };
};

export default connect(mapStateToProps2)(Article);
