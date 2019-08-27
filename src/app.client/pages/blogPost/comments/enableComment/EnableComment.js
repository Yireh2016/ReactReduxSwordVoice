import React, { Component } from "react";
import { connect } from "react-redux";

import "./enableComment.css";

class EnableComment extends Component {
  render() {
    return (
      <div className="contSignCard">
        <div className="signInCard">
          <p>
            Ups!!! it seems you are not logged in already. Please,{" "}
            <span className="cardLink">Log in</span> or{" "}
            <span className="cardLink">Sign Up</span> to enable comments:
          </p>
          <div className="signInButtonCont">
            <button
              className="signButton"
              type="button"
              onClick={() => {
                this.props.setSignUp(true);
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                this.props.setLogIn(true);
              }}
              className="logButton"
              type="button"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps2 = () => {
  return {};
};

const mapActionsToProps = dispatch => {
  return {
    setSignUp: isSignUp =>
      dispatch({ type: "SET_SHOW_SIGNUP", payload: isSignUp }),
    setLogIn: isLogIn => dispatch({ type: "SET_SHOW_LOGIN", payload: isLogIn })
  };
};

export default connect(
  mapStateToProps2,
  mapActionsToProps
)(EnableComment);
