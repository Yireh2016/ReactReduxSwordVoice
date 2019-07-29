import React from "react";
//css
import "./loading.css";

const Loading = ({ fullscreen = false }) => {
  return (
    <div className={`adminPostSpinnerLay ${fullscreen && "fullscreen"}`}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
