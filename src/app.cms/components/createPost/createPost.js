import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import htmlparser from "htmlparser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//css
import "./createPost.css";
//assets
import play from "../../assets/createPost/play.svg";
import tag from "../../assets/createPost/tag.svg";
import upload from "../../assets/createPost/upload.svg";
import time from "../../assets/createPost/time.svg";
import check from "../../assets/createPost/check.svg";
import plus from "../../assets/dashboard/plus.svg";
import next from "../../assets/createPost/next.svg";
import back from "../../assets/createPost/back.svg";
//components
import PostElement from "../postElement/postElement";
//services
import paragraph from "../../../services/paragraphService";
//react map
/*

DashBoard
  CreatePost

*/

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
    this.state = {
      projectTitle: "",
      projectTitleText: "",
      elementList: [],
      isEditionMode: true,
      finalHTMLElement: "",
      dom: "",
      editionPage: 1,
      summaryElValue: "",
      fileList: [],
      tagList: []
    };

    this.tags = [
      "Graphic Design",
      "UX/UI",
      "Web Design",
      "Web Development",
      "Programming",
      "E-commerce",
      "Digital Marketing",
      "Mobile Apps"
    ];
  }
  componentDidMount() {
    console.log("this.state.elementList.length", this.state.elementList.length);
    if (this.state.elementList.length === 0) {
      console.log("this.addElementBtnHandler();");
      this.addElementBtnHandler();
    }
  }
  componentDidUpdate() {
    let arr = this.state.summaryElValue.match(/.*[^\n]/g);
    let str = "";
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        str = str + `<p>${arr[i]}</p>`;
      }
    }
  }

  updateStateDom = dom => {
    this.setState({ dom: dom });
  };
  previewBtnHandler = () => {
    let updateStateDom = dom => {
      this.updateStateDom(dom);
    };
    let arrElements = this.props.elements;

    let finalHTMLElement = "";
    for (let i = 0; i < arrElements.length; i++) {
      finalHTMLElement =
        finalHTMLElement + " " + arrElements[i].finalHTMLElement;
    }

    let handler = new htmlparser.DefaultHandler(function(error, dom) {
      if (error) console.log("error", error);
      else {
        updateStateDom(dom);
      }
    });
    let parser = new htmlparser.Parser(handler);
    parser.parseComplete(finalHTMLElement);

    this.setState({ finalHTMLElement: finalHTMLElement });
    window.localStorage.setItem("finalHTMLElement", finalHTMLElement);

    let str = paragraph(this.state.summaryElValue);

    window.localStorage.setItem("summaryHTML", str);
  };
  commitBtnHandler = () => {
    let arrElements = this.props.elements;

    let finalHTMLElement = "";
    for (let i = 0; i < arrElements.length; i++) {
      finalHTMLElement =
        finalHTMLElement + " " + arrElements[i].finalHTMLElement;
    }

    this.setState({ finalHTMLElement: finalHTMLElement });
    window.localStorage.setItem("finalHTMLElement", finalHTMLElement);
  };
  addElementBtnHandler = () => {
    console.log(
      "creating element this.props.elements.length",
      this.props.elements
    );
    if (!this.props.elements) {
      console.log("creating element");

      this.props.onCreateElement(1);
      this.setState({ elementList: this.props.elements, isEditionMode: true });
      return;
    }

    this.props.onAddElement(this.props.elements.length + 1);
    this.setState({ elementList: this.props.elements, isEditionMode: true });
  };
  isEditionModeHandler = () => {
    this.setState(prevState => {
      return {
        isEditionMode: !prevState.isEditionMode
      };
    });
  };
  playBtnHandler = () => {};
  nextBtnHandler = val => {
    this.setState(prevState => {
      if (prevState.editionPage + val > 0 && prevState.editionPage + val < 4) {
        return { editionPage: prevState.editionPage + val };
      }
    });
  };
  summaryElHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  uploadFileHandler = file => {
    this.setState(prevState => {
      prevState.fileList.push(file);
      return { fileList: prevState.fileList };
    });
  };
  tagOptionHandler = e => {
    const {
      target: { value }
    } = e;

    this.setState(prevState => {
      let arr = prevState.tagList;
      arr.push(value);
      return { tagList: arr };
    });
  };
  onFileRemove = fileName => {
    this.setState(prevState => {
      let arr = prevState.fileList;
      arr = arr.filter(val => {
        return val.name !== fileName;
      });
      return { fileList: arr };
    });
  };
  projectTitleTextInputHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  saveProjectTitleHandler = () => {
    const savedText = this.state.projectTitleText;
    this.setState({ projectTitle: savedText });
  };
  cancelProjectTitleHandler = () => {
    this.props.history.push("/cms/dashboard");
  };

  render() {
    if (this.state.projectTitle === "") {
      return (
        <div>
          <input
            type="text"
            name="projectTitleText"
            value={this.state.projectTitleText}
            onChange={this.projectTitleTextInputHandler}
          />
          <button onClick={this.saveProjectTitleHandler}>save</button>
          <button onClick={this.cancelProjectTitleHandler}>cancel</button>
        </div>
      );
    }
    const files = this.state.fileList.map((file, i) => {
      let fileName = file.name;
      return (
        <React.Fragment key={i}>
          <span>{fileName}</span>
          <span
            onClick={() => {
              this.onFileRemove(fileName);
            }}
          >
            X
          </span>
        </React.Fragment>
      );
    });
    const tags = this.tags.map((tag, i) => {
      return (
        <React.Fragment key={i}>
          <input
            onChange={this.tagOptionHandler}
            type="checkbox"
            name="tagsList"
            value={tag}
          />
          {tag}
        </React.Fragment>
      );
    });
    const elements = this.props.elements.map((element, i) => {
      return (
        <div key={i}>
          <PostElement
            HTMLid={i + 1}
            isEditionModeHandler={this.isEditionModeHandler}
            HTMLElementType={element.HTMLElementType}
          />
        </div>
      );
    });
    return (
      <div>
        {/* Create Bar */}
        <div className="createBarCont">
          <div
            className="createBar"
            style={
              this.state.isEditionMode
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            <div className="createBarItem" onClick={this.playBtnHandler}>
              <h4>Preview</h4>
              <Link
                onClick={this.previewBtnHandler}
                target="_blank"
                to={{
                  pathname: "/cms/preview"
                }}
              >
                <img src={play} alt="preview botton  " />
              </Link>
            </div>
            <div
              className="createBarItem"
              onClick={() => {
                this.inputFile.current.click();
              }}
              style={
                this.state.editionPage === 1 && !this.state.isEditionMode
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <h4>Upload File</h4>
              <input
                ref={this.inputFile}
                style={{
                  display: "none"
                }}
                type="file"
                name="uploadedFile"
                accept="*/*"
                onChange={e => {
                  this.uploadFileHandler(e.target.files[0]);
                }}
              />
              <img src={upload} alt="upload botton  " />
            </div>
            {/* <div
              className="createBarItem"
              style={
                this.state.editionPage > 1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <h4>Add Tag</h4>
              <img src={tag} alt="add tag botton  " />
            </div> */}

            <div
              className="createBarItem"
              style={
                this.state.editionPage > 1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <h4>Program</h4>
              <img src={time} alt="program botton  " />
            </div>
            <div
              className="createBarItem"
              style={
                this.state.editionPage > 1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <h4>Publish</h4>
              <img src={check} alt="publish botton  " />
            </div>
            <div
              className="createBarItem"
              onClick={() => {
                this.nextBtnHandler(1);
              }}
            >
              <h4>Next</h4>
              <img src={next} alt="Next botton  " />
            </div>
            <div
              className="createBarItem"
              onClick={() => {
                this.nextBtnHandler(-1);
              }}
            >
              <h4>Back</h4>
              <img src={back} alt="Next botton  " />
            </div>
          </div>
        </div>
        {/* Edition Area */}
        <div className="createLayout">
          {this.state.editionPage === 1 ? (
            <h1>Blog Post Edition</h1>
          ) : (
            <h1>Summary Edition</h1>
          )}
          <div
            style={{
              height: "80vh",
              position: "relative",
              overflow: "hidden",
              width: "80%"
            }}
          >
            {/* first page post creation */}

            <div
              className="editionArea"
              style={
                this.state.editionPage === 1
                  ? { animation: "editionIn 500ms ease normal forwards" }
                  : {
                      animation: "editionOut 500ms ease  normal forwards"
                    }
              }
            >
              {elements}
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {!this.state.isEditionMode && (
                  <button
                    onClick={this.addElementBtnHandler}
                    className="addElementBtn"
                  >
                    <span>Add Element</span>
                    <img
                      src={plus}
                      title="add element"
                      alt="add Element button"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* second page summary creation */}
            {this.state.editionPage === 2 && (
              <div
                className="summaryArea"
                style={
                  this.state.editionPage === 2
                    ? { animation: "editionIn 500ms ease normal forwards" }
                    : {
                        animation: "editionOut 500ms ease  normal forwards"
                      }
                }
              >
                <textarea
                  className="summaryElValue"
                  value={this.state.summaryElValue}
                  name="summaryElValue"
                  onChange={this.summaryElHandler}
                >
                  {this.state.summaryElValue}
                </textarea>
              </div>
            )}

            {/* third page summary creation */}
            {this.state.editionPage === 3 && (
              <div
                className="SeoArea"
                style={
                  this.state.editionPage === 3
                    ? { animation: "editionIn 500ms ease normal forwards" }
                    : {
                        animation: "editionOut 500ms ease  normal forwards"
                      }
                }
              >
                <input type="text" />
              </div>
            )}
          </div>

          <div>
            <div className="tagList">
              <h6>Tags:</h6>
              {tags}
            </div>
            <div className="fileList">
              <h6>Available Files: </h6>
              {files}
            </div>
          </div>
        </div>
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
    onCreateElement: id => dispach({ type: "CREATE_ELEMENT", id: id }),
    onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload }),
    onEditElement: payload =>
      dispach({ type: "EDIT_ELEMENT", payload: payload }),
    onDelElement: payload => dispach({ type: "DEL_ELEMENT", payload: payload })
  };
};

const CreatePost2 = withRouter(CreatePost);

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CreatePost2);
