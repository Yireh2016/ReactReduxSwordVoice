import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-left: 15px;
    margin-bottom: 15px;
  }
  > div:nth-child(1) {
    margin-left: 0;
  }
`

const FlexLayout = ({children}) => {
  return <Container>{children}</Container>
}
export default FlexLayout
