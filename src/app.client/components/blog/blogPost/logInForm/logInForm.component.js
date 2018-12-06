//modules
import React, { Component } from "react";
import axios from "axios";
//css
import "./logInForm.css";
//components
import Logo from "../../../general/logo.component";
//services
// import { saveToken} from "../../../../services/auth";

export default class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user state

      userName: undefined,

      userPassword: undefined,

      // view state
      animControl1: undefined
    };
  }

  handleFormInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({ [name]: value });
  };

  handleErrors = res => {
    const { statusText } = res;

    if (!statusText === "OK") {
      console.log("hubo error", res);
      throw Error(JSON.stringify(res));
    }
    return res;
  };
  tryLogIn = () => {
    const { userName, userPassword } = this.state;
    const data = {
      userName,
      userPassword
    };

    if (userName && userPassword) {
      axios
        .post("/api/login", data)
        .then(this.handleErrors)
        .then(res => {
          if (res.status === 200) {
            alert("Login Successful");

            this.props.onCancelClick();
            this.props.onSuccessLogIn(res.data);
          }
        })
        .catch(err => {
          alert(`There was an error status:  ${err}`);
        });

      return;
    }
    alert("Please, fill all required values");
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return {
          animControl1: "flyIn"
        };
      });
    }, 200);
  }
  render() {
    let controlButtons = (
      <React.Fragment>
        <button onClick={this.props.onCancelClick} type="button">
          Cancel
        </button>
        <button onClick={this.tryLogIn} type="button">
          {/* {this.tryLogInClick} */}
          Log In
        </button>
      </React.Fragment>
    );

    // const logo = logoSV;
    return (
      <div className="formLayout">
        <div className="formCard">
          <div className="signUpPageCont">
            <section
              id="logInPage"
              className={`fila signUpPage1 col-12 ${this.state.animControl1} `}
            >
              <div className="grid col-12">
                <form className="logInForm">
                  <Logo className="col-8 logInLogo" />
                  <label>
                    Username <br />
                    <input
                      type="text"
                      name="userName"
                      value={this.state.userName}
                      onBlur={this.handleOnBlur}
                      onChange={this.handleFormInputChange}
                    />
                  </label>

                  <label>
                    Password <br />
                    <input
                      type="password"
                      name="userPassword"
                      value={this.state.userPassword}
                      onBlur={this.handleOnBlur}
                      onChange={this.handleFormInputChange}
                    />
                  </label>
                  <div>
                    <span>
                      Forgot <a href="#"> Password?</a>
                    </span>
                  </div>
                </form>
              </div>
            </section>
          </div>
          <div className="controlButtons">{controlButtons}</div>
        </div>
      </div>
    );
  }
}
