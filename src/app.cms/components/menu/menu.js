import React, { Component } from "react";
import MenuItem from "../menuItem/menuItem";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { itemToggle: [] };
  }
  componentDidMount() {
    let itemToggle = [];
    if (this.props.children.length) {
      const arrLen = this.props.children.length;

      for (let i = 0; i < arrLen; i++) {
        itemToggle[i] = false;
      }
    } else {
      itemToggle[0] = false;
    }
    this.setState({ itemToggle: itemToggle });
  }
  componentDidUpdate() {
    console.log("componentDidUpdate MENU this.state", this.state);
  }

  adminClickHandler = id => {
    console.log("id on adminClickHandler", id);
    this.setState(prevState => {
      const arrLen = prevState.itemToggle.length;
      let newState = [];
      for (let i = 0; i < arrLen; i++) {
        if (i === id) {
          newState[i] = !prevState.itemToggle[i];
        } else {
          newState[i] = false;
        }
      }
      return {
        itemToggle: newState
      };
    });
  };

  render() {
    console.log(
      "  this.props.children.length on render",
      this.props.children.length
    );
    const items = this.props.children.length ? (
      this.props.children.map((items, i) => {
        return (
          <MenuItem
            itemToggle={this.state.itemToggle[i]}
            key={i}
            id={i}
            adminClickHandler={this.adminClickHandler}
            menuTitle={this.props.itemsTitle[i]}
          >
            {items}
          </MenuItem>
        );
      })
    ) : (
      <MenuItem
        itemToggle={this.state.itemToggle[0]}
        key={0}
        id={0}
        adminClickHandler={this.adminClickHandler}
        menuTitle={this.props.itemsTitle[0]}
      >
        {this.props.children}
      </MenuItem>
    );

    console.log("items", items);
    return <div className="menuItem">{items}</div>;
  }
}

export default Menu;
