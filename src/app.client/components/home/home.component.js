//modules
import React, { Component } from "react";
import NavBar from "../navbar/navbar.component";
//imagenes
import imgFondo from "../../assets/img/home/creative1280.jpg";
import imgFondoMed from "../../assets/img/home/creative760.jpg";
//css
import "./home.css";
//componentes
import FooterApp from "../footer/footer.component";
import Call2Action from "../general/call2action.component";
import LightShadow from "../general/lightShadow/lightShadow.component";
import SwordVoice from "../general/swordVoice/swordVoice.component";

class Home extends Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();

    this.fondoCursor = React.createRef();
  }
  render() {
    const estilos = {
      generales: "footer appear"
    };

    return (
      <div>
        <header>
          <NavBar />
        </header>
        {/*Fondo PC*/}

        <div id="contenedorFondo">
          <LightShadow factor={5}>
            <svg
              ref={this.fondoCursor}
              id="imgFondo"
              viewBox="0 0 1442.6248 1020.3935"
              version="1.1"
            >
              <defs>
                <pattern
                  id="img1"
                  patternUnits="userSpaceOnUse"
                  width="100%"
                  height="100%"
                >
                  <image
                    height="110%"
                    width="180%"
                    xlinkHref={imgFondo}
                    x="0"
                    y="0"
                  />
                </pattern>
              </defs>
              <path
                className="appear"
                id="path"
                transform="translate(-21.184839,22.419599)"
                d="m 1424.8117,-21.427051 c -0.01,7.1e-4 -0.013,-4.5e-4 -0.02,0.002 0.01,0.002 0.018,-0.002 0.02,-0.002 z M 228.7844,138.57494 C -0.35967984,207.29913 22.901645,991.41736 22.794155,992.47926 305.44278,983.22885 1170.2121,1019.948 1293.958,824.96403 1417.704,629.98009 1449.5864,267.62537 1459.5771,89.805384 1388.13,80.191544 611.20039,31.718754 228.7844,138.57494 Z M 1462.8078,-6.546141 v 0.082 c 0.021,0.038568 0,-0.045039 0,-0.082 z"
              />
              <path
                id="path2"
                transform="translate(-21.184839,22.419599)"
                className="bordeAnim orangeStroke"
                d="m 1424.8117,-21.427051 c -0.01,7.1e-4 -0.013,-4.5e-4 -0.02,0.002 0.01,0.002 0.018,-0.002 0.02,-0.002 z M 228.7844,138.57494 C -0.35967984,207.29913 22.901645,991.41736 22.794155,992.47926 305.44278,983.22885 1170.2121,1019.948 1293.958,824.96403 1417.704,629.98009 1449.5864,267.62537 1459.5771,89.805384 1388.13,80.191544 611.20039,31.718754 228.7844,138.57494 Z M 1462.8078,-6.546141 v 0.082 c 0.021,0.038568 0,-0.045039 0,-0.082 z"
              />
            </svg>
          </LightShadow>
        </div>
        {/* </LightShadow> */}

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
            <SwordVoice delay={4} />
          </h1>
          {/* </LightShadow> */}
          <h2>
            Custom Web Design and
            <br /> Development
          </h2>
        </section>
        {/*Boton de accion y footer*/}

        <Call2Action className="call2Action-home appear" />
        <FooterApp estilos="appear footer" size="redesSociales-home" />
      </div>
    );
  }
}

export default Home;
