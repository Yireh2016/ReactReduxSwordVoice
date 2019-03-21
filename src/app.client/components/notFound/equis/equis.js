import React from "react";

const Equis = ({ onClick }) => {
  return (
    <svg onClick={onClick} viewBox="0 0 64 64" fill="none">
      <rect
        width="45"
        height="45"
        fill="black"
        fillOpacity="0"
        transform="translate(0 31.8198) rotate(-45)"
      />
      <line
        x1="15.9099"
        y1="15.91"
        x2="47.7297"
        y2="47.7298"
        stroke="#F95F0B"
        strokeWidth="5"
      />
      <line
        x1="15.91"
        y1="47.7298"
        x2="47.7298"
        y2="15.91"
        stroke="#F95F0B"
        strokeWidth="5"
      />
    </svg>
  );
};

export default Equis;
