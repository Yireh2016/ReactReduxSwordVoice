import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//apiCalls
import getUsers from "../../apiCalls/getUsers";
import SearchBar from "../../../app.client/components/blog/searchBar/searchBar.component";

const Layout = styled.div``;

const ProfilesTable = ({ setUserProfile, history, device }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        var usersObj = await getUsers();
      } catch (err) {
        console.error("error", err);
      }

      if (usersObj.status === "OK") {
        setUsers(usersObj.data);
        return;
      }
      console.log("error", usersObj.data);
    };
    asyncFn();
  }, []);

  const userNameHandler = tableIndex => {
    setUserProfile(users[tableIndex]);
    history.push("/cms/userProfile");
  };

  const columns = [
    {
      Header: "Username",
      accessor: "userName",
      maxWidth: 300,
      Cell: props => {
        return (
          <div
            onClick={e => {
              userNameHandler(props.index);
            }}
            className="tableColumnElement tableNameElement"
          >
            {props.value}
          </div>
        );
      } // Custom cell components!
    },
    {
      Header: "Name",
      accessor: "userFirstName",
      maxWidth: 300,
      Cell: props => {
        return (
          <div className="talbeColumnElement" title={props.value}>
            {props.value}
          </div>
        );
      } // Custom cell components
    },
    {
      Header: "Last Name",
      accessor: "userLastName",
      maxWidth: 300,
      Cell: props => {
        return (
          <div className="talbeColumnElement" title={props.value}>
            {props.value}
          </div>
        );
      } // Custom cell components
    },
    {
      Header: "Email",
      accessor: "userEmail",
      maxWidth: 300,
      Cell: props => {
        return (
          <div className="talbeColumnElement" title={props.value}>
            {props.value}
          </div>
        );
      }
    }
    // {
    //   Header: "Control",
    //   maxWidth: 300,
    //   Cell: props => {
    //     // return (
    //     //   <div className="tableControlBtnLay">
    //     //     <span
    //     //       className="tableControlBtnAction"
    //     //       onClick={e => {
    //     //         this.onEditClick(e, props);
    //     //       }}
    //     //     >
    //     //       <img className="tableControlBtn" src={edit} alt="Edit Post" />
    //     //     </span>
    //     //     <span
    //     //       className="tableControlBtnAction"
    //     //       onClick={e => {
    //     //         this.onDeleteClick(e, props);
    //     //       }}
    //     //     >
    //     //       <img className="tableControlBtn" src={del} alt="Delete Post" />
    //     //     </span>
    //     //   </div>
    //     // );
    //   } // Custom cell components
    // }
  ];

  return (
    <Layout className="reactTableLay">
      <ReactTable
        filterable
        style={
          device === "phone"
            ? { border: "none", padding: "0 3vmin" }
            : { border: "none", padding: "0 10vmin" }
        }
        data={users}
        columns={columns}
        className="-striped -highlight"
        defaultPageSize={10}
      />
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    device: state.resize.device
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones

    setUserProfile: profile =>
      dispatch({ type: "SET_USER_PROFILE", payload: profile })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispachToProps
  )(ProfilesTable)
);
