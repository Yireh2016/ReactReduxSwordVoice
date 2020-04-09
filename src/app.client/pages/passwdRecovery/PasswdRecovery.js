import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

//components
import Logo from '../../components/general/logo.component'
import Dialog from '../../components/dialog/Dialog.component'
import PasswdRecoveryForm from './passwdRecoveryForm/PasswdRecoveryForm'

//api calls
import apiCtrl from '../../../apiCalls/generic/apiCtrl'

//services

import triggerDialog from '../../services/triggerDialog'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 50px 0;
    font-family: 'Work Sans', sans-serif;
    text-align: center;
  }

  @media (max-width: 700px) {
    height: initial;
  }
`

const PasswdRecovery = ({query, isDialog}) => {
  const onSubmit = (valid, dataObj) => {
    return new Promise((resolve, reject) => {
      if (valid) {
        apiCtrl(
          {
            url: '/api/updatePasswd',
            data: {passwd: dataObj.passwd, id: query.replace('?id=', '')},
            method: 'put'
          },
          response => {
            if (response.data.status === 'OK') {
              triggerDialog(
                {
                  title: 'Way to go',
                  body: `${response.data.message}`,
                  auto: true
                },
                () => {
                  window.location.href = '/home'
                  resolve(response.data)
                }
              )
              return
            }
            triggerDialog(
              {title: 'Ups!!!', body: `${response.data.message}`},
              () => {
                reject({status: 'ERR'})
              }
            )
          },
          err => {
            triggerDialog(
              {title: 'Ups!!!', body: `${err.response.data.message}`},
              () => {
                reject({status: 'ERR'})
              }
            )

            reject({status: 'ERR'})
          }
        )
      } else {
        triggerDialog({title: 'Ups!!!', body: `${dataObj.message}`}, () => {
          reject({status: 'ERR'})
        })
      }
    })
  }
  return (
    <Container>
      {isDialog && <Dialog />}
      <Logo style={{margin: '15px 0'}} logoWidth='100px'></Logo>
      <h1>SwordVoice Password Recovery</h1>

      <PasswdRecoveryForm onSubmit={onSubmit}></PasswdRecoveryForm>
    </Container>
  )
}

const mapState = state => {
  return {
    query: state.router.location.search,
    isDialog: state.dialog.show
  }
}

export default connect(mapState)(PasswdRecovery)
