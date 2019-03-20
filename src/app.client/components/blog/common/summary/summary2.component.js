import React from "react";
import ReactHtmlParser from "react-html-parser";
import SimpleBar from "simplebar-react";
//CSS
import "./summary2.css";
//services
import dbDateToNormalDate from "../../../../../services/dbDateToNormalDate";

class Summary2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontStandardSize: 0,
      textMaxHeight: "auto"
    };
  }

  componentDidMount() {
    if (window.innerWidth > 1050) {
      //PC
      this.setState({
        fontStandardSize: this.props.height * 0.05
      });
      return;
    }

    if (window.innerWidth > 750) {
      //tablet
      this.setState({
        fontStandardSize:
          this.props.height * 0.05 > 30 ? this.props.height * 0.05 : 30
      });
      return;
    }
    //movil
    this.setState({
      fontStandardSize:
        this.props.height * 0.05 > 16 ? this.props.height * 0.05 : 16,
      textMaxHeight: "70px"
    });
  }

  ////////////////////////////
  ////////////////////////////
  //Lista de props
  ////////////////////////////
  ////////////////////////////
  //textHTML
  //keywords
  //date
  //avatar
  //author
  //width
  //height

  render() {
    const fontStandardSize = this.state.fontStandardSize;
    ////////////////////////////
    ////////////////////////////
    // Titulo del summary
    ////////////////////////////
    ////////////////////////////

    const titleCSS = "summary2-title";
    const title = fontSize => {
      const fontStyle = { fontSize: `${fontSize}px` };
      return (
        <h3 style={fontStyle} className={titleCSS}>
          Summary
        </h3>
      );
    };

    // titleLayout
    const titleFontSize = fontStandardSize;
    const layoutTitle = <div>{title(titleFontSize)}</div>;

    ////////////////////////////
    ////////////////////////////
    // Text del summary
    ////////////////////////////
    ////////////////////////////
    //props height

    const textCSS = "summary2-text";
    const textHTML = ReactHtmlParser(this.props.textHTML);
    const text = fontSize => {
      const textStyle = {
        fontSize: `${fontSize}px`
        // height: `${relativeHeight}px`
      };
      return (
        <section style={textStyle} className={textCSS}>
          {textHTML}
        </section>
      );
    };
    // textLayout

    // const layoutTextCSS = "summary2-layout-text";
    // const textHeightRatio = 0.4;
    const layoutText = (
      // <div className={layoutTextCSS}>
      <div>
        <SimpleBar
          style={
            {
              // maxHeight: this.state.textMaxHeight,
              // height: this.props.height * textHeightRatio
            }
          }
        >
          {text(fontStandardSize * 0.8)}
        </SimpleBar>
      </div>
    );
    ////////////////////////////
    ////////////////////////////
    // Read More del summary
    ////////////////////////////
    ////////////////////////////

    const readMoreCSS = "summary2-readMore";
    const readMore = fontSize => {
      const fontStyle = { fontSize: `${fontSize}px` };
      return (
        <p>
          <a
            href={`/blog/post/${this.props.url}`}
            style={fontStyle}
            className={readMoreCSS}
          >
            Read More ...
          </a>
        </p>
      );
    };
    //layout ReadMore
    const readMoreLayoutCSS = "summary2-layout-readMore";
    const layoutReadMore = (
      <div className={readMoreLayoutCSS}>
        {readMore(fontStandardSize * 0.8)}
      </div>
    );

    ////////////////////////////
    ////////////////////////////
    // keywords del summary
    ////////////////////////////
    ////////////////////////////
    //props keywords

    const keywordsCSS = "summary2-keywords";
    const keyword = (keyword, key, fontSize) => {
      const style = { fontSize };
      return (
        <span key={key} className={keywordsCSS} style={style}>
          {keyword}
        </span>
      );
    };
    const keywordsArr = this.props.keywords;
    const keywords = fontSize => {
      const resultArr = keywordsArr.map((el, i) => {
        return keyword(el, i, fontSize);
      });
      return resultArr;
    };

    //layout keywords
    const layoutKeywordsCSS = "summary2-layout-keywords";
    const layoutKeywords = (
      <div className={layoutKeywordsCSS}>
        {keywords(fontStandardSize * 0.6)}
      </div>
    );

    ////////////////////////////
    ////////////////////////////
    // Date del summary
    ////////////////////////////
    ////////////////////////////
    //props date
    // const dateCSS = "summary2-date";

    const date = fontSize => {
      let date = dbDateToNormalDate(this.props.date);
      const style = { fontSize };
      return <time style={style}>{date}</time>;
    };

    //layout date
    const dateLayoutCSS = "summary2-layout-date";
    const layoutDate = (
      <div className={dateLayoutCSS}>{date(fontStandardSize * 0.6)}</div>
    );

    ////////////////////////////
    ////////////////////////////
    // author del summary
    ////////////////////////////
    ////////////////////////////
    //props avatar
    //props author
    const avatarStyle = {
      backgroundImage: `url(data:image/jpeg;base64,${this.props.avatar})`
    };
    const avatarCSS = "summary2-avatar";
    const autorCSS = "summary2-author";
    const authorData = fontSize => {
      const style = { fontSize };
      return (
        <React.Fragment>
          <span className={avatarCSS} style={avatarStyle} />
          <span className={autorCSS} style={style}>
            by {this.props.author}
          </span>
        </React.Fragment>
      );
    };
    //layout author y avatar
    const authorLayoutCSS = "summary2-layout-author";
    const layoutAuthorData = (
      <div className={authorLayoutCSS}>
        {authorData(fontStandardSize * 0.8)}
      </div>
    );

    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    // Layout del summary ////////////////////////////
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    ////////////////////////////
    ////////////////////////////
    // textLayout
    ////////////////////////////
    ////////////////////////////

    const layoutCSS = "summary2-layout";
    const layoutStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    };

    const layout = (
      <div style={layoutStyle} className={layoutCSS}>
        {layoutTitle}
        {layoutText}
        {layoutReadMore}
        {layoutKeywords}
        {layoutDate}
        {layoutAuthorData}
      </div>
    );
    return layout;
  }
}

export default Summary2;
