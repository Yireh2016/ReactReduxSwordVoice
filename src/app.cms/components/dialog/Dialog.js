import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import showdown from "showdown";
import ReactHtmlParser from "react-html-parser";

const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
`;

const Layout = styled.div`
  background-color: aliceblue;
  padding: 30px 35px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 50%;

  @media (max-width: 1050px) {
    width: 70%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
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
  let converter = new showdown.Converter();

  const bodyHTMLContent = converter.makeHtml(body);
  const bodyJsx = ReactHtmlParser(bodyHTMLContent);

  return (
    <Container id="dialogCont">
      <Layout id="dialogLayout">
        <Title id="dialogTitle"> {title}</Title>
        <div id="dialogBody"> {bodyJsx}</div>
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
