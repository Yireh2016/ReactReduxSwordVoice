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

      console.log("windowWidth", windowWidth);
      console.log("windowHeight", windowHeight);

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
  console.log("stateToProps state", state);
  return {
    showResolutionWarning: state.dialog.showResolutionWarning
  };
};
const actionsToProps = dispatch => {
  return {
    setShowResolutionWarning: showWarining => {
      dispatch({ type: "SET_WARNING", payload: showWarining });
    }
  };
};

export default connect(
  stateToProps,
  actionsToProps
)(NoLandscape);
