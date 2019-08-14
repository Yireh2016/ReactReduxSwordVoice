//Core Modules
import React, { Component } from "react";

class LightShadow extends Component {
  constructor(props) {
    super(props);

    this.state = { elementX: 1, elementY: 2 };
  }
  componentDidMount() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    window.addEventListener("mousemove", e => {
      const cursorX = e.x;
      const cursorY = e.y;
      if (this.props.children.ref && this.props.children.ref.current) {
        const childElementX =
          this.props.children.ref.current.getBoundingClientRect().top +
          this.props.children.ref.current.clientWidth;
        const childElementY =
          this.props.children.ref.current.getBoundingClientRect().left +
          this.props.children.ref.current.clientHeight;
        let elementX = 2 * centerX - cursorX;
        let elementY = 2 * centerY - cursorY;
        elementX = (elementX - childElementX / 2) / (centerX * 2);
        elementY = (elementY - childElementY / 2) / (centerY * 2);

        this.setState({
          elementX: elementX * this.props.factor,
          elementY: elementY * this.props.factor
        });
      }
    });
  }
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <div
          style={{
            transform: `translate(${this.state.elementX}%,${
              this.state.elementY
            }%)`
          }}
          className="containerLight"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LightShadow;
