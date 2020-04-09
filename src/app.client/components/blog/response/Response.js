import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
`

const Response = props => {
  return (
    <div className='oldCommentsLayout fila'>
      <div
        className='fila'
        style={{
          backgroundColor: 'antiquewhite',
          float: 'right',
          width: '80%',
          padding: '10px',
          marginTop: '10px'
        }}
      >
        <div>
          <AvatarContainer className='col-12 grid '>
            <div>
              <div
                className='oldAvatarImg avatarImg'
                style={{
                  backgroundImage: 'url(' + props.userAvatar + ')'
                }}
              />
            </div>
            <p
              style={{
                textAlign: 'center'
              }}
            >
              <span className='userName'>{props.userName} </span>
              <br />
              <span className='verbName'>replied:</span>
            </p>
          </AvatarContainer>
          <div className='col-12 grid'>
            <p>{props.comments}</p>
          </div>
          <div className='postDateCont'>
            <span
              style={{
                float: 'left',
                fontWeight: 'bold',
                color: ' var(--orange)'
              }}
            >
              {props.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

Response.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number
}

export default Response
