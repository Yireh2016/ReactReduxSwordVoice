import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
//assets
import "./postElement.css";
import edit from "../../assets/createPost/edit.svg";
import paint from "../../assets/createPost/paint.svg";
import del from "../../assets/createPost/delete.svg";
import copy from "../../assets/createPost/copy.svg";
//components
import Paragraph from "../paragraph/paragraph";
import Header from "../header/header";
import CustomElement from "../customElement/customElement";
import CustomParagraph from "../customParagraph/customParagraph";
import ImageElement from "../imageElement/imageElement";
//react map
/*

DashBoard
  CreatePost
    PostElement


*/

// import Header from "../header/header";

class PostElement extends Component {
  constructor(props) {
    super(props);
    this.postElement = React.createRef();

    // PROPS
    // HTMLid indica el id del html element
    // isEditionModeHandler  toogle edition mode flag
    //elements array of elements
    //isEditionMode

    this.state = {
      HTMLElementType: this.props.HTMLElementType,
      HTMLElementContent: this.props.HTMLElementContent,
      HTMLAtributes: this.props.HTMLAtributes,
      HTMLAtributesArr: this.props.HTMLAtributesArr,
      HTMLAtributesStr: this.props.HTMLAtributesStr,
      HTMLStyles: this.props.HTMLStyles,
      HTMLStylesStr: this.props.HTMLStylesStr,
      HTMLStylesArr: this.props.HTMLStylesArr,
      HTMLClasses: this.props.HTMLClasses,
      HTMLClassesArr: this.props.HTMLClassesArr,
      HTMLClassesStr: this.props.HTMLClassesStr,
      HTMLPreviewStr: this.props.HTMLPreviewStr,
      HTMLid: this.props.HTMLid,
      isEditionMode: this.props.isEditionMode,
      finalHTMLElement: this.props.finalHTMLElement,
      imgFile: this.props.imgFile,
      imgAlt: this.props.imgAlt,
      imgFigcaption: this.props.imgFigcaption,

      isImageUploader: false
    };
    this.elementsJSX = {
      p: `<p style={styles} class={classes}> {content}</p>`,
      h1: `<h1 style={styles} class={classes}> {content}</h1>`,
      h2: `<h2 style={styles} class={classes}> {content}</h2>`,
      h3: `<h3 style={styles} class={classes}> {content}</h3>`,
      h4: `<h4 style={styles} class={classes}> {content}</h4>`,
      h5: `<h5 style={styles} class={classes}> {content}</h5>`,
      h6: `<h6 style={styles} class={classes}> {content}</h6>`,
      figure: `<figure><img src={imgFile} alt={imgAlt}  style={styles} class={classes} /><figcaption>{imgFigcaption}</figcaption></figure>`
      // figure: `<figure><img src={imgFile} alt={imgAlt}  style={styles} class={classes} /><figcaption>{imgFigcaption}</figcaption></figure>`
    };
  }

  componentDidMount() {
    if (this.props.HTMLid === 1) {
      let value = "<h1 style={styles} class={classes}> {content}</h1>";
      this.setState({
        HTMLPreviewStr: value,
        isImageUploader: false
      });
    }
  }
  componentDidUpdate() {
    const el = this.postElement.current;
    this.props.editionAreaChangeHanlder(el.offsetTop);
  }

  inputTextHTMLHandler = e => {
    const {
      target: { value }
    } = e;
    this.setState({ HTMLElementContent: value });
  };

  stylesHTMLHandler = e => {
    const {
      target: { name, value }
    } = e;
    if (value.match(/;/g)) {
      this.setState(prevState => {
        let styles = value.slice(0, value.length);
        let stylesArr = prevState.HTMLStylesArr;
        stylesArr.push(`${styles}`);
        return {
          HTMLstylesArr: stylesArr,
          HTMLStylesStr: `${prevState.HTMLStylesStr} ${styles}`,
          HTMLStyles: ""
        };
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  atributesHTMLHandler = e => {
    const {
      target: { name, value }
    } = e;

    if (value.match(/,/g)) {
      this.setState(prevState => {
        let atributes = value.slice(0, value.length - 1);
        let filter = /accept-charset|accept|accesskey|action|align|allow|alt|async|autocapitalize|autofocus|autoplay|bgcolor|border|buffered|challenge|charset|checked|cite|class|code|codebase|color|cols|colspan|content|contenteditable|contextmenu|controls|coords|data-*|data|datetime|decoding|default|defer|dir|dirname|disabled|download|draggable|dropzone|enctype|for|form|formaction|headers|height|hidden|high|href|hreflang|http-equiv|icon|id|importance|integrity|ismap|itemprop|keytype|kind|label|lang|language|lazyload|list|loop|low|manifest|max|maxlength|media|method|min|minlength|multiple|muted|name|novalidate|open|optimum|pattern|ping|placeholder|poster|preload|radiogroup|readonly|referrerpolicy|rel|required|reversed|rows|rowspan|sandbox|scope|scoped|selected|shape|size|sizes|slot|span|spellcheck|src|srcdoc|srclang|srcset|start|step|style|summary|tabindex|target|title|translate|type|usemap|value|width|wrap/g;

        if (atributes.match(filter)) {
          let atributesArr = prevState.HTMLAtributesArr;
          atributesArr.push(`${atributes}`);
          return {
            HTMLAtributesArr: atributesArr,
            HTMLAtributes: "",
            HTMLAtributesStr: `${prevState.HTMLAtributesStr} ${atributes}`,
            HTMLPreviewStr: prevState.HTMLPreviewStr.replace(
              "{classes}",
              `{classes} ${atributes}`
            )
          };
        }
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  classesHTMLHandler = e => {
    const {
      target: { name, value }
    } = e;
    if (value.match(/,/g)) {
      this.setState(prevState => {
        let classes = value.slice(0, value.length - 1);
        let classesArr = prevState.HTMLClassesArr;
        classesArr.push(`${classes}`);
        return {
          HTMLClassesArr: classesArr,
          HTMLClassesStr: `${prevState.HTMLClassesStr} ${classes}`,
          HTMLClasses: ""
        };
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  inputSelectHTMLHandler = e => {
    const {
      target: { value }
    } = e;
    if (value !== "custom" && value !== "image") {
      this.setState({
        HTMLPreviewStr: value,
        isImageUploader: false,
        HTMLElementType: value
      });
    }

    if (value === "image") {
      this.setState({ isImageUploader: true });
    }
    if (value === "custom") {
      this.setState({ HTMLElementType: value });
    }
  };
  prepareHTMLFilter = (
    str,
    styles,
    classes,
    content,
    file,
    alt,
    figcaption
  ) => {
    if (styles !== "") {
      str = str.replace("{styles}", `"${styles}"`);
    } else {
      str = str.replace(" style={styles}", "");
    }

    if (classes !== "") {
      str = str.replace("{classes}", `"${classes}"`);
    } else {
      str = str.replace(" class={classes}", "");
    }

    str = str.replace("{content}", content);
    str = str.replace("{imgFile}", `"${file}"`);
    str = str.replace("{imgAlt}", `"${alt}"`);
    str = str.replace("{imgFigcaption}", figcaption);

    return str;
  };
  sendWordToJSXHandler = word => {
    // HTMLPreviewStr
    this.setState({ HTMLPreviewStr: word });
  };
  editionBtnHandler = e => {
    e.preventDefault();
    this.props.isEditionModeHandler();
    // this.props.isEditionModey;
    this.setState(prevState => {
      return { isEditionMode: !prevState.isEditionMode };
    });

    let finalHTMLElement = this.state.HTMLPreviewStr;
    let styles = this.state.HTMLStylesStr;
    let classes = this.state.HTMLClassesStr;
    let content = this.state.HTMLElementContent;
    // let alt = "test";
    // let imgFile = "/uploads/temp/878d607031a525228eaa95272b2720a8.jpg";
    // let figcaption = "test";
    //images only
    let alt = this.state.imgAlt;
    let imgFile = this.state.imgFile;
    let figcaption = this.state.imgFigcaption;

    finalHTMLElement = this.prepareHTMLFilter(
      finalHTMLElement,
      styles,
      classes,
      content,
      imgFile,
      alt,
      figcaption
    );
    this.setState({ finalHTMLElement: finalHTMLElement });

    let payload = {
      HTMLElementType: this.state.HTMLElementType,
      HTMLElementContent: this.state.HTMLElementContent,
      HTMLAtributes: this.state.HTMLAtributes,
      HTMLAtributesArr: this.state.HTMLAtributesArr,
      HTMLAtributesStr: this.state.HTMLAtributesStr,
      HTMLStyles: this.state.HTMLStyles,
      HTMLStylesStr: this.state.HTMLStylesStr,
      HTMLStylesArr: this.state.HTMLStylesArr,
      HTMLClasses: this.state.HTMLClasses,
      HTMLClassesArr: this.state.HTMLClassesArr,
      HTMLClassesStr: this.state.HTMLClassesStr,
      HTMLPreviewStr: this.state.HTMLPreviewStr,
      HTMLid: this.state.HTMLid,
      imgFile: "",
      imgAlt: "",
      imgFigcaption: ""
    };

    payload = {
      ...payload,
      finalHTMLElement: finalHTMLElement
    };

    if (this.props.elements.length >= this.props.HTMLid) {
      this.props.onEditElement(payload);
      return;
    }

    this.props.onAddElement(payload);
  };

  delBtnHandler = () => {
    let payload = this.props.elements.filter((el, i, arr) => {
      return this.props.HTMLid !== arr[i].HTMLid;
    });

    for (let i = 0; i < payload.length; i++) {
      payload[i].HTMLid = i + 1;
    }

    this.props.onDelElement(payload);
  };
  atrImgHTMLHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  imgFileSet = image => {
    // this.setState({ imgFile: `url(${URL.createObjectURL(image)})` });
  };
  render() {
    const parser = () => {
      if (
        this.state.HTMLElementType === "custom" ||
        this.state.HTMLElementType === "manyParagraph"
      ) {
        return ReactHtmlParser(this.state.HTMLPreviewStr);
      } else if (this.state.HTMLElementType.match(/figure/g)) {
        return (
          <JsxParser
            jsx={this.state.HTMLPreviewStr}
            bindings={{
              styles: this.state.HTMLStylesStr,
              // styles: "width:100%",
              classes: this.state.HTMLClassesStr,
              // classes: "grid",
              imgFile: this.state.imgFile,
              // imgFile: "/uploads/temp/878d607031a525228eaa95272b2720a8.jpg",
              // imgAlt: "test",
              imgAlt: this.state.imgAlt,
              // imgFigcaption: "test"
              imgFigcaption: this.state.imgFigcaption
            }}
          />
        );
      } else {
        return (
          <JsxParser
            jsx={this.state.HTMLPreviewStr}
            bindings={{
              content: this.state.HTMLElementContent,
              styles: this.state.HTMLStylesStr,
              classes: this.state.HTMLClassesStr
            }}
          />
        );
      }
    };
    return (
      <div ref={this.postElement}>
        <div
          className="elementEditionLayout"
          style={
            this.props.HTMLid % 2 === 0
              ? { backgroundColor: " #dde2e4", padding: "20px" }
              : { backgroundColor: "transparent ", padding: "20px" }
          }
        >
          <div className="elementSelect">
            <div className="elementSelectLayout">
              <span>Element</span>
              <select
                value={this.state.HTMLElementType}
                name="HTMLElementType"
                onChange={this.inputSelectHTMLHandler}
                disabled={!this.state.isEditionMode}
              >
                <option value="">Select one</option>
                {this.state.HTMLid === 1 ? (
                  <option value={this.elementsJSX.h1}>Header 1</option>
                ) : (
                  <React.Fragment>
                    <option value={this.elementsJSX.h2}>Header 2</option>
                    <option value={this.elementsJSX.h3}>Header 3</option>
                    <option value={this.elementsJSX.h4}>Header 4</option>
                    <option value={this.elementsJSX.h5}>Header 5</option>
                    <option value={this.elementsJSX.h6}>Header 6</option>
                    <option value={this.elementsJSX.p}>One Paragraph</option>
                    <option value="manyParagraph">Multiple Paragraph</option>
                    <option value={this.elementsJSX.figure}>Image</option>
                    <option value="custom">Custom Element</option>
                  </React.Fragment>
                )}
              </select>
            </div>

            <div
              onDoubleClick={e => {
                this.editionBtnHandler(e);
              }}
              className="elementPreview blogArticle"
            >
              {parser()}
              {/* {this.state.HTMLElementType !== "custom"  ? (
                <JsxParser
                  jsx={this.state.HTMLPreviewStr}
                  bindings={{
                    content: this.state.HTMLElementContent,
                    styles: this.state.HTMLStylesStr,
                    classes: this.state.HTMLClassesStr
                  }}
                />
              ) : (
                ReactHtmlParser(this.state.HTMLPreviewStr)
              )} */}
            </div>
          </div>

          <div className="elementEditionBtn">
            <div>
              <img
                onClick={this.editionBtnHandler}
                src={edit}
                style={{ opacity: "1", cursor: "pointer" }}
                alt="edit"
              />
              <img
                style={
                  this.state.isEditionMode
                    ? { opacity: ".2" }
                    : { opacity: "1", cursor: "pointer" }
                }
                src={paint}
                alt="paint"
              />
              {!this.state.HTMLElementType.match(/h1/g) && (
                <img
                  style={
                    this.state.isEditionMode
                      ? { opacity: ".2" }
                      : { opacity: "1", cursor: "pointer" }
                  }
                  src={del}
                  onClick={this.delBtnHandler}
                  alt="delete"
                />
              )}
              <img
                style={
                  this.state.isEditionMode
                    ? { opacity: ".2" }
                    : { opacity: "1", cursor: "pointer" }
                }
                src={copy}
                alt="copy"
              />
            </div>
          </div>
        </div>

        <div className="elementSubEditionLayout">
          <div className="elementContent">
            <CustomElement
              style={
                this.state.HTMLElementType.match(/custom/g) &&
                this.state.isEditionMode
                  ? { display: "block" }
                  : { display: "none" }
              }
              sendWordToJSXHandler={word => {
                this.sendWordToJSXHandler(word);
              }}
            />

            <CustomParagraph
              style={
                this.state.HTMLElementType.match(/many/g) &&
                this.state.isEditionMode
                  ? { display: "block" }
                  : { display: "none" }
              }
              sendWordToJSXHandler={word => {
                this.sendWordToJSXHandler(word);
              }}
            />
          </div>
        </div>
        {this.state.isEditionMode && (
          <div className="elementSubEditionLayout">
            <div className="elementContent">
              {this.state.HTMLElementType.match(/<p/g) && (
                <Paragraph
                  inputTextHTMLHandler={this.inputTextHTMLHandler}
                  atributesHTMLHandler={this.atributesHTMLHandler}
                  stylesHTMLHandler={this.stylesHTMLHandler}
                  classesHTMLHandler={this.classesHTMLHandler}
                  HTMLElementContent={this.state.HTMLElementContent}
                  HTMLAtributes={this.state.HTMLAtributes}
                  HTMLStyles={this.state.HTMLStyles}
                  HTMLClasses={this.state.HTMLClasses}
                  HTMLAtributesArr={this.state.HTMLAtributesArr}
                  HTMLStylesArr={this.state.HTMLStylesArr}
                  HTMLClassesArr={this.state.HTMLClassesArr}
                />
              )}
              {this.state.HTMLElementType.match(/<h/g) && (
                <Header
                  inputTextHTMLHandler={this.inputTextHTMLHandler}
                  atributesHTMLHandler={this.atributesHTMLHandler}
                  stylesHTMLHandler={this.stylesHTMLHandler}
                  classesHTMLHandler={this.classesHTMLHandler}
                  HTMLElementContent={this.state.HTMLElementContent}
                  HTMLAtributes={this.state.HTMLAtributes}
                  HTMLStyles={this.state.HTMLStyles}
                  HTMLClasses={this.state.HTMLClasses}
                  HTMLAtributesArr={this.state.HTMLAtributesArr}
                  HTMLStylesArr={this.state.HTMLStylesArr}
                  HTMLClassesArr={this.state.HTMLClassesArr}
                />
              )}

              {this.state.HTMLElementType.match(/<figure/g) && (
                <ImageElement
                  atrImgHTMLHandler={this.atrImgHTMLHandler}
                  imgFileSet={this.imgFileSet}
                  inputTextHTMLHandler={this.inputTextHTMLHandler}
                  atributesHTMLHandler={this.atributesHTMLHandler}
                  stylesHTMLHandler={this.stylesHTMLHandler}
                  classesHTMLHandler={this.classesHTMLHandler}
                  HTMLElementContent={this.state.HTMLElementContent}
                  HTMLAtributes={this.state.HTMLAtributes}
                  HTMLStyles={this.state.HTMLStyles}
                  HTMLClasses={this.state.HTMLClasses}
                  HTMLAtributesArr={this.state.HTMLAtributesArr}
                  HTMLStylesArr={this.state.HTMLStylesArr}
                  HTMLClassesArr={this.state.HTMLClassesArr}
                  imgFile={this.state.imgFile}
                  imgAlt={this.state.imgAlt}
                  imgFigcaption={this.state.imgFigcaption}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload }),
    onEditElement: payload =>
      dispach({ type: "EDIT_ELEMENT", payload: payload }),

    onDelElement: payload => dispach({ type: "DEL_ELEMENT", payload: payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PostElement);
