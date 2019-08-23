import React from "react";
import "./call2Action.css";

const Call2Action = ({ className, link, text, target = false }) => {
  return (
    <React.Fragment>
      {target ? (
        <a
          aria-label={`go to ${link} page`}
          href={`${link}`}
          target="_blank"
          rel="noopener"
        >
          <button className={"call2Action " + className} type="button">
            {text}
          </button>
        </a>
      ) : (
        <a aria-label={`go to ${link} page`} href={`${link}`} target="_self">
          <button className={"call2Action " + className} type="button">
            {text}
          </button>
        </a>
      )}
    </React.Fragment>
  );
};

export default Call2Action;
