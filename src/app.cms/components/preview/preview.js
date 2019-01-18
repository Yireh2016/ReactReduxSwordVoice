// import React, { Component } from "react";
import React from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
//css
import "./preview.css";

const Preview = props => {
  console.log("Preview comp props", props);
  return (
    <div className="previewhtml blogArticleContainer">
      <div className="blogArticle grid col-8 col-12-md">
        {/* <JsxParser jsx={props.props.location.state.jsx} bindings={{}} /> */}
        {ReactHtmlParser(window.localStorage.getItem("finalHTMLElement"))}
      </div>
    </div>
  );
};

// class Preview extends Component {
//   render() {
//     console.log("location.state", location);
//     return (
//       <div className="blogArticleContainer">
//         <div className="blogArticle grid col-8 col-12-md">
//         <JsxParser
//                   jsx={this.state.finalJSXElement}
//                   bindings={{
//                     content: this.state.HTMLElementContent,
//                     styles: this.state.HTMLStylesStr,
//                     classes: this.state.HTMLClassesStr
//                   }}
//                 />

//          </div>
//       </div>
//     );
//   }
// }

export default Preview;
