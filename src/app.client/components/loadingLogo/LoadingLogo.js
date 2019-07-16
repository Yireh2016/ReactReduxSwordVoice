import React from "react";
import "./loadingLogo.css";
import { sOnly, baseOnly } from "./svg/svgIcons";

const LoadingLogo = () => {
  return (
    <div className="loadingLogoLay">
      <div className="sOnlyCont">{sOnly}</div>
      <div className="baseOnlyCont">{baseOnly}</div>
    </div>
  );
};

export default LoadingLogo;
