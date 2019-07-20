import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

//layout
import NavBarLayout from "../../layouts/NavBarLayout";

//compoenents
import Background from "./background/background";
import ContactForm from "./contactForm/ContactForm";
import SocialNet from "./socialNet/SocialNet";

//assets
import image from "../../assets/img/contact/message-in-a-bottle-3437294_960_720.jpg";

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
    bottom: 15px;
    transform: translateY(-3vh);
  }

  @media (max-width: 700px) {
    position: static;
    justify-content: center;
  }
`;

const Button = styled.button`
  z-index: 2;
  margin-top: 30px;

  @media (max-width: 1050px) {
    margin-top: 40px;
  }
`;
const ContactTitle = styled.h1`
  font-family: "Work sans", sans-serif;
  color: var(--orange);
  @media (max-width: 1050px) {
    display: none;
  }
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

const ContactUs = () => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 2000);
  }, []);

  return (
    <NavBarLayout id="navbar">
      <Helmet>
          <meta
            name="Description"
            content="SwordVoice | Do you wanna write us? Have any questions? Have any project you want us to do? Don't hesitate and contact us HERE!...Hey wait!, don't forget to follow us on our social media channels!"
          />
        </Helmet>
      <MainLayout
        style={{
          transformOrigin: "top left",
          transform: "rotate(180deg)"
        }}
        animation={animation}
        id="mainLayout"
      >
        <NoPCTitleLay>
          <NoPCContactTitle id="NoPCcontactTitle">Contact Us</NoPCContactTitle>
        </NoPCTitleLay>
        <LeftAside id="leftAside">
          <Background image={image} id="background" />
          <ContactForm id="ContactForm" />
          <Button className="call2Action">Send</Button>
        </LeftAside>
        <RightAside id="RightAside">
          <ContactTitle id="ContactTitle">Contact Us</ContactTitle>
          <SocialNetCont id="SocialNetCont">
            <SocialNet id="SocialNet" />
          </SocialNetCont>
        </RightAside>
      </MainLayout>
    </NavBarLayout>
  );
};

export default ContactUs;
