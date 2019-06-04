import React, { Component } from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
import Helmet from "react-helmet";

//components
import ProfilesTable from "../profilesTable/ProfilesTable";
import Welcome from "../welcome/welcome";
import CreatePost from "../createPost/createPost";
import AdminPost from "../adminPost/adminPost";
import Menu from "../menu/menu";
import ClassesInput from "../classesInput/classesInput";
import UserProfile from "../userProfile/UserProfile";

//css
import "./dashboard.css";
//assets
import plus from "../../assets/dashboard/plus.svg";
import exit from "../../assets/dashboard/exit.svg";
import hamburger from "../../assets/dashboard/hamburger.svg";
import Modal from "../../common/components/modal/modal";
//services
import htmlArrCosolidation from "../../../services/htmlArrConsolidation";
import parseHTML2Object from "../../../services/parseHTML2Object";
import keywordsToArr from "../../../services/keywordsToArr";
import removeSuffixClasses from "../../../services/suffixClasses";
import classesArrObjToStr from "../../../services/classesArrObjToStr";
import erasePreviewDataFromElements from "../../../services/erasePreviewDataFromElements";

//api calls
import getUserFromId from "../../apiCalls/getUserFromId";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: false,
      toogleAdmin: false,
      adminMenuH: 0,
      toogleStats: false,
      isPostSaved: true, //eliminar ojo
      showExitModal: { show: false, url: "" },
      showClassesModal: false,

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

  modalHandler = () => {
    this.setState(prevState => {
      return { showExitModal: !prevState.showExitModal };
    });
  }; //ojo
  showExitModalHandler = showExitModal => {
    this.setState({ showExitModal: showExitModal });
  }; //ojo
  classesModalHandler = () => {
    this.setState(prevState => {
      return { showClassesModal: !prevState.showClassesModal };
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
    const elementsArrNoPreviewData = erasePreviewDataFromElements(
      this.props.elements
    );

    let dataToUpdate = {
      elements: elementsArrNoPreviewData,
      files: this.props.fileNames,
      keywords: this.props.seo.keywords,
      author: this.props.login.loggedUserName,
      date: date,
      html: finalHTMl,
      projectName: this.props.project.name,
      description: this.props.summary,
      title: this.props.elements[0].HTMLElementContent,
      url: this.props.project.url,
      thumbnail: this.props.thumbnail
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
      this.programHandler(history, url);
    } else {
      history.push(url);
    }
    this.props.onSave();
    this.setState({
      showExitModal: false
    });
  };

  linkBtnHandler = (history, link) => {
    this.setState({
      isMenu: false
    });
    if (window.location.pathname === `/cms/dashboard/${link}`) {
      return;
    }
    if (!this.props.project.hasChanged) {
      //ojo con state ispostsaved eliminar
      //si no hay cambios ve a adminpost
      history.push(`/cms/dashboard/${link}`);
    } else {
      this.setState({
        showExitModal: { show: true, url: `/cms/dashboard/${link}` }
      });
    }
  };

  showClassesModalHandler = () => {
    const viewClasses = classes => {
      if (classes) {
        this.props.onAddClasses(
          removeSuffixClasses(classes, this.props.project.url)
        );
        this.setState(prevState => {
          return {
            showClassesModal: !prevState.showClassesModal
          };
        });
      } else {
        this.setState(prevState => {
          return { showClassesModal: !prevState.showClassesModal };
        });
      }
    };

    axios
      .get(`/api/getClasses/${this.props.project.url}`)
      .then(res => {
        if (res.data === 404) {
          viewClasses();
          return;
        }
        if (res.status === 200) {
          viewClasses(res.data);
        }
      })
      .catch(err => {
        console.log(`error getting classes ${err}`);
      });
  };
  addClassesHandler = () => {
    const closeModal = () => {
      this.setState({ showClassesModal: false });
    };
    const updateFileList = data => {
      let fileArr = this.props.postCreation.files;
      for (let i = 0; i < fileArr.length; i++) {
        if (fileArr[i] === `${data.filename}.css`) {
          return;
        }
      }
      this.props.onAddFile([
        ...this.props.postCreation.files,
        `${data.filename}.css`
      ]);
    };
    // const updateSiteHead = this.updateSiteHead;
    const classesStr = classesArrObjToStr(
      this.props.postCreation.classes,
      this.props.project.url
    );
    if (this.props.project.hasChanged) {
      const data = {
        url: this.props.project.url,
        filename: this.props.project.url,
        classes: classesStr
      };
      axios.post("/api/addClass", data).then(res => {
        if (res.status === 200) {
          updateFileList(data);
          closeModal();
        }
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
              if (window.location.pathname === "/cms/dashboard/createPost") {
                return;
              }
              this.props.onReset();
              this.props.onMenuChange({
                main: false,
                create: true
              });
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
              this.linkBtnHandler(history, "adminPost");
            }}
          >
            Posts
          </li>
        );
      });

      const ProfilePostBtn = withRouter(({ history }) => {
        return (
          <li
            onClick={async () => {
              const getUserRes = await getUserFromId(this.props.userId);
              if (getUserRes.status === "OK") {
                this.props.setUserProfile(getUserRes.data);

                this.linkBtnHandler(history, "userProfile");
              }
            }}
          >
            Profile
          </li>
        );

        //modal de error OJO
      });

      const ProfilesTableBtn = withRouter(({ history }) => {
        return (
          <li
            onClick={() => {
              this.linkBtnHandler(history, "usersList");
            }}
          >
            Profiles
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
              Save & Exit
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

      const classesInput = <ClassesInput />;

      const expand = this.state.isMenu ? "" : "dashboardLayoutExpand";
      return (
        <div>
          {this.state.showClassesModal && (
            <Modal
              title="Classes"
              body={classesInput}
              isVisible={this.state.deleteMode}
              modalHandler={this.classesModalHandler}
            >
              <button onClick={this.addClassesHandler}>Add Classes</button>
              <button onClick={this.classesModalHandler}>Cancel</button>
            </Modal>
          )}
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

          <div className={`dashboardLayout ${expand}`}>
            <Helmet>
              <link
                rel="stylesheet"
                href={`./uploads/${this.props.project.url}/${
                  this.props.project.url
                }.css`}
              />
            </Helmet>

            <aside className="dashAside">
              <div className="dashAvatar">
                <p>
                  Welcome <span>{this.props.loggedUserName}</span>
                </p>
                <div>
                  <div
                    className="dashAvatarImg"
                    style={{
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      borderRadius: "100%",

                      backgroundImage:
                        this.props.loggedUserAvatar &&
                        this.props.loggedUserAvatar.match("data:image")
                          ? `url('${this.props.loggedUserAvatar}`
                          : `url('data:image/jpeg;base64,${
                              this.props.loggedUserAvatar
                            }`
                    }}
                  />
                </div>
              </div>
              <div className="dashCreatePost">
                <CreatePostBtn />
              </div>
              <div>
                {this.props.menu.main && (
                  <Menu itemsTitle={["Administration", "Stats"]}>
                    <ul className="dashMenuAdminList">
                      {this.props.userType === "admin" ? (
                        <ProfilesTableBtn />
                      ) : (
                        <ProfilePostBtn />
                      )}

                      <AdminPostBtn />

                      <li>Users</li>
                    </ul>
                    <ul className="dashMenuAdminList">
                      <li>Search Data</li>

                      <li>Interest Data</li>

                      <li>Users Data</li>
                    </ul>
                  </Menu>
                )}

                {this.props.menu.create && (
                  <Menu itemsTitle={["General Styling"]}>
                    <ul className="dashMenuAdminList">
                      <li onClick={this.showClassesModalHandler}>Classes</li>
                    </ul>
                  </Menu>
                )}
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
              <div
                className={this.state.isMenu ? " dashMainOpaque" : undefined}
              >
                <Switch>
                  <Route
                    exact
                    path="/cms/dashboard/"
                    render={() => <Welcome />}
                  />
                  <Route
                    exact
                    path="/cms/dashboard/createPost"
                    render={() => (
                      <CreatePost
                        showExitModalHandler={this.showExitModalHandler}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/cms/dashboard/adminPost"
                    render={() => <AdminPost />}
                  />
                  <Route
                    exact
                    path="/cms/dashboard/userProfile"
                    render={() => <UserProfile />}
                  />
                  <Route
                    exact
                    path="/cms/dashboard/usersList"
                    render={() => <ProfilesTable />}
                  />
                </Switch>
              </div>
            </section>
          </div>
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
    userId: state.login.loggedUserID,
    userType: state.login.userType,
    project: state.postCreation.project,
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    login: state.login,
    fileNames: state.postCreation.files,
    date: state.postCreation.date,
    postCreation: state.postCreation,
    menu: state.menu
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones
    setUserProfile: profile =>
      dispatch({ type: "SET_USER_PROFILE", payload: profile }),
    onLogOut: () => dispatch({ type: "LOGGED_OUT" }),
    onReset: () => dispatch({ type: "RESET_EDIT" }),
    onDateEdition: payload =>
      dispatch({ type: "DATE_EDITION", payload: payload }),
    onSave: () => dispatch({ type: "SAVE_POST" }),
    onMenuChange: payload =>
      dispatch({ type: "CHANGE_MENU", payload: payload }),
    onAddClasses: payload =>
      dispatch({ type: "ADD_CLASSES", payload: payload }),
    onAddFile: payload => dispatch({ type: "ADD_DELETE_FILE", payload })
  };
};

const Dashboard2 = connect(
  mapStateToProps,
  mapDispachToProps
)(Dashboard);

export default withCookies(Dashboard2);
