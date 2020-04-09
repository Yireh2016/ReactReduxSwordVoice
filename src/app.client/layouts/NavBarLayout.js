import React, {Fragment} from 'react'

//components
import NavBar from '../components/navbar/navbar.component'

const NavBarLayout = ({children}) => {
  return (
    <Fragment>
      <NavBar />
      {children}
    </Fragment>
  )
}

export default NavBarLayout
