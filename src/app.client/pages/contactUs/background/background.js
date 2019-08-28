import React from "react";
import styled from "styled-components";

const SVG = styled.div`
  left: -4px;
  top: -30px;
  height: 800px;
  position: absolute;

  @media (max-width: 1050px) {
    width: 150vw;
    height: auto;
  }

  @media (max-width: 700px) {
    width: 178vw;
    left: -70px;
    top: 0px;
  }
`;

const IMG = styled.img`
  width: 100%;
`;
const Background = ({ image }) => {
  return (
    <SVG>
      <IMG src={image} alt="SwordVoice Symbol" />
    </SVG>
  );
};

export default Background;
