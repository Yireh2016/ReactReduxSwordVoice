import React from "react";
import styled from "styled-components";
//layout
import NavBarLayout from "../../layouts/NavBarLayout";

//compoenents
import Background from "./background/background";
import InputPlaceholder from "./contactForm/inputPlacehoder/InputPlaceholder";
import ContactForm from "./contactForm/ContactForm";

const MainLayout = styled.div`
  display: flex;
  margin-top: 100px;
`;

const LeftAside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  height: calc(100vh - 100px);
  width: calc(6 * 100% / 12);
`;
const RightAside = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  height: calc(100vh - 100px);
  width: calc(6 * 100% / 12);
`;

const Button = styled.button`
  z-index: 2;
  margin-top: 15px;
`;

const ContactUs = () => {
  return (
    <NavBarLayout id="navbar">
      <MainLayout id="mainLayout">
        <LeftAside id="leftAside">
          <Background id="background" />
          <ContactForm />
          <Button className="call2Action">Send</Button>
        </LeftAside>
        <RightAside> test</RightAside>
      </MainLayout>
    </NavBarLayout>
  );
};

export default ContactUs;
