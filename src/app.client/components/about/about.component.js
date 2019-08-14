//modules
import React from "react";
import ReactHtmlParser from "react-html-parser";
import Helmet from "react-helmet";
//components
import Navbar from "../navbar/navbar.component";
import FooterApp from "../footer/footer.component";
import Call2Action from "../general/call2action.component";
import LightShadow from "../general/lightShadow/lightShadow.component";
import styled, { keyframes } from "styled-components";

//services
import isDevice from "../../../services/isDevice";
//css
import "./about.css";
//assets
import avatarImg from "../../assets/img/general/avatar2.jpg";

import {
  SwordVoiceAvatar,
  CodersAvatar
} from "../../assets/svgIcons/aboutSVGs";

const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 35px;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid coral;
  background-image: ${props => (props.image ? `url(${props.image})` : "none")};
`;

const AvatarAppear = keyframes`
  from {
    transform:translateX(25%);
    opacity:0;
  }

  to {
    transform:translateX(0);
    opacity:1;
  }
`;

const AvatarAppearLeft = keyframes`
  from {
    transform:translateX(-25%);
    opacity:0;
  }

  to {
    transform:translateX(0);
    opacity:1;
  }
`;

const AvatarCont1 = styled.div`
  width: 277px;
  height: 277px;
  margin: 35px 0 20px 15%;
  animation: ${AvatarAppear} 400ms ease-in forwards;

  @media (max-width: 1050px) {
    height: 35vw;
    width: 35vw;
    margin: 19vh 0 0vh 3vw;
    animation: ${AvatarAppearLeft} 400ms ease-in forwards;
  }
`;

const AvatarCont2 = styled.div`
  width: 277px;
  height: 277px;
  margin: 35px 0 20px 15%;
  animation: ${AvatarAppear} 400ms ease-in forwards;

  @media (max-width: 1050px) {
    height: 35vw;
    width: 35vw;
    margin: 19vh 0 0vh 3vw;
    animation: ${AvatarAppearLeft} 400ms ease-in forwards;
  }
`;

const AvatarCont3 = styled.div`
  width: 277px;
  height: 277px;
  margin: 35px 0 20px 15%;
  animation: ${AvatarAppear} 400ms ease-in forwards;

  @media (max-width: 1050px) {
    height: 35vw;
    width: 35vw;
    margin: 19vh 0 0vh 3vw;
    animation: ${AvatarAppearLeft} 400ms ease-in forwards;
  }
`;

const PhoneAvatar = styled.div`
  width: 80vw;
  height: 80vw;
  margin: 0 0 50px 0;
  @media (min-width: 1050px) {
    display: none;
  }
  @media (min-width: 700px) {
    display: none;
  }
`;
class About extends React.Component {
  constructor(props) {
    super(props);

    this.avatarRef = React.createRef();
    this.svAvatarRef = React.createRef();
    this.codersAvatarRef = React.createRef();

    this.topDecorationRef = React.createRef();
    this.midDecoration = React.createRef();
    this.scrollSection = React.createRef();
    this.state = {
      textHeightOnTablet: {},
      midDecorationTopOnTablet: { top: "initial" },
      aboutThumbnail: 1,
      isDevice: ""
    };
  }
  componentDidMount() {
    this.setState({ isDevice: isDevice() });

    window.addEventListener("resize", this.setTextHeightOnTablet);
    // this.scrollSection.current.addEventListener(
    //   "scroll",
    //   this.controlScrollSection
    // );
    this.setTextHeightOnTablet();
  }
  setTextHeightOnTablet = () => {
    this.setState({ isDevice: isDevice() });

    if (window.innerWidth <= 1050 && window.innerWidth > 750) {
      //tablets only
      this.setState({
        textHeightOnTablet: {
          height: `calc(100vh - ${this.topDecorationRef.current.clientHeight}px`
        },

        midDecorationTopOnTablet: {
          top: `calc(50vh - ${this.topDecorationRef.current.clientHeight}px`,
          transform: "translateY(-50%)"
        }
      });
    } else {
      this.setState({
        textHeightOnTablet: {}
      });
    }
  };

  controlScrollSection = () => {
    const {
      scrollHeight,
      scrollTop,
      clientHeight
    } = this.scrollSection.current;

    const maxScroll = scrollHeight - clientHeight;

    if (scrollTop < (maxScroll * 2) / 4) {
      this.aboutThumbnail !== 1 &&
        this.setState({
          aboutThumbnail: 1
        });
      return;
    }

    if (scrollTop < (maxScroll * 3.7) / 4) {
      this.aboutThumbnail !== 2 &&
        this.setState({
          aboutThumbnail: 2
        });
      return;
    }

    this.aboutThumbnail !== 3 &&
      this.setState({
        aboutThumbnail: 3
      });
  };
  render() {
    const avatarArr = [
      <Avatar image={avatarImg} />,
      <SwordVoiceAvatar />,
      <CodersAvatar />
    ];
    const HTMLdata = [
      {
        HTML: `<h2>Who am I?</h2><p>Hello There!!!, <b>My name is Jainer Muñoz: </b>I am a Web Developer, IT Consultant and Founder of <strong>SwordVoice.com</strong> with over 10 years of experience on the IT / telecommunications industry, my main focus being real-time communications.</p> 

        <p>My biggest passion is <strong>teaching</strong>: So I have been teaching at my local community youth about Leadership and Ethics ​​for more than 8 years. Recently, i've been working on a project to teach them Graphic and Web Design and Development, UX / UI Principles, Photopraphy, Social Media, Digital Marketing, Leadership, Project Management, Bussiness Administration, Entrepreneurship and Professional Ethics in a non-profit freelancer academy. </p> 
        
        <p>For more info about me, check my detailed <a aria-label='Jainer Muñoz LinkedIn Profile' href='https://www.linkedin.com/in/jainer-munoz/ rel='noopener'  target='_blank'>LinkedIn Profile.</a></p>`
      },
      {
        HTML:
          "<h2>What Is SwordVoice?</h2><p><strong>Swordvoice.com</strong> has being designed to be an <strong>Online Community</strong> of professionals, amateurs, self-taught and enthusiats web and mobile app developers, UI/UX designers and tech adicts that want to be up to date about the latest technologies, programing languages and paradigms, coding practices, FrontEnd and BackEnd frameworks and libraries, news, and trends.  <a aria-label='go to blog page' href='/blog'>Go and check our blog.</a></p>"
      },
      {
        HTML:
          "<h2>What SwordVoice has to offer?</h2><p>SwordVoice offer blog articles, tutorials, courses and a variety of social media interaction options for the community to be in touch. If you want to be an active writer, editor, tutorial or courses creator, do not hesitate and <a aria-label='go to our blog' href='/contact'>Contact Us</a> and <strong>Let Your SwordVoice be Heard!!!</strong></p>"
      }
    ];

    const content2 = HTMLdata.map((c, i) => {
      return (
        <React.Fragment key={i}>
          <article className="grid  col-12-sm  texto col-12-md">
            <PhoneAvatar>{avatarArr[i]}</PhoneAvatar>
            {ReactHtmlParser(c.HTML)}
          </article>
        </React.Fragment>
      );
    });

    let midDecorationPC;

    switch (this.state.aboutThumbnail) {
      case 1: {
        midDecorationPC = (
          <AvatarCont1 ref={this.avatarRef}>{avatarArr[0]}</AvatarCont1>
        );
        break;
      }
      case 2: {
        midDecorationPC = (
          <AvatarCont2 ref={this.svAvatarRef}>{avatarArr[1]}</AvatarCont2>
        );
        break;
      }
      case 3: {
        midDecorationPC = (
          <AvatarCont3 ref={this.codersAvatarRef}>{avatarArr[2]}</AvatarCont3>
        );

        break;
      }

      default:
        break;
    }

    return (
      <div>
        <Helmet>
          <title>
            About Us &#183; Online Community of Web and Mobile developers and
            UI/UX designers
          </title>
          <meta
            name="Description"
            content={`
            We are an Online Community of Web and Mobile developers and UI/UX designers who wanted to be up to date about the latest technologies, programing languages and paradigms, coding practices, FrontEnd and BackEnd frameworks and libraries, news, and trends throught Blog Articles, Tutorials, Courses and Social Media Interactions.
            `}
          />
        </Helmet>
        <div>
          {/*Navigation Bar*/}
          <Navbar />

          {/*Decoracion de arriba*/}

          <div ref={this.topDecorationRef}>
            <svg
              id="topDecoration"
              className="col-0 col-0-md"
              viewBox="0 0 375 137"
              fill="none"
            >
              <path d="M375 0V137H150C21.1409 137 0 0 0 0H375Z" fill="white" />
            </svg>
            <svg
              id="topDecorationMed"
              className="col-0-sm col-0"
              viewBox="0 0 768 174"
              fill="none"
            >
              <path
                d="M768 0V174H381.245C69.6358 174 -0.000244141 0 -0.000244141 0H768Z"
                fill="white"
              />
            </svg>
          </div>
          {/*Parrafos de contenido*/}
          <section className="fila contenedorFila-about  ">
            {/*decoracion tablets*/}
            <section
              style={this.state.midDecorationTopOnTablet}
              className="tabletDecoration grid   col-0-sm col-0"
            >
              <svg
                ref={this.midDecoration}
                className="midDecoration"
                viewBox="0 0 382 798"
                fill="none"
              >
                <path
                  d="M381.992 401.276C383.978 76.2173 -0.498821 0 -0.498821 0L-1.00024 798C-1.00024 798 380.007 726.334 381.992 401.276Z"
                  fill="white"
                />
              </svg>

              {midDecorationPC}

              <FooterApp
                id="aboutPage"
                estilos=" appear footer-about-mid"
                size="footer-about-midSize"
                pathStyle="footer-about-path"
              />
            </section>
            {/*Parrafos */}
            <section
              className={
                this.state.isDevice !== "phone"
                  ? "col-5 col-6-md col-12-sm  fila grid parrafo style-7"
                  : "col-5 col-6-md col-12-sm  fila grid parrafo"
              }
              style={this.state.textHeightOnTablet}
              ref={this.scrollSection}
              onScroll={this.controlScrollSection}
            >
              <div className="contenedorTexto ">
                {content2}

                {/*Boton accion tablets*/}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: "0 0 50px 0"
                  }}
                >
                  {/* //    display: flex;
    flex-direction: row;
    justify-content: center; */}
                  <Call2Action className="call2action-med col-0 col-0-sm" />
                </div>
              </div>
            </section>
            <div className="col-0-sm col-0-md col-4 grid midDecorationPC ">
              <LightShadow factor={4}>{midDecorationPC}</LightShadow>
            </div>

            <section className="col-2 grid asidePC col-0-md col-0-sm">
              <Call2Action className="call2action-about call2actionAside " />
              <FooterApp
                estilos=" appear container asideRedes"
                size="footer-about-pcSize"
                pathStyle="footer-about-path"
              />
            </section>
          </section>
          {/*footer decoration y footer content*/}
          <section className="footerContainer-about col-0-md col-0">
            <div className="footerElements-about">
              {/*boton de accion y redes sociales*/}
              <Call2Action className="call2action-about" />
              <FooterApp
                estilos=" appear col-12 container grid footer-about center-flex"
                size="footer-about-size"
                pathStyle="footer-about-path"
              />
            </div>
            {/*decoracion abajo*/}
            <svg id="footerback-about" viewBox="0 0 375 137" fill="none">
              <path
                d="M375 137V0H150C21.1409 0 0 137 0 137H375Z"
                fill="white"
              />
            </svg>
          </section>

          {/*Fondo de la pagina*/}
          <div className="fondo-about appear col-0" />
        </div>
      </div>
    );
  }
}

export default About;
