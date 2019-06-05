import React from "react";
//css
import "./loading.css";
import styled from "styled-components";

const EllipsisCont = styled.div`
  height: 18px !important;
  div {
    top: 7px !important;
  }
`;

const LoadingBtn = () => {
  return (
    <div>
      <EllipsisCont className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </EllipsisCont>
    </div>
  );
};

export default LoadingBtn;
