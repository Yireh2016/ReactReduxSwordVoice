import React, { useEffect } from "react";
import { connect } from "react-redux";

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
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        if (windowWidth > windowHeight) {
          //landscape
          if (windowWidth < 1050) {
            setShowResolutionWarning(true);
          } else {
            setShowResolutionWarning(false);
          }
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
        <div className="nolandscape">
          <span>This site is not landscape friendly</span>
          <span>Please, turn your device to portrait position. Thanks </span>
        </div>
      )}
      {children}
    </React.Fragment>
  );
};

const stateToProps = state => {
  return {
    showResolutionWarning: state.dialog.showResolutionWarning
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
