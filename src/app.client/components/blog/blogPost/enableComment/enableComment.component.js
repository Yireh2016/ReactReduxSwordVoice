import React, {Component} from 'react'
import './enableComment.css'

class EnableComment extends Component {
  render() {
    return (
      <div className='contSignCard'>
        <div className='signInCard'>
          <p>
            Ups!!! it seems you are not logged in already. Please,{' '}
            <span className='cardLink'>Log in</span> or{' '}
            <span className='cardLink'>Sign Up</span> to enable comments:
          </p>
          <div className='signInButtonCont'>
            <button
              className='signButton'
              type='button'
              onClick={this.props.onSignUpClick}
            >
              Sign Up
            </button>
            <button
              onClick={this.props.onLogInClick}
              className='logButton'
              type='button'
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default EnableComment
