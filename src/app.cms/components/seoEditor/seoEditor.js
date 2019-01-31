import React, { Component } from "react";
import { connect } from "react-redux";

class SeoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      keywords: ""
    };
  }
  componentDidUpdate() {
    this.props.onEditSEO(this.state);
  }

  componentDidMount() {
    if (this.props.elements) {
      this.setState({
        title: this.state.elementList[0].HTMLElementContent,
        keywords: this.props.elements.keywords
      });
    }
  }
  inputSEOHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.inputSEOHandler}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.inputSEOHandler}
            cols="30"
            rows="10"
          />
        </label>
        <label>
          Keywords
          <input
            type="text"
            name="keywords"
            value={this.state.keywords}
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
    seo: state.postCreation.seo
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones

    onEditSEO: payload => dispach({ type: "SEO_EDITION", payload: payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SeoEditor);
