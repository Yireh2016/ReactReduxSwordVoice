import React, { PureComponent } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
//assets
import "./postElement.css";
import edit from "../../assets/createPost/edit.svg";
// import paint from "../../assets/createPost/paint.svg";
import del from "../../assets/createPost/delete.svg";
import copy from "../../assets/createPost/copy.svg";
import up from "../../assets/createPost/up.svg";
import down from "../../assets/createPost/down.svg";
//services
import responsiveImages from "../../../services/responsiveImages";

//react map
/*

DashBoard
  CreatePost
    PostElementPreview


*/

// import Header from "../header/header";

class PostElementPreview extends PureComponent {
  constructor(props) {
    super(props);

    this.postElement = React.createRef();
  }

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
  //fn this.editionBtnHandler

  // sendWordToJSXHandler = word => {
  //   // HTMLPreviewStr
  //   setState({ HTMLPreviewStr: word, isFinishEnabled: true });
  // };
  componentDidMount() {
    if (
      `${window.localStorage.getItem(
        `postElement${this.props.HTMLid}OffSetTop`
      )}` === `${this.postElement.current.offsetTop}`
    ) {
      return;
    }
    window.localStorage.setItem(
      `postElement${this.props.HTMLid}OffSetTop`,
      `${this.postElement.current.offsetTop}`
    );
  }
  componentDidUpdate() {
    if (
      `${window.localStorage.getItem(
        `postElement${this.props.HTMLid}OffSetTop`
      )}` === `${this.postElement.current.offsetTop}`
    ) {
      return;
    }
    window.localStorage.setItem(
      `postElement${this.props.HTMLid}OffSetTop`,
      `${this.postElement.current.offsetTop}`
    );
  }
  editionBtnHandler = e => {
    e.preventDefault();

    //este codigo almacena la posicion de scroll con el fin de mostrar al usuario el elemento editado al salir del modo edicion
    const el = this.postElement.current;
    // const postState = this.props;
    this.props.scrollTopSaveHandler(el.offsetTop, this.props.HTMLid);
    !this.props.isEditionMode
      ? this.props.editionBtnHandler(this.props)
      : this.props.editionBtnHandler("");
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

  upDownHandler = direction => {
    const actualPosition = this.props.HTMLid - 1;
    const actualID = this.props.HTMLid;
    let arr = this.props.elements;
    const mem = arr[actualPosition];

    if (direction === "up") {
      arr[actualPosition].HTMLid = actualID - 1;
      arr[actualPosition - 1].HTMLid = actualID;

      arr[actualPosition] = arr[actualPosition - 1];
      arr[actualPosition - 1] = mem;
      window.localStorage.setItem("postActiveElID", actualID - 1);
      window.localStorage.setItem(
        "postElTop",
        `postElement${this.props.HTMLid - 1}OffSetTop`
      );
    } else {
      arr[actualPosition].HTMLid = actualID + 1;
      arr[actualPosition + 1].HTMLid = actualID;

      arr[actualPosition] = arr[actualPosition + 1];
      arr[actualPosition + 1] = mem;
      window.localStorage.setItem("postActiveElID", actualID + 1);
      window.localStorage.setItem(
        "postElTop",
        `postElement${this.props.HTMLid + 1}OffSetTop`
      );
    }

    this.props.onMoveElement(arr);
  };

  // finishEditionHandler = e => {
  //   this.editionBtnHandler(e);
  // };
  render() {
    const parser = () => {
      if (
        this.props.HTMLElementType === "custom" ||
        this.props.HTMLElementType === "manyParagraph"
      ) {
        return ReactHtmlParser(this.props.HTMLPreviewStr);
      } else if (this.props.HTMLElementType.match(/figure/g)) {
        let imgFileTablet = "";
        let imgFileMobile = "";

        const responsiveImg = responsiveImages(this.props.imgFile.filename);
        imgFileTablet = responsiveImg.tablet;
        imgFileMobile = responsiveImg.mobile;

        return (
          <JsxParser
            jsx={this.props.HTMLPreviewStr}
            bindings={{
              styles: this.props.HTMLStylesStr,
              classes: this.props.HTMLClassesStr,
              imgFile: this.props.imgFile.filename,
              imgFileTablet: imgFileTablet,
              imgFileMobile: imgFileMobile,
              imgAlt: this.props.imgAlt,
              imgFigcaption: this.props.imgFigcaption
            }}
          />
        );
      } else {
        return (
          <JsxParser
            jsx={this.props.HTMLPreviewStr}
            bindings={{
              content: this.props.HTMLElementContent,
              styles: this.props.HTMLStylesStr,
              classes: this.props.HTMLClassesStr
            }}
          />
        );
      }
    };
    return (
      <div className={this.props.className}>
        <div
          style={this.props.style}
          ref={this.postElement}
          className="elementEditionLayoutPreview"
        >
          <div className="elementSelect">
            <div className="elementSelectLayout">
              <span>Element</span>
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

              {!this.props.HTMLElementType.match(/h1/g) && (
                <React.Fragment>
                  <img
                    style={
                      this.props.isEditionMode
                        ? { opacity: ".2" }
                        : { opacity: "1", cursor: "pointer" }
                    }
                    src={del}
                    onClick={this.delBtnHandler}
                    alt="delete"
                  />
                  <img
                    style={
                      this.props.isEditionMode
                        ? { opacity: ".2" }
                        : { opacity: "1", cursor: "pointer" }
                    }
                    src={copy}
                    alt="copy"
                  />
                  {this.props.HTMLid !== 2 && (
                    <img
                      onClick={() => this.upDownHandler("up")}
                      style={
                        this.props.isEditionMode
                          ? { opacity: ".2" }
                          : { opacity: "1", cursor: "pointer" }
                      }
                      src={up}
                      alt="up"
                    />
                  )}
                  {this.props.HTMLid !== this.props.elements.length && (
                    <img
                      onClick={() => this.upDownHandler("down")}
                      style={
                        this.props.isEditionMode
                          ? { opacity: ".2" }
                          : { opacity: "1", cursor: "pointer" }
                      }
                      src={down}
                      alt="down"
                    />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements,
    project: state.postCreation.project
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload }),
    onEditElement: payload =>
      dispach({ type: "EDIT_ELEMENT", payload: payload }),
    onProjectChange: () => dispach({ type: "CHANGE_PROJECT" }),
    onDelElement: payload => dispach({ type: "DEL_ELEMENT", payload: payload }),
    onMoveElement: payload =>
      dispach({ type: "MOVE_ELEMENT", payload: payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PostElementPreview);
