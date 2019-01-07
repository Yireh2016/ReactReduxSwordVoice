import React, { Component } from "react";
import { connect } from "react-redux";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.isUserLoggedIn) {
      return <div>Estas en dashboard ...Bienvenido</div>;
    }

    return (
      <div>
        Please Log In <a href="/cms">here</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUserName: state.loggedUserName,
    isUserLoggedIn: state.isUserLoggedIn,
    loggedUserAvatar: state.loggedUserAvatar
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Dashboard);
