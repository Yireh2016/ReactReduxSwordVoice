import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  left: -4px;
  top: -30px;
  height: 800px;
  position: absolute;

  @media (max-width: 1050px) {
    width: 150vw;
    height: auto;
  }

  @media (max-width: 700px) {
    width: 160vw;
    left: -70px;
    top: 0px;
  }
`;
const Background = ({ image }) => {
  return (
    <SVG
      viewBox="0 0 984 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M792.38 126.018C867.24 244.259 978 945.702 978 945.702C978 945.702 425.013 1047.13 190.06 945.702C-43.6553 844.804 3.77144 40.9584 4.2775 1.5613C4.27893 1.375 4.28028 1.1879 4.28154 1C4.28154 1.16552 4.28018 1.3527 4.2775 1.5613C3.93776 45.7763 -0.943654 45.1081 110.128 45.1081C366.277 45.1081 717.519 7.77809 792.38 126.018Z"
          fill="url(#pattern0)"
        />
        <path
          d="M792.38 126.018C867.24 244.259 978 945.702 978 945.702C978 945.702 425.013 1047.13 190.06 945.702C-44.8928 844.27 4.28156 32.426 4.28154 1C3.98096 45.7819 -1.41166 45.1081 110.128 45.1081C366.277 45.1081 717.519 7.77809 792.38 126.018Z"
          stroke="#F95F0B"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="-5"
          y="0.993164"
          width="988.14"
          height="998.79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0"
            transform="translate(-0.251405) scale(0.00117407)"
          />
        </pattern>
        <image id="image0" width="1280" height="862" xlinkHref={image} />
      </defs>
    </SVG>
  );
};

export default Background;
