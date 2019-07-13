import React from "react";
import styled from "styled-components";
//layout
import NavBarLayout from "../../layouts/NavBarLayout";

//compoenents
import Background from "./background/background";
import ContactForm from "./contactForm/ContactForm";
import SocialNet from "./socialNet/SocialNet";

const MainLayout = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 100px;
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
  }
`;

const Button = styled.button`
  z-index: 2;
  margin-top: 15px;

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
`;

const ContactUs = () => {
  return (
    <NavBarLayout id="navbar">
      <MainLayout id="mainLayout">
        <NoPCTitleLay>
          <NoPCContactTitle id="NoPCcontactTitle">Contact Us</NoPCContactTitle>
        </NoPCTitleLay>
        <LeftAside id="leftAside">
          <Background id="background" />
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
