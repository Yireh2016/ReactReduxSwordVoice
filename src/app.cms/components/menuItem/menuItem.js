import React, { Component } from "react";
//css
import "./menuItem.css";
//assets
import hamburger from "../../assets/dashboard/hamburger.svg";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toogleAdmin: false,
      adminMenuH: 0,
      toogleStats: false
    };
    this.adminMenu = React.createRef();
  }

  adminClickHandler = () => {
    const adminMenuH = this.adminMenu.current.clientHeight;
    this.setState(prevState => {
      return {
        toogleAdmin: !prevState.toogleAdmin,
        adminMenuH: adminMenuH,
        toogleStats: false
      };
    });
    this.props.adminClickHandler(this.props.id);
  };

  render() {
    return (
      <React.Fragment>
        <div className="menuItemAdmin" onClick={this.adminClickHandler}>
          <p>{this.props.menuTitle}</p>
          <img src={hamburger} alt="hamburger" />
        </div>
        <div
          className="menuItemDesplegableLayout"
          style={
            this.props.itemToggle
              ? { height: `${this.state.adminMenuH}px` }
              : { height: "0" }
          }
        >
          <div className="menuItemDesplegable" ref={this.adminMenu}>
            <div style={{ top: "0" }}>{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MenuItem;
