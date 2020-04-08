import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

//components
import FooterApp from '../../../components/footer/footer.component'
import Call2Action from '../../../components/general/call2action.component'

//assets
import svAvatar from '../../../assets/svgIcons/aboutTeclado.svg'

const FooterLay = styled.footer`
  ${'' /* height: calc(100vh - 94px); */}
  position: sticky;
  top: 100px;

  @media (max-width: 1050px) {
    height: initial;
  }
`
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
`

const LogoCont = styled.div`
  ${'' /* @media (max-width: 1050px) {
    display: none;
  } */}
`

const Cont = styled.div`
  margin-top: 20px;
`

const Footer = ({isLoggedIn, setSignUp}) => {
  return (
    <FooterLay>
      <FooterCont>
        <LogoCont>
          <div style={{top: '100px'}}>
            <img src={svAvatar} alt='SwordVoice Avatar' />
          </div>
          {/* <Logo style={{ top: "100px" }} logoWidth="20vw" /> */}
        </LogoCont>
        <Cont>
          {isLoggedIn ? (
            <Call2Action text='Blog' link='/blog' />
          ) : (
            <Call2Action
              text='Sign Up'
              onClick={() => {
                setSignUp(true)
              }}
            />
          )}
        </Cont>
        <FooterApp
          id='blogpostPage'
          estilos='appear footer-blog '
          size='redesSociales-blog'
        />
      </FooterCont>
    </FooterLay>
  )
}

const mapState = state => {
  return {
    isLoggedIn: state.logInStatus.isUserLoggedIn
  }
}

const mapActions = dispatch => {
  return {
    setSignUp: show => dispatch({type: 'SET_SHOW_SIGNUP', payload: show})
  }
}
export default connect(mapState, mapActions)(Footer)
