import React, { Component } from "react";
import { connect } from "react-redux";
//css
import "./seoEditor.css";

class SeoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.elements[0].HTMLElementContent,
      keywords: this.props.seo.keywords,
      url: this.props.project.url,
      description: this.props.summary
    };
  }

  keywordsToArr = keywords => {
    if (
      keywords.slice(keywords.length - 1, keywords.length) !== "," &&
      keywords !== ""
    ) {
      keywords = keywords + ",";
    }
    let arr =
      keywords.match(/([^,])*,/g) === null ? [] : keywords.match(/([^,])*,/g);

    let arrLen = arr.length;

    for (let i = 0; i < arrLen; i++) {
      arr[i] = arr[i].substring(0, arr[i].length - 1);
    }

    return arr;
  };
  inputSEOHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
    if (name === "url") {
      this.props.onProjectURLEdition(value);
      return;
    }
    let arr = this.keywordsToArr(value);
    this.props.onEditSEO({ keywords: value, keywordsList: arr });
  };
  render() {
    return (
      <div>
        <div className="readOnlySeoEditor">
          <label>
            <span>Title</span>
            <textarea
              readOnly
              value={this.state.title}
              style={{ backgroundColor: "transparent" }}
              cols="30"
              rows="10"
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              readOnly
              style={{ backgroundColor: "transparent" }}
              value={this.state.description}
              cols="30"
              rows="10"
            />
          </label>
        </div>
        <div className="readOnlySeoEditor">
          <label>
            Keywords
            <textarea
              type="text"
              name="keywords"
              value={this.props.seo.keywords}
              onChange={this.inputSEOHandler}
              cols="30"
              rows="10"
            />
          </label>
          <label>
            URL
            <textarea
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.inputSEOHandler}
              cols="30"
              rows="10"
            />
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    project: state.postCreation.project
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones

    onEditSEO: payload => dispach({ type: "SEO_EDITION", payload: payload }),
    onProjectURLEdition: payload =>
      dispach({ type: "PROJECT_URL_EDITION", payload: payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SeoEditor);
