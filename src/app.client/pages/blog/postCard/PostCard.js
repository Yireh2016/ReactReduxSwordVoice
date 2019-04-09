import React from "react";
import Radium from "radium";
import PropTypes from "prop-types";
//assets
import threeDotsButton from "../../../assets/img/general/threeDots.svg";
import SummaryCard from "./summaryCard/SummaryCard";

//service
import isDevice from "../../../../services/isDevice";

const styles = {
  post: {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    maxHeight: "100%",
    position: "relative",
    borderRadius: "5px ",
    overflow: "hidden"
  },
  postLayout: {
    position: "relative"
  }
};

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.threedotsRef = React.createRef();
    this.state = { isDetail: false, isDeviceResult: "" };
  }

  componentDidMount() {
    this.setState({ isDeviceResult: isDevice() });
  }

  threeDotsHandler = () => {
    this.setState(prevState => {
      return {
        isDetail: !prevState.isDetail
      };
    });
  };

  render() {
    const {
      postH,
      postImg,
      hasSummary,
      avatar,
      url,
      keywords,
      author,
      date,
      title,
      summaryTextHtml
    } = this.props;
    const { isDetail, isDeviceResult } = this.state;

    let conditionStyle;
    if (hasSummary) {
      conditionStyle = {
        padding:
          isDeviceResult === "pc"
            ? `0 0 ${postH * 0.18681318681318681318681318681319}px 0`
            : `0 10px ${postH * 0.18681318681318681318681318681319}px 10px`
      };
    } else {
      conditionStyle = {};
    }
    return (
      <div id="postLayout" style={[styles.postLayout, conditionStyle]}>
        <div
          id="postCont"
          style={[
            styles.post,
            {
              backgroundImage: `url(${postImg}`,
              height: `${postH}px`,
              width: `${postH * 1.028}px`
            }
          ]}
        >
          <h3
            id="postTitle"
            style={[
              {
                bottom: "0",
                padding: `${postH * 0.05494505494505494505494505494505}px`,
                position: "absolute",
                color: "white",
                fontFamily: "Work Sans",
                fontSize: `${
                  parseInt(postH * 0.07) < 12 ? 12 : parseInt(postH * 0.07)
                }px`
              }
            ]}
          >
            {title}
          </h3>
          <div
            id="summaryCont"
            style={{
              position: "absolute",
              zIndex: "1",
              top: isDetail ? "0" : "100%",
              left: "0",
              transition: "all 500ms cubic-bezier(0.75, -0.6, 0.35, 1.65)"
            }}
          >
            {hasSummary && (
              <SummaryCard
                cardW={postH * 1.028}
                cardH={postH}
                keywords={keywords}
                author={author}
                date={date}
                url={url}
                avatar={avatar}
                fontSize={postH * 0.06593406593406593406593406593407}
                style={{ borderRadius: "4px", border: "1px solid #f95f0b" }}
                summaryTextHtml={summaryTextHtml}
              />
            )}
          </div>
        </div>
        {hasSummary && (
          <div
            ref={this.threedotsRef}
            id="threeDots"
            style={{
              top: isDetail
                ? `${this.threedotsRef.current.clientWidth / 2 - 5}px`
                : `${postH + 5}px`,
              position: " absolute",
              right: " 5%",
              zIndex: " 3",
              transform: isDetail ? "rotate(90deg)" : "rotate(0deg)",
              transition: "all 500ms cubic-bezier(0.75, -0.6, 0.35, 1.65)"
            }}
          >
            <img
              onClick={this.threeDotsHandler}
              style={{
                width: `${postH * 0.18681318681318681318681318681319}px`
              }}
              src={threeDotsButton}
              alt="three Dots Button"
            />
          </div>
        )}
      </div>
    );
  }
}
PostCard.propTypes = {
  postH: PropTypes.number.isRequired,
  postImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hasSummary: PropTypes.bool,
  keywords: PropTypes.array,
  author: PropTypes.string,
  date: PropTypes.string,
  url: PropTypes.string,
  avatar: PropTypes.string,
  summaryTextHtml: PropTypes.string,
  style: PropTypes.object
};

PostCard.defaultProps = {
  hasSummary: false
};

export default Radium(PostCard);