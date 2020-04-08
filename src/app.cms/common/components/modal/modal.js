import React, {Component} from 'react'
import './modal.css'

class Modal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
        <div className='modalLayout'>
          <div className='modalDialog'>
            <div className='modalHeader'>
              <h3 className='modalTitle'>{this.props.title}</h3>
              <button type='button' className='modalCancelBtn'>
                <span onClick={this.props.modalHandler}>X</span>
              </button>
            </div>
            <div className='modalBody'>{this.props.body}</div>
            <div className='modalFooter'>{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Modal
