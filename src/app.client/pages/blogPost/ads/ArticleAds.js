import React from "react";
import styled from "styled-components";

const Ad1Cont = styled.div`
  margin-top: 2vh;
  display: flex;
  height: 26vh;
  justify-content: center;
  align-items: center;
  background-color: #00405930;

  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

const Ad2Cont = styled.div`
  display: none;

  margin-top: 2vh;
  display: flex;
  height: 26vh;
  justify-content: center;
  align-items: center;
  background-color: #00405930;
  padding: 0 34px;
`;

const AdLay = styled.section`
  height: calc(100vh);
  position: sticky;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1050px) {
    height: 100%;
    position: static;
  }
`;

export const Ad1 = () => {
  return <Ad1Cont>Compra cosas que no quieres AD1</Ad1Cont>;
};

export const Ad2 = () => {
  return (
    <AdLay>
      <Ad2Cont>compra lo que no quieres Ad2</Ad2Cont>
    </AdLay>
  );
};
