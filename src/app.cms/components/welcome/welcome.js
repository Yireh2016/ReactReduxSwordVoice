import React, { Component } from "react";
import { connect } from "react-redux";
//css
import "./welcome.css";
import styled from "styled-components";

//assets
import svLogo from "../../assets/welcome/SV_Logo.svg";

const SVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  @media (max-width: 750px) {
    width: 116px;
    top: -29px;
    left: 15px;
  }

  @media (max-width: 1050px) {
    width: 154px;
    top: -10px;
    left: 15px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.img`
  width: 200px;
  margin: 0 auto;
`;

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="welcomeLayout">
        <Container className="welcomeCont">
          <SVG
            width="247"
            height="129"
            viewBox="0 0 247 129"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M98.7602 117.994C98.6364 117.255 98.5375 116.238 98.4634 114.943C98.4125 113.645 98.4154 112.242 98.4722 110.735C98.5522 109.225 98.6995 107.691 98.9142 106.134C99.1251 104.555 99.4421 103.111 99.865 101.805C100.311 100.495 100.875 99.3903 101.556 98.4921C102.261 97.59 103.11 97.0558 104.104 96.8894C104.682 96.7927 105.185 96.8155 105.613 96.9578C106.064 97.0962 106.447 97.3291 106.763 97.6564C107.099 97.9567 107.363 98.3283 107.556 98.7713C107.768 99.1873 107.919 99.6611 108.008 100.193C107.591 100.262 107.239 100.215 106.95 100.049C106.657 99.8604 106.385 99.6564 106.134 99.4369C105.884 99.2175 105.626 99.023 105.36 98.8537C105.113 98.6573 104.805 98.5901 104.435 98.652C103.695 98.7758 103.073 99.2482 102.569 100.069C102.061 100.867 101.643 101.852 101.317 103.023C100.99 104.195 100.742 105.484 100.574 106.891C100.401 108.274 100.282 109.625 100.218 110.942C100.172 112.233 100.167 113.41 100.203 114.474C100.234 115.514 100.293 116.288 100.378 116.797C100.49 117.467 100.635 118.12 100.812 118.756C100.986 119.369 101.231 119.91 101.548 120.38C101.864 120.849 102.269 121.209 102.762 121.46C103.252 121.687 103.901 121.732 104.71 121.597C105.634 121.442 106.497 120.989 107.298 120.237C108.122 119.481 108.856 118.61 109.499 117.623C110.138 116.613 110.665 115.575 111.08 114.507C111.492 113.416 111.763 112.48 111.893 111.698C111.936 111.667 112.038 111.638 112.199 111.611C112.357 111.56 112.46 111.531 112.506 111.524C112.783 111.477 113.043 111.469 113.286 111.5C113.548 111.504 113.71 111.691 113.772 112.06C113.757 112.823 113.565 113.663 113.196 114.581C112.822 115.475 112.355 116.373 111.793 117.275C111.231 118.177 110.59 119.033 109.87 119.842C109.15 120.652 108.436 121.354 107.727 121.948C107.018 122.541 106.343 122.975 105.699 123.249C105.06 123.546 104.515 123.626 104.064 123.487C103.301 123.615 102.607 123.517 101.983 123.194C101.378 122.844 100.85 122.386 100.398 121.819C99.9703 121.25 99.6154 120.62 99.3337 119.93C99.0519 119.241 98.8608 118.595 98.7602 117.994ZM117.568 119.41C117.552 118.319 117.434 116.973 117.213 115.37C117.015 113.763 116.754 112.06 116.429 110.261C116.128 108.458 115.782 106.603 115.391 104.696C115.001 102.789 114.605 100.99 114.203 99.2987C113.797 97.5843 113.399 96.0587 113.009 94.722C112.642 93.3813 112.312 92.3316 112.019 91.5727C112.204 91.3992 112.359 91.2662 112.487 91.1736C112.633 91.0541 112.81 90.9769 113.018 90.9421C113.18 90.915 113.324 90.9265 113.452 90.9765C113.575 91.0034 113.687 91.1035 113.787 91.2768C115.008 95.7302 116.084 100.243 117.015 104.816C117.97 109.386 118.875 113.939 119.729 118.478C119.764 118.686 119.812 118.975 119.874 119.345C119.932 119.691 119.952 119.878 119.932 119.905C119.636 120.121 119.36 120.25 119.106 120.293C118.848 120.312 118.605 120.282 118.378 120.201C118.147 120.097 117.96 119.974 117.817 119.831C117.674 119.689 117.591 119.548 117.568 119.41ZM122.464 119.695C122.212 118.193 121.913 116.615 121.565 114.962C121.24 113.306 120.902 111.64 120.55 109.964C120.218 108.261 119.926 106.587 119.674 104.942C119.422 103.297 119.269 101.742 119.214 100.278C119.257 100.247 119.359 100.218 119.521 100.191C119.702 100.137 119.827 100.104 119.896 100.093C120.22 100.038 120.484 100.054 120.688 100.138C120.912 100.196 121.052 100.398 121.11 100.745C121.339 102.109 121.577 103.602 121.824 105.224C122.091 106.819 122.352 108.45 122.608 110.118C122.882 111.76 123.155 113.389 123.426 115.007C123.697 116.626 123.965 118.09 124.232 119.399C124.321 119.789 124.283 120.056 124.117 120.203C123.978 120.369 123.782 120.473 123.528 120.515C123.25 120.562 123.008 120.531 122.799 120.423C122.595 120.339 122.483 120.096 122.464 119.695ZM117.546 94.9964C117.5 94.719 117.561 94.5186 117.731 94.3952C117.9 94.2718 118.101 94.1908 118.332 94.1521C118.794 94.0747 119.108 94.1766 119.274 94.4578C119.44 94.7389 119.556 95.076 119.622 95.469C119.525 95.7465 119.383 95.9604 119.194 96.1108C119.002 96.2381 118.786 96.2979 118.547 96.2904C118.327 96.2559 118.117 96.1366 117.917 95.9325C117.739 95.7245 117.616 95.4125 117.546 94.9964ZM125.406 111.718C125.336 110.874 125.255 109.961 125.162 108.978C125.065 107.973 125.004 106.973 124.98 105.979C124.98 104.981 125.021 104.023 125.106 103.106C125.213 102.185 125.407 101.357 125.688 100.62C125.988 99.8573 126.405 99.229 126.941 98.7355C127.472 98.2188 128.167 97.9004 129.027 97.7804C129.604 97.6837 130.084 97.853 130.466 98.2881C130.871 98.7194 131.189 99.2721 131.421 99.9462C131.675 100.617 131.865 101.321 131.989 102.061C132.132 102.774 132.242 103.361 132.319 103.824C131.857 103.901 131.442 103.768 131.076 103.426C130.706 103.06 130.396 102.625 130.145 102.12C129.894 101.616 129.691 101.115 129.537 100.618L129.265 99.6298C129.242 99.6336 129.195 99.6414 129.126 99.653C129.076 99.6376 129.039 99.6318 129.016 99.6357C128.623 99.7015 128.29 99.983 128.017 100.48C127.767 100.974 127.549 101.592 127.365 102.336C127.2 103.053 127.085 103.856 127.02 104.746C126.951 105.613 126.915 106.463 126.912 107.295C126.908 108.127 126.918 108.898 126.942 109.607C126.985 110.289 127.037 110.815 127.099 111.185C127.153 111.793 127.264 112.452 127.43 113.161C127.596 113.87 127.847 114.517 128.183 115.103C128.518 115.688 128.933 116.177 129.426 116.57C129.916 116.939 130.521 117.147 131.241 117.193C132.097 117.05 132.771 116.818 133.264 116.498C133.757 116.178 134.132 115.794 134.39 115.347C134.671 114.896 134.863 114.412 134.967 113.896C135.071 113.38 135.161 112.854 135.238 112.318C135.334 111.755 135.431 111.204 135.531 110.665C135.631 110.125 135.818 109.607 136.091 109.11C136.357 108.994 136.555 108.973 136.686 109.046C136.836 109.092 136.946 109.18 137.016 109.311C137.085 109.442 137.135 109.6 137.166 109.785L137.23 110.167C137.393 111.137 137.388 112.101 137.215 113.056C137.042 114.012 136.704 114.9 136.199 115.722C135.691 116.519 135.035 117.212 134.23 117.798C133.444 118.357 132.497 118.729 131.387 118.915C130.462 119.07 129.64 118.91 128.919 118.437C128.217 117.937 127.623 117.299 127.137 116.525C126.674 115.747 126.298 114.919 126.009 114.041C125.715 113.139 125.514 112.365 125.406 111.718ZM137.16 90.5736C137.568 90.0301 137.918 89.7813 138.211 89.8274C138.527 89.8696 138.799 90.1449 139.026 90.6533C139.254 91.1618 139.451 91.8417 139.617 92.6932C139.784 93.5446 139.934 94.5174 140.07 95.6116C140.225 96.6788 140.357 97.8212 140.465 99.0387C140.57 100.233 140.685 101.414 140.809 102.581C140.929 103.726 141.064 104.82 141.215 105.864C141.366 106.908 141.552 107.804 141.772 108.551L141.876 108.534C141.922 108.526 141.955 108.509 141.974 108.482C142.975 107.078 143.837 105.627 144.561 104.128C145.284 102.629 145.928 101.226 146.494 99.919C147.056 98.5893 147.552 97.4369 147.983 96.4618C148.437 95.4828 148.891 94.7889 149.346 94.3802C149.692 94.3222 149.991 94.3316 150.241 94.4085C150.515 94.4815 150.687 94.7261 150.756 95.1422C150.764 95.1884 150.766 95.2713 150.762 95.3907C150.778 95.4832 150.789 95.5525 150.797 95.5988C150.416 96.8744 149.98 98.1712 149.488 99.4893C148.991 100.784 148.432 102.054 147.808 103.299C147.185 104.544 146.482 105.743 145.701 106.896C144.943 108.044 144.088 109.114 143.137 110.105C143.141 110.128 143.137 110.176 143.126 110.249C143.133 110.296 143.139 110.33 143.143 110.353C143.182 110.585 143.409 110.808 143.825 111.023C144.265 111.235 144.795 111.42 145.415 111.577C146.059 111.731 146.76 111.875 147.519 112.009C148.301 112.14 149.055 112.24 149.779 112.308C150.527 112.373 151.211 112.413 151.831 112.428C152.475 112.44 152.97 112.416 153.316 112.358C153.332 112.451 153.361 112.624 153.403 112.878C153.469 113.129 153.502 113.396 153.502 113.682C153.502 113.967 153.464 114.234 153.387 114.485C153.306 114.712 153.139 114.847 152.885 114.89L152.746 114.913C152.7 114.921 152.663 114.915 152.636 114.896L142.052 112.568C142.257 113.935 142.35 115.061 142.332 115.943C142.309 116.802 142.215 117.448 142.05 117.879C141.911 118.33 141.713 118.565 141.455 118.585C141.22 118.6 140.981 118.45 140.738 118.134L137.16 90.5736ZM180.212 98.4114C179.988 98.6389 179.584 98.9917 178.999 99.4699C178.432 99.9211 177.826 100.415 177.179 100.951C176.532 101.487 175.918 102.005 175.336 102.507C174.751 102.985 174.347 103.338 174.123 103.565C173.68 104.043 173.409 104.552 173.309 105.091C173.209 105.631 173.21 106.201 173.31 106.802C173.407 107.38 173.567 107.983 173.791 108.611C174.011 109.216 174.199 109.838 174.353 110.477C174.407 110.801 174.354 111.119 174.192 111.431C174.03 111.743 173.788 111.927 173.464 111.981C173.325 112.004 173.169 111.994 172.996 111.952C172.819 111.887 172.716 111.773 172.689 111.611L168.172 89.5187C168.149 89.38 168.165 89.1873 168.218 88.9407C168.295 88.6902 168.366 88.5476 168.432 88.5129C168.501 88.5013 168.596 88.4973 168.715 88.5011C168.858 88.501 169.004 88.524 169.154 88.5702C169.301 88.5932 169.438 88.6297 169.565 88.6797C169.711 88.7027 169.811 88.7335 169.865 88.772C170.113 89.6812 170.348 90.7348 170.573 91.933C170.797 93.1312 171.023 94.3409 171.251 95.5622C171.502 96.7796 171.759 97.9604 172.022 99.1046C172.304 100.222 172.615 101.156 172.955 101.907C173.879 101.325 174.749 100.775 175.566 100.258C176.382 99.7414 177.074 99.186 177.64 98.5923C178.206 97.9985 178.616 97.324 178.869 96.5686C179.119 95.7901 179.144 94.8711 178.943 93.8117C178.846 93.2338 178.749 92.7271 178.653 92.2918C178.556 91.8565 178.438 91.4366 178.299 91.0321C178.157 90.6045 177.975 90.1596 177.755 89.6973C177.555 89.2081 177.308 88.6554 177.014 88.0391C176.898 87.6307 176.923 87.3533 177.089 87.2067C177.255 87.0602 177.464 86.9657 177.719 86.9231C178.019 86.8728 178.262 86.9035 178.447 87.0151C178.632 87.1267 178.79 87.2904 178.921 87.5061C179.076 87.7179 179.187 87.9606 179.257 88.2341C179.323 88.4845 179.386 88.7234 179.448 88.9506C179.556 89.3128 179.707 89.8579 179.9 90.586C180.093 91.3141 180.304 92.1462 180.532 93.0824C180.779 93.9916 181.036 94.9585 181.302 95.9833C181.592 97.0041 181.86 97.9692 182.108 98.8783C182.355 99.7875 182.563 100.608 182.733 101.34C182.927 102.068 183.077 102.613 183.185 102.975C183.402 103.842 183.639 104.694 183.898 105.53C184.157 106.366 184.361 107.234 184.512 108.136L184.605 108.691C184.636 108.875 184.644 109.064 184.629 109.257C184.633 109.423 184.577 109.586 184.461 109.748C184.365 109.883 184.184 110.009 183.918 110.124C183.452 109.893 183.153 109.599 183.022 109.241C182.891 108.882 182.765 108.488 182.645 108.056C182.58 107.806 182.493 107.428 182.385 106.923C182.272 106.396 182.129 105.825 181.956 105.213C181.801 104.573 181.631 103.913 181.446 103.231C181.28 102.522 181.11 101.861 180.936 101.249C180.781 100.609 180.638 100.039 180.507 99.5383C180.376 99.0375 180.277 98.6618 180.212 98.4114ZM186.652 101.967C186.541 102.01 186.373 102.074 186.15 102.159C185.926 102.243 185.685 102.296 185.427 102.315C185.169 102.334 184.938 102.302 184.734 102.217C184.506 102.136 184.369 101.957 184.323 101.68C184.296 101.518 184.311 101.397 184.369 101.316C184.427 101.235 184.525 101.112 184.664 100.946C185.102 100.445 185.441 99.8414 185.68 99.1361C185.937 98.4038 186.154 97.6427 186.331 96.8527C186.504 96.0396 186.69 95.2361 186.89 94.4422C187.109 93.6214 187.388 92.8737 187.727 92.1992C188.065 91.5246 188.527 90.9483 189.113 90.4701C189.698 89.992 190.467 89.6851 191.418 89.5496C191.811 89.4839 192.266 89.5028 192.782 89.6065C193.299 89.7102 193.792 89.8891 194.262 90.1431C194.729 90.374 195.137 90.6858 195.488 91.0786C195.839 91.4714 196.059 91.9336 196.148 92.4653C196.294 92.6308 196.223 92.916 195.935 93.3208C195.669 93.7217 195.282 94.1785 194.774 94.6913C194.262 95.181 193.672 95.7073 193.006 96.2703C192.359 96.8063 191.732 97.3154 191.123 97.7974C190.515 98.2794 189.979 98.7017 189.517 99.0642C189.055 99.4267 188.755 99.6908 188.616 99.8566C188.539 100.107 188.491 100.388 188.472 100.701C188.453 101.013 188.444 101.311 188.444 101.596C188.463 101.855 188.481 102.101 188.496 102.336C188.531 102.544 188.558 102.706 188.578 102.822C188.651 103.261 188.709 103.75 188.752 104.29C188.818 104.825 188.926 105.33 189.077 105.804C189.246 106.25 189.509 106.611 189.863 106.884C190.214 107.134 190.748 107.199 191.464 107.079C192.227 106.952 192.913 106.647 193.521 106.165C194.126 105.66 194.671 105.081 195.156 104.43C195.641 103.778 196.06 103.09 196.415 102.366C196.792 101.637 197.119 100.965 197.396 100.348C197.692 99.7042 197.959 99.1723 198.198 98.7522C198.437 98.332 198.66 98.1045 198.868 98.0697C199.099 98.031 199.35 98.0367 199.619 98.0866C199.908 98.1095 200.078 98.2712 200.128 98.5717C200.198 98.9878 200.108 99.5138 199.858 100.15C199.631 100.782 199.294 101.468 198.848 102.208C198.424 102.944 197.908 103.696 197.3 104.463C196.711 105.203 196.101 105.888 195.469 106.516C194.834 107.121 194.197 107.644 193.557 108.084C192.914 108.5 192.327 108.753 191.795 108.842C190.755 109.016 189.926 108.893 189.31 108.474C188.693 108.054 188.205 107.482 187.846 106.758C187.51 106.03 187.259 105.24 187.093 104.389C186.946 103.51 186.799 102.703 186.652 101.967ZM191.466 91.5378C191.073 91.6036 190.69 91.8697 190.316 92.3362C189.939 92.7795 189.6 93.3115 189.3 93.932C189.019 94.5256 188.8 95.1326 188.642 95.753C188.504 96.3465 188.466 96.8282 188.528 97.198C188.874 97.14 189.35 96.9297 189.955 96.5671C190.579 96.1775 191.181 95.7321 191.763 95.2308C192.344 94.7295 192.841 94.2187 193.253 93.6982C193.665 93.1778 193.838 92.7211 193.772 92.3281C193.738 92.1201 193.628 91.9602 193.443 91.8486C193.258 91.737 193.042 91.6543 192.795 91.6005C192.572 91.5429 192.34 91.5103 192.102 91.5027C191.863 91.4952 191.651 91.5069 191.466 91.5378ZM200.504 90.1679L200.458 89.8905C200.419 89.6593 200.473 89.484 200.619 89.3644C200.789 89.241 200.989 89.16 201.22 89.1213C201.405 89.0903 201.582 89.0844 201.752 89.1036C201.918 89.0996 202.066 89.2055 202.197 89.4212C202.325 89.7563 202.475 90.2301 202.649 90.8427C202.819 91.4321 203.012 92.0889 203.228 92.8132C203.444 93.5374 203.668 94.3079 203.9 95.1246C204.151 95.9143 204.385 96.6713 204.601 97.3955C204.837 98.0928 205.06 98.7207 205.273 99.2792C205.485 99.8378 205.686 100.256 205.875 100.533C205.434 98.3255 205.182 96.3953 205.119 94.7423C205.053 93.0663 205.223 91.6713 205.631 90.5575C206.058 89.4167 206.747 88.5647 207.698 88.0015C208.669 87.4114 209.948 87.1023 211.536 87.0743C212.252 86.9544 212.674 87.2758 212.802 88.0387C212.852 88.3392 212.691 88.5801 212.317 88.7614C211.939 88.9197 211.512 89.0625 211.034 89.19C210.553 89.2943 210.084 89.4083 209.63 89.5319C209.175 89.6555 208.859 89.8272 208.682 90.0469C207.928 90.6485 207.458 91.4637 207.274 92.4926C207.113 93.5176 207.073 94.7006 207.155 96.0414C207.237 97.3822 207.374 98.8444 207.568 100.428C207.781 101.984 207.898 103.605 207.918 105.288C207.957 105.52 207.893 105.708 207.728 105.855C207.562 106.001 207.341 106.098 207.063 106.144C206.809 106.187 206.545 106.172 206.271 106.099C206.021 106.022 205.807 105.879 205.629 105.671L200.504 90.1679ZM217.131 96.8671C217.019 96.9096 216.852 96.9733 216.628 97.0582C216.405 97.1431 216.164 97.1953 215.906 97.2147C215.648 97.2341 215.417 97.2015 215.212 97.1169C214.985 97.0361 214.848 96.8571 214.802 96.5797C214.774 96.4178 214.79 96.2965 214.848 96.2155C214.905 96.1346 215.003 96.0112 215.142 95.8454C215.581 95.3442 215.92 94.741 216.158 94.0357C216.416 93.3035 216.633 92.5423 216.81 91.7523C216.983 90.9392 217.169 90.1357 217.369 89.3418C217.588 88.521 217.867 87.7733 218.205 87.0988C218.544 86.4243 219.006 85.8479 219.591 85.3698C220.177 84.8916 220.945 84.5848 221.897 84.4493C222.29 84.3835 222.744 84.4025 223.261 84.5062C223.777 84.6099 224.271 84.7887 224.741 85.0427C225.207 85.2736 225.616 85.5854 225.967 85.9782C226.318 86.371 226.537 86.8332 226.626 87.3649C226.773 87.5305 226.702 87.8157 226.413 88.2204C226.148 88.6213 225.761 89.0782 225.252 89.591C224.74 90.0807 224.151 90.607 223.485 91.17C222.838 91.706 222.21 92.215 221.602 92.697C220.993 93.1791 220.458 93.6013 219.996 93.9638C219.534 94.3263 219.233 94.5905 219.095 94.7562C219.018 95.0068 218.97 95.2881 218.951 95.6002C218.932 95.9123 218.922 96.2109 218.922 96.496C218.942 96.7542 218.959 97.0008 218.975 97.2358C219.01 97.4438 219.037 97.6057 219.056 97.7212C219.13 98.1604 219.188 98.6497 219.23 99.1892C219.296 99.7247 219.405 100.229 219.555 100.703C219.725 101.15 219.987 101.51 220.342 101.783C220.693 102.034 221.226 102.099 221.943 101.979C222.706 101.851 223.391 101.546 224 101.064C224.605 100.559 225.149 99.9809 225.634 99.3294C226.119 98.6779 226.539 97.9899 226.893 97.2653C227.27 96.5368 227.597 95.8642 227.874 95.2475C228.171 94.6039 228.438 94.072 228.677 93.6518C228.915 93.2317 229.139 93.0042 229.347 92.9694C229.578 92.9307 229.828 92.9363 230.098 92.9862C230.387 93.0091 230.557 93.1709 230.607 93.4714C230.676 93.8875 230.586 94.4135 230.336 95.0494C230.109 95.6815 229.773 96.3675 229.326 97.1076C228.903 97.8438 228.387 98.5955 227.779 99.3627C227.19 100.103 226.579 100.787 225.948 101.416C225.313 102.021 224.675 102.544 224.036 102.983C223.393 103.4 222.805 103.653 222.274 103.742C221.233 103.916 220.405 103.793 219.788 103.373C219.171 102.954 218.684 102.382 218.325 101.658C217.989 100.93 217.738 100.14 217.572 99.2885C217.425 98.4101 217.278 97.603 217.131 96.8671ZM221.944 86.4375C221.551 86.5032 221.168 86.7693 220.795 87.2358C220.417 87.6792 220.079 88.2111 219.779 88.8317C219.498 89.4252 219.278 90.0322 219.121 90.6527C218.983 91.2461 218.944 91.7278 219.006 92.0977C219.353 92.0396 219.829 91.8293 220.433 91.4667C221.057 91.0772 221.66 90.6317 222.242 90.1305C222.823 89.6292 223.32 89.1183 223.732 88.5979C224.144 88.0774 224.317 87.6207 224.251 87.2278C224.216 87.0197 224.106 86.8599 223.921 86.7483C223.736 86.6366 223.52 86.5539 223.274 86.5002C223.05 86.4425 222.819 86.4099 222.58 86.4024C222.341 86.3948 222.129 86.4065 221.944 86.4375ZM230.63 84.877C230.274 82.7503 229.968 80.639 229.713 78.5431C229.453 76.4241 229.207 74.2434 228.974 72.001C229.013 71.8045 229.074 71.6754 229.159 71.6137C229.24 71.5289 229.361 71.4729 229.523 71.4458C229.754 71.4071 229.928 71.4494 230.043 71.5726C230.155 71.6727 230.236 71.8018 230.286 71.9597C230.36 72.1138 230.402 72.2968 230.414 72.5087C230.445 72.6936 230.472 72.8554 230.495 72.9941L232.271 83.6044C232.34 84.0205 232.448 84.4539 232.595 84.9046L233.035 86.2568C233.205 86.7036 233.336 87.1332 233.429 87.5454C233.541 87.9306 233.574 88.2697 233.528 88.5625C233.524 88.8245 233.423 89.0674 233.222 89.291C233.045 89.5107 232.83 89.6419 232.575 89.6844C232.159 89.754 231.835 89.5943 231.604 89.2053C231.372 88.8163 231.187 88.3483 231.048 87.8012C230.932 87.2503 230.839 86.6955 230.77 86.1369C230.723 85.5744 230.677 85.1544 230.63 84.877ZM235.513 100.635L235.42 100.08C235.401 99.9646 235.393 99.847 235.397 99.7276C235.396 99.585 235.423 99.4617 235.477 99.3576C235.531 99.2536 235.627 99.1899 235.766 99.1667C236.228 99.0894 236.514 99.1604 236.622 99.38C236.749 99.5726 236.838 99.8191 236.888 100.12C236.942 100.443 236.94 100.717 236.883 100.94C236.848 101.16 236.6 101.308 236.137 101.386C235.999 101.409 235.887 101.38 235.802 101.299C235.717 101.219 235.654 101.122 235.611 101.011C235.565 100.876 235.532 100.75 235.513 100.635ZM235.519 84.0589C235.163 81.9322 234.857 79.8209 234.602 77.725C234.342 75.6059 234.096 73.4252 233.863 71.1829C233.902 70.9864 233.963 70.8572 234.048 70.7955C234.129 70.7107 234.25 70.6548 234.412 70.6277C234.643 70.589 234.817 70.6313 234.932 70.7545C235.044 70.8546 235.125 70.9836 235.175 71.1416C235.249 71.2956 235.291 71.4786 235.303 71.6906C235.334 71.8755 235.361 72.0373 235.384 72.176L237.16 82.7863C237.229 83.2024 237.338 83.6358 237.484 84.0865L237.924 85.4386C238.094 85.8855 238.226 86.315 238.318 86.7272C238.43 87.1125 238.463 87.4515 238.417 87.7444C238.414 88.0064 238.312 88.2492 238.111 88.4728C237.934 88.6926 237.719 88.8237 237.464 88.8663C237.048 88.9359 236.724 88.7762 236.493 88.3872C236.262 87.9982 236.076 87.5301 235.937 86.9831C235.821 86.4322 235.728 85.8774 235.659 85.3187C235.612 84.7562 235.566 84.3363 235.519 84.0589ZM240.402 99.8168L240.309 99.262C240.29 99.1464 240.282 99.0289 240.286 98.9094C240.285 98.7669 240.312 98.6436 240.366 98.5395C240.42 98.4354 240.516 98.3718 240.655 98.3486C241.117 98.2712 241.403 98.3423 241.511 98.5619C241.638 98.7544 241.727 99.001 241.777 99.3015C241.831 99.6251 241.829 99.8987 241.772 100.122C241.737 100.342 241.489 100.49 241.026 100.568C240.888 100.591 240.776 100.562 240.691 100.481C240.606 100.4 240.543 100.304 240.5 100.192C240.454 100.058 240.421 99.9324 240.402 99.8168ZM240.408 83.2407C240.052 81.114 239.747 79.0027 239.491 76.9068C239.231 74.7878 238.985 72.6071 238.753 70.3647C238.791 70.1682 238.853 70.0391 238.937 69.9774C239.018 69.8926 239.139 69.8366 239.301 69.8095C239.532 69.7709 239.706 69.8131 239.821 69.9364C239.933 70.0365 240.014 70.1655 240.064 70.3234C240.138 70.4775 240.18 70.6605 240.192 70.8724C240.223 71.0573 240.25 71.2192 240.273 71.3578L242.049 81.9681C242.118 82.3842 242.227 82.8176 242.373 83.2683L242.813 84.6205C242.983 85.0673 243.115 85.4969 243.207 85.9091C243.319 86.2943 243.352 86.6334 243.306 86.9262C243.303 87.1883 243.201 87.4311 243 87.6547C242.823 87.8744 242.608 88.0056 242.353 88.0481C241.937 88.1177 241.613 87.9581 241.382 87.569C241.151 87.18 240.965 86.712 240.826 86.165C240.71 85.614 240.617 85.0593 240.548 84.5006C240.501 83.9381 240.455 83.5181 240.408 83.2407ZM245.291 98.9986L245.198 98.4438C245.179 98.3283 245.171 98.2107 245.175 98.0913C245.175 97.9487 245.201 97.8254 245.255 97.7213C245.309 97.6173 245.405 97.5536 245.544 97.5304C246.006 97.4531 246.292 97.5242 246.4 97.7437C246.527 97.9363 246.616 98.1828 246.666 98.4833C246.72 98.807 246.718 99.0805 246.661 99.304C246.626 99.5237 246.378 99.6722 245.916 99.7496C245.777 99.7728 245.665 99.744 245.58 99.6631C245.495 99.5822 245.432 99.486 245.389 99.3742C245.343 99.2394 245.31 99.1142 245.291 98.9986Z"
              fill="black"
            />
            <path
              d="M35.0323 22.144L34.8021 22.5878L34.8435 22.6093L34.8881 22.6227L35.0323 22.144ZM33.4737 20.9375C33.2105 21.021 33.0648 21.302 33.1482 21.5653L34.5083 25.8548C34.5917 26.1181 34.8728 26.2638 35.136 26.1803C35.3992 26.0969 35.5449 25.8158 35.4615 25.5526L34.2526 21.7397L38.0655 20.5307C38.3287 20.4473 38.4745 20.1662 38.391 19.903C38.3075 19.6398 38.0265 19.494 37.7633 19.5775L33.4737 20.9375ZM40.7056 90.6692L41.1524 90.8936L41.1524 90.8936L40.7056 90.6692ZM35.2624 21.7001L33.855 20.9703L33.3947 21.858L34.8021 22.5878L35.2624 21.7001ZM35.0323 22.144C34.8881 22.6227 34.8883 22.6228 34.8888 22.6229C34.8892 22.6231 34.8899 22.6233 34.8909 22.6236C34.8928 22.6241 34.8956 22.625 34.8995 22.6262C34.9072 22.6285 34.9188 22.632 34.9342 22.6367C34.9651 22.646 35.0113 22.6601 35.0724 22.6787C35.1945 22.716 35.3761 22.7717 35.6134 22.8452C36.0879 22.9922 36.7849 23.2104 37.6739 23.4946C39.452 24.063 41.9977 24.8956 45.0667 25.952C51.2056 28.065 59.434 31.0718 67.7977 34.648C76.165 38.2258 84.6503 42.3663 91.3118 46.7439C94.6426 48.9327 97.5037 51.172 99.6635 53.4193C101.827 55.6708 103.257 57.8996 103.78 60.0648L104.752 59.8302C104.171 57.4238 102.61 55.0425 100.384 52.7264C98.1548 50.4063 95.2277 48.1206 91.861 45.9082C85.1275 41.4833 76.5803 37.3158 68.1908 33.7285C59.7978 30.1397 51.5452 27.1243 45.3922 25.0064C42.3153 23.9474 39.7625 23.1124 37.9784 22.542C37.0864 22.2569 36.3865 22.0378 35.9093 21.89C35.6707 21.8161 35.4878 21.76 35.3644 21.7223C35.3027 21.7035 35.2558 21.6892 35.2243 21.6797C35.2086 21.6749 35.1967 21.6713 35.1887 21.6689C35.1847 21.6677 35.1817 21.6668 35.1796 21.6662C35.1786 21.6658 35.1778 21.6656 35.1773 21.6655C35.1767 21.6653 35.1764 21.6652 35.0323 22.144ZM103.78 60.0648C104.298 62.2106 103.889 63.9674 102.775 65.4722C101.644 67.0011 99.7606 68.3018 97.2756 69.4427C92.3022 71.726 85.1398 73.2747 77.4757 74.8351C69.8414 76.3894 61.7306 77.9519 54.9597 80.2716C48.2122 82.5832 42.6443 85.694 40.2588 90.4449L41.1524 90.8936C43.3468 86.5234 48.5655 83.5192 55.2838 81.2176C61.9786 78.924 70.0128 77.375 77.6752 75.815C85.3077 74.261 92.5937 72.6925 97.6929 70.3515C100.244 69.1802 102.303 67.7919 103.579 66.067C104.873 64.3179 105.337 62.256 104.752 59.8302L103.78 60.0648ZM40.2588 90.4449C39.0642 92.824 38.9023 94.9825 39.601 96.9156C40.2934 98.8312 41.8049 100.453 43.8153 101.828C47.8271 104.573 54.0025 106.459 60.3911 107.761C66.7962 109.067 73.4822 109.799 78.5619 110.205C81.1029 110.408 83.2446 110.53 84.7515 110.601C85.505 110.636 86.1 110.659 86.5069 110.673C86.7104 110.68 86.8669 110.685 86.9728 110.688C87.0257 110.689 87.066 110.69 87.0931 110.691C87.1067 110.691 87.1169 110.691 87.1239 110.692C87.1274 110.692 87.13 110.692 87.1318 110.692C87.1327 110.692 87.1334 110.692 87.1339 110.692C87.1344 110.692 87.1347 110.692 87.1462 110.192C87.1577 109.692 87.1576 109.692 87.1572 109.692C87.1568 109.692 87.1563 109.692 87.1555 109.692C87.1539 109.692 87.1515 109.692 87.1482 109.692C87.1417 109.692 87.1319 109.692 87.1188 109.691C87.0925 109.69 87.0532 109.689 87.0012 109.688C86.8972 109.685 86.7426 109.68 86.5411 109.673C86.1381 109.66 85.5474 109.637 84.7985 109.602C83.3005 109.531 81.17 109.411 78.6416 109.208C73.5825 108.804 66.9408 108.076 60.5908 106.782C54.2243 105.484 48.217 103.629 44.38 101.003C42.4659 99.6932 41.1364 98.2217 40.5414 96.5756C39.9527 94.947 40.0571 93.0751 41.1524 90.8936L40.2588 90.4449Z"
              fill="coral"
            />
          </SVG>

          <Logo src={svLogo} alt="SwordVoice Logo" />
          <h1>
            <span>SwordVoice</span>{" "}
            {this.props.userType === "admin"
              ? "Content Managment System"
              : "Profile Manager"}
          </h1>
        </Container>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    userType: state.login.userType
  };
};

export default connect(stateToProps)(Welcome);
