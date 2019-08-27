import React, { Component, lazy, Suspense } from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
import Helmet from "react-helmet";
import styled from "styled-components";

//components

import CreatePost from "../createPost/createPost";
import Menu from "../menu/menu";
import ClassesInput from "../classesInput/classesInput";
import Loading from "../loading/loading";
import Dialog from "../dialog/Dialog";
import MultiBtn from "../multiplexBtn/MultiBtn";
//lazyLoad components
const ProfilesTable = lazy(() => import("../profilesTable/ProfilesTable"));
const Welcome = lazy(() => import("../welcome/welcome"));
const AdminPost = lazy(() => import("../adminPost/adminPost"));
const UserProfile = lazy(() => import("../userProfile/UserProfile"));

//css
import "./dashboard.css";
//assets
import plus from "../../assets/dashboard/plus.svg";
import hamburger from "../../assets/dashboard/hamburger.svg";
import Modal from "../../common/components/modal/modal";
//services
import htmlArrCosolidation from "../../../services/htmlArrConsolidation";
import parseHTML2Object from "../../../services/parseHTML2Object";
import removeSuffixClasses from "../../../services/suffixClasses";
import classesArrObjToStr from "../../../services/classesArrObjToStr";
import erasePreviewDataFromElements from "../../../services/erasePreviewDataFromElements";
import triggerDialog from "../../controllers/triggerDialog";
import isDevice from "../../../services/isDevice";

//api calls
import getUserFromId from "../../apiCalls/getUserFromId";

import apiCtrl from "../../../apiCalls/generic/apiCtrl";
// import apiLogout from "../../../apiCalls/apiLogout";

const Aside = styled.aside`
  width: 20%;
  transform: ${props => (props.isMenu ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 1050px) {
    width: 40%;
  }
  @media (max-width: 700px) {
    width: 80%;
  }
`;

const Main = styled.section`
  width: ${props => (props.isMenu ? "80%" : "100%")};
  transform: ${props => (props.isMenu ? "translateX(20vw)" : "translateX(0)")};

  @media (max-width: 1050px) {
    width: ${props => (props.isMenu ? "60%" : "100%")};
    transform: ${props =>
      props.isMenu ? "translateX(40vw)" : "translateX(0)"};
  }

  @media (max-width: 700px) {
    width: ${props => (props.isMenu ? "20%" : "100%")};
    transform: ${props =>
      props.isMenu ? "translateX(80vw)" : "translateX(0)"};
  }
`;

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
      exitBtn: ["Blog", "Home", "Log Out"],

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

    const device = isDevice();
    this.props.setDevice(device);
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
    //save and exit modal
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
    if (window.location.pathname === `/cms/${link}`) {
      return;
    }
    if (!this.props.project.hasChanged) {
      //ojo con state ispostsaved eliminar
      //si no hay cambios ve a adminpost
      history.push(`/cms/${link}`);
    } else {
      this.setState({
        showExitModal: { show: true, url: `/cms/${link}` }
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
      .get(`${process.env.CDN_URL}/cdn/getClasses/${this.props.project.url}`)
      .then(res => {
        if (res.status === 200) {
          viewClasses(res.data);
        }
      })
      .catch(() => {
        viewClasses();
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

  exitBtnClickHandler = async option => {
    switch (option) {
      case "Exit": {
        this.linkBtnHandler(this.props.history, "adminPost");
        this.props.onMenuChange({
          main: true,
          create: false,
          exitBtn: ["Blog", "Home", "Log Out"]
        });
        break;
      }
      case "Blog": {
        window.location.href = "/blog";

        break;
      }
      case "Log Out": {
        const logOutObj = {
          url: "api/logout",
          method: "get"
        };

        apiCtrl(
          logOutObj,
          res => {
            console.log("logout Ok exitBtnClickHandler  ", res);

            if (res.data.status === "OK") {
              triggerDialog(
                {
                  title: "Success 😃",
                  body: `${res.data.message}`,
                  auto: 3000
                },
                () => {
                  window.location.href = "/cms";
                }
              );

              return;
            }
          },
          err => {
            console.log("logout Ok exitBtnClickHandler", err);
            const message = err.response.data.message;
            triggerDialog({
              title: "Error 🤬",
              body: `There was a error on Log out: ${message}. Please, try again`,
              status: "auto"
            });
          }
        );

        break;
      }
      case "Home": {
        window.location.href = "/home";

        break;
      }

      default:
        break;
    }
  };

  render() {
    if (this.props.isUserLoggedIn) {
      const CreatePostBtn = withRouter(({ history }) => {
        return (
          <button
            className="cmsBtn"
            onClick={() => {
              if (window.location.pathname === "/cms/createPost") {
                return;
              }
              this.props.onReset();
              this.props.onMenuChange({
                main: false,
                create: true,
                exitBtn: ["Exit", "Blog", "Home", "Log Out"]
              });

              history.push("/cms/createPost");
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

          {this.props.dialog && this.props.dialog.show && (
            <Dialog
              title={this.props.dialog.title}
              body={this.props.dialog.body}
              status={this.props.dialog.status}
            />
          )}

          <div className={`dashboardLayout`}>
            <Helmet>
              <link
                rel="stylesheet"
                href={`${process.env.CDN_URL}/articles/${this.props.project.url}/${this.props.project.url}.css`}
              />
            </Helmet>

            <Aside isMenu={this.state.isMenu} className="dashAside">
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

                      backgroundImage: this.props.loggedUserAvatar
                        ? `url('${this.props.loggedUserAvatar}`
                        : "none"
                    }}
                  />
                </div>
              </div>
              <div className="dashCreatePost">
                {this.props.userType !== "user" &&
                  this.props.history.location.pathname !==
                    "/cms/createPost" && <CreatePostBtn />}
              </div>
              <div>
                {this.props.menu.main && (
                  <Menu
                    itemsTitle={
                      this.props.userType === "admin"
                        ? ["Administration", "Stats"]
                        : ["Administration"]
                    }
                  >
                    <ul className="dashMenuAdminList">
                      {this.props.userType !== "user" && <AdminPostBtn />}

                      {this.props.userType === "admin" ? (
                        <ProfilesTableBtn />
                      ) : (
                        <ProfilePostBtn />
                      )}
                    </ul>
                    {this.props.userType === "admin" && (
                      <ul className="dashMenuAdminList">
                        <li>Search Data</li>

                        <li>Interest Data</li>

                        <li>Users Data</li>
                      </ul>
                    )}
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

              {this.props.history.location.pathname.match("/cms/") && (
                <div className="dashLogOut">
                  <div>
                    <MultiBtn
                      options={this.props.menu.exitBtn}
                      clickHandler={this.exitBtnClickHandler}
                    />
                  </div>
                </div>
              )}
            </Aside>

            <Main isMenu={this.state.isMenu} className="dashMain">
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
                    render={() => (
                      <Suspense fallback={<Loading fullscreen={true} />}>
                        <Welcome />
                      </Suspense>
                    )}
                  />
                  <Route
                    exact
                    path="/cms/createPost/"
                    render={() => (
                      <Suspense fallback={<Loading fullscreen={true} />}>
                        <CreatePost
                          showExitModalHandler={this.showExitModalHandler}
                        />
                      </Suspense>
                    )}
                  />
                  <Route
                    exact
                    path="/cms/adminPost/"
                    render={() => (
                      <Suspense fallback={<Loading fullscreen={true} />}>
                        <AdminPost />
                      </Suspense>
                    )}
                  />
                  <Route
                    exact
                    path="/cms/userProfile/"
                    render={() => (
                      <Suspense fallback={<Loading fullscreen={true} />}>
                        <UserProfile />
                      </Suspense>
                    )}
                  />
                  <Route
                    exact
                    path="/cms/usersList/"
                    render={() => (
                      <Suspense fallback={<Loading fullscreen={true} />}>
                        <ProfilesTable />
                      </Suspense>
                    )}
                  />
                </Switch>
              </div>
            </Main>
          </div>
        </div>
      );
    }

    return <Redirect to="/cms" />;
  }
}

const mapStateToProps = state => {
  return {
    dialog: state.dialog,
    loggedUserName: state.login.loggedUserName,
    isUserLoggedIn: state.login.isUserLoggedIn,
    loggedUserAvatar: state.login.loggedUserAvatar,
    userType: state.login.userType,
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
    onAddFile: payload => dispatch({ type: "ADD_DELETE_FILE", payload }),
    setDevice: device => dispatch({ type: "SET_DEVICE", payload: device })
  };
};

const Dashboard2 = connect(
  mapStateToProps,
  mapDispachToProps
)(withRouter(Dashboard));

export default withCookies(Dashboard2);
