import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import { connect } from "react-redux";
//assets
import "./postElement.css";
import edit from "../../assets/createPost/edit.svg";
import paint from "../../assets/createPost/paint.svg";
import del from "../../assets/createPost/delete.svg";
import copy from "../../assets/createPost/copy.svg";

class PostElement extends Component {
  constructor(props) {
    super(props);

    // PROPS
    // HTMLid indica el id del html element
    // isEditionModeHandler  toogle edition mode flag

    this.state = {
      HTMLElementType: "",
      HTMLElementContent: "",
      HTMLAtributes: "",
      HTMLAtributesArr: [],
      HTMLAtributesStr: "",
      HTMLStyles: "",
      HTMLStylesStr: "",
      HTMLStylesArr: [],
      HTMLClasses: "",
      HTMLClassesArr: [],
      HTMLClassesStr: "",
      HTMLPreviewStr: "",
      HTMLid: props.HTMLid,
      isEditionMode: true,
      finalHTMLElement: ""
    };
    this.elementsJSX = {
      p: `<p atributes style={styles} class={classes}> {content}</p>`,
      h1: `<h1 atributes style={styles} class={classes}> {content}</h1>`,
      h2: `<h2 atributes style={styles} class={classes}> {content}</h2>`,
      h3: `<h3 atributes style={styles} class={classes}> {content}</h3>`,
      h4: `<h4 atributes style={styles} class={classes}> {content}</h4>`,
      h5: `<h5 atributes style={styles} class={classes}> {content}</h5>`,
      h6: `<h6 atributes style={styles} class={classes}> {content}</h6>`,
      figure: `<figure>
      <img src={imageFile} alt={alt} atributes style={styles} class={classes}>
      <figcaption>Test Figure</figcaption>
    </figure>`
    };
  }

  //inputHTMLHandler
  inputHTMLHandler = e => {
    const {
      target: { name, value }
    } = e;

    this.setState({ [name]: value });

    switch (name) {
      case "HTMLElementType": {
        if (value !== "custom") {
          this.setState({ HTMLPreviewStr: value });
        }
        break;
      }

      case "HTMLElementContent": {
        if (this.state.HTMLElementType === "custom") {
          this.setState({ HTMLPreviewStr: value });
        }
        break;
      }

      case "HTMLAtributes": {
        if (value.match(/,/g)) {
          this.setState(prevState => {
            let atributes = value.slice(0, value.length - 1);
            let atributesArr = prevState.HTMLAtributesArr;
            atributesArr.push(`${atributes}`);
            return {
              HTMLAtributesArr: atributesArr,
              HTMLAtributes: "",
              HTMLAtributesStr: `${prevState.HTMLAtributesStr} ${atributes}`,
              HTMLElementType: prevState.HTMLElementType.replace(
                "atributes",
                `atributes ${atributes}`
              )
            };
          });
        }

        break;
      }

      case "HTMLStyles": {
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
        }

        break;
      }

      case "HTMLClasses": {
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
        }

        break;
      }

      case "HTMLElementContent": {
        if (this.state.HTMLElementType === "custom") {
          this.setState(prevState => {
            return { HTMLPreviewStr: prevState.HTMLPreviewStr + value };
          });
        }
      }

      default:
        break;
    }
  };
  prepareHTMLFilter = (str, styles, classes, content) => {
    str = str.replace("atributes", "");
    str = str.replace("{styles}", `"${styles}"`);
    str = str.replace("{classes}", `"${classes}"`);
    str = str.replace("{content}", content);
    return str;
  };
  editionBtnHandler = e => {
    e.preventDefault();
    this.props.isEditionModeHandler();
    this.setState(prevState => {
      return { isEditionMode: !prevState.isEditionMode };
    });

    let finalHTMLElement = this.state.HTMLPreviewStr;
    let styles = this.state.HTMLStylesStr;
    let classes = this.state.HTMLClassesStr;
    let content = this.state.HTMLElementContent;

    finalHTMLElement = this.prepareHTMLFilter(
      finalHTMLElement,
      styles,
      classes,
      content
    );
    this.setState({ finalHTMLElement: finalHTMLElement });

    let payload = {
      ...this.state,
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

    this.props.onDelElement(payload);
  };

  render() {
    const atributes = this.state.HTMLAtributesArr.map((atribute, i) => {
      return <li key={i}>{atribute}</li>;
    });

    const styles = this.state.HTMLStylesArr.map((style, i) => {
      return <li key={i}>{style}</li>;
    });
    const classes = this.state.HTMLClassesArr.map((clase, i) => {
      return <li key={i}>{clase}</li>;
    });

    // const editionElementType = () => {
    //   console.log(
    //     "this.state.HTMLElementType.match(/<figure>/g)",
    //     this.state.HTMLElementType.match(/<figure>/g)
    //   );
    //   console.log("this.state.HTMLElementType", this.state.HTMLElementType);

    //   if (this.state.HTMLElementType.match(/<figure>/g)) {
    //     console.log("es una fugura");
    //     return <div>es una fugura</div>;
    //   }

    //   return (
    //     <textarea
    //       value={this.state.HTMLElementContent}
    //       name="HTMLElementContent"
    //       onChange={this.inputHTMLHandler}
    //     >
    //       {this.state.HTMLElementContent}
    //     </textarea>
    //   );
    // };

    // const editionElementType = () => {
    //   return (
    //     <textarea
    //       value={this.state.HTMLElementContent}
    //       name="HTMLElementContent"
    //       onChange={this.inputHTMLHandler}
    //     >
    //       {this.state.HTMLElementContent}
    //     </textarea>
    //   );
    // };

    return (
      <div>
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
                onChange={this.inputHTMLHandler}
                disabled={!this.state.isEditionMode}
              >
                <option value="">Select one</option>
                <option value={this.elementsJSX.h1}>Header 1</option>
                <option value={this.elementsJSX.h2}>Header 2</option>
                <option value={this.elementsJSX.h3}>Header 3</option>
                <option value={this.elementsJSX.h4}>Header 4</option>
                <option value={this.elementsJSX.h5}>Header 5</option>
                <option value={this.elementsJSX.h6}>Header 6</option>
                <option value={this.elementsJSX.p}>Paragraph</option>
                <option value={this.elementsJSX.figure}>Image</option>
                <option value="custom">Custom Element</option>
              </select>
            </div>

            <div
              onDoubleClick={e => {
                this.editionBtnHandler(e);
              }}
              className="elementPreview blogArticle"
            >
              {
                <JsxParser
                  jsx={this.state.HTMLPreviewStr}
                  bindings={{
                    content: this.state.HTMLElementContent,
                    styles: this.state.HTMLStylesStr,
                    classes: this.state.HTMLClassesStr
                  }}
                />
              }
            </div>
          </div>

          <div className="elementEditionBtn">
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

        {this.state.isEditionMode && (
          <div className="elementSubEditionLayout">
            <div className="elementContent">
              <textarea
                value={this.state.HTMLElementContent}
                name="HTMLElementContent"
                onChange={this.inputHTMLHandler}
              >
                {this.state.HTMLElementContent}
              </textarea>
            </div>
            <div className="elementAtributes">
              Atributes
              <div>
                <input
                  type="text"
                  name="HTMLAtributes"
                  value={this.state.HTMLAtributes}
                  onChange={this.inputHTMLHandler}
                />
                <ul>{atributes}</ul>
              </div>
            </div>
            <div className="elementStyles">
              Styles
              <div>
                <input
                  type="text"
                  name="HTMLStyles"
                  value={this.state.HTMLStyles}
                  onChange={this.inputHTMLHandler}
                />
                <ul>{styles}</ul>
              </div>
            </div>
            <div className="elementClasses">
              Classes
              <div>
                <input
                  type="text"
                  name="HTMLClasses"
                  value={this.state.HTMLClasses}
                  onChange={this.inputHTMLHandler}
                />
                <ul>{classes}</ul>
              </div>
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
