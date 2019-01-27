import React, { Component } from "react";
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
class CustomElement extends Component {
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

export default CustomElement;

/* const filter = /(<\/?(a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|datalist|dd|del|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|head|header|h1|h2|h3|h4|h5|h6|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|meta|meter|nav|noscript|object|ol|optgroup|option|p|param|pre|progress|q|s|samp|script|section|select|small|source|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|u|ul|var|video|wbr)>)|(<(a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|datalist|dd|del|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|head|header|h1|h2|h3|h4|h5|h6|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|meta|meter|nav|noscript|object|ol|optgroup|option|p|param|pre|progress|q|s|samp|script|section|select|small|source|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|u|ul|var|video|wbr)\s((accept-charset|accept|accesskey|action|align|allow|alt|async|autocapitalize|autofocus|autoplay|bgcolor|border|buffered|challenge|charset|checked|cite|class|code|codebase|color|cols|colspan|content|contenteditable|contextmenu|controls|coords|data-*|data|datetime|decoding|default|defer|dir|dirname|disabled|download|draggable|dropzone|enctype|for|form|formaction|headers|height|hidden|high|href|hreflang|http-equiv|icon|id|importance|integrity|ismap|itemprop|keytype|kind|label|lang|language|lazyload|list|loop|low|manifest|max|maxlength|media|method|min|minlength|multiple|muted|name|novalidate|open|optimum|pattern|ping|placeholder|poster|preload|radiogroup|readonly|referrerpolicy|rel|required|reversed|rows|rowspan|sandbox|scope|scoped|selected|shape|size|sizes|slot|span|spellcheck|src|srcdoc|srclang|srcset|start|step|style|summary|tabindex|target|title|translate|type|usemap|value|width|wrap)(=((")[^("|')]*(")|(')[^("|')]*(')))?\s?)*>)/g; */
