import React, { useEffect } from "react";
import { connect } from "react-redux";

import { store } from "../../app.redux.store/store/configStore";

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

  @media (orientation: portrait) {
    display: none;
  }
`;

const NoLandscape = ({
  children,
  showResolutionWarning,
  setShowResolutionWarning
}) => {
  useEffect(() => {
    const setPostDimensions = () => {
      const windowWidth = window.outerWidth;
      const windowHeight = window.outerHeight;

      let state = store.getState();

      const { showLogIn, showSignUp } = state.logInStatus;
      const { ableWarning } = state.responsiveDialog;

      console.log(
        `\n\nshowLogIn ${showLogIn} showSignUp ${showSignUp}  ableWarning ${ableWarning} =>`,
        showLogIn || showSignUp || ableWarning
      );
      console.log(
        `windowHeight/ windowWidth <= 1.2 ${windowHeight / windowWidth} =>`,
        windowHeight / windowWidth <= 1.2,
        "\n\n"
      );

      if (
        (showLogIn || showSignUp || !ableWarning) &&
        windowHeight / windowWidth <= 1.2
      ) {
        return;
      }

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
    // showSignUp: state.logInStatus.showSignUp,
    // showLogIn: state.logInStatus.showLogIn
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
