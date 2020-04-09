import React from 'react'
import PropTypes from 'prop-types'
//css
import './loading.css'

const Loading = props => {
  return (
    <div className={`adminPostSpinnerLay ${props.fullscreen && 'fullscreen'}`}>
      <div className='lds-ellipsis'>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

Loading.propTypes = {
  fullscreen: PropTypes.bool
}

export default Loading
