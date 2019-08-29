import React from "react";
import styled from "styled-components";

//components
import Logo from "../../../components/general/logo.component";
import FooterApp from "../../../components/footer/footer.component";
import Call2Action from "../../../components/general/call2action.component";

const FooterLay = styled.footer`
  height: calc(100vh - 94px);
  position: relative;

  @media (max-width: 1050px) {
    height: auto;
  }
`;
const FooterCont = styled.footer`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > svg {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  @media (max-width: 1050px) {
    margin-top: 0;
    padding-bottom: 20px;
  }
`;

const LogoCont = styled.div`
  @media (max-width: 1050px) {
    display: none;
  }
`;

const Cont = styled.div`
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterLay>
      <FooterCont>
        <LogoCont>
          <Logo style={{ top: "100px" }} logoWidth="20vw" />
        </LogoCont>
        <Cont>
          <Call2Action text="Blog" link="/blog" />
        </Cont>
        <FooterApp
          id="blogpostPage"
          estilos="appear footer-blog "
          size="redesSociales-blog"
        />
      </FooterCont>
    </FooterLay>
  );
};

export default Footer;
