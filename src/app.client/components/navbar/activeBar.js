import React from "react";

const ActiveBar = props => {
  return (
    <svg
      className={props.className}
      id="active-line"
      height="5"
      viewBox="0 0 96 5"
      fill="none"
      style={props.style}
    >
      <path
        d="M0 0H96"
        transform="translate(0 2.5)"
        stroke="#F95F0B"
        strokeWidth="4"
      />
    </svg>
  );
};

export default ActiveBar;
