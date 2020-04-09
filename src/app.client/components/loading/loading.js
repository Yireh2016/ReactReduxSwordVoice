import React from 'react'
//css
import './loading.css'

const Loading = ({fullscreen = false, color = 'coral'}) => {
  return (
    <div className={`adminPostSpinnerLay ${fullscreen && 'fullscreen'}`}>
      <div className='lds-ellipsis'>
        <div style={{background: color}} />
        <div style={{background: color}} />
        <div style={{background: color}} />
        <div style={{background: color}} />
      </div>
    </div>
  )
}

export default Loading
