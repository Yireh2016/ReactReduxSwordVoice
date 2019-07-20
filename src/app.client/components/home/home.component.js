//modules
import React, { Component } from "react";
import NavBar from "../navbar/navbar.component";
import is from "is_js";
import Helmet from "react-helmet";
//imagenes
import imgFondo from "../../assets/img/home/creative1280.jpg";
import imgFondoMed from "../../assets/img/home/creative760.jpg";
//css
import "./home.css";
//componentes
import FooterApp from "../footer/footer.component";
import Call2Action from "../general/call2action.component";
import SwordVoice from "../general/swordVoice/swordVoice.component";

//layouts

class Home extends Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();

    this.fondoCursor = React.createRef();
  }
  render() {
    return (
      <div>
        <Helmet>
          <meta
            name="Description"
            content="From custom web development and UI/UX to courses and tutorials come and discover by yourself what we offer, come and discover SwordVoice"
          />
        </Helmet>
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
        <section className="home-hero center">
          <div id="tarjetaAnimada" className="center" />
          {/* <LightShadow factor={-10}> */}
          <h1 ref={this.titleRef}>
            <span>SwordVoice</span>
            {is.edge() ? "SwordVoice" : <SwordVoice delay={4} />}
          </h1>
          {/* </LightShadow> */}
          <h2>Custom Web Design and Development, Courses and more</h2>
        </section>
        {/*Boton de accion y footer*/}
        <Call2Action className="call2Action-home appear" />
        <FooterApp
          id="homePage"
          estilos="appear footer"
          size="redesSociales-home"
        />
      </div>
    );
  }
}

export default Home;
