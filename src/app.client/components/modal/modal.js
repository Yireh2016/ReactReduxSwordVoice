import React, {Component} from 'react'
import styled from 'styled-components'
import './modal.css'

const ModalDialog = styled.div`
  width: ${props => {
    console.log('props.size', props.size)
    return props.size === 'big' ? '50%' : 'auto'
  }};

  @media (max-width: 700px) {
    width: ${props => {
      return props.size === 'big' ? '100%' : 'auto'
    }};
  }
`

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <div className='modalLayout' onClick={this.props.modalHandler}>
          <ModalDialog
            className='modalDialog'
            size={this.props.size}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <button type='button' className='modalCancelBtn'>
              <span onClick={this.props.modalHandler}>X</span>
            </button>
            <div className='modalHeader'>
              {this.props.title && (
                <h3 className={this.props.modalTitleClass}>
                  {this.props.title}
                </h3>
              )}
            </div>
            {typeof this.props.body === 'string' ? (
              <p className='modalBody'>{this.props.body}</p>
            ) : (
              this.props.body
            )}
            <div className='modalFooter'>{this.props.children}</div>
          </ModalDialog>
        </div>
      </React.Fragment>
    )
  }
}

export default Modal
