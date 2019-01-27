import React from "react";
import ReactHtmlParser from "react-html-parser";
//css
import "./preview.css";

const Preview = props => {
  return (
    <div className="previewhtml blogArticleContainer">
      <div className="blogArticle grid col-8 col-12-md">
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
