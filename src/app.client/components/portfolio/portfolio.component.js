import React from "react";
import NavBar from "../navbar/navbar.component.js";
//components
import Modal from "../../../app.cms/common/components/modal/modal.js";

export default class PortfolioComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: true
    };
  }
  componentDidMount() {
    window.addEventListener("beforeunload", e => {
      this.leavePageHandler(e);
    });
  }

  leavePageHandler = e => {
    // // Cancel the event
    // e.preventDefault();
    // // Chrome requires returnValue to be set
    e.returnValue = "";
  };
  modalHandler = () => {
    this.setState(prevState => {
      return { modalIsVisible: !prevState.modalIsVisible };
    });
  };
  render() {
    return (
      <div>
        <NavBar />
        portfolio
        <svg
          width="336"
          height="228"
          viewBox="0 0 336 228"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="-11"
            width="347"
            height="239"
          >
            <rect
              x="0.5"
              y="11.5"
              width="309"
              height="216"
              rx="19.5"
              fill="#C4C4C4"
              stroke="black"
            />
            <path
              d="M315.796 11.7027C319.404 11.6964 322.843 11.6906 325.763 11.6862C323.258 12.6949 321.135 14.4173 319.342 16.5916C316.436 20.1185 314.382 24.8516 312.932 29.7285C310.107 39.2283 309.529 49.4222 309.501 52.7464C309.459 52.7024 309.415 52.6535 309.367 52.5992C308.758 51.905 307.861 50.5676 306.759 48.7499C304.567 45.132 301.638 39.7385 298.704 34.1465C295.771 28.5573 292.838 22.7799 290.637 18.3992C289.537 16.209 288.62 14.3682 287.979 13.0751C287.711 12.5351 287.491 12.0906 287.325 11.7561L289.204 11.7524L296.112 11.739C301.748 11.7282 309.066 11.7145 315.796 11.7027Z"
              fill="#C4C4C4"
              stroke="black"
            />
          </mask>
          <g mask="url(#mask0)">
            <rect
              x="-10.5"
              y="0.5"
              width="346"
              height="253"
              fill="#D5EBF4"
              stroke="black"
            />
          </g>
        </svg>
        {this.state.modalIsVisible && (
          <Modal
            title="Exit"
            body="Do you want exit without save?"
            isVisible={this.state.modalIsVisible}
            modalHandler={this.modalHandler}
          >
            <button onClick={this.modalHandler} type="button">
              Save & Exit
            </button>
            <button onClick={this.modalHandler} type="button">
              Exit
            </button>
          </Modal>
        )}
        <button
          onClick={() => {
            this.setState(prevState => {
              return { modalIsVisible: !prevState.modalIsVisible };
            });
          }}
        />
      </div>
    );
  }
}
