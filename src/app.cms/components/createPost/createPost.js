import React, { Component } from "react";
import axios from "axios";
import htmlparser from "htmlparser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import is from "is_js";
import smoothscroll from "smoothscroll-polyfill";

//css
import "./createPost.css";
//assets
import play from "../../assets/createPost/play.svg";
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
import SeoEditor from "../seoEditor/seoEditor";
import ProjectTitle from "../projectTitle/projectTitle";
//react map
/*

DashBoard
  CreatePost

*/

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
    this.editionAreaRef = React.createRef();
    this.state = {
      projectTitle: this.props.project.name,
      projectTitleText: this.props.project.name,
      elementList: this.props.elements,
      isEditionMode: false,
      editionPage: 1,
      summaryElValue: this.props.summary,
      fileList: [],
      fileListNames: this.props.fileNames,
      dateProgram: this.props.date,
      finalHTMLElement: "",
      dom: ""
    };
  }

  // kick off the polyfill!

  componentDidMount() {
    if (this.state.elementList.length === 0) {
      this.addElementBtnHandler();
      this.setState({ isEditionMode: true });
      return;
    }
  }

  htmlArrCosolidation = arr => {
    let arrElements = arr;

    let finalHTMLElement = "";
    for (let i = 0; i < arrElements.length; i++) {
      finalHTMLElement =
        finalHTMLElement + "" + arrElements[i].finalHTMLElement;
    }
    return finalHTMLElement;
  };
  parseHTML2Object = htmlStr => {
    let handler = new htmlparser.DefaultHandler(function(error, dom) {
      if (error) console.log("error", error);
      else {
        console.log("parser no error");
      }
    });
    let parser = new htmlparser.Parser(handler);
    parser.parseComplete(htmlStr);
    return handler.dom;
  };

  previewBtnHandler = () => {
    let finalHTMLElement = this.htmlArrCosolidation(this.props.elements);

    let dom = this.parseHTML2Object(finalHTMLElement);

    this.setState({ finalHTMLElement: finalHTMLElement, dom: dom });
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
    if (!this.props.elements) {
      this.props.onCreateElement(1);
      this.setState({ elementList: this.props.elements, isEditionMode: true });
      return;
    }

    this.props.onAddElement(this.props.elements.length + 1);
    this.setState({ elementList: this.props.elements, isEditionMode: true });
  };
  isEditionModeHandler = top => {
    smoothscroll.polyfill();
    const el = this.editionAreaRef.current;

    el.scroll({ top: top, left: 0, behavior: "smooth" });

    this.setState(prevState => {
      return {
        isEditionMode: !prevState.isEditionMode
      };
    });
  };
  playBtnHandler = () => {};
  nextBtnHandler = val => {
    if (this.state.editionPage === 2) {
      let arr = this.state.summaryElValue.match(/.*[^\n]/g);
      let str = "";
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          str = str + `<p>${arr[i]}</p>`;
        }
      }
      if (this.state.summaryElValue !== "") {
        this.props.onSummaryEdition(this.state.summaryElValue);
      }
    }

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

  keywordsToArr = keywords => {
    if (
      keywords.slice(keywords.length - 1, keywords.length) !== "," &&
      keywords !== ""
    ) {
      keywords = keywords + ",";
    }
    let arr =
      keywords.match(/([^,])*,/g) === null ? [] : keywords.match(/([^,])*,/g);

    let arrLen = arr.length;

    for (let i = 0; i < arrLen; i++) {
      arr[i] = arr[i].substring(0, arr[i].length - 1);
    }

    return arr;
  };

  onFileRemove = fileName => {
    this.setState(prevState => {
      let arr = prevState.fileList;
      arr = arr.filter(val => {
        return val.name !== fileName;
      });

      let arr2 = prevState.fileListNames;

      arr2 = arr2.filter(val => {
        return val !== fileName;
      });
      this.props.onAddDeleteFile(arr2);
      return { fileList: arr, fileListNames: arr2 };
    });

    // let arr = this.props.fileNames.filter((value, i, arr) => {
    //   return arr[i] !== fileName;
    // });
    // this.props.onAddDeleteFile(arr);
  };
  // uploadFileHandler = file => {
  //   this.setState(prevState => {
  //     prevState.fileList.push(file);
  //     return { fileList: prevState.fileList };
  //   });
  //   this.props.onAddFile(file);
  // };
  uploadFileHandler = file => {
    if (file) {
      this.setState(prevState => {
        for (let i = 0; i < prevState.fileListNames.length; i++) {
          if (file.name === prevState.fileListNames[i]) {
            return;
          }
        }

        prevState.fileList.push(file);
        prevState.fileListNames.push(file.name);

        this.props.onAddDeleteFile(prevState.fileListNames);
        return {
          fileList: prevState.fileList,
          fileListNames: prevState.fileListNames
        };
      });
    }
  };
  projectTitleTextInputHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  // saveProjectTitleHandler = () => {
  //   const savedText = this.state.projectTitleText;
  //   this.setState({ projectTitle: savedText });
  //   this.props.onProjectURLEdition(savedText);

  // };
  // cancelProjectTitleHandler = () => {
  //   this.props.history.push("/cms/dashboard");
  // };
  programHandler = () => {
    //hacer validaciones antes de programar post
    let date =
      this.state.dateProgram === "" || this.state.dateProgram === undefined
        ? new Date()
        : this.state.dateProgram;
    this.props.onDateEdition(date);
    let finalHTMl = this.htmlArrCosolidation(this.props.elements);
    let rawBody = "";

    let dom = this.parseHTML2Object(finalHTMl);
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].type === "tag" && dom[i].name === "p") {
        rawBody = rawBody + dom[i].children[0].data;
      }
    }

    let arr = this.keywordsToArr(this.props.seo.keywords);
    const finalPost = {
      article: {
        html: finalHTMl, //str
        author: this.props.login.loggedUserName, //str
        date: date, //date
        categories: arr, //arr
        comments: [],
        files: this.props.fileNames, //arr
        seo: {
          title: this.props.elements[0].HTMLElementContent, //str
          description: this.props.summary, //str
          keywords: arr, //arr
          structuredData: {
            //json
            "@context": "http://schema.org",
            "@type": "Article",
            headline: this.props.elements[0].HTMLElementContent, //str
            alternativeHeadline: this.props.elements[0].HTMLElementContent, //str
            image: {
              //json
              //OJO
              url:
                "http://imagenes.canalrcn.com/ImgNTN24/juan_guaido_ntn24_2.jpg?null",
              "@type": "ImageObject",
              height: "174",
              width: "310"
            },
            author: this.props.login.loggedUserName, //str
            url: `/blog/${this.props.project.url}`, //str
            datePublished: date, //date
            dateCreated: date, //date
            dateModified: date, //date
            description: this.props.summary, //str
            articleBody: rawBody, //str
            publisher: {
              //json
              "@type": "Organization",
              name: "SwordVoice.com",
              logo: {
                url: "https://www.swordvoice.com/LOGO.svg",
                type: "ImageObject"
              }
            },
            mainEntityOfPage: "https://www.SwordVoice.com"
          }
        }
      }
    };
    console.log("finalPost", finalPost);
    let dataToUpdate = {
      elements: this.props.elements,
      files: this.props.fileNames,
      keywords: this.props.seo.keywords,
      author: this.props.login.loggedUserName,
      date: date,
      html: finalHTMl,
      projectName: this.props.project.name,
      description: this.props.summary,
      title: this.props.elements[0].HTMLElementContent,
      url: this.props.project.url
    };

    axios
      .put(`/api/updatePost/${this.props.project.name}`, dataToUpdate)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    if (this.props.project.name === "") {
      return <ProjectTitle />;
    }
    const files = this.state.fileListNames.map((file, i) => {
      return (
        <React.Fragment key={i}>
          <span>{file}</span>
          <span
            onClick={() => {
              this.onFileRemove(file);
            }}
          >
            X
          </span>
        </React.Fragment>
      );
    });
    // const tags = this.tags.map((tag, i) => {
    //   let checked = false;
    //   if (this.props.seo.keywordsList.length > 0) {
    //     let arr = this.props.seo.keywordsList;
    //     for (let i = 0; i < arr.length; i++) {
    //       if (tag === arr[i]) {
    //         checked = true;
    //       }
    //     }
    //   }
    //   return (
    //     <React.Fragment key={i}>
    //       <input
    //         onChange={this.tagOptionHandler}
    //         checked={checked}
    //         type="checkbox"
    //         name="tagsList"
    //         value={tag}
    //       />
    //       {tag}
    //     </React.Fragment>
    //   );
    // });
    const elements = this.props.elements.map((element, i) => {
      return (
        <div key={i}>
          <PostElement
            HTMLid={i + 1}
            isEditionModeHandler={this.isEditionModeHandler}
            isEditionMode={this.state.isEditionMode}
            HTMLElementType={element.HTMLElementType}
            HTMLElementContent={element.HTMLElementContent}
            HTMLAtributes={element.HTMLAtributes}
            HTMLAtributesArr={element.HTMLAtributesArr}
            HTMLAtributesStr={element.HTMLAtributesStr}
            HTMLStyles={element.HTMLStyles}
            HTMLStylesStr={element.HTMLStylesStr}
            HTMLStylesArr={element.HTMLStylesArr}
            HTMLClasses={element.HTMLClasses}
            HTMLClassesArr={element.HTMLClassesArr}
            HTMLClassesStr={element.HTMLClassesStr}
            HTMLPreviewStr={element.HTMLPreviewStr}
            HTMLid={element.HTMLid}
            finalHTMLElement={element.finalHTMLElement}
            imgFile={element.imgFile}
            imgAlt={element.imgAlt}
            imgFigcaption={element.imgFigcaption}
          />
        </div>
      );
    });
    const titles = () => {
      const page = this.state.editionPage;
      let result;
      if (page === 1) {
        result = <h1>Blog Post Edition</h1>;
        return result;
      } else if (page === 2) {
        result = <h1>Summary Edition</h1>;
        return result;
      } else if (page === 3) {
        result = <h1>SEO Edition</h1>;
        return result;
      }
    };
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

            <div
              className="createBarItem"
              onClick={this.programHandler}
              style={
                this.state.editionPage > 2
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
                this.state.editionPage > 2
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
          {/* {titles()}
          <div>Project Name: {this.props.project.name}</div> */}
          <div
            style={{
              height: "90vh",
              position: "relative",
              overflow: "hidden",
              width: "80%"
            }}
          >
            {/* first page post creation */}

            <div
              className="editionArea style-7"
              ref={this.editionAreaRef}
              // onChange={this.editionAreaChangeHandler}
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
                <h2>Summary</h2>
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
                className="seoArea"
                style={
                  this.state.editionPage === 3
                    ? { animation: "editionIn 500ms ease normal forwards" }
                    : {
                        animation: "editionOut 500ms ease  normal forwards"
                      }
                }
              >
                <h2>SEO Edition</h2>

                <SeoEditor />
              </div>
            )}
          </div>

          <div>
            {/* <div className="tagList">
              <h6>Tags:</h6>
              {tags}
            </div> */}
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
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    login: state.login,
    project: state.postCreation.project,
    fileNames: state.postCreation.files,
    date: state.postCreation.date
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onCreateElement: id => dispach({ type: "CREATE_ELEMENT", id: id }),
    onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload }),
    onEditElement: payload =>
      dispach({ type: "EDIT_ELEMENT", payload: payload }),
    onDelElement: payload => dispach({ type: "DEL_ELEMENT", payload: payload }),
    onSummaryEdition: payload =>
      dispach({ type: "SUMMARY_EDITION", payload: payload }),
    // onEditSEO: payload => dispach({ type: "SEO_EDITION", payload: payload }),
    onAddDeleteFile: payload =>
      dispach({ type: "ADD_DELETE_FILE", payload: payload }),
    onDateEdition: payload =>
      dispach({ type: "DATE_EDITION", payload: payload })

    // onProjectNameEdition: payload =>
    //   dispach({ type: "PROJECT_NAME_EDITION", payload: payload }),
    // onProjectURLEdition: payload =>
    //   dispach({ type: "PROJECT_URL_EDITION", payload: payload })
  };
};

// const CreatePost2 = withRouter(CreatePost);

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CreatePost);
