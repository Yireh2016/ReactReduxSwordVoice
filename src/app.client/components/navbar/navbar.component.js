//modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import styled from "styled-components";
//css
import "./navbar.css";
//assets
import ActiveBar from "./activeBar";
import userLogo from "../../assets/img/general/userLogo.svg";
//components
import SignUpForm from "../blog/blogPost/signUpForm/signUpForm.component";
import LogInForm from "../blog/blogPost/logInForm/logInForm.component";
import Logo from "../general/logo.component";
import Footer from "../footer/footer.component";

//api calls
import apiLogout from "../../../apiCalls/apiLogout";

//services

import { guestCookie } from "../../../app.client/services/cookieManager";

const Nav = styled.nav`
  animation: ${props => props.animation};
  transition: all 500ms ease;
  transform: ${props => props.navTransformation};
  opacity: ${props => props.navOpacity};

  @media (max-width: 1050px) {
    opacity: 1;
    transform: translateY(0) rotateZ(0deg) !important;
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: null,
      menuIsOpaque: null,
      navBarMarginTop: "20",
      navBarBackgroundOnScroll: "transparent",
      logoWidth: "90px",
      showSignUp: false,
      showLogIn: false,
      showDesplegable: false,
      loggedUserAvatar: "",
      toggleAnim: false,
      tempUnmount: false,
      endOfAnimation: false,
      scrollTop: 0,
      deltaScroll: 0
    };

    if (
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    ) {
      guestCookie(props);
    }
  }

  componentDidMount() {
    this.setState({
      endOfAnimation: true
    });

    // if (this.props.isUserLoggedIn && this.props.loggedUserAvatar) {
    //   this.setState({
    //     loggedUserAvatar: this.props.loggedUserAvatar
    //   });
    // }
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });

    if (
      window.pageYOffset > 0 &&
      window.innerWidth > 1050 &&
      !this.state.menuIsOpaque
    ) {
      this.setState({
        menuIsOpaque: true
      });
    }
  }
  // componentDidUpdate() {
  //   if (this.props.isUserLoggedIn && this.props.loggedUserAvatar) {
  //     if (this.props.loggedUserAvatar === "") {
  //       this.setState({ loggedUserAvatar: this.props.loggedUserAvatar });
  //     }
  //   }
  // }

  handleClick() {
    if (this.state.menuVisible === "translateX(0)") {
      this.setState({
        menuVisible: null,
        tempUnmount: false
      });

      return;
    }
    this.setState({
      tempUnmount: true,
      menuVisible: "translateX(0)"
    });
  }

  logoClickHandler() {
    window.location.href = "./home";
  }

  handleScroll() {
    //evita que hayan llamadas innecesarioas al setstate, ya que el scroll es un evento que puede llenar la cola de tareas facilmente

    //if is PC
    if (window.innerWidth > 1050) {
      const pageYoffset = window.pageYOffset;
      const delta = -this.props.scroll.scrollTop + pageYoffset;

      this.props.setScroll(pageYoffset);
      this.props.setDeltaScroll(delta);
      if (delta < 0) {
        this.setState({ menuIsOpaque: false });
      } else {
        this.setState({ menuIsOpaque: true });
      }

      // if (pageYoffset > 20 && !this.state.menuIsOpaque) {
      //   this.setState({
      //     menuIsOpaque: true
      //   });
      // } else if (pageYoffset <= 20 && this.state.menuIsOpaque === true) {
      //   /*
      //     antes de disparar la animacion de "ocultar el menu", debo asegurarme que el estado de la animacion previo sea "aparecer menu" en vez de la animacion de inicio q hace rotar el menu al iniciar cada pagina.
      //   */

      //   this.setState(prevState => {
      //     const menuState =
      //       prevState.menuIsOpaque === null //verifico la primera animacion
      //         ? { menuIsOpaque: null } // dejo el estado actual si vengo de la animacion primera
      //         : { menuIsOpaque: false }; //si no entonces si disparo la animacion de "ocultar menu"

      //     return menuState;
      //   });
      // }
    }
  }

  onAvatarClick = () => {
    this.setState({ toggleAnim: !this.state.toggleAnim });
  };
  signClickHandler = () => {
    this.setState({
      showSignUp: true,
      showDesplegable: false
    });
  };

  onMouseLeaveHandler = () => {
    this.setState({ showDesplegable: false });
  };
  mouseOverAvatarHandler = () => {
    this.setState({ showDesplegable: true });
  };
  logInClickHandler = () => {
    this.setState({
      showDesplegable: false,
      showLogIn: true
    });
  };

  logOutClickHandler = async () => {
    const logoutRes = await apiLogout();
    if (logoutRes.status === "OK") {
      this.props.onLogOut();

      window.localStorage.removeItem("userAvatar");
      this.setState({
        showDesplegable: false,
        loggedUserAvatar: "",
        toggleAnim: false
      });
    }
  };

  avatarToRender = () => {
    if (this.props.isUserLoggedIn) {
      let salida;

      switch (this.props.loggedUserAvatar) {
        case "": {
          salida = (
            <div className="grid userLogo">
              <img src={userLogo} alt="user Logo" />
            </div>
          );

          break;
        }
        default: {
          salida = (
            <div
              className="avatarImg "
              style={{
                backgroundSize: "cover",
                borderRadius: "100%",
                backgroundPosition: "center",
                height: "45px",
                width: "45px",
                backgroundImage: `url('${this.props.loggedUserAvatar}`.replace(
                  "big",
                  "small"
                )
              }}
            />
          );

          break;
        }
      }

      return salida;
    } else {
      return (
        <div className="grid userLogo">
          <img src={userLogo} alt="user Logo" />
        </div>
      );
    }
  };
  render() {
    const isClientSide =
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement;

    if (!isClientSide) {
      global.window = { location: { pathname: "" } }; // Temporarily define window for server-side
    }

    let animation;
    let navTransformation;
    let navOpacity;

    switch (this.state.menuIsOpaque) {
      case null: {
        animation = "navbarRotate 2s ease 1s normal forwards";
        navOpacity = "1";
        break;
      }

      // this.state.menuIsOpaque === false
      //           ? "translateY(0) rotateZ(0)"
      //           : "translateY(-100%) rotateZ(0)",

      case true: {
        navTransformation = "translateY(-100%) rotateZ(0)";
        navOpacity = "0";
        break;
      }
      case false: {
        navTransformation = " translateY(0) rotateZ(0)";
        navOpacity = "1";

        break;
      }
    }

    let isVisible = this.state.menuVisible;
    const menu = [
      {
        nombre: "🏠 Home"
      },
      {
        nombre: "💪 About"
      },
      // {
      //   nombre: "Portfolio"
      // },
      // {
      //   nombre: "Courses"
      // },
      {
        nombre: "✍️ Blog"
      },
      {
        nombre: "🤝 Contact"
      }
    ];

    const desplegableMenu = [
      {
        nombre: "📱 Profile"
      },
      {
        nombre: "😲 Log out"
      }
    ];
    const contentMenuSmall = menu.map((smallMenuContent, i) => {
      const activeClass =
        this.props.location.pathname ===
        `/${smallMenuContent.nombre.toLowerCase().match(/.{1}\s(\w+)$/)[1]}`
          ? "activeLink"
          : "";
      return (
        <li key={i}>
          <a
            aria-label={`go to ${smallMenuContent.nombre} page`}
            key={i}
            href={
              "/" +
              smallMenuContent.nombre.toLowerCase().match(/.{1}\s(\w+)$/)[1]
            }
            className={"flyingLink " + activeClass}
          >
            {smallMenuContent.nombre}
          </a>
        </li>
      );
    });
    const contentMenuDesplegable = desplegableMenu.map((desplegableMenu, i) => {
      return (
        <React.Fragment key={i}>
          <li>
            {desplegableMenu.nombre.match("Profile") ? (
              <a
                aria-label="go to your dashboard"
                href="cms"
                className="flyingLink"
              >
                {desplegableMenu.nombre}
              </a>
            ) : (
              <span
                style={{
                  color: "var(--orange)",
                  fontWeight: "500"
                }}
                onClick={this.logOutClickHandler}
              >
                {desplegableMenu.nombre}
              </span>
            )}
          </li>
        </React.Fragment>
      );
    });
    const content = menu.map((menuContent, i) => {
      const activeBarFragment = menuContent.nombre.match("Home") ? (
        <React.Fragment key={i}>
          <Route
            exact
            path={
              "/" + menuContent.nombre.toLowerCase().match(/.{1}\s(\w+)$/)[1]
            }
            component={ActiveBar}
          />
          <Route exact path={"/"} render={() => <ActiveBar />} />
        </React.Fragment>
      ) : (
        <Route
          exact={false}
          path={"/" + menuContent.nombre.toLowerCase().match(/.{1}\s(\w+)$/)[1]}
          component={ActiveBar}
        />
      );

      return (
        <React.Fragment key={i}>
          <a
            aria-label={`go to ${menuContent.nombre} page`}
            href={
              "/" + menuContent.nombre.toLowerCase().match(/.{1}\s(\w+)$/)[1]
            }
            className="enlace"
          >
            {menuContent.nombre} <br />
            {activeBarFragment}
          </a>
        </React.Fragment>
      );
    });

    return (
      <div id="wrapper">
        {this.state.showSignUp && (
          <SignUpForm
            onCancelClick={() => {
              this.setState({ showSignUp: false });
            }}
          />
        )}
        {this.state.showLogIn && (
          <LogInForm
            onCancelClick={() => {
              this.setState({ showLogIn: false });
            }}
          />
        )}
        <Nav
          id="navBar"
          animation={animation}
          navTransformation={navTransformation}
          navOpacity={navOpacity}
        >
          <div
            id="menu-pc"
            className="fila"
            style={{
              position: "relative"
            }}
          >
            <Logo
              id="1"
              className="fixedPcLogo"
              style={{
                top: "12px",
                position: "fixed",
                left: "50%",
                transform: "translateX(-50%)"
              }}
              logoWidth={this.state.logoWidth}
              onClick={this.logoClickHandler}
            />
            <div className="fondoMenuPc" style={{ backgroundColor: "white" }} />
            <div className="grid col-2 relleno">
              <div onClick={this.logoClickHandler} id="titulo">
                <h1>SwordVoice</h1>
              </div>
            </div>
            <div className="grid " style={{ width: "40%" }}>
              <a aria-label="go to home page" href="/home">
                <Logo
                  id="2"
                  className="logoTransition"
                  style={{ visibility: "hidden" }}
                  logoWidth={this.state.logoWidth}
                />
                {/* <div id="titulo">
                  <h1>SwordVoice</h1>
                </div> */}
              </a>
            </div>
            <div className="menuPcCont">
              <div id="menu" className="grid ">
                {content}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row-reverse"
                }}
                // onMouseLeave={this.onMouseLeaveHandler}
                // onMouseEnter={this.mouseOverAvatarHandler}
                onClick={
                  this.state.showDesplegable
                    ? this.onMouseLeaveHandler
                    : this.mouseOverAvatarHandler
                }
              >
                <div className="menuAvatar">
                  {this.avatarToRender()}
                  {this.state.showDesplegable && (
                    <div
                      onMouseOver={this.mouseOverAvatarHandler}
                      onMouseLeave={this.onMouseLeaveHandler}
                      className="menuAvatarDesplegable"
                    >
                      <div className="desplegableFlecha" />
                      <div className="despleglableContenido">
                        <ul>
                          {this.props.isUserLoggedIn ? (
                            <li className="desplegableProfileLink">
                              <a aria-label="go to your dashboard" href="cms">
                                📱 Profile
                              </a>
                            </li>
                          ) : (
                            <li onClick={this.signClickHandler}>🔥 Sign Up</li>
                          )}
                          {this.props.isUserLoggedIn ? (
                            <li onClick={this.logOutClickHandler}>
                              😲 Log out
                            </li>
                          ) : (
                            <li onClick={this.logInClickHandler}>👊 Log In</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                {this.props.isUserLoggedIn ? (
                  <div className="menuPcWelcome">
                    Welcome <br /> <span>{this.props.loggedUserName}</span>
                  </div>
                ) : (
                  <div className="menuPcWelcome">
                    Click!!! <br />
                    <span style={{ color: "#f95f0b" }}> for Join in</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            id="menu-small"
            onClick={() => this.handleClick()}
            className="grid col-5"
          >
            <div
              className="menuSmallBackground"
              style={{ display: this.props.hasBackground ? "block" : "none" }}
            />
            <span className="enlace">
              Menu <br />
            </span>
            <a aria-label="go to home page" href="/home">
              <Logo
                id="3"
                className="verticalCenter horizontalCenter"
                logoWidth="15vw"
              />
            </a>
          </div>

          <div id="menu-smallest" className="grid col-5">
            <svg
              onClick={() => this.handleClick()}
              id="hamburger"
              className="enlace"
              width="46"
              height="35"
              viewBox="0 0 46 35"
              fill="none"
            >
              <line
                y1="-2"
                x2="45.0225"
                y2="-2"
                transform="matrix(1 0 -0.0224586 0.999748 0 35)"
                stroke="#F95F0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                y1="-2"
                x2="45.0225"
                y2="-2"
                transform="matrix(1 0 -0.0224586 0.999748 0 19)"
                stroke="#F95F0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                y1="-2"
                x2="45.0225"
                y2="-2"
                transform="matrix(1 0 -0.0224586 0.999748 0 4)"
                stroke="#F95F0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <a aria-label="go to home page" href="/home">
              <Logo
                id="4"
                className="verticalCenter horizontalCenter"
                logoWidth="24vw"
              />
            </a>
          </div>

          {this.state.endOfAnimation && (
            <div id="menu-desplegable" style={{ transform: isVisible }}>
              <div
                onClick={() => {
                  this.handleClick();
                }}
                className="desplegable-equis"
              >
                <svg viewBox="0 0 64 64" fill="none">
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
              </div>
              <div>
                <h1 className="desplegable-title">SwordVoice</h1>
              </div>

              <div className="fila fila-menu">
                <div className="col-6-md col-6-sm grid desplegable-toggle-navbar">
                  <ul
                    style={
                      !this.state.toggleAnim
                        ? {
                            transform: "translateX(0)",
                            opacity: "1"
                          }
                        : {
                            transform: "translateX(-200%)",
                            opacity: "0"
                          }
                    }
                  >
                    {contentMenuSmall}
                  </ul>

                  {this.state.tempUnmount && (
                    <ul
                      style={
                        this.state.toggleAnim
                          ? {
                              transform: "translateX(0)",
                              opacity: "1"
                            }
                          : {
                              transform: "translateX(-200%)",
                              opacity: "0"
                            }
                      }
                    >
                      {contentMenuDesplegable}
                    </ul>
                  )}
                </div>

                <div className="grid col-6-md col-6-sm avatarMenuLayout">
                  {this.props.isUserLoggedIn && (
                    <div className="avatarMenuContainer">
                      <div
                        className="avatarMenu"
                        onClick={this.onAvatarClick}
                        style={{
                          backgroundImage: `url('${this.props.loggedUserAvatar}`
                        }}
                      />
                      <div className="desplegable-login">
                        <p>
                          Welcome
                          <span>
                            {` ${this.props.loggedUserName}`} <span />
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  {!this.props.isUserLoggedIn && (
                    <div className="avatarMenuContainer">
                      <div className="avatarMenu">
                        <img src={userLogo} alt="User Avatar Logo" />
                      </div>
                      <div className="desplegable-login">
                        <button onClick={this.logInClickHandler}>Log In</button>
                        <button onClick={this.signClickHandler}>Sign Up</button>
                      </div>
                    </div>
                  )}
                  <a aria-label="go to home page" href="/home">
                    <Logo
                      id="5"
                      className="col-6-md col-12-sm grid desplegable-logo"
                    />
                  </a>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: " 0vh",
                  display: " flex",
                  width: " 100%",
                  flexDirection: " column",
                  alignItems: " center",
                  justifyContent: " center",
                  height: " 13vh"
                }}
              >
                <Footer
                  id="navBarfooter"
                  estilos="   desplegable-footer center-flex"
                  size="desplegable-footer-size"
                />
              </div>
            </div>
          )}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar,
    scroll: state.scroll
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //acciones
    setAvatar: avatar => dispatch({ type: "SET_AVATAR", payload: avatar }),
    onLogOut: () => dispatch({ type: "LOGGED_OUT" }),
    setScroll: scrollTop =>
      dispatch({ type: "SET_SCROLL_TOP", payload: scrollTop }),
    setDeltaScroll: delta =>
      dispatch({ type: "SET_DELTA_SCROLL", payload: delta })
  };
};

const NavBar2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
const NavBar3 = withRouter(NavBar2);

export default withCookies(NavBar3);
