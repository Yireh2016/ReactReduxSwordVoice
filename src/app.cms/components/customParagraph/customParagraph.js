import React, { Component } from "react";
import paragraphService from "../../../services/paragraphService";
//react map
/*

DashBoard
  CreatePost (container)
    PostElement (preview and control)
      CustomElement (custom element)

*/

/*Props
  sendWordToJSXHandler:sendWordToJSXHandler()
*/
class CustomParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customElementContent: "", //dynamic textarea content
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
    HTMLContent = paragraphService(HTMLContent);
    this.props.sendWordToJSXHandler(HTMLContent);
  };

  inputTextHTMLHandler = e => {
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
          <button onClick={this.HMTLCheckHandler}>Verify HTML</button>
        </div>
      </div>
    );
  }
}

export default CustomParagraph;
