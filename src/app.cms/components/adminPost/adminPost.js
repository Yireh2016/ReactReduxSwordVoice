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
//services
import keywordsToArr from "../../../services/keywordsToArr";

class AdminPost extends Component {
  constructor(props) {
    super(props);
    this.state = { isDataFetched: false, posts: {} };
  }
  dataFetched = posts => {
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
    let arr = keywordsToArr(data.keywords);
    const reduxStateFromDB = {
      elements: data.elements,
      seo: {
        keywords: data.keywords,
        keywordsList: arr,
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
    this.setState({ isDataFetched: false });

    axios(`/api/getPosts/${props.original.projectName}`)
      .then(res => {
        if (res.status === 200) {
          updateReduxState(res.data);
        }
      })
      .catch(err => {
        console.log("error ", err);
      });
  };
  onDeleteClick = (e, props) => {
    console.log("delete click", props);
  };

  onEditClick = (e, props) => {
    console.log("edit click", props);
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
        accessor: "title",
        Cell: props => {
          return <span title={props.value}>{props.value}</span>;
        } // Custom cell components
      },
      {
        Header: "Summary",
        accessor: "description",
        Cell: props => {
          return <span title={props.value}>{props.value}</span>;
        } // Custom cell components
      },
      {
        Header: "Author",
        accessor: "author"
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: props => {
          return <span title={props.value}>{props.value}</span>;
        } // Custom cell components
      },
      {
        Header: "Control",
        Cell: props => {
          return (
            <span>
              <span
                onClick={e => {
                  this.onEditClick(e, props);
                }}
              >
                Edit
              </span>
              <span
                onClick={e => {
                  this.onDeleteClick(e, props);
                }}
              >
                Delete
              </span>
            </span>
          );
        } // Custom cell components
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
