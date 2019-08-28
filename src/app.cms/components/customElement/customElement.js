import React, { Component } from "react";
import { connect } from "react-redux";
import addSuffixToCustomClasses from "../../../services/addSuffixtoCustomClasses";
import showdown from "showdown";

//react map
/*

DashBoard
  CreatePost (container)
    PostElement (preview and control)
      CustomElement (custom element)

*/

/*Props
  sendWordToJSXHandler:sendWordToJSXHandler()
  HTMLid
*/
class CustomElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customElementContent: this.props.elements[this.props.HTMLid - 1]
        ? this.props.elements[this.props.HTMLid - 1].HTMLPreviewStr
        : "", //dynamic textarea content
      customJSX: "", //all JSX
      customTagElement: "",
      customTagWordList: [], //word list inside tag
      customTagWord: "", //tag word
      HTMLCopy: "",
      isTag: false,
      isClosingTag: false
    };
  }

  HMTLCheckHandler = () => {
    let HTMLContent = this.state.customElementContent;
    HTMLContent = addSuffixToCustomClasses(HTMLContent, this.props.project.url);
    this.props.sendWordToJSXHandler(HTMLContent);
  };

  MarkDownCheckHandler = () => {
    let MarkDownContent = this.state.customElementContent;
    let converter = new showdown.Converter();
    let HTMLContent = converter.makeHtml(MarkDownContent);
    HTMLContent = addSuffixToCustomClasses(HTMLContent, this.props.project.url);
    this.props.sendWordToJSXHandler(HTMLContent);
  };

  inputTextHTMLHandler = e => {
    this.props.onProjectChange();

    const {
      target: { value }
    } = e;

    this.setState(() => {
      return { customElementContent: value };
    });
  };
  render() {
    return (
      <div style={this.props.style}>
        <div>
          <textarea
            value={this.state.customElementContent}
            name="HTMLElementContent"
            onChange={this.inputTextHTMLHandler}
          />
          <button className="cmsBtn" onClick={this.HMTLCheckHandler}>
            Check HTML
          </button>
          <button className="cmsBtn" onClick={this.MarkDownCheckHandler}>
            Check MarkDown
          </button>
        </div>
      </div>
    );
  }
}
const mapDispachToProps = dispach => {
  return {
    //acciones
    onProjectChange: () => dispach({ type: "CHANGE_PROJECT" })
  };
};

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements,
    project: state.postCreation.project
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CustomElement);
