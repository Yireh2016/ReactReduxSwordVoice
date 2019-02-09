import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//components
import Welcome from "../welcome/welcome";
import CreatePost from "../createPost/createPost";
import AdminPost from "../adminPost/adminPost";

//css
import "./dashboard.css";
//assets
import plus from "../../assets/dashboard/plus.svg";
import exit from "../../assets/dashboard/exit.svg";
import hamburger from "../../assets/dashboard/hamburger.svg";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: true,
      toogleAdmin: false,
      adminMenuH: 0,
      toogleStats: false
    };
    this.adminMenu = React.createRef();
    this.statsMenu = React.createRef();
  }

  logoutHandler = () => {
    console.log("removiendo cookie de session");
    this.props.cookies.remove("sessionId");
    window.localStorage.removeItem("userAvatar");
    this.props.onLogOut();
  };

  toogleClickHandler = () => {
    this.setState(prevState => {
      return { isMenu: !prevState.isMenu };
    });
  };

  adminClickHandler = () => {
    const adminMenuH = this.adminMenu.current.clientHeight;
    this.setState(prevState => {
      return {
        toogleAdmin: !prevState.toogleAdmin,
        adminMenuH: adminMenuH,
        toogleStats: false
      };
    });
  };
  statsClickHandler = () => {
    const statsMenuH = this.statsMenu.current.clientHeight;
    this.setState(prevState => {
      return {
        toogleStats: !prevState.toogleStats,
        statsMenuH: statsMenuH,
        toogleAdmin: false
      };
    });
  };
  render() {
    if (this.props.isUserLoggedIn) {
      const CreatePostBtn = withRouter(({ history }) => {
        return (
          <button
            className="cmsBtn"
            onClick={() => {
              if (window.location.pathname === "/cms/dashboard/createPost")
                return;
              history.push("/cms/dashboard/createPost");
            }}
          >
            <span>Create Post</span> <img src={plus} alt="Plus" />
          </button>
        );
      });

      const AdminPostBtn = withRouter(({ history }) => {
        return (
          <li
            onClick={() => {
              if (window.location.pathname === "/cms/dashboard/adminPost")
                return;
              history.push("/cms/dashboard/adminPost");
            }}
          >
            Post
          </li>
        );
      });

      return (
        <div
          className="dashboardLayout"
          style={
            this.state.isMenu
              ? { transform: "translate(0)" }
              : {
                  transform: "translate(-20%)"
                }
          }
        >
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
              <CreatePostBtn />
            </div>
            <div className="dashMenu">
              <div className="dashMenuAdmin" onClick={this.adminClickHandler}>
                <p>Administration</p>
                <img src={hamburger} alt="hamburger" />
              </div>

              <div
                className="dashMenuDesplegable"
                style={
                  this.state.toogleAdmin
                    ? { height: `${this.state.adminMenuH}px` }
                    : { height: "0" }
                }
              >
                <ul
                  ref={this.adminMenu}
                  style={
                    // this.state.toogleAdmin ? { top: "0" } : { top: "100%" }
                    { top: "0" }
                  }
                >
                  <li>Profiles</li>

                  <AdminPostBtn />

                  <li>Users</li>
                </ul>
              </div>

              <div className="dashMenuAdmin" onClick={this.statsClickHandler}>
                <p>Stats</p>
                <img src={hamburger} alt="hamburger" />
              </div>
              <div
                className="dashMenuDesplegable"
                style={
                  this.state.toogleStats
                    ? { height: `${this.state.statsMenuH}px` }
                    : { height: "0" }
                }
              >
                <ul
                  ref={this.statsMenu}
                  style={
                    // this.state.toogleAdmin ? { top: "0" } : { top: "100%" }
                    { top: "0" }
                  }
                >
                  <li>Search Data</li>

                  <li>Interest Data</li>

                  <li>Users Data</li>
                </ul>
              </div>
            </div>
            <div className="dashLogOut">
              <div>
                <button className="cmsBtn" onClick={this.logoutHandler}>
                  <span>Log Out</span>
                  <img src={exit} alt="Exit" />
                </button>
              </div>
            </div>
          </aside>
          <section
            className="dashMain"
            style={
              this.state.isMenu
                ? {
                    width: "100%"
                  }
                : {
                    width: "100vw"
                  }
            }
          >
            <div onClick={this.toogleClickHandler} className="mainToogleMenu">
              <img src={hamburger} alt="hamburger" />
            </div>

            <Switch>
              <Route exact path="/cms/dashboard/" render={() => <Welcome />} />
              <Route
                exact
                path="/cms/dashboard/createPost"
                render={() => <CreatePost />}
              />
              <Route
                exact
                path="/cms/dashboard/adminPost"
                render={() => <AdminPost />}
              />
            </Switch>
          </section>
        </div>
      );
    }

    return <Redirect to="/cms" />;
  }
}

const mapStateToProps = state => {
  return {
    loggedUserName: state.login.loggedUserName,
    isUserLoggedIn: state.login.isUserLoggedIn,
    loggedUserAvatar: state.login.loggedUserAvatar
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
