import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
//assets
import "./postElement.css";
import edit from "../../assets/createPost/edit.svg";
// import paint from "../../assets/createPost/paint.svg";

import del from "../../assets/createPost/delete.svg";
import check from "../../assets/dashboard/check.svg";
import copy from "../../assets/createPost/copy.svg";

//components
import Paragraph from "../paragraph/paragraph";
import Header from "../header/header";
import CustomElement from "../customElement/customElement";
import CustomParagraph from "../customParagraph/customParagraph";
import ImageElement from "../imageElement/imageElement";
//services
import responsiveImages from "../../../services/responsiveImages";
//apiCalls
import uploadPostImage from "../../../apiCalls/uploadPostImage";

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
    // inputSelectHTMLHandler  toogle edition mode flag
    //elements array of elements:
    //         HTMLElementType
    //         HTMLElementContent
    //         HTMLAtributes
    //         HTMLAtributesArr
    //         HTMLAtributesStr
    //         HTMLStyles
    //         HTMLStylesStr
    //         HTMLStylesArr
    //         HTMLClasses
    //         HTMLClassesArr
    //         HTMLClassesStr
    //         HTMLPreviewStr
    //         HTMLid
    //         finalHTMLElement
    //         imgFile
    //         imgAlt
    //         imgFigcaption
    //isEditionMode
    //fn editionBtnHandler

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
      isImageUploader: false,
      isFinishEnabled: true
    };
    this.elementsJSX = {
      p: `<p style={styles} class={classes}> {content}</p>`,
      h1: `<h1 style={styles} class={classes}> {content}</h1>`,
      h2: `<h2 style={styles} class={classes}> {content}</h2>`,
      h3: `<h3 style={styles} class={classes}> {content}</h3>`,
      h4: `<h4 style={styles} class={classes}> {content}</h4>`,
      h5: `<h5 style={styles} class={classes}> {content}</h5>`,
      h6: `<h6 style={styles} class={classes}> {content}</h6>`,
      // figure: `<figure><picture><source media="(max-width: 700px)" srcset={imgFileMobile}><source media="(max-width: 1050px)" srcset={imgFileTablet}><img src={imgFile} alt={imgAlt}  style={styles} class={classes} /></picture><figcaption>{imgFigcaption}</figcaption></figure>`
      figure: `<figure><picture><source media='(max-width: 700px)' srcSet={imgFileMobile}/><source media='(max-width: 1050px)' srcSet={imgFileTablet}/><img src={imgFile} alt={imgAlt}  style={styles} class={classes} /></picture><figcaption>{imgFigcaption}</figcaption></figure>`
    };
  }

  componentDidMount() {
    this.postElement.current.scrollTo(0, this.postElement.current.scrollHeight);
    if (this.props.HTMLid === 1) {
      let value = "<h1 style={styles} class={classes}> {content}</h1>";
      this.setState({
        HTMLPreviewStr: value,
        isImageUploader: false
      });
    }
  }

  inputTextHTMLHandler = e => {
    this.props.onProjectChange();

    const {
      target: { value }
    } = e;
    this.setState({ HTMLElementContent: value });
  };
  atrImgHTMLHandler = e => {
    this.props.onProjectChange();
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  imgFileSet = (previewURL, filename, base64) => {
    this.setState({
      imgFile: {
        previewURL: previewURL,
        filename: filename,
        base64: base64
      }
    });
  };
  stylesHTMLHandler = (e, flag) => {
    let value = "";
    let name = "";
    if (flag) {
      value = `${this.state.HTMLStyles};`;
      name = "HTMLStyles";
    } else {
      value = e.target.value;
      name = e.target.name;
    }
    this.props.onProjectChange();

    if (value.match(/;/g)) {
      this.setState(prevState => {
        // let styles = value.slice(0, value.length);
        let styles = value.replace(";", "");
        let stylesArr = prevState.HTMLStylesArr;
        stylesArr.push(`${styles}`);
        return {
          HTMLstylesArr: stylesArr,
          HTMLStylesStr: `${prevState.HTMLStylesStr} ${styles};`,
          HTMLStyles: ""
        };
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  atributesHTMLHandler = (e, flag) => {
    let value = "";
    let name = "";
    if (flag) {
      value = `${this.state.HTMLAtributes},`;
      name = "HTMLAtributes";
    } else {
      value = e.target.value;
      name = e.target.name;
    }
    this.props.onProjectChange();

    if (value.match(/,/g)) {
      this.setState(prevState => {
        // let atributes = value.slice(0, value.length - 1);
        let atributes = value.replace(",", "");
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
  HTMLAtributesArrRemove = id => {
    this.setState(prevState => {
      let arr = prevState.HTMLAtributesArr;

      const str = prevState.HTMLAtributesStr.replace(arr[id], "");
      const previewStr = prevState.HTMLPreviewStr.replace(arr[id], "");
      arr.splice(id, 1);
      return {
        HTMLAtributesArr: arr,
        HTMLAtributesStr: str,
        HTMLPreviewStr: previewStr
      };
    });
    this.props.onProjectChange();
  };

  HTMLStylesArrRemove = id => {
    this.setState(prevState => {
      let arr = prevState.HTMLStylesArr;

      const str = prevState.HTMLStylesStr.replace(arr[id], "");
      const previewStr = prevState.HTMLPreviewStr.replace(arr[id], "");
      arr.splice(id, 1);
      return {
        HTMLStylesArr: arr,
        HTMLStylesStr: str,
        HTMLPreviewStr: previewStr
      };
    });
    this.props.onProjectChange();
  };

  HTMLClassesArrRemove = id => {
    this.setState(prevState => {
      let arr = prevState.HTMLClassesArr;

      const str = prevState.HTMLClassesStr.replace(` ${arr[id]}`, "");
      const previewStr = prevState.HTMLPreviewStr.replace(arr[id], "");
      arr.splice(id, 1);
      return {
        HTMLClassesArr: arr,
        HTMLClassesStr: str,
        HTMLPreviewStr: previewStr
      };
    });
    this.props.onProjectChange();
  };
  classesHTMLHandler = (e, flag) => {
    let value = "";
    let name = "";
    if (flag) {
      value = `${this.state.HTMLClasses},`;
      name = "HTMLClasses";
    } else {
      value = e.target.value;
      name = e.target.name;
    }
    this.props.onProjectChange();

    if (value.match(/,/g)) {
      this.setState(prevState => {
        let classes = value.replace(",", "");
        let classesArr = prevState.HTMLClassesArr;
        classesArr.push(`${classes}-${this.props.project.url}`);
        return {
          HTMLClassesArr: classesArr,
          HTMLClassesStr: `${prevState.HTMLClassesStr} ${classes}-${
            this.props.project.url
          }`,
          HTMLClasses: ""
        };
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  inputSelectHTMLHandler = e => {
    this.props.onProjectChange();
    const {
      target: { value }
    } = e;
    if (value !== "custom" && value !== "image") {
      this.setState({
        HTMLPreviewStr: value,
        isImageUploader: false,
        HTMLElementType: value,
        isFinishEnabled: true
      });
    }

    if (value === "image") {
      this.setState({
        isImageUploader: true,
        HTMLElementType: value,
        isFinishEnabled: true
      });
    }
    if (value === "custom" || value === "manyParagraph") {
      this.setState({
        HTMLElementType: value,
        HTMLPreviewStr: "",
        isFinishEnabled: false
      });
    }
  };

  prepareHTMLFilter = (
    str,
    styles,
    classes,
    content,
    imageFileObj,
    alt,
    figcaption
  ) => {
    if (str) {
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
      str = str.replace("{imgFile}", `"${imageFileObj.imgFile}"`);
      str = str.replace("{imgFileTablet}", `"${imageFileObj.imgFileTablet}"`);
      str = str.replace("{imgFileMobile}", `"${imageFileObj.imgFileMobile}"`);
      str = str.replace("{imgAlt}", `"${alt}"`);
      str = str.replace("{imgFigcaption}", figcaption);

      return str;
    }
  };

  sendWordToJSXHandler = word => {
    // HTMLPreviewStr

    this.setState({ HTMLPreviewStr: word, isFinishEnabled: true });
  };
  editionBtnHandler = e => {
    e && e.preventDefault();

    this.setState(prevState => {
      return {
        isEditionMode: !prevState.isEditionMode
      };
    });
    // const postState = this.state;
    // this.props.editionBtnHandler(this.state, false);
    this.props.editionBtnHandler(this.state);

    const conditionToChangePreview = this.state.HTMLElementType.match("figure")
      ? this.props.project.imageHasChanged
      : this.props.project.hasChanged;

    if (conditionToChangePreview) {
      //tratamiento especial si es imagen
      let finalHTMLElement = this.state.HTMLPreviewStr;
      let styles = this.state.HTMLStylesStr;
      let classes = this.state.HTMLClassesStr;
      let content = this.state.HTMLElementContent;

      //images only
      const alt = this.state.imgAlt;
      const imgFile = this.state.imgFile;
      const figcaption = this.state.imgFigcaption;
      let imgFileTablet, imgFileMobile;
      const responsiveImg = responsiveImages(imgFile.filename);
      imgFileTablet = responsiveImg.tablet;
      imgFileMobile = responsiveImg.mobile;

      const imgFileObj = {
        imgFile: imgFile.filename,
        imgFileTablet,
        imgFileMobile
      };
      console.log("imgFileObj", imgFileObj);
      finalHTMLElement = this.prepareHTMLFilter(
        finalHTMLElement,
        styles,
        classes,
        content,
        imgFile
          ? imgFileObj
          : { imgFile: "", imgFileTablet: "", imgFileMobile: "" },
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
        imgFile: imgFile,
        imgAlt: alt,
        imgFigcaption: figcaption
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
    }
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
  uploadFileHandler = (e, oldFileName) => {
    if (e.target.files[0]) {
      this.props.onImageChange(); //on image change
      const file = e.target.files[0];

      let fileNamesArr = this.props.fileNames;
      if (file.name !== oldFileName) {
        fileNamesArr = fileNamesArr.filter(fileName => {
          return fileName !== oldFileName;
        });
      }
      let updateListFiles = true;
      for (let i = 0; i < fileNamesArr.length; i++) {
        if (file.name === fileNamesArr[i]) {
          updateListFiles = false;
        }
      }

      updateListFiles && fileNamesArr.push(file.name);
      // this.props.onAddDeleteFile(fileNamesArr)
      const successUpload = fileNamesArr => {
        this.props.onAddDeleteFile(fileNamesArr);
      };

      uploadPostImage(
        this.state.imgFile.base64,
        this.props.project.url,
        file.name,
        () => {
          successUpload(fileNamesArr);
        },
        err => {
          console.log("An error has ocurred during image Upload", err);
        }
      );
    }
  };

  render() {
    const parser = () => {
      if (
        this.state.HTMLElementType === "custom" ||
        this.state.HTMLElementType === "manyParagraph"
      ) {
        return ReactHtmlParser(this.state.HTMLPreviewStr);
      } else if (this.state.HTMLElementType.match(/figure/g)) {
        let imgFile = "";
        let imgFileTablet = "";
        let imgFileMobile = "";
        if (this.state.imgFile && this.state.imgFile.previewURL === "") {
          imgFile = this.state.imgFile.filename;

          const responsiveImg = responsiveImages(imgFile);
          imgFileTablet = responsiveImg.tablet;
          imgFileMobile = responsiveImg.mobile;
        } else if (this.state.imgFile) {
          imgFile = imgFileTablet = imgFileMobile = this.state.imgFile
            .previewURL;
        }
        return (
          <JsxParser
            jsx={this.state.HTMLPreviewStr}
            bindings={{
              styles: this.state.HTMLStylesStr,
              classes: this.state.HTMLClassesStr,
              imgFile: imgFile,
              imgFileTablet: imgFileTablet,
              imgFileMobile: imgFileMobile,
              imgAlt: this.state.imgAlt,
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
      <div className={this.props.className} ref={this.postElement}>
        <div style={this.props.style} className="elementEditionLayout">
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
              HTMLid={this.props.HTMLid}
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
              HTMLid={this.props.HTMLid}
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
                  HTMLAtributesArrRemove={this.HTMLAtributesArrRemove}
                  HTMLStylesArrRemove={this.HTMLStylesArrRemove}
                  HTMLClassesArrRemove={this.HTMLClassesArrRemove}
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
                  HTMLAtributesArrRemove={this.HTMLAtributesArrRemove}
                  HTMLStylesArrRemove={this.HTMLStylesArrRemove}
                  HTMLClassesArrRemove={this.HTMLClassesArrRemove}
                />
              )}

              {this.state.HTMLElementType.match(/<figure/g) && (
                <ImageElement
                  editionBtnHandler={this.editionBtnHandler}
                  atrImgHTMLHandler={this.atrImgHTMLHandler}
                  imgFileSet={this.imgFileSet}
                  inputTextHTMLHandler={this.inputTextHTMLHandler}
                  atributesHTMLHandler={this.atributesHTMLHandler}
                  stylesHTMLHandler={this.stylesHTMLHandler}
                  classesHTMLHandler={this.classesHTMLHandler}
                  uploadFileHandler={this.uploadFileHandler}
                  HTMLid={this.state.HTMLid}
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
                  HTMLAtributesArrRemove={this.HTMLAtributesArrRemove}
                  HTMLStylesArrRemove={this.HTMLStylesArrRemove}
                  HTMLClassesArrRemove={this.HTMLClassesArrRemove}
                  HTMLAtributesArrRemove={this.HTMLAtributesArrRemove}
                  HTMLStylesArrRemove={this.HTMLStylesArrRemove}
                  HTMLClassesArrRemove={this.HTMLClassesArrRemove}
                />
              )}
              {this.state.isFinishEnabled &&
                this.state.HTMLElementType.match("figure") === null && (
                  <button className="cmsBtn" onClick={this.editionBtnHandler}>
                    <span style={{ marginRight: "5px" }}>Finish</span>
                    <img style={{ width: "10px" }} src={check} alt="check" />
                  </button>
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
    elements: state.postCreation.elements,
    project: state.postCreation.project,
    fileNames: state.postCreation.files
    //fileNames
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload }),
    onEditElement: payload =>
      dispach({ type: "EDIT_ELEMENT", payload: payload }),
    onProjectChange: () => dispach({ type: "CHANGE_PROJECT" }),
    onImageChange: () => dispach({ type: "IMAGE_CHANGED" }),
    onDelElement: payload => dispach({ type: "DEL_ELEMENT", payload: payload }),
    onAddDeleteFile: payload =>
      dispach({ type: "ADD_DELETE_FILE", payload: payload })
    //onadddeletefile
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PostElement);
