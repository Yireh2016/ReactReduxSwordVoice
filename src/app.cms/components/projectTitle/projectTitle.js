import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//css
import "./projectTitle.css";

class ProjectTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  saveProjectTitleHandler = () => {
    const savedURLText = this.state.projectURLText;
    const savedTitleText = this.state.projectTitleText;
    this.props.onProjectURLEdition(savedURLText);
    this.props.onProjectNameEdition(savedTitleText);
  };

  cancelProjectTitleHandler = () => {
    this.props.history.push("/cms/dashboard");
  };

  render() {
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
      dispach({ type: "PROJECT_URL_EDITION", payload: payload })
  };
};

const mapStateToProps = state => {
  return {
    projectName: state.postCreation.project.name,
    projectURL: state.postCreation.project.url
  };
};

const ProjectTitle2 = withRouter(ProjectTitle);

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ProjectTitle2);
