import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import is from "is_js";
import smoothscroll from "smoothscroll-polyfill";
import styled from "styled-components";
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
import ProgramEditor from "./programEditor/ProgramEditor";
import DobleTapBtn from "./doubleTapBtn/DoubleTapBtn";

//services
import paragraph from "../../../services/paragraphService";
import SeoEditor from "../seoEditor/seoEditor";
import htmlArrCosolidation from "../../../services/htmlArrConsolidation";
import parseHTML2Object from "../../../services/parseHTML2Object";
import insertIntoArr from "../../../services/insertIntoArr";
import erasePreviewDataFromElements from "../../../services/erasePreviewDataFromElements";
import uploadFileService from "../../../services/uploadFileService";

const Item = styled.div`
  @media (max-width: 700px) {
    h4 {
      font-size: 12px;
    }
    img {
      width: 12px;
    }
  }
`;
const MagicBtn = styled.div`
  position: fixed;
  z-index: 10;
  top: ${props =>
    props.isCreateBar ? "calc(50vh - 198px - 40px)" : "calc(50vh - 20px)"};
  transform: ${props =>
    props.isCreateBar ? "rotate(360deg)" : "rotate(-360deg)"};
  right: 8px;

  transition: all cubic-bezier(1, 0.19, 0.44, 1.43) 800ms;
  /* top: calc(50vh - 20px); */

  svg {
    width: 40px;
  }

  @media (min-width: 700px) {
    position: fixed;

    top: ${props =>
      props.isCreateBar ? "calc(50vh - 248px - 60px)" : "calc(50vh - 30px)"};
    right: 20px;

    svg {
      width: 60px;
    }
  }

  @media (min-width: 1050px) {
    display: none;
  }
`;

const FileListCont = styled.div`
  section {
    overflow-y: scroll;
    height: 50px;
  }
  @media (max-width: 1050px) {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  @media (max-width: 700px) {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: white;

    section {
      overflow-y: scroll;
      height: 50px;
    }
  }
`;

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
      finalHTMLElement: "",
      copiedElement: "",
      dom: "",
      scrollTopSave: "",
      isCreateBar: true
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isCreateBar === this.state.isCreateBar) {
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

    return true;
  }
  componentDidUpdate() {
    // smoothscroll.polyfill();
    // if (window.localStorage.getItem("postElTop") === "addElement") {
    //   const el = this.editionAreaRef.current;
    //   el &&
    //     el.scroll({
    //       top: el.scrollHeight,
    //       left: 0,
    //       behavior: "instant"
    //     });
    //   return;
    // }
    // if (!isNaN(parseInt(window.localStorage.getItem("postElTop")))) {
    //   const el = this.editionAreaRef.current;
    //   el &&
    //     el.scroll({
    //       top: parseInt(window.localStorage.getItem("postElTop")) - 10,
    //       left: 0,
    //       behavior: "instant"
    //     });
    // }
    // if (window.localStorage.getItem("postElTop").match(/postElement.*/g)) {
    //   const strArr = window.localStorage
    //     .getItem("postElTop")
    //     .match(/postElement.*/g);
    //   const el = this.editionAreaRef.current;
    //   el &&
    //     el.scroll({
    //       top: parseInt(window.localStorage.getItem(strArr)) - 10,
    //       left: 0,
    //       behavior: "smooth"
    //     });
    // }
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
      if (prevState.editionPage + val > 0 && prevState.editionPage + val < 6) {
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
      console.log("file uploadFileHandler", file);
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

  programPostHandler = () => {
    //nueva pagina de slide
  };

  editPostHandler = (editionType, dialogObj, programDateTime) => {
    if (this.props.project.hasChanged && editionType !== "save") {
      dialogObj = {
        title: "Save First",
        body: `Please save your changes first`,
        status: "WARN",
        show: true
      };
      this.props.setDialog(dialogObj);
      return;
    }
    this.scrollTopSaveHandler(0, 0);
    //hacer validaciones antes de programar post
    let date;
    let finalHTMl = htmlArrCosolidation(this.props.elements);
    let rawBody = "";

    let dom = parseHTML2Object(finalHTMl);
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].type === "tag" && dom[i].name === "p") {
        rawBody = rawBody + dom[i].children[0].data;
      }
    }

    const elementsArrNoPreviewData = erasePreviewDataFromElements(
      this.props.elements
    );

    let dataToUpdate;

    switch (editionType) {
      case "save":
        date = new Date(); //edition date
        this.props.onDateEdition(date);

        dataToUpdate = {
          elements: elementsArrNoPreviewData,
          files: this.props.fileNames,
          keywords: this.props.seo.keywords,
          html: finalHTMl,
          projectName: this.props.project.name,
          description: this.props.summary,
          title: this.props.elements[0].HTMLElementContent,
          url: this.props.project.url,
          thumbnail: this.props.thumbnail,

          editionHistory: {
            editor: this.props.login.loggedFullName,
            date,
            wasPublished: this.props.postCreation.isPublished
          }
        };

        dialogObj = {
          title: "Success",
          body: `Your post has been saved`,
          status: "OK",
          show: true
        };
        break;

      case "unpublish":
        dataToUpdate = {
          isPublished: false
        };
        dialogObj = {
          title: "Success",
          body: `Your post has been unpublished`,
          status: "OK",
          show: true
        };
        break;

      case "program":
        date = programDateTime; //program date
        this.props.onDateProgram(date);
        dataToUpdate = {
          elements: elementsArrNoPreviewData,
          files: this.props.fileNames,
          keywords: this.props.seo.keywords,
          html: finalHTMl,
          projectName: this.props.project.name,
          description: this.props.summary,
          title: this.props.elements[0].HTMLElementContent,
          url: this.props.project.url,
          thumbnail: this.props.thumbnail,

          programDate: date,
          date: null,
          isPublished: false
        };
        break;

      case "publish":
        date = new Date(); //edition date
        this.props.onDatePublish(date);
        dataToUpdate = {
          elements: elementsArrNoPreviewData,
          files: this.props.fileNames,
          keywords: this.props.seo.keywords,
          html: finalHTMl,
          projectName: this.props.project.name,
          description: this.props.summary,
          title: this.props.elements[0].HTMLElementContent,
          url: this.props.project.url,
          thumbnail: this.props.thumbnail,

          date: date,
          isPublished: true
        };

        dialogObj = {
          title: "Congratulations!!!",
          body: `Your post has been published`,
          status: "OK",
          show: true
        };
        break;

      default:
        break;
    }

    //debo almacenar el id del autor
    axios
      .put(`/api/updatePost/${this.props.project.name}`, dataToUpdate)
      .then(() => {
        console.log(
          `
        {
          url: dataToUpdate.url,
          files: dataToUpdate.files
        }\n
        `,
          {
            url: dataToUpdate.url,
            files: dataToUpdate.files
          }
        );
        axios
          .post("https://cdn.swordvoice.com/cdn/deleteFiles/", {
            url: dataToUpdate.url,
            files: dataToUpdate.files
          })
          .then(() => {
            console.log("files erased");
          });
        this.props.setDialog(dialogObj);

        if (editionType !== "save") {
          this.props.history.push("/cms/adminPost");
          this.props.onMenuChange({
            main: true,
            create: false,
            exitBtn: ["Blog", "Home", "Log Out"]
          });
        }
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
  exitBtnHandler = () => {
    this.props.onMenuChange({
      main: true,
      create: false,
      exitBtn: ["Blog", "Home", "Log Out"]
    });
    if (!this.props.project.hasChanged) {
      //ojo con state ispostsaved eliminar
      //si no hay cambios ve a adminpost
      this.props.history.push("/cms/adminPost");
    } else {
      this.props.showExitModalHandler({ show: true, url: "/cms/adminPost" });
    }
  };

  render() {
    if (this.props.project.name === "") {
      return <ProjectTitle exitBtnHandler={this.exitBtnHandler} />;
    }
    const files = this.props.fileNames.map((file, i) => {
      return (
        <div key={i}>
          <span onClick={this.fileNameCopyHandler} className="fileTitle">
            {file}
          </span>
          <span
            style={{
              fontWeight: "bold",
              color: "red"
            }}
            className="fileDelete"
            onClick={() => {
              this.onFileRemove(file);
            }}
          >
            X
          </span>
        </div>
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
        <Item
          className="createBarItem"
          onClick={() => {
            this.exitBtnHandler(history);
          }}
        >
          <h4>Exit</h4>
          <img src={exit} alt="Exit botton" />
        </Item>
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

        <MagicBtn
          isCreateBar={this.state.isCreateBar}
          onClick={() => {
            this.setState(prevState => {
              return {
                isCreateBar: !prevState.isCreateBar
              };
            });
          }}
        >
          <DobleTapBtn />
        </MagicBtn>

        {/* Create Bar */}
        <div className="createBarCont">
          <div
            className="createBar"
            style={{
              visibility: this.state.isEditionMode ? "hidden" : "visible",
              transform: this.state.isCreateBar
                ? "translateX(0%)"
                : "translateX(100%)",
              transition: "all ease 500ms"
            }}
          >
            <Item className="createBarItem">
              <Link
                onClick={this.previewBtnHandler}
                rel="noopener"
                target="_blank"
                to={{
                  pathname: "/cms/preview",
                  search: `${cssURL}`
                }}
              >
                <h4>Preview</h4>
                <img src={play} alt="preview botton  " />
              </Link>
            </Item>
            <Item
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
            </Item>
            <Item
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
            </Item>
            <Item
              className="createBarItem"
              onClick={() => {
                this.nextBtnHandler(1);
              }}
              style={
                this.state.editionPage > 3
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <h4>Program</h4>
              <img src={time} alt="program botton  " />
            </Item>
            {!this.props.postCreation.isPublished && (
              <Item
                className="createBarItem"
                onClick={() => {
                  this.editPostHandler("publish");
                }}
                style={
                  this.state.editionPage === 4
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              >
                <h4>Publish</h4>
                <img src={check} alt="publish botton  " />
              </Item>
            )}
            {this.props.postCreation.isPublished && (
              <Item
                className="createBarItem"
                onClick={() => {
                  this.editPostHandler("unpublish");
                }}
                style={
                  this.state.editionPage === 4
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              >
                <h4>Unpublish</h4>
                <img src={exit} alt="publish botton  " />
              </Item>
            )}

            <Item
              style={
                this.props.project.hasChanged && !this.state.isEditionMode
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className="createBarItem"
              onClick={() => {
                this.editPostHandler("save");
              }}
            >
              <h4>Save</h4>

              <img src={save} alt="save botton  " className="saveAnimation" />
            </Item>

            <Item
              style={
                this.state.editionPage < 4 && !this.state.isEditionMode
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
            </Item>

            <Item
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
            </Item>
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
              {this.state.editionPage === 5 && (
                <div
                  className=" seoArea"
                  style={
                    this.state.editionPage === 5
                      ? { animation: "editionIn 500ms ease normal forwards" }
                      : {
                          animation: "editionOut 500ms ease  normal forwards"
                        }
                  }
                >
                  <h2>Program Article Post </h2>

                  <ProgramEditor editPostHandler={this.editPostHandler} />
                </div>
              )}
            </div>

            <FileListCont>
              {/* <div className="tagList">
              <h6>Tags:</h6>
              {tags}
            </div> */}
              <div className="fileList">
                <h6>Available Files: </h6>
                <section>{files}</section>
              </div>
            </FileListCont>
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
const mapDispachToProps = dispatch => {
  return {
    //acciones
    onCreateElement: id => dispatch({ type: "CREATE_ELEMENT", id: id }),
    onAddElement: payload =>
      dispatch({ type: "ADD_ELEMENT", payload: payload }),
    onEditElement: payload =>
      dispatch({ type: "EDIT_ELEMENT", payload: payload }),
    onDelElement: payload =>
      dispatch({ type: "DEL_ELEMENT", payload: payload }),
    onSummaryEdition: payload =>
      dispatch({ type: "SUMMARY_EDITION", payload: payload }),
    onAddDeleteFile: payload =>
      dispatch({ type: "ADD_DELETE_FILE", payload: payload }),
    onDateEdition: date => dispatch({ type: "DATE_EDITION", payload: date }),
    onDateProgram: date =>
      dispatch({ type: "SET_PROGRAM_DATE", payload: date }),
    onDatePublish: date =>
      dispatch({ type: "PUBLISH_POST_DATE", payload: date }),
    onSave: () => dispatch({ type: "SAVE_POST" }),
    onProjectChange: () => dispatch({ type: "CHANGE_PROJECT" }),
    onMenuChange: payload =>
      dispatch({ type: "CHANGE_MENU", payload: payload }),

    setDialog: dialog => dispatch({ type: "SET_DIALOG", payload: dialog })
  };
};

// const CreatePost2 = withRouter(CreatePost);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispachToProps
  )(CreatePost)
);
