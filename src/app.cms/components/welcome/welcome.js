import React, { Component } from "react";
//css
import "./welcome.css";
//assets
import svLogo from "../../assets/welcome/SV_Logo.svg";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="welcomeLayout">
        <div className="welcomeCont">
          <img src={svLogo} alt="SwordVoice Logo" />
          <h1>
            <span>SwordVoice</span> Content Manager System
          </h1>
        </div>
      </div>
    );
  }
}

export default Welcome;
