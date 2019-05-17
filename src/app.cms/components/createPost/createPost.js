import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
import save from "../../assets/createPost/save.svg";
import exit from "../../assets/createPost/exit.svg";
//components
import PostElement from "../postElement/postElement";
import PostElementPreview from "../postElement/postElementPreview";
import ProjectTitle from "../projectTitle/projectTitle";
import ThumbNailEditor from "../thumbnailEditor/thumbnailEditor";

//services
import paragraph from "../../../services/paragraphService";
import SeoEditor from "../seoEditor/seoEditor";
import keywordsToArr from "../../../services/keywordsToArr";
import htmlArrCosolidation from "../../../services/htmlArrConsolidation";
import parseHTML2Object from "../../../services/parseHTML2Object";
import insertIntoArr from "../../../services/insertIntoArr";
import erasePreviewDataFromElements from "../../../services/erasePreviewDataFromElements";
import uploadFileService from "../../../services/uploadFileService";

//props list
//showExitModalHandler tells component dashbord to set exit modal
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
      dateProgram: this.props.date,
      finalHTMLElement: "",
      copiedElement: "",
      dom: "",
      scrollTopSave: ""
    };
    window.localStorage.setItem("postActiveElID", "");
    window.localStorage.setItem("postElTop", "");
  }

  // kick off the polyfill!
  componentDidMount() {
    window.addEventListener("beforeunload", e => {
      this.leavePageHandler(e);
    });

    if (this.state.elementList.length === 0) {
      this.addElementBtnHandler();
      this.setState({ isEditionMode: true });
      return;
    }
  }

  componentDidUpdate() {
    smoothscroll.polyfill();

    if (window.localStorage.getItem("postElTop") === "addElement") {
      const el = this.editionAreaRef.current;
      el &&
        el.scroll({
          top: el.scrollHeight,
          left: 0,
          behavior: "instant"
        });
      return;
    }
    if (!isNaN(parseInt(window.localStorage.getItem("postElTop")))) {
      const el = this.editionAreaRef.current;
      el &&
        el.scroll({
          top: parseInt(window.localStorage.getItem("postElTop")) - 10,
          left: 0,
          behavior: "instant"
        });
    }
    if (window.localStorage.getItem("postElTop").match(/postElement.*/g)) {
      const strArr = window.localStorage
        .getItem("postElTop")
        .match(/postElement.*/g);
      const el = this.editionAreaRef.current;
      el &&
        el.scroll({
          top: parseInt(window.localStorage.getItem(strArr)) - 10,
          left: 0,
          behavior: "smooth"
        });
    }
  }

  leavePageHandler = e => {
    if (!this.props.project.hasChanged) {
      // e.returnValue = "Are you sure you want to leave the page withou save?";
      return;
    } else {
      e.preventDefault();
      // // Chrome requires returnValue to be set
      e.returnValue = "Are you sure you want to leave the page withou save?";
    }
  };

  previewBtnHandler = () => {
    let finalHTMLElement = htmlArrCosolidation(this.props.elements);

    let dom = parseHTML2Object(finalHTMLElement);

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
  addElementBtnHandler = id => {
    window.localStorage.setItem("postElTop", "addElement");
    if (this.props.elements.length === 0) {
      this.props.onCreateElement(1);
      this.setState({
        elementList: this.props.elements,
        isEditionMode: true,
        copiedElement: ""
      });
      return;
    }

    const newElement = {
      HTMLElementType: "",
      HTMLElementContent: "",
      HTMLAtributes: "",
      HTMLAtributesArr: [],
      HTMLAtributesStr: "",
      finalJSXElement: "",
      HTMLStyles: "",
      HTMLStylesStr: "",
      HTMLStylesArr: [],
      HTMLClasses: "",
      HTMLClassesArr: [],
      HTMLClassesStr: "",
      HTMLid: id + 1 //id:3
    };
    let arr = this.props.elements;
    arr = insertIntoArr(arr, id, newElement);

    for (let i = id + 1; i < arr.length; i++) {
      //id: htmlid del elemento previo al nuevo que deseo ingresar
      arr[i].HTMLid = i + 1;
    }

    window.localStorage.setItem("postActiveElID", id + 1);
    this.setState({
      elementList: arr,
      isEditionMode: true,
      copiedElement: newElement
    });
    this.props.onAddElement(arr);
  };
  postObjectManipulation = readOnlyObj => {
    const {
      isEditionMode,
      HTMLElementType,
      HTMLElementContent,
      HTMLAtributes,
      HTMLAtributesArr,
      HTMLAtributesStr,
      HTMLStyles,
      HTMLStylesStr,
      HTMLStylesArr,
      HTMLClasses,
      HTMLClassesArr,
      HTMLClassesStr,
      HTMLPreviewStr,
      HTMLid,
      finalHTMLElement,
      imgFile,
      imgAlt,
      imgFigcaption
    } = readOnlyObj;

    let newObj = {
      isEditionMode,
      HTMLElementType,
      HTMLElementContent,
      HTMLAtributes,
      HTMLAtributesArr,
      HTMLAtributesStr,
      HTMLStyles,
      HTMLStylesStr,
      HTMLStylesArr,
      HTMLClasses,
      HTMLClassesArr,
      HTMLClassesStr,
      HTMLPreviewStr,
      HTMLid,
      finalHTMLElement,
      imgFile,
      imgAlt,
      imgFigcaption
    };

    newObj.HTMLPreviewStr = "HTMLPreviewStr";
    return newObj;
  };
  editionBtnHandler = postState => {
    this.setState(prevState => {
      return {
        isEditionMode: !prevState.isEditionMode,
        copiedElement: postState
      };
    });
  };
  nextBtnHandler = val => {
    this.setState(prevState => {
      if (prevState.editionPage + val > 0 && prevState.editionPage + val < 5) {
        return { editionPage: prevState.editionPage + val };
      }
    });
  };
  summaryElHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
    this.props.onSummaryEdition(value);
    if (!this.props.project.hasChanged) {
      this.props.onProjectChange();
    }
  };

  onFileRemove = fileName => {
    // const deleteObj = { filename: fileName, url: this.props.project.url };

    let arr2 = this.props.fileNames;
    arr2 = arr2.filter(val => {
      return val !== fileName;
    });
    this.props.onAddDeleteFile(arr2);

    alert(`file deleted`);
  };

  uploadFileHandler = (e, oldFileName) => {
    if (e.target.files[0]) {
      this.props.onProjectChange(); //on image change
      const file = e.target.files[0];
      // for (let i = 0; i < this.props.fileNames.length; i++) {
      //   if (file.name === this.props.fileNames[i]) {
      //     return;
      //   }
      // }

      let fileNamesArr = this.props.fileNames;
      if (file.name !== oldFileName) {
        fileNamesArr = fileNamesArr.filter(fileName => {
          return fileName !== oldFileName;
        });
      }
      fileNamesArr.push(file.name);
      // this.props.onAddDeleteFile(fileNamesArr)
      const successUpload = fileNamesArr => {
        this.props.onAddDeleteFile(fileNamesArr);
      };
      const dataToUploadFromFile = {
        file: file,
        name: file.name,
        url: this.props.project.url
      };
      uploadFileService(dataToUploadFromFile, () => {
        successUpload(fileNamesArr);
      });
    }
  };

  projectTitleTextInputHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  programHandler = () => {
    this.scrollTopSaveHandler(0, 0);
    //hacer validaciones antes de programar post
    let date =
      this.state.dateProgram === "" || this.state.dateProgram === undefined
        ? new Date()
        : this.state.dateProgram;
    this.props.onDateEdition(date);
    let finalHTMl = htmlArrCosolidation(this.props.elements);
    let rawBody = "";

    let dom = parseHTML2Object(finalHTMl);
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].type === "tag" && dom[i].name === "p") {
        rawBody = rawBody + dom[i].children[0].data;
      }
    }

    let arr = keywordsToArr(this.props.seo.keywords);
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
    const elementsArrNoPreviewData = erasePreviewDataFromElements(
      this.props.elements
    );
    let dataToUpdate = {
      elements: elementsArrNoPreviewData,
      files: this.props.fileNames,
      keywords: this.props.seo.keywords,
      author: this.props.login.loggedUserID,
      date: date,
      html: finalHTMl,
      projectName: this.props.project.name,
      description: this.props.summary,
      title: this.props.elements[0].HTMLElementContent,
      url: this.props.project.url,
      thumbnail: this.props.thumbnail
    };
    //debo almacenar el id del autor
    axios
      .put(`/api/updatePost/${this.props.project.name}`, dataToUpdate)
      .then(res => {
        console.log("res", res);
        this.props.onSave();
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  fileNameCopyHandler = e => {
    const filename = e.target.innerText;
    navigator.clipboard
      .writeText(`/uploads/${this.props.project.url}/${filename}`)
      .then(() => {
        alert(`/uploads/${this.props.project.url}/${filename} on clipboard`);
      });
  };
  testHandler = () => {
    this.setState(prevState => {
      return { isEditionMode: !prevState.isEditionMode };
    });
  };
  scrollTopSaveHandler = (top, id) => {
    window.localStorage.setItem("postElTop", top);
    window.localStorage.setItem("postActiveElID", id);
  };
  exitBtnHandler = history => {
    this.props.onMenuChange({ main: true, create: false });
    if (!this.props.project.hasChanged) {
      //ojo con state ispostsaved eliminar
      //si no hay cambios ve a adminpost
      history.push("/cms/dashboard");
    } else {
      this.props.showExitModalHandler({ show: true, url: "/cms/dashboard" });
    }
  };

  render() {
    if (this.props.project.name === "") {
      return <ProjectTitle exitBtnHandler={this.exitBtnHandler} />;
    }
    const files = this.props.fileNames.map((file, i) => {
      return (
        <React.Fragment key={i}>
          <span onClick={this.fileNameCopyHandler} className="fileTitle">
            {file}
          </span>
          <span
            className="fileDelete"
            onClick={() => {
              this.onFileRemove(file);
            }}
          >
            X
          </span>
        </React.Fragment>
      );
    });
    const elements = this.props.elements.map((element, i) => {
      let selectedStyle = {};
      const postref = `${element.HTMLid}`;
      const id = parseInt(window.localStorage.getItem("postActiveElID"));
      if (i === id - 1) {
        selectedStyle = { background: "white" };
      }
      return (
        <div key={i}>
          <PostElementPreview
            ref={`postEl${postref}`}
            style={selectedStyle}
            HTMLid={i + 1}
            editionBtnHandler={this.editionBtnHandler}
            scrollTopSaveHandler={this.scrollTopSaveHandler}
            inputSelectHTMLHandler={this.inputSelectHTMLHandler}
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

          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {!this.state.isEditionMode && (
              <button
                onClick={() => {
                  this.addElementBtnHandler(i + 1);
                }}
                className="addElementBtn"
              >
                <span>Add Element</span>
                <img src={plus} title="add element" alt="add Element button" />
              </button>
            )}
          </div>
        </div>
      );
    });

    const ExitBtn = withRouter(({ history }) => {
      return (
        <div
          className="createBarItem"
          onClick={() => {
            this.exitBtnHandler(history);
          }}
        >
          <h4>Exit</h4>
          <img src={exit} alt="Exit botton" />
        </div>
      );
    });
    const cssURL = this.props.project.url;
    return (
      <div style={{ position: "relative" }}>
        {/* Edition Area  */}
        {this.state.isEditionMode && (
          <div className="createDarkLayout">
            {this.state.copiedElement === "" ? (
              <PostElement
                className="postElementDarkLayout style-7"
                editionBtnHandler={this.editionBtnHandler}
                inputSelectHTMLHandler={this.inputSelectHTMLHandler}
                uploadFileHandler={this.uploadFileHandler}
                isEditionMode={this.state.isEditionMode}
                HTMLElementType={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLElementType
                }
                HTMLElementContent={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLElementContent
                }
                HTMLAtributes={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLAtributes
                }
                HTMLAtributesArr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLAtributesArr
                }
                HTMLAtributesStr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLAtributesStr
                }
                HTMLStyles={
                  this.props.elements[this.props.elements.length - 1].HTMLStyles
                }
                HTMLStylesStr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLStylesStr
                }
                HTMLStylesArr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLStylesArr
                }
                HTMLClasses={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLClasses
                }
                HTMLClassesArr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLClassesArr
                }
                HTMLClassesStr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLClassesStr
                }
                HTMLPreviewStr={
                  this.props.elements[this.props.elements.length - 1]
                    .HTMLPreviewStr
                }
                HTMLid={
                  this.props.elements[this.props.elements.length - 1].HTMLid
                }
                finalHTMLElement={
                  this.props.elements[this.props.elements.length - 1]
                    .finalHTMLElement
                }
                imgFile={
                  this.props.elements[this.props.elements.length - 1].imgFile
                }
                imgAlt={
                  this.props.elements[this.props.elements.length - 1].imgAlt
                }
                imgFigcaption={
                  this.props.elements[this.props.elements.length - 1]
                    .imgFigcaption
                }
              />
            ) : (
              <PostElement
                className="postElementDarkLayout style-7"
                editionBtnHandler={this.editionBtnHandler}
                inputSelectHTMLHandler={this.inputSelectHTMLHandler}
                uploadFileHandler={this.uploadFileHandler}
                isEditionMode={this.state.isEditionMode}
                HTMLElementType={this.state.copiedElement.HTMLElementType}
                HTMLElementContent={this.state.copiedElement.HTMLElementContent}
                HTMLAtributes={this.state.copiedElement.HTMLAtributes}
                HTMLAtributesArr={this.state.copiedElement.HTMLAtributesArr}
                HTMLAtributesStr={this.state.copiedElement.HTMLAtributesStr}
                HTMLStyles={this.state.copiedElement.HTMLStyles}
                HTMLStylesStr={this.state.copiedElement.HTMLStylesStr}
                HTMLStylesArr={this.state.copiedElement.HTMLStylesArr}
                HTMLClasses={this.state.copiedElement.HTMLClasses}
                HTMLClassesArr={this.state.copiedElement.HTMLClassesArr}
                HTMLClassesStr={this.state.copiedElement.HTMLClassesStr}
                HTMLPreviewStr={this.state.copiedElement.HTMLPreviewStr}
                HTMLid={this.state.copiedElement.HTMLid}
                finalHTMLElement={this.state.copiedElement.finalHTMLElement}
                imgFile={this.state.copiedElement.imgFile}
                imgAlt={this.state.copiedElement.imgAlt}
                imgFigcaption={this.state.copiedElement.imgFigcaption}
              />
            )}
          </div>
        )}

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
            <div className="createBarItem">
              <Link
                onClick={this.previewBtnHandler}
                target="_blank"
                to={{
                  pathname: "/cms/preview",
                  search: `${cssURL}`
                }}
              >
                <h4>Preview</h4>
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
                  this.uploadFileHandler(e);
                }}
              />
              <img src={upload} alt="upload botton  " />
            </div>
            <div
              className="createBarItem"
              onClick={() => {
                this.addElementBtnHandler(this.props.elements.length);
              }}
              style={
                this.state.editionPage < 2 && !this.state.isEditionMode
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <h4>Add Element</h4>
              <img src={plus} alt="Add Element botton  " />
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
              style={
                this.props.project.hasChanged && !this.state.isEditionMode
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className="createBarItem"
              onClick={() => {
                this.programHandler();
              }}
            >
              <h4>Save</h4>

              <img src={save} alt="save botton  " className="saveAnimation" />
            </div>

            <div
              style={
                this.state.editionPage !== 4 && !this.state.isEditionMode
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className="createBarItem"
              onClick={() => {
                this.nextBtnHandler(1);
              }}
            >
              <h4>Next</h4>
              <img src={next} alt="Next botton  " />
            </div>

            <div
              style={
                this.state.editionPage !== 1
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className="createBarItem"
              onClick={() => {
                this.nextBtnHandler(-1);
              }}
            >
              <h4>Back</h4>
              <img src={back} alt="Next botton  " />
            </div>
            <ExitBtn />
          </div>
        </div>
        {/* Edition Area */}
        {!this.state.isEditionMode && (
          <div className="createLayout">
            <div className="createCont">
              {/* first page post creation */}

              <div
                className="editionArea style-7"
                onWheel={e => {
                  e.stopPropagation();
                }}
                ref={this.editionAreaRef}
                style={
                  this.state.editionPage === 1
                    ? { animation: "editionIn 500ms ease normal forwards" }
                    : {
                        animation: "editionOut 500ms ease  normal forwards"
                      }
                }
              >
                {elements}
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

              {/* Fourth page thumbNail creation */}
              {this.state.editionPage === 4 && (
                <div
                  className="thumbnail seoArea"
                  style={
                    this.state.editionPage === 4
                      ? { animation: "editionIn 500ms ease normal forwards" }
                      : {
                          animation: "editionOut 500ms ease  normal forwards"
                        }
                  }
                >
                  <h2>ThumbNail Edition </h2>

                  <ThumbNailEditor />
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
        )}
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
    date: state.postCreation.date,
    postCreation: state.postCreation,
    thumbnail: state.postCreation.thumbnail
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
    onAddDeleteFile: payload =>
      dispach({ type: "ADD_DELETE_FILE", payload: payload }),
    onDateEdition: payload =>
      dispach({ type: "DATE_EDITION", payload: payload }),
    onSave: () => dispach({ type: "SAVE_POST" }),
    onProjectChange: () => dispach({ type: "CHANGE_PROJECT" }),
    onMenuChange: payload => dispach({ type: "CHANGE_MENU", payload: payload })
  };
};

// const CreatePost2 = withRouter(CreatePost);

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CreatePost);
