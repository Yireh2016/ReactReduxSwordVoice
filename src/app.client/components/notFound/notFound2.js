import React from "react";
import Radium from "radium";
//components
import FooterApp from "../footer/footer.component";
import RadiumLogo from "./radiumLogo/radiumLogo";

//css
import "./notFound.css";
import Equis from "./equis/equis";

const NotFound = () => {
  const orange = "#f95f0b";
  const flexCenterStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  };

  const fontFamily = {
    fontFamily: "Work Sans"
  };

  const styles = {
    RadiumLogo: {
      width: "10vw",
      "@media (max-width: 1050px)": {
        width: "25vw"
      }
    },
    NotFoundType: {
      textAlign: "center",
      fontSize: "120px",
      "@media (max-width: 1050px)": {
        fontSize: "10vh"
      },
      "@media (max-width: 700px)": {
        fontSize: "10vh"
      }
    },
    iconsFooter: {
      width: "20vh",
      "@media (max-width: 1050px)": {
        width: "10vh"
      },
      "@media (max-width: 700px)": {
        width: "10vh"
      }
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #00171F 77.83%, #0088BA 98.84%)",
        height: "100vh",
        ...flexCenterStyle
      }}
    >
      <RadiumLogo style={styles.RadiumLogo} />
      <div
        style={{
          color: orange,
          ...flexCenterStyle
        }}
      >
        <h2 style={{ ...styles.NotFoundType, ...fontFamily }}>404</h2>
        <h2 style={{ ...styles.NotFoundType, ...fontFamily }}>
          Not <span style={{ color: "white" }}>Found</span>
        </h2>
      </div>
      <div>
        <FooterApp id="notFoundPage" iconsStyles={styles.iconsFooter} />
      </div>
      <div
        style={{
          position: "fixed",
          top: "5%",
          right: "5%",
          width: "5vmax"
        }}
      >
        <Equis
          onClick={() => {
            window.location.href = "/home";
          }}
        />
      </div>
    </div>
  );
};

export default Radium(NotFound);
