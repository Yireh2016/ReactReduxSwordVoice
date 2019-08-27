//modules
import React, { useState, useEffect } from "react";
import styled from "styled-components";
//services

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.637);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    overflow-y: scroll;
    display: block;
    background-color: #f95f0b;
  }
`;

const CloseBtn = styled.div`
  top: 20px;
  right: 25px;
  position: absolute;
  z-index: 300;
  color: white;

  :hover {
    cursor: pointer;
  }
`;

const FormCard = styled.div`
  position: relative;
  border: 3px solid #f95f0b;
  box-sizing: border-box;
  border-radius: 15px;
  /* padding: 20px; */
  padding: 2vw;
  height: 100vh;
  width: 25vw;
  max-width: 340px;
  background: linear-gradient(180deg, #1a2225 66.02%, #0088ba 91.38%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 680px;

  @media (max-width: 1050px) {
    width: 50%;
    padding: 20px 3vw;
  }

  @media (max-width: 700px) {
    height: ${props => `${props.layoutH}px !important`};
    padding: 2vh 7vw;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
`;
/* max-width: none;
max-height: none; */
const UserManageForm = ({ children, onClick }) => {
  const [formHeight, setFormHeight] = useState("");

  const formLayoutRef = React.createRef();

  useEffect(() => {
    console.log("formLayoutRef.current", formLayoutRef.current);
    setFormHeight(formLayoutRef.current.clientHeight);
  }, []);

  return (
    <Layout //TODO: check in production
      ref={formLayoutRef}
      onClick={onClick}
    >
      <FormCard
        layoutH={formHeight}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <CloseBtn onClick={onClick}>X</CloseBtn>
        {children}
      </FormCard>
    </Layout>
  );
};

export default UserManageForm;
