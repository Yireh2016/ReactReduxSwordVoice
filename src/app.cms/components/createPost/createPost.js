import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//css
import "./createPost.css";
//assets
import play from "../../assets/createPost/play.svg";
import tag from "../../assets/createPost/tag.svg";
import time from "../../assets/createPost/time.svg";
import check from "../../assets/createPost/check.svg";
import plus from "../../assets/dashboard/plus.svg";
//components
import PostElement from "../postElement/postElement";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementList: [],
      isEditionMode: false,
      finalHTMLElement: ""
    };
  }
  componentDidUpdate() {}
  // getDerivedStateFromProps(){

  // }

  previewBtnHandler = () => {
    console.log("this.props.elements", this.props.elements);

    let arrElements = this.props.elements;
    console.log("arr", arrElements);

    let finalHTMLElement = "";
    for (let i = 0; i < arrElements.length; i++) {
      console.log("arrElements dentro del for", arrElements);
      console.log(`arrElements[${i}]`, arrElements[i]);
      console.log("arrElements[0]", arrElements[0]);
      finalHTMLElement =
        finalHTMLElement + " " + arrElements[i].finalHTMLElement;
      console.log("finalHTMLElement i", finalHTMLElement);
    }

    console.log("fuera del for arrElements", arrElements);

    this.setState({ finalHTMLElement: finalHTMLElement });
    window.localStorage.setItem("finalHTMLElement", finalHTMLElement);
  };
  commitBtnHandler = () => {
    console.log("this.props.elements", this.props.elements);

    let arrElements = this.props.elements;
    console.log("arr", arrElements);

    let finalHTMLElement = "";
    for (let i = 0; i < arrElements.length; i++) {
      console.log("arrElements dentro del for", arrElements);
      console.log(`arrElements[${i}]`, arrElements[i]);
      console.log("arrElements[0]", arrElements[0]);
      finalHTMLElement =
        finalHTMLElement + " " + arrElements[i].finalHTMLElement;
      console.log("finalHTMLElement i", finalHTMLElement);
    }

    console.log("fuera del for arrElements", arrElements);

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
    console.log("this.props on render", this.props);

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
    console.log("elements", elements);
    return (
      <div>
        {/* Create Bar */}
        <div className="createBarCont">
          <div className="createBar">
            <div className="createBarItem" onClick={this.playBtnHandler}>
              <h4>Preview</h4>
              <Link
                onClick={this.previewBtnHandler}
                // to={{ pathname: "/cms/preview", state: this.state.finalJSX }}
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
              <img src={tag} alt="preview botton  " />
            </div>
            <div className="createBarItem">
              <h4>Program</h4>
              <img src={time} alt="preview botton  " />
            </div>
            <div className="createBarItem">
              <h4>Publish</h4>
              <img src={check} alt="preview botton  " />
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
