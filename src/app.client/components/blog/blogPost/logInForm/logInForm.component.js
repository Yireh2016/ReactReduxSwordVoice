//modules
import React, { Component } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
//css
import "./logInForm.css";
//components
import Logo from "../../../general/logo.component";
import { connect } from "react-redux";

class LogInForm extends Component {
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

  componentDidMount() {
    window.addEventListener("scroll", function(e) {
      e.preventDefault();
    });
    setTimeout(() => {
      this.setState(() => {
        return {
          animControl1: "flyIn"
        };
      });
    }, 200);
  }

  onSuccessLogIn = userData => {
    //Redux: hacer este metodo en el componente LogInForm

    // if (userData.userAvatar === "") {
    //   //si no existe avatar
    //   this.props.onLogIn({
    //     userAvatar: undefined,
    //     userName: userData.userName,
    //     userID: userData._id,
    //     userType: userData.userType,
    //     userFullName: userData.userFullName
    //   });
    //   return;
    // }

    // let imgBytes = new Uint8Array(userData.userAvatar.buffer.data);
    // imgBlob = new Blob([imgBytes], {
    //   type: "image/jpeg"
    // });
    this.props.onLogIn({
      userAvatar: userData.userAvatar,
      userName: userData.userName,
      userID: userData._id,
      userType: userData.userType,
      userFullName: userData.userFullName
    });
    console.log("Login Successful");
  };

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
            this.props.onCancelClick();
            this.onSuccessLogIn(res.data);
          }
        })
        .catch(err => {
          alert(`There was an error status:  ${err}`);
        });

      return;
    }
    alert("Please, fill all the required values");
  };

  onScrollformLayout = e => {
    e.preventDefault();
  };
  render() {
    let controlButtons = (
      <React.Fragment>
        <button
          onClick={this.props.onCancelClick}
          className="cancelBtn"
          type="button"
        >
          Cancel
        </button>
        <button className="logSignBtn" onClick={this.tryLogIn} type="button">
          Log In
        </button>
      </React.Fragment>
    );

    // const logo = logoSV;
    return (
      <div
        className="formLayout"
        onWheel={e => {
          this.onScrollformLayout(e);
        }}
        onScroll={e => {
          this.onScrollformLayout(e);
        }}
        onClick={this.props.onCancelClick}
      >
        <div
          className="formCardLogin"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="signUpPageCont">
            <section
              id="logInPage"
              className={`fila signUpPage1 col-12 ${this.state.animControl1} `}
            >
              <div className="grid col-12">
                <form id="logInForm" className="logInForm">
                  <Logo className="col-8 logInLogo col-5-sm" />
                  <label>
                    <span id="loginUsername">Username</span> <br />
                    <input
                      htmlFor="username"
                      aria-label="username"
                      aria-labelledby="logInForm loginUsername"
                      type="text"
                      name="userName"
                      value={this.state.userName}
                      onBlur={this.handleOnBlur}
                      onChange={this.handleFormInputChange}
                    />
                  </label>

                  <label>
                    <span id="loginuserPassword">Password</span> <br />
                    <input
                      type="password"
                      name="userPassword"
                      htmlFor="userPassword"
                      aria-label="userPassword"
                      aria-labelledby="logInForm loginuserPassword"
                      value={this.state.userPassword}
                      onBlur={this.handleOnBlur}
                      onChange={this.handleFormInputChange}
                    />
                  </label>
                  <div>
                    <span>
                      Forgot{" "}
                      <a aria-label="go to password recovery" href="#">
                        {" "}
                        Password?
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </section>
          </div>
          <div className="controlButtonLogin">{controlButtons}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones
    onLogIn: payload => dispatch({ type: "LOGGED_IN", payload: payload })
  };
};

const LogInForm2 = connect(
  mapStateToProps,
  mapDispachToProps
)(LogInForm);
export default withCookies(LogInForm2);
