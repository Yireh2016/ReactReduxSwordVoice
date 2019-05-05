import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="modalLayout" onClick={this.props.modalHandler}>
          <div className="modalDialog">
            <button type="button" className="modalCancelBtn">
              <span onClick={this.props.modalHandler}>X</span>
            </button>
            <div className="modalHeader">
              <h3 className={this.props.modalTitleClass}>{this.props.title}</h3>
            </div>
            <p className="modalBody">{this.props.body}</p>
            <div className="modalFooter">{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
