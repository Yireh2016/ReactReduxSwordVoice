import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
//css
import "./projectTitle.css";
import Loading from "../loading/loading";

class ProjectTitle extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  projectTitleTextInputHandler = e => {
    const {
      target: { name, value }
    } = e;

    if (name === "projectTitleText") {
      let articleURL = value.toLowerCase();
      articleURL = articleURL.replace(/[^a-zA-Z0-9ñáéíúóÁÉÍÓÚ]/g, "-");
      articleURL = articleURL.replace(/[^\w]-*/g, "-");
      let arrArticleUrl = articleURL.match(/.*[^-]/g);
      arrArticleUrl === null
        ? this.setState({ projectTitleText: value, projectURLText: "" })
        : this.setState({
            projectTitleText: value,
            projectURLText: arrArticleUrl[0]
          });
      return;
    }

    this.setState({ [name]: value });
  };

  onSavePostProjectName = (savedURLText, savedTitleText) => {
    this.props.onProjectURLEdition(savedURLText);
    this.props.onProjectNameEdition(savedTitleText);
    this.setState({ isLoading: false });
  };
  saveProjectTitleHandler = () => {
    this.setState({ isLoading: true });
    const savedURLText = this.state.projectURLText;
    const savedTitleText = this.state.projectTitleText;
    const onSavePostProjectName = this.onSavePostProjectName;

    const date = new Date();
    const finalPost = {
      article: {
        author: this.props.login.loggedUserID,
        comments: [],
        date: date, //date
        files: [], //arr
        html: "", //str
        projectName: savedTitleText, //str
        description: "", //str
        keywords: [], //arr
        structuredData: {},
        title: "", //str,
        url: this.state.projectURLText
      }
    };

    axios
      .post("/api/createPost", finalPost)
      .then(res => {
        if (res.status === 200) {
          onSavePostProjectName(savedURLText, savedTitleText);
          alert(`Project ${savedTitleText} saved`);

          return;
        }
      })
      .catch(err => {
        console.log(`Error al salvar post ${err}`);
        alert(`Error ${err}`);
      });
  };

  cancelProjectTitleHandler = () => {
    this.props.onMenuChange({
      main: true,
      create: false,
      exitBtn: ["Blog", "Home", "Log Out"]
    });
    this.props.exitBtnHandler(this.props.history);
  };

  render() {
    if (this.state.isLoading) {
      return <Loading fullscreen={true} />;
    }
    return (
      <div className="projectTitleLayout">
        <div>
          <h1>Project Name</h1>
          <input
            type="text"
            name="projectTitleText"
            value={this.state.projectTitleText}
            onChange={this.projectTitleTextInputHandler}
          />
          <label style={{ display: "block" }}>
            URL www.swordvoice.com/blog/
            <input
              type="text"
              name="projectURLText"
              value={this.state.projectURLText}
              onChange={this.projectTitleTextInputHandler}
            />
          </label>
          <button onClick={this.saveProjectTitleHandler}>save</button>
          <button onClick={this.cancelProjectTitleHandler}>cancel</button>
          <p>
            Please insert the project name. This will be used to set your Blog
            Post URL
          </p>
        </div>
      </div>
    );
  }
}

const mapDispachToProps = dispach => {
  return {
    //acciones
    onProjectNameEdition: payload =>
      dispach({ type: "PROJECT_NAME_EDITION", payload: payload }),
    onProjectURLEdition: payload =>
      dispach({ type: "PROJECT_URL_EDITION", payload: payload }),
    onMenuChange: payload => dispach({ type: "CHANGE_MENU", payload: payload })
  };
};

const mapStateToProps = state => {
  return {
    projectName: state.postCreation.project.name,
    projectURL: state.postCreation.project.url,
    login: state.login
  };
};

const ProjectTitle2 = withRouter(ProjectTitle);

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ProjectTitle2);
