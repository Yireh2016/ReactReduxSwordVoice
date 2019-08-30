import React from "react";
import styled from "styled-components";

const Item = styled.div`
  white-space: normal;
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;
  width: ${props => {
    switch (props.size) {
      case 1:
        return "calc(100% / 12)";
      case 2:
        return "calc(100% * 2 / 12 )";
      case 3:
        return "calc(100% * 3 / 12 )";
      case 4:
        return "calc(100% * 4 / 12 )";
      case 5:
        return "calc(100% * 5 / 12 )";
      case 6:
        return "calc(100% * 6 / 12 )";
      case 7:
        return "calc(100% * 7 / 12 )";
      case 8:
        return "calc(100% * 8 / 12 )";
      case 9:
        return "calc(100% * 9 / 12 )";
      case 10:
        return "calc(100% * 10 / 12 )";
      case 11:
        return "calc(100% * 11 / 12 )";
      case 12:
        return "calc(100%)";

      default:
        return "auto";
    }
  }};

  @media (max-width: 700px) {
    padding: 0px;
  }
`;

const FlexItem = ({ children, size, style }) => {
  return (
    <Item style={style} size={size}>
      {children}
    </Item>
  );
};
export default FlexItem;
