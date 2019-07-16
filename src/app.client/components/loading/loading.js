import React from "react";
//css
import "./loading.css";

const Loading = ({ fullscreen }) => {
  return (
    <div
      className={`adminPostSpinnerLay ${fullscreen && "fullscreen"}`}
      fullscreen={fullscreen}
    >
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
