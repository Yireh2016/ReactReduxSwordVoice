import React from 'react'
import styled from 'styled-components'
import Radium from 'radium'

const Style = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const styles = {
  main: {
    width: '75%',
    '@media (max-width: 1050px)': {
      width: '100%'
    }
  },
  aside: {
    width: '25%',
    '@media (max-width: 1050px)': {
      width: '100%'
    }
  }
}
const TwoColumnAside = ({children, aside}) => {
  return (
    <Style>
      <div style={styles.main}>{children}</div>
      <div style={styles.aside}>{aside}</div>
    </Style>
  )
}
export default Radium(TwoColumnAside)
