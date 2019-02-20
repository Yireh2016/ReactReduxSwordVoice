import React, { Component } from "react";
import { connect } from "react-redux";

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
        .HTMLPreviewStr, //dynamic textarea content
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
    elements: state.postCreation.elements
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CustomElement);
