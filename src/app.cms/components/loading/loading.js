import React from "react";
//css
import "./loading.css";

const Loading = () => {
  return (
    <div className="adminPostSpinnerLay">
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
