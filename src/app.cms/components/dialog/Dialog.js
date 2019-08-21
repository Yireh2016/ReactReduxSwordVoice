import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = styled.div`
  background-color: aliceblue;
  padding: 15px;
  border-radius: 5px;
`;

const Title = styled.h2`
  font-family: "Work Sans", "sans-serif";
  color: coral;
`;

const Control = styled.div`
  button {
    float: right;
  }
`;

const Button = styled.button`
  min-width: 80px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.8rem;
  box-sizing: border-box;
  background: #00171f;
  border: 1px solid coral;
  color: #fff;
  transition: all ease 300ms;
  justify-content: center;
  :hover {
    color: #00171f;
    background-color: #fff;
    cursor: pointer;
  }
`;
const Dialog = ({ title, body, status, showDialog }) => {
  return (
    <Container id="dialogCont">
      <Layout id="dialogLayout">
        <Title id="dialogTitle"> {title}</Title>
        <p id="dialogBody"> {body}</p>
        <Control id="dialogCtrlCont">
          <Button
            className="cmsBtn"
            onClick={() => {
              showDialog(false);
            }}
          >
            Ok
          </Button>
        </Control>
      </Layout>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    title: state.dialog.title,
    body: state.dialog.body,
    status: state.dialog.status
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones
    showDialog: show => dispatch({ type: "SET_DIALOG_SHOW", payload: show })
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(Dialog);
