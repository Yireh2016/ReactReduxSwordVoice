//modules
import React, { Component } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
//css
import "./logInForm.css";
//components
import Logo from "../../../general/logo.component";
import { connect } from "react-redux";

//services
import { saveToken } from "../../../../services/auth";
import { sessionCookie } from "../../../../services/sessionCookie";

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

  onSuccessLogIn = userData => {
    //Redux: hacer este metodo en el componente LogInForm
    let imgBlob;

    sessionCookie(this.props);

    if (userData.userAvatar === "") {
      //si no existe avatar
      this.props.onLogIn({
        loggedUserAvatar: undefined,
        userName: userData.userName
      });
      return;
    }

    console.log("dentro del if userData.userAvatar", userData.userAvatar);
    // let imgBytes = new Uint8Array(userData.userAvatar.buffer.data);
    // imgBlob = new Blob([imgBytes], {
    //   type: "image/jpeg"
    // });

    this.props.onLogIn({
      loggedUserAvatar: userData.userAvatar,
      userName: userData.userName
    });
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
            alert("Login Successful");

            this.props.onCancelClick();
            this.onSuccessLogIn(res.data);
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

const mapStateToProps = state => {
  console.log("mapStateToProps state", state);
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload }),
    onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};

const LogInForm2 = connect(
  mapStateToProps,
  mapDispachToProps
)(LogInForm);
export default withCookies(LogInForm2);
