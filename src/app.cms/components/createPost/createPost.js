import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
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
    this.state = { elementList: [] };
  }
  addElementBtnHandler = () => {
    let arr = this.state.elementList;

    arr.push(arr.length);

    this.setState({ elementList: arr });
  };

  render() {
    // const CompenentTest = () => {
    //   return <div className="elementCont">hola mundo2</div>;
    // };
    // const elementsArr = [
    //   [`<div className='elementCont'>hola mundo <CompenentTest/></div>`]
    // ];
    const elements = this.state.elementList.map((value, i) => {
      return (
        <div key={i}>
          <PostElement HTMLid={i + 1} />
        </div>
      );
    });

    return (
      <div>
        {/* Create Bar */}
        <div className="createBarCont">
          <div className="createBar">
            <div className="createBarItem">
              <h4>Preview</h4>
              <img src={play} alt="preview botton  " />
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
          <div className="editionArea">
            <h1>edition Area</h1>
            {elements}
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <button
                onClick={this.addElementBtnHandler}
                className="addElementBtn"
                // style={
                //   this.state.isEditionMode
                //     ? { visibility: "hidden" }
                //     : { visibility: "visible" }
                // }
              >
                <span>Add Element</span>
                <img src={plus} title="add element" alt="add Element button" />
              </button>
            </div>
          </div>
          <div>Tags:</div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
