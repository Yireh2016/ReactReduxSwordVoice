//modules
import React, { Component } from "react";
import NavBar from "../navbar/navbar.component";
import is from "is_js";
import Helmet from "react-helmet";
import styled, { keyframes } from "styled-components";

import { connect } from "react-redux";
//imagenes
import imgFondo from "../../assets/img/home/creative1280.jpg";
import imgFondoMed from "../../assets/img/home/creative760.jpg";
//css
import "./home.css";
//componentes
import FooterApp from "../footer/footer.component";
import Call2Action from "../general/call2action.component";
import SwordVoice from "../general/swordVoice/swordVoice.component";

import whiteSeal from "../../assets/svgIcons/selloSWAcademy_white.png";

//layouts

const Seal = styled.img`
  width: 125px;
  transform: rotate(-20deg);

  @media (max-width: 700px) {
    width: 70px;
  }
`;

const verticalMoveIn1 = keyframes`

0%{
   transform: translateY(0%);
 }
33%{
  transform: translateY(-25%) ;
}
 100%{
   transform: translateY(0%);
  }

 
`; //.13,.84,.87,.29

const verticalMoveOut1 = keyframes`

0%{
   transform: translateY(0%);
 }
33%{
  transform: translateY(-8%) ;
}
 100%{
   transform: translateY(0%);
  }
`;

const sealMoveIn = keyframes`

0%{
   transform: translateX(-100%);
 }

 100%{
   transform: translateX(calc(125px * 4)) 
  }

 
`;

const sealMoveOut = keyframes`

0%{
   transform: translateX(calc(125px * 4));
  }
  100%{
    transform: translateX(0) ;
   }
`;

const shrinkIn = keyframes`
0%{
    transform:scale(1,1);
  }
  100%{
     transform:scale(0.8,1) ;
   }
`;

const shrinkOut = keyframes`
0%{
   transform:scale(0.8,1);
  }
  25%{
     transform:scale(1.15,1) ;
   }
   50%{
    transform:scale(.9,1);
  }
   100%{
    transform:scale(1,1);
  }
`;

const sealRotate = keyframes`

  0%{
    transform:rotate(0deg) ;
  }

  100%{
    transform:rotate(1080deg)
  }

`;

const sealRotate2 = keyframes`

  0%{
    transform:rotate(1080deg)
  }

  100%{
    transform:rotate(700deg) ;
  }

`;
const BouncerContainer = styled.div`
  bottom: 0%;
  position: fixed;
  left: 0.5vw;
  transform: translateX(-100%);

  animation-name: ${sealMoveIn}, ${sealMoveOut};
  animation-duration: 1.5s, 2s;
  animation-delay: 6s, 7.5s;
  animation-timing-function: cubic-bezier(0.47, 0.75, 0.82, 0.89), ease-out;
  animation-fill-mode: none, forwards;
`;

const SealContainer = styled.div`
  animation-name: ${shrinkIn}, ${shrinkOut};
  animation-duration: 200ms, 400ms;
  animation-delay: 7.5s, 7700ms;
  animation-timing-function: ease, ease;

  @media (max-width: 1050px) {
    display: none;
  }

  img {
    animation-name: ${sealRotate}, ${sealRotate2};
    animation-duration: 1.5s, 2s;
    animation-delay: 6s, 7.5s;
    animation-timing-function: cubic-bezier(0.47, 0.75, 0.82, 0.89), ease-out;
  }
`;

const Slogan = styled.h2`
  font-weight: 500 !important;
  color: hsla(196, 97%, 46%, 1);
  word-spacing: 5px;
  letter-spacing: 0.9px !important;
  font-size: 5.5vh !important;
  position: fixed;
  bottom: 19vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  text-align: center;

  @media (max-width: 1050px) {
    font-size: 1.8rem !important;
  }

  @media (max-width: 700px) {
    font-size: 4.5vh !important;
    bottom: 22vh;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();

    this.fondoCursor = React.createRef();
  }
  render() {
    console.log("${process.env.CDN_URL}", process.env.CDN_URL);
    return (
      <div>
        <Helmet>
          <title>
            Fullstack Web & Mobile App Developers and UI/UX Designers Online
            Community
          </title>
          <meta
            name="Description"
            content="SwordVoice.com &#183; Online Community of Fullstack Web & Mobile App Developers and UI/UX
            Designers. Join Us and Let Your SwordVoice be Heard!!!"
          />
        </Helmet>
        <span
          style={{
            visibility: "hidden",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "-100"
          }}
        >
          SwordVoice
        </span>
        <header>
          <NavBar />
        </header>
        {/*Fondo PC*/}

        <div id="contenedorFondo">
          <img
            src={`${imgFondo} `}
            alt="imagen fondo"
            style={{
              position: "fixed",
              width: "120vw",
              height: "120vh"
            }}
          />
          <div
            style={{
              position: "fixed",
              height: "91px",
              backgroundColor: "white",
              top: "0",
              left: "0",
              width: "100vw"
            }}
          />
          <svg
            viewBox="0 0 1439 888"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.99988 0V891C-1.99988 891 5.4635 816.086 21.0129 714.11C44.6981 558.779 87.1444 340.659 150.553 228.865C255.589 43.6765 541.188 0 1439 0H-1.99988Z"
              fill="white"
            />
          </svg>

          <svg
            viewBox="0 0 1439 888"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1439 891V0C1439 0 1431.54 74.9139 1415.99 176.89C1392.3 332.221 1349.86 550.341 1286.45 662.135C1181.41 847.324 895.812 891 -2 891H1439Z"
              fill="white"
            />
          </svg>
        </div>
        {/*Fondo Tablet*/}
        <div id="imgFondoMd">
          <img
            src={imgFondoMed}
            className="appear fondoMdSm"
            alt="colorful background"
          />
          <svg viewBox="0 0 766 171" fill="none">
            <path
              className="bordeAnim orangeStroke"
              d="M766.499 170.6V1.74438e-05H380.5C69.5 5.76875e-05 0 170.6 0 170.6H766.499Z"
              transform="translate(-1 170.6) scale(1 -1)"
            />
          </svg>

          <svg viewBox="0 0 768 171" fill="none">
            <path
              className="bordeAnim orangeStroke"
              d="M0 170.6L769.5 168C769.5 168 688 0.000118333 383 0C78 -0.000118332 0 170.6 0 170.6Z"
              transform="translate(769.5) scale(-1 1)"
            />
          </svg>
        </div>
        {/*Fondo Phone*/}
        <div id="imgFondoSm">
          <img
            src={imgFondoMed}
            className="appear fondoMdSm"
            alt="colorful background"
          />
          <svg viewBox="0 0 371 321" fill="none">
            <path
              className="orangeStroke bordeAnim"
              d="M370.763 5.34058e-05L0 0V321C-3.43323e-05 217.5 48.2631 145 94.7631 91C141.263 37 304.263 5.34058e-05 370.763 5.34058e-05Z"
              transform="translate(370.763) scale(-1 1)"
            />
          </svg>
          <svg viewBox="0 0 140 246" fill="none">
            <path
              className="orangeStroke bordeAnim"
              d="M139.5 1.73185e-05H0V245.259C-3.43314e-05 167.156 66.5 5.62853e-05 139.5 1.73185e-05Z"
              transform="translate(0 245.259) scale(1 -1)"
            />
          </svg>
        </div>
        {/*Hero Section*/}
        <section className="home-hero ">
          <div id="tarjetaAnimada" className="center" />
          {/* <LightShadow factor={-10}> */}
          <h1 ref={this.titleRef}>
            {is.edge() ? "SwordVoice" : <SwordVoice delay={4} />}
          </h1>
          {/* </LightShadow> */}
          <h2>
            Fullstack Web & Mobile App Developers & UI/UX Designers Online
            Community. Join Us and...
          </h2>
        </section>
        <BouncerContainer>
          <SealContainer>
            <Seal src={whiteSeal} alt="white Swordvoice Seal" />
          </SealContainer>
        </BouncerContainer>
        <Slogan>Let Your SwordVoice be Heard!!! </Slogan>
        {/*Boton de accion y footer*/}
        {this.props.isLoggedIn ? (
          <Call2Action
            className="call2Action-home appear"
            text="Blog"
            link="/blog"
          />
        ) : (
          <Call2Action
            className="call2Action-home appear"
            text="Sign Up"
            onClick={() => {
              this.props.setShowSignUp(true);
            }}
          />
        )}
        <FooterApp
          id="homePage"
          estilos="appear footer"
          size="redesSociales-home"
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: state.logInStatus.isUserLoggedIn
  };
};

const mapActions = dispatch => {
  return {
    setShowSignUp: show => dispatch({ type: "SET_SHOW_SIGNUP", payload: show })
  };
};
export default connect(
  mapState,
  mapActions
)(Home);
