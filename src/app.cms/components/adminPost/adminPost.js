import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//css
import "react-table/react-table.css";
import "./adminPost.css";
//components
import Loading from "../loading/loading";

class AdminPost extends Component {
  constructor(props) {
    super(props);
    this.state = { isDataFetched: false, posts: {} };
  }
  dataFetched = posts => {
    console.log("posts fetched ", posts);
    this.setState({ isDataFetched: true, posts: posts });
  };
  componentDidMount() {
    const dataFetchedFunction = this.dataFetched;

    axios("/api/getPosts/")
      .then(res => {
        if (res.status === 200) {
          dataFetchedFunction(res.data);
        }
      })
      .catch(err => {
        console.log("error ", err);
      });
  }

  updateReduxState = (data, history) => {
    const reduxStateFromDB = {
      elements: data.elements,
      seo: {
        keywords: data.keywords,
        description: data.description,
        title: data.title
      },
      summary: data.description,
      project: {
        name: data.projectName,
        url: data.url
      },
      files: data.files
    };

    this.props.onPostFetch(reduxStateFromDB);
    this.props.history.push("/cms/dashboard/createPost");
  };
  projectNameClickHandler = (e, props) => {
    const updateReduxState = this.updateReduxState;
    alert("porject presionado");
    console.log("porject presionado", e.target);
    console.log("porject presionado props", props.original);
    this.setState({ isDataFetched: false });

    axios(`/api/getPosts/${props.original.projectName}`)
      .then(res => {
        if (res.status === 200) {
          console.log(
            "res.data" + " " + `/api/getPosts/${props.original.projectName}`,
            res.data
          );
          updateReduxState(res.data);
        }
      })
      .catch(err => {
        console.log("error ", err);
      });
  };
  render() {
    const articleData = this.state.posts;
    const columns = [
      {
        Header: "Project Name",
        accessor: "projectName",
        Cell: props => {
          return (
            <span
              onClick={e => {
                this.projectNameClickHandler(e, props);
              }}
            >
              {props.value}
            </span>
          );
        } // Custom cell components!
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Summary",
        accessor: "description"
      },
      {
        Header: "Author",
        accessor: "author"
      },
      {
        Header: "Date",
        accessor: "date"
      }
    ];
    if (this.state.isDataFetched)
      return (
        <div className="reactTableLay">
          <ReactTable
            style={{ padding: "10vmin" }}
            data={articleData}
            columns={columns}
          />
        </div>
      );

    return <Loading />;
  }
}

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    login: state.login,
    project: state.postCreation.project,
    files: state.postCreation.files
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onPostFetch: payload => dispach({ type: "FETCH_POST", payload: payload })

    // onProjectNameEdition: payload =>
    //   dispach({ type: "PROJECT_NAME_EDITION", payload: payload }),
    // onProjectURLEdition: payload =>
    //   dispach({ type: "PROJECT_URL_EDITION", payload: payload })
  };
};

const AdminPost2 = connect(
  mapStateToProps,
  mapDispachToProps
)(AdminPost);
export default withRouter(AdminPost2);
