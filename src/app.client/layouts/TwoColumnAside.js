import React from "react";
import styled from "styled-components";
import Radium from "radium";

const Style = styled.div`
  display: flex;
  flex-direction: row;
`;

const styles = {
  main: {
    width: "80%"
  },
  aside: {
    width: "20%"
  }
};
const TwoColumnAside = ({ children, aside, style, className }) => {
  return (
    <Style style={style} className={className}>
      <div style={styles.main}>{children}</div>
      <div style={styles.aside}>{aside}</div>
    </Style>
  );
};
export default Radium(TwoColumnAside);
