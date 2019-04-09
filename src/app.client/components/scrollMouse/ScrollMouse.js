import React from "react";
import Radium from "radium";

// // Stuff that matters.
// @keyframes scroll {
// 	0% {
// 		transform: translateY(0);
// 	}
// 	30% {
// 		transform: translateY(60px);
// 	}
// }

// svg #wheel {
// 	animation: scroll ease 2s infinite;
// }

// // Default stuff.
// *,
// *::before,
// *::after {
// 	box-sizing: border-box;
// 	-webkit-backface-visibility: hidden;
// 	-webkit-transform-style: preserve-3d;
// }

const keyframes = Radium.keyframes(
  {
    "0%": {
      transform: "translateY(0)"
    },
    "30%": {
      transform: "translateY(60px)"
    }
  },
  "pulse"
);

const styles = {
  svg: {
    wheel: {
      animation: "x ease 2s infinite",
      animationName: keyframes,
      fill: "none",
      stroke: "#fff",
      strokeWidth: "20px"
    }
  }
};

const ScrollMouse = () => {
  return (
    <div id="svgCont">
      <svg
        width="30px"
        height="100%"
        viewBox="0 0 247 390"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.5"
        }}
      >
        <path
          style={styles.svg.wheel}
          id="wheel"
          d="M123.359,79.775l0,72.843"
          // style="fill:none;stroke:#fff;stroke-width:20px;"
        />
        <path
          id="mouse"
          d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
          style={{ fill: "none", stroke: "#fff", strokeWidth: "20px" }}
        />
      </svg>
    </div>
  );
};

export default Radium(ScrollMouse);
