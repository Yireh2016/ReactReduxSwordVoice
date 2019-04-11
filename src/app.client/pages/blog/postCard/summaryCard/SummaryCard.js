import React from "react";
import "simplebar";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
//services
import dbDateToNormalDate from "../../../../../services/dbDateToNormalDate";

// cardW: PropTypes.number.isRequired,
// cardH: PropTypes.number.isRequired,
// keywords: PropTypes.array.isRequired,
// author: PropTypes.string.isRequired,
// date:PropTypes.string.isRequired,

const Article = styled.article`
  p:first-child {
    margin-top: 0;
  }
  ,
  p:last-child {
    margin-bottom: 0;
  }
`;

class SummaryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMounted: false
    };
  }
  componentDidMount() {
    this.setState({ hasMounted: true });
  }

  render() {
    const {
      cardW,
      cardH,
      keywords,
      author,
      date,
      url,
      avatar,
      fontSize,
      style,
      summaryTextHtml
    } = this.props;
    const keywordsMap = keywords.map(word => {
      return (
        <span
          key={word}
          style={{
            fontSize: fontSize * 0.4 < 12 ? "10px" : fontSize * 0.4,
            backgroundColor: "hsla(196, 97%, 72%, 1)",
            padding: `${cardW * 0.0187165775401069518716577540107}px`,
            margin: `0 ${cardW * 0.01336898395721925133689839572193}px 0 0`,
            borderRadius: "10px"
          }}
        >
          {word}
        </span>
      );
    });
    return (
      <div
        id="summaryCard"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
          color: "#024259",
          padding: `${cardH * 0.04807692307692307692307692307692}px`,
          width: `${cardW}px`, //refs
          height: `${cardH}px`,
          backgroundColor: "white",
          boxSizing: "border-box",
          ...style
        }}
      >
        <h2
          id="summaryTitle"
          style={{
            color: "#024259",
            fontSize: `${fontSize}px`,
            flexGrow: "5",
            fontWeight: "normal"
          }}
        >
          Summary
        </h2>
        <section
          data-simplebar
          id="summaryContent"
          style={
            {
              margin: "10px 0 0 0",
              width: "100%",
              height: "55%",
              fontSize: `${fontSize * 0.68}px`,
              flexGrow: "55",
              overflow: this.state.hasMounted ? "auto" : "hidden"
            }
            // styles.paragraph
          }
        >
          <Article>{ReactHtmlParser(summaryTextHtml)}</Article>
        </section>
        <section
          id="cardFooter"
          style={{
            flexGrow: "40",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          <a
            href={url}
            style={{
              fontSize: `${fontSize * 0.6}px`,
              color: "#f95f0b",
              fontWeight: "bold",
              textDecoration: "none",
              padding: `${cardH * 0.04807692307692307692307692307692}px  0`
            }}
          >
            Read More...
          </a>
          <div id="keywordsArea">{keywordsMap}</div>
          <div
            id="date"
            style={{
              fontSize: `12px`,
              textAlign: "right",
              padding: "10px 0 0 0"
            }}
          >
            {date}
          </div>
          <div
            id="authorCont"
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <div
              id="authorImg"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(data:image/jpeg;base64,${avatar})`
              }}
            />
            <span
              id="author"
              style={{
                marginLeft: "10px",
                fontSize: `${fontSize * 0.6}px`,
                fontWeight: "bold"
              }}
            >
              By {author}
            </span>
          </div>
        </section>
      </div>
    );
  }
}

SummaryCard.propTypes = {
  cardW: PropTypes.number.isRequired,
  cardH: PropTypes.number.isRequired,
  keywords: PropTypes.array.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  summaryTextHtml: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.object
};
SummaryCard.defaultProps = {
  fontSize: 24
};

export default SummaryCard;
