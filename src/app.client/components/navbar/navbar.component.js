import React, { Component } from "react";
import Logo from "../general/logo.component";
import Footer from "../footer/footer.component";
import "./navbar.css";
import { Route, NavLink } from "react-router-dom";
import ActiveBar from "./activeBar";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: null,
      navBarMarginTop: "20",
      navBarBackgroundOnScroll: "transparent",
      logoWidth: "90px"
    };
  }

  handleClick() {
    this.state.menuVisible === "translateX(0)"
      ? this.setState({
          menuVisible: null
        })
      : this.setState({
          menuVisible: "translateX(0)"
        });
  }

  handleScroll() {
    window.pageYOffset === 0
      ? this.setState({
          navBarMarginTop: "20",
          navBarBackgroundOnScroll: "transparent",
          logoWidth: "90px"
        })
      : this.setState({
          navBarMarginTop: 0,
          navBarBackgroundOnScroll: "white",
          logoWidth: "67px"
        });
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }
  render() {
    let isVisible = this.state.menuVisible;
    const menu = [
      {
        nombre: "Home"
      },
      {
        nombre: "About"
      },
      {
        nombre: "Portfolio"
      },
      {
        nombre: "Blog"
      },
      {
        nombre: "Contact"
      },
      {
        nombre: "Users"
      }
    ];
    const contentMenuSmall = menu.map((smallMenuContent, i) => {
      return (
        <React.Fragment key={i}>
          <li>
            <NavLink
              to={"/" + smallMenuContent.nombre.toLowerCase()}
              activeClassName="activeLink"
              className="flyingLink"
            >
              {smallMenuContent.nombre}
            </NavLink>
          </li>
        </React.Fragment>
      );
    });
    const content = menu.map((menuContent, i) => {
      const activeBarFragment =
        menuContent.nombre === "Home" ? (
          <React.Fragment key={i}>
            <Route
              exact
              path={"/" + menuContent.nombre.toLowerCase()}
              component={ActiveBar}
            />
            <Route exact path={"/"} render={() => <ActiveBar />} />
          </React.Fragment>
        ) : (
          <Route
            exact={false}
            path={"/" + menuContent.nombre.toLowerCase()}
            component={ActiveBar}
          />
        );

      return (
        <React.Fragment key={i}>
          <a href={"/" + menuContent.nombre.toLowerCase()} className="enlace">
            {menuContent.nombre} <br />
            {activeBarFragment}
          </a>
        </React.Fragment>
      );
    });
    return (
      <div id="wrapper">
        <nav id="navBar">
          <div
            id="menu-pc"
            className="fila"
            style={{
              marginTop: this.state.navBarMarginTop + "px",
              position: "relative"
            }}
          >
            <div
              className="fondoMenuPc"
              style={{ backgroundColor: this.state.navBarBackgroundOnScroll }}
            />
            <div className="grid col-2 relleno" />
            <div className="grid col-3 ">
              <a href="/home">
                <Logo
                  className="logoTransition"
                  style={{ top: "100px" }}
                  logoWidth={this.state.logoWidth}
                />
                <div id="titulo">
                  <h1>SwordVoice</h1>
                </div>
              </a>
            </div>
            <div id="menu" className="grid col-5">
              {content}
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
            <a href="/home">
              <Logo
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
            <a href="/home">
              <Logo
                className="verticalCenter horizontalCenter"
                logoWidth="24vw"
              />
            </a>
          </div>

          <div
            id="menu-desplegable"
            onClick={() => {
              this.handleClick();
            }}
            style={{ transform: isVisible }}
          >
            <div className="desplegable-equis">
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
              <ul className="col-6-md col-6-sm grid ">{contentMenuSmall}</ul>

              <div
                className="grid col-6-md col-6-sm"
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div className="avatarMenuContainer">
                  <div className="avatarMenu" />
                  <div>
                    <p>
                      Welcome{" "}
                      <span>
                        Jainer <span />
                      </span>
                    </p>
                  </div>
                </div>
                <a href="/home">
                  <Logo className="col-6-md col-12-sm grid desplegable-logo" />
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
                estilos="   desplegable-footer center-flex"
                size="desplegable-footer-size"
              />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
