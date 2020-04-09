import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
  white-space: normal;
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;

  margin-left: calc((100vw - 100vw * ${props => props.size} / 12) / 2);
  margin-top: 10vh;

  width: ${props => {
    switch (props.size) {
      case 1:
        return 'calc(100% / 12)'
      case 2:
        return 'calc(100% * 2 / 12 )'
      case 3:
        return 'calc(100% * 3 / 12 )'
      case 4:
        return 'calc(100% * 4 / 12 )'
      case 5:
        return 'calc(100% * 5 / 12 )'
      case 6:
        return 'calc(100% * 6 / 12 )'
      case 7:
        return 'calc(100% * 7 / 12 )'
      case 8:
        return 'calc(100% * 8 / 12 )'
      case 9:
        return 'calc(100% * 9 / 12 )'
      case 10:
        return 'calc(100% * 10 / 12 )'
      case 11:
        return 'calc(100% * 11 / 12 )'
      case 12:
        return 'calc(100%)'
      default:
        return 'calc(100%)'
    }
  }};

  @media (min-width: 1050px) {
    margin-left: 0;
    margin-top: calc(0);
  }
`

const NewPostLayout = ({children, size}) => {
  return <Item size={size}>{children}</Item>
}
export default NewPostLayout
