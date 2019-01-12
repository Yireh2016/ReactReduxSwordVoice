import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//css
import "./dashboard.css";
//assets
import avatar from "../../../app.client/assets/img/general/userLogo.svg";
import plus from "../../assets/dashboard/plus.svg";
import exit from "../../assets/dashboard/exit.svg";
import hamburger from "../../assets/dashboard/hamburger.svg";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (sessionStorage.getItem("userName")) {
      const sessionData = {
        loggedUserAvatar: sessionStorage.getItem("userAvatar"),
        loggedUserName: sessionStorage.getItem("userName")
      };
      this.props.onLogIn(sessionData);
    }
  }
  logoutHandler = () => {
    sessionStorage.removeItem("userAvatar");
    sessionStorage.removeItem("userName");
    this.props.onLogOut();
  };
  render() {
    if (this.props.isUserLoggedIn) {
      return (
        <div className="dashboardLayout">
          <aside className="dashAside">
            <div className="dashAvatar">
              <p>
                Welcome <span>{this.props.loggedUserName}</span>
              </p>
              <div>
                <div
                  className="dashAvatarImg"
                  style={{
                    backgroundSize: "cover",
                    borderRadius: "100%",

                    backgroundImage: `url('data:image/jpeg;base64,${
                      this.props.loggedUserAvatar
                    }`
                  }}
                />
              </div>
            </div>
            <div className="dashCreatePost">
              <button>
                <span>Create Post</span> <img src={plus} alt="Plus" />
              </button>
            </div>
            <div className="dashMenu">
              <div>
                <p>Administration</p> <img src={hamburger} alt="hamburger" />
              </div>
              <div>
                <p>Stats</p>
                <img src={hamburger} alt="hamburger" />
              </div>
            </div>
            <div className="dashLogOut">
              <div>
                <button onClick={this.logoutHandler}>
                  <span>Log Out</span>
                  <img src={exit} alt="Exit" />
                </button>
              </div>
            </div>
          </aside>
          <section className="dashMain">hola section</section>
        </div>
      );
    }

    return <Redirect to="/cms" />;
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
    onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload }),
    onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};

const Dashboard2 = connect(
  mapStateToProps,
  mapDispachToProps
)(Dashboard);

export default withCookies(Dashboard2);
