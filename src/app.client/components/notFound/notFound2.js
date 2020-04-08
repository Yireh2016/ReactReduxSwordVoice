import React from 'react'
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'

//components
import FooterApp from '../footer/footer.component'
import RadiumLogo from './radiumLogo/radiumLogo'

//css
import './notFound.css'
import Equis from './equis/equis'

const GlobalStyle = createGlobalStyle`
  body {
    margin:0;
  }
`

const Layout = styled.div`
  background: linear-gradient(180deg, #00171f 77.83%, #0088ba 98.84%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 700px) {
    height: initial;
    min-height: 100vh;
  }
`

const EquiCont = styled.div`
  cursor: pointer;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #f95f0b;
`
const Text = styled.h2`
  font-family: 'Work Sans', sans-serif;

  text-align: center;
  font-size: 120px;
  margin: 0;

  @media (max-width: 1050px) {
    font-size: 10vh;
  }
  span {
    color: white;
  }
`

const Text404 = styled.h2`
  font-family: 'Work Sans', sans-serif;

  text-align: center;
  font-size: calc(120px * 14 / 12);
  margin: 0;

  @media (max-width: 1050px) {
    margin: 0;
  }
  span {
    color: white;
  }
`

const FooterContainer = styled.div`
  svg {
    width: 20vh;
    @media (max-width: 1050px) {
      width: 10vh;
    }

    @media (max-width: 700px) {
      width: 10vh;
    }
  }
`

const LogoContainer = styled.div`
  div {
    width: 10vw;
    @media (max-width: 1050px) {
      width: 25vw;
    }
  }
`

const NotFound = () => {
  return (
    <React.Fragment>
      <GlobalStyle></GlobalStyle>
      <Layout id='Layout'>
        <a href='/home'>
          <LogoContainer id='LogoContainer'>
            <RadiumLogo id='RadiumLogo' />
          </LogoContainer>
        </a>

        <TextContainer id='TextContainer'>
          <Text404 id='Text404'>404</Text404>
          <Text id='TextNot'>
            Not <span style={{color: 'white'}}>Found</span>
          </Text>
        </TextContainer>
        <FooterContainer id='FooterContainer'>
          <FooterApp id='notFoundPage' />
        </FooterContainer>
        <a href='/home'>
          <EquiCont
            style={{
              position: 'fixed',
              top: '5%',
              right: '5%',
              width: '5vmax'
            }}
          >
            <Equis id='Equis' />
          </EquiCont>
        </a>
      </Layout>
    </React.Fragment>
  )
}

export default NotFound
