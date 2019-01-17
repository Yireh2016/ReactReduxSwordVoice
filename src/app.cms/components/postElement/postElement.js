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

    this.state = {
      HTMLElementType: undefined,
      HTMLElementContent: undefined,
      HTMLAtributes: undefined,
      HTMLAtributesArr: [],
      // HTMLAtributesIsValid: true,
      HTMLAtributesStr: "",
      finalJSXElement: "",
      HTMLStyles: undefined,
      HTMLStylesStr: "",
      HTMLStylesArr: [],
      HTMLClasses: undefined,
      HTMLClassesArr: [],
      HTMLClassesStr: "",
      isEditionMode: true
    };
    this.elementsJSX = {
      p: `<p atributes style={styles} class={classes}> {content}</p>`,
      h1: `<h1 atributes style={styles} class={classes}> {content}</h1>`,
      h2: `<h2 atributes style={styles} class={classes}> {content}</h2>`,
      h3: `<h3 atributes style={styles} class={classes}> {content}</h3>`,
      h4: `<h4 atributes style={styles} class={classes}> {content}</h4>`,
      h5: `<h5 atributes style={styles} class={classes}> {content}</h5>`,
      h6: `<h6 atributes style={styles} class={classes}> {content}</h6>`
    };
  }

  //HTMLHandler
  HTMLHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
    if (name === "HTMLElementType") {
      this.setState({ finalJSXElement: value });
    }

    switch (name) {
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
              finalJSXElement: prevState.finalJSXElement.replace(
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

      default:
        break;
    }
  };

  editionBtnHandler = () => {
    this.setState(prevState => {
      return { isEditionMode: !prevState.isEditionMode };
    });
    let payload = {
      ...this.state
    };
    this.props.onAddElement(payload);
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
    return (
      <div className="elementEditionLayout">
        <div className="elementSelect">
          {this.state.isEditionMode && (
            <div className="elementSelectLayout">
              <span>Element</span>
              <select
                value={this.state.HTMLElementType}
                name="HTMLElementType"
                onChange={this.HTMLHandler}
              >
                <option value="">Select one</option>
                <option value={this.elementsJSX.h1}>Header 1</option>
                <option value={this.elementsJSX.h2}>Header 2</option>
                <option value={this.elementsJSX.h3}>Header 3</option>
                <option value={this.elementsJSX.h4}>Header 4</option>
                <option value={this.elementsJSX.h5}>Header 5</option>
                <option value={this.elementsJSX.h6}>Header 6</option>
                <option value={this.elementsJSX.p}>Paragraph</option>
                <option value="figure">Imagen</option>
                <option value="custom">Custom Element</option>
              </select>
            </div>
          )}
          <div className="elementPreview">
            {
              <JsxParser
                jsx={this.state.finalJSXElement}
                bindings={{
                  content: this.state.HTMLElementContent,
                  styles: this.state.HTMLStylesStr,
                  classes: this.state.HTMLClassesStr
                }}
              />
            }
          </div>
        </div>

        {this.state.isEditionMode && (
          <div className="elementSubEditionLayout">
            <div className="elementContent">
              <textarea
                value={this.state.HTMLElementContent}
                name="HTMLElementContent"
                onChange={this.HTMLHandler}
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
                  onChange={this.HTMLHandler}
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
                  onChange={this.HTMLHandler}
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
                  onChange={this.HTMLHandler}
                />
                <ul>{classes}</ul>
              </div>
            </div>
          </div>
        )}

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
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    elements: state.postCreation.elements
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload })
    // onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload }),
    // onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PostElement);
