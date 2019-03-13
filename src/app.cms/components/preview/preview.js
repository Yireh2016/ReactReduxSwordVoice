import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";
//css
import "./preview.css";
const Preview = props => {
  const cssURL = props.props.location.search.replace("?", "");

  return (
    <div className="previewhtml blogArticleContainer">
      <Helmet>
        <title>Preview Post</title>
        <link rel="stylesheet" href={`./uploads/${cssURL}/${cssURL}.css`} />
      </Helmet>
      <div className="blogArticle grid col-8 col-12-md helmetClass">
        {ReactHtmlParser(window.localStorage.getItem("finalHTMLElement"))}
      </div>
      <div className=" grid col-3 col-12-md" style={{ fontSize: "16px" }}>
        <h3>Summary</h3>
        {ReactHtmlParser(window.localStorage.getItem("summaryHTML"))}
      </div>
    </div>
  );
};

export default Preview;
