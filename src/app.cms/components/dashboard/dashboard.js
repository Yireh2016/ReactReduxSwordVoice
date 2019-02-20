import React, { Component } from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
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
import Modal from "../../common/components/modal/modal";
//serives
import htmlArrCosolidation from "../../../services/htmlArrConsolidation";
import parseHTML2Object from "../../../services/parseHTML2Object";
import keywordsToArr from "../../../services/keywordsToArr";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: true,
      toogleAdmin: false,
      adminMenuH: 0,
      toogleStats: false,
      isPostSaved: true, //eliminar ojo
      showExitModal: false,
      dateProgram: this.props.date
    };
    this.adminMenu = React.createRef();
    this.statsMenu = React.createRef();
  }
  componentDidMount() {
    window.addEventListener("popstate", e => {
      if (this.props.project.hasChanged) {
        e.preventDefault();
        this.setState({
          showExitModal: { show: true, url: e.target.location.pathname }
        });
      }
    });
  }

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
  routeChangeHandler = () => {
    console.log("route has changed");
  };

  modalHandler = () => {
    this.setState(prevState => {
      return { showExitModal: !prevState.showExitModal };
    });
  };
  programHandler = (history, url) => {
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
    console.log("finalPost", finalPost);
    let dataToUpdate = {
      elements: this.props.elements,
      files: this.props.fileNames,
      keywords: this.props.seo.keywords,
      author: this.props.login.loggedUserName,
      date: date,
      html: finalHTMl,
      projectName: this.props.project.name,
      description: this.props.summary,
      title: this.props.elements[0].HTMLElementContent,
      url: this.props.project.url
    };

    axios
      .put(`/api/updatePost/${this.props.project.name}`, dataToUpdate)
      .then(res => {
        console.log("res", res);
        this.props.onSave();
        history.push(url);
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  saveAndExitHandler = (save, url, history) => {
    if (save) {
      console.log("deberia salvar al salir");
      this.programHandler(history, url);
    } else {
      history.push(url);
    }
    this.props.onSave();
    this.setState({
      showExitModal: false
    });
  };

  adminPostBtnHandler = history => {
    if (window.location.pathname === "/cms/dashboard/adminPost") {
      return;
    }
    if (!this.props.project.hasChanged) {
      //ojo con state ispostsaved eliminar
      //si no hay cambios ve a adminpost
      history.push("/cms/dashboard/adminPost");
    } else {
      this.setState({
        showExitModal: { show: true, url: "/cms/dashboard/adminPost" }
      });
    }
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
              this.props.onReset();
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
              this.adminPostBtnHandler(history);
            }}
          >
            Post
          </li>
        );
      });

      const SaveAndExitBtn = withRouter(({ history }) => {
        return (
          <React.Fragment>
            <button
              onClick={() =>
                this.saveAndExitHandler(
                  true,
                  this.state.showExitModal.url,
                  history
                )
              }
              type="button"
            >
              Save
            </button>
            <button
              onClick={() =>
                this.saveAndExitHandler(
                  false,
                  this.state.showExitModal.url,
                  history
                )
              }
              type="button"
            >
              Exit
            </button>
          </React.Fragment>
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
          {this.state.showExitModal.show && (
            <Modal
              title="Exit"
              body="Do you want to exit without save?"
              isVisible={this.state.showExitModal}
              modalHandler={this.modalHandler}
            >
              <SaveAndExitBtn />
            </Modal>
          )}
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
                <a href="/home">
                  <button className="cmsBtn">
                    <span>Home</span>
                    <img src={exit} alt="Exit" />
                  </button>
                </a>
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
    loggedUserAvatar: state.login.loggedUserAvatar,
    project: state.postCreation.project,
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    login: state.login,
    fileNames: state.postCreation.files,
    date: state.postCreation.date,
    postCreation: state.postCreation
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload }),
    onLogOut: () => dispach({ type: "LOGGED_OUT" }),
    onReset: () => dispach({ type: "RESET_EDIT" }),
    onDateEdition: payload =>
      dispach({ type: "DATE_EDITION", payload: payload }),
    onSave: () => dispach({ type: "SAVE_POST" })
  };
};

const Dashboard2 = connect(
  mapStateToProps,
  mapDispachToProps
)(Dashboard);

export default withCookies(Dashboard2);
