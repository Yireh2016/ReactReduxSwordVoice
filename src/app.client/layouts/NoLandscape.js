import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoLandscape = ({
  children,
  showResolutionWarning,
  setShowResolutionWarning
}) => {
  useEffect(() => {
    const setPostDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.userAgent.match(/PlayBook/i)
      ) {
        console.log("mobile");
        if (windowWidth > windowHeight) {
          //landscape

          setShowResolutionWarning(true);
        } else {
          setShowResolutionWarning(false);
        }
      }
    };

    window.addEventListener("resize", setPostDimensions);
    setPostDimensions();
  }, []);

  return (
    <React.Fragment>
      {showResolutionWarning && (
        <Container id="nolandscape">
          <span>This site is not landscape friendly</span>
          <span>Please, turn your device to portrait position. Thanks </span>
        </Container>
      )}
      {children}
    </React.Fragment>
  );
};

const stateToProps = state => {
  return {
    showResolutionWarning: state.responsiveDialog.showResolutionWarning
  };
};
const actionsToProps = dispatch => {
  return {
    setShowResolutionWarning: show => {
      dispatch({ type: "SET_WARNING", payload: show });
    }
  };
};

export default connect(
  stateToProps,
  actionsToProps
)(NoLandscape);
