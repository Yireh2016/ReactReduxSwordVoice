import React, { Component } from "react";
import { connect } from "react-redux";

class SeoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      keywords: "",
      url: ""
    };
  }

  componentDidMount() {
    if (this.props.elements) {
      this.setState({
        title: this.props.elements[0].HTMLElementContent,
        keywords: this.props.seo.keywords,
        description: this.props.summary
      });
    }

    const articleURL = this.props.project.url;

    this.setState({ url: articleURL });
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
    this.props.onEditSEO({ [name]: value });
  };
  render() {
    return (
      <div>
        <label>
          Title
          <input
            // type="text"
            // name="title"
            // disabled
            readOnly
            value={this.state.title}
            // onChange={this.inputSEOHandler}
          />
        </label>
        <label>
          Description
          <textarea
            // disabled
            readOnly
            // name="description"
            value={this.state.description}
            // onChange={this.inputSEOHandler}
            cols="30"
            rows="10"
          />
        </label>
        <label>
          Keywords
          <input
            type="text"
            name="keywords"
            value={this.props.seo.keywords}
            onChange={this.inputSEOHandler}
          />
        </label>
        <label>
          URL
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.inputSEOHandler}
          />
        </label>
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
