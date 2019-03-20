import React, { Component } from "react";
import { connect } from "react-redux";
//css
import "./seoEditor.css";
import keywordsToArr from "../../../services/keywordsToArr";

class SeoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.elements[0].HTMLElementContent,
      keywords: this.props.seo.keywords,
      url: this.props.project.url,
      description: this.props.summary,
      tagList: this.props.seo.keywords
    };

    this.tags = [
      "Graphic Design",
      "UX/UI",
      "Web Design",
      "Web Development",
      "Programming",
      "E-commerce",
      "Digital Marketing",
      "Mobile Apps"
    ];
  }

  inputSEOHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
    if (name === "url") {
      this.props.onProjectURLEdition(value);
      return;
    }
    let arr = keywordsToArr(value);
    this.props.onEditSEO({ keywords: value, keywordsList: arr });
  };
  tagOptionHandler = e => {
    const {
      target: { value }
    } = e;
    let arr = keywordsToArr(this.props.seo.keywords);
    // let arr = this.props.seo.keywords.match(/([^,])*,/g)
    //   ? this.props.seo.keywords.match(/([^,])*,/g)
    //   : [];
    let arrLen = arr.length;
    // for (let i = 0; i < arrLen; i++) {
    //   arr[i] = arr[i].substring(0, arr[i].length - 1);
    // }

    for (let i = 0; i < arrLen; i++) {
      if (arr[i] === value) {
        arr = arr.filter(val => {
          return val !== value;
        });
      }
    }
    if (arrLen === arr.length) {
      arr.push(value);
    }

    let keywords = "";
    for (let i = 0; i < arr.length; i++) {
      keywords = keywords + arr[i] + ",";
    }

    this.props.onEditSEO({ keywords: keywords, keywordsList: arr });

    this.setState({ tagList: arr });
  };
  render() {
    const tags = this.tags.map((tag, i) => {
      let checked = false;
      if (this.props.seo.keywordsList.length > 0) {
        let arr = this.props.seo.keywordsList;
        for (let i = 0; i < arr.length; i++) {
          if (tag === arr[i]) {
            checked = true;
          }
        }
      }
      return (
        <React.Fragment key={i}>
          <input
            onChange={this.tagOptionHandler}
            checked={checked}
            type="checkbox"
            name="tagsList"
            value={tag}
          />
          {tag}
        </React.Fragment>
      );
    });

    return (
      <div style={{ display: "grid", gridRowGap: "20px" }}>
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
        <div className="readOnlySeoEditor">
          <div className="tagList">
            <h6>Tags:</h6>
            {tags}
          </div>
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
