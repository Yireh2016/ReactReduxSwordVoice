import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import htmlparser from "htmlparser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//css
import "./createPost.css";
//assets
import play from "../../assets/createPost/play.svg";
import tag from "../../assets/createPost/tag.svg";
import upload from "../../assets/createPost/upload.svg";
import time from "../../assets/createPost/time.svg";
import check from "../../assets/createPost/check.svg";
import plus from "../../assets/dashboard/plus.svg";
//components
import PostElement from "../postElement/postElement";
//react map
/*

DashBoard
  CreatePost

*/

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementList: [],
      isEditionMode: false,
      finalHTMLElement: "",
      dom: ""
    };
  }
  componentDidUpdate() {}
  // getDerivedStateFromProps(){

  // }
  updateStateDom = dom => {
    console.log("dom2", dom);
    this.setState({ dom: dom });
  };
  previewBtnHandler = () => {
    let updateStateDom = dom => {
      console.log("dom1", dom);
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
        console.log("dom", dom);
        updateStateDom(dom);
      }
    });
    let parser = new htmlparser.Parser(handler);
    parser.parseComplete(finalHTMLElement);

    this.setState({ finalHTMLElement: finalHTMLElement });
    window.localStorage.setItem("finalHTMLElement", finalHTMLElement);
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
    if (this.props.elements.length === 0) {
      this.props.onCreateElement(this.props.elements.length + 1);
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

  render() {
    const elements = this.props.elements.map((value, i) => {
      return (
        <div key={i}>
          <PostElement
            HTMLid={i + 1}
            isEditionModeHandler={this.isEditionModeHandler}
          />
        </div>
      );
    });
    return (
      <div>
        {/* Create Bar */}
        <div className="createBarCont">
          <div className="createBar">
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
            <div className="createBarItem">
              <h4>Add Tag</h4>
              <img src={tag} alt="add tag botton  " />
            </div>
            <div className="createBarItem">
              <h4>Upload File</h4>
              <img src={upload} alt="upload botton  " />
            </div>
            <div className="createBarItem">
              <h4>Program</h4>
              <img src={time} alt="program botton  " />
            </div>
            <div className="createBarItem">
              <h4>Publish</h4>
              <img src={check} alt="publish botton  " />
            </div>
          </div>
        </div>
        {/* Edition Area */}
        <div className="createLayout">
          <h1>Edition Area</h1>
          <div className="editionArea">
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
          <div>Tags:</div>
          <div>Available Files</div>
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
export default connect(
  mapStateToProps,
  mapDispachToProps
)(CreatePost);
