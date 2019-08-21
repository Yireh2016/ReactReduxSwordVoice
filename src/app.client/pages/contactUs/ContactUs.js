import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
// import Helmet from "react-helmet";

//layout
import NavBarLayout from "../../layouts/NavBarLayout";

//compoenents
import Background from "./background/background";
import ContactForm from "./contactForm/ContactForm";
import SocialNet from "./socialNet/SocialNet";

//assets
import image from "../../assets/img/contact/message-in-a-bottle-3437294_960_720.jpg";

//api call
import sendContactForm from "../../../apiCalls/sendContactForm";

const MainLayout = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 100px;

  transform: ${props => props.animation && "rotate(0deg) !important"};
  transition: transform ease 1000ms;
`;

const LeftAside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  height: calc(100vh - 100px);
  width: calc(7 * 100% / 12);

  @media (max-width: 1050px) {
    width: calc(12 * 100% / 12);
    overflow: hidden;
    height: calc(100vh - 148px);
  }

  @media (max-width: 700px) {
    overflow: hidden;
    height: calc(100vh);
  }

  @media (max-width: 330px) and (max-height: 490px) {
    height: calc(120vh);
  }
`;

const NoPCTitleLay = styled.div`
  display: none;

  @media (max-width: 1050px) {
    display: flex;
    width: calc(12 * 100% / 12);
  }
`;

const NoPCContactTitle = styled.h1`
  font-family: "Work sans", sans-serif;
  color: var(--orange);
  margin-left: 15px;
`;

const RightAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  height: calc(100vh - 100px);
  width: calc(5 * 100% / 12);

  @media (max-width: 1050px) {
    width: calc(12 * 100% / 12);
    position: fixed;
    height: auto;
    bottom: 0px;
    padding: 15px 0;
    background: rgba(0, 23, 31, 0.7);
  }

  @media (max-width: 700px) {
    position: static;
    justify-content: center;
  }
`;

const ContactTitle = styled.h1`
  font-family: "Work sans", sans-serif;
  color: var(--orange);
`;

const SocialNetCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 90%;

  @media (max-width: 1050px) {
    heigth: auto;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ContactUs = ({ isDialog, setDialog }) => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 2000);
  }, []);

  const triggerDialog = (title, body) => {
    setDialog({ title, body, show: true, status: "" });
    // :dialogObj=>{dispatch({type:"SET_DIALOG",payload:dialogObj})}

    // setDialogTitle(title);
    // setDialogBody(body);
    // setShowDialog(true);
  };
  const submitHandler = async (isFormValid, form) => {
    if (!isFormValid) {
      const title = "Ups 😅 ";
      const body = form.message;

      triggerDialog(title, body);
      return;
    }

    try {
      var sendContactFormRes = await sendContactForm(form);
    } catch (err) {
      triggerDialog("Error 🤬", `There was an error status: ${err}`);
      return;
    }

    if (sendContactFormRes.status === "OK") {
      triggerDialog("Way to Go!! 😁", sendContactFormRes.message);
      return sendContactFormRes.status;
    }
    console.log("error sendContactFormRes", sendContactFormRes);
    triggerDialog(
      "Error 🤬",
      `There was an error status: ${err} ${sendContactFormRes.message}`
    );
    return sendContactFormRes.status;
  };

  return (
    <div>
      <NavBarLayout id="navbar">
        {/* <Helmet>
        <title>SwordVoice.com &#183; 💌 Contact Us Here</title>
        <meta
          name="Description"
          content="SwordVoice | Do you wanna write us? Have any questions? Have any project you want us to do? Don't hesitate and contact us HERE!...Hey wait!, don't forget to follow us on our social media channels!"
        />
      </Helmet> */}
        <MainLayout
          style={{
            transformOrigin: "top left",
            transform: "rotate(180deg)"
          }}
          animation={animation}
          id="mainLayout"
        >
          <NoPCTitleLay>
            <NoPCContactTitle id="NoPCcontactTitle">
              Contact Us
            </NoPCContactTitle>
          </NoPCTitleLay>
          <LeftAside id="leftAside">
            <Background image={image} id="background" />
            <ContactForm id="ContactForm" onSubmit={submitHandler} />
          </LeftAside>
          <RightAside id="RightAside">
            <ContactTitle id="ContactTitle">Follow Us</ContactTitle>
            <SocialNetCont id="SocialNetCont">
              <SocialNet id="SocialNet" />
            </SocialNetCont>
          </RightAside>
        </MainLayout>
      </NavBarLayout>
    </div>
  );
};

const stateToProps = () => {
  return {};
};
const actionsToProps = dispatch => {
  return {
    setDialog: dialogObj => {
      dispatch({ type: "SET_DIALOG", payload: dialogObj });
    }
  };
};
export default connect(
  stateToProps,
  actionsToProps
)(ContactUs);
