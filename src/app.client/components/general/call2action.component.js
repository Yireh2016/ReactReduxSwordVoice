import React from "react";
import "./call2Action.css";

const Call2Action = ({ className, link, text, target = false }) => {
  return (
    <React.Fragment>
      <a
        aria-label={`go to ${link} page`}
        href={`${link}`}
        target={target ? "_blank" : "_self"}
        rel={target && "noopener"}
      >
        <button className={"call2Action " + className} type="button">
          {text}
        </button>
      </a>
    </React.Fragment>
  );
};

export default Call2Action;
