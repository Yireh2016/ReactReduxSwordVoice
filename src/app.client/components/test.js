import React, { Component } from "react";
import { connect } from "react-redux";

const Test = props => {
  return (
    <div>
      <h1>Test</h1>
      <button onClick={props.onLogIn}>
        Action dispach {`${props.LoggedIn}`}
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  console.log("mapStateToProps state", state);
  return {
    LoggedIn: state.isUserLoggedIn
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: () => dispach({ type: "LOGGED_IN" }),
    onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Test);
