import React, { Component } from "react";
import { withCookies } from "react-cookie";
import {
  guestCookie,
  sessionCookie
} from "../../../app.client/services/cookieManager";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

//assets
import "./login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: undefined,
      userPassword: undefined
    };
  }

  componentDidMount() {
    guestCookie(this.props);
  }

  handleFormInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({ [name]: value });
  };

  loginClickHandler = () => {
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
            console.log("res.data", res.data);
            sessionStorage.setItem("userAvatar", res.data.userAvatar);
            sessionStorage.setItem("userName", res.data.userName);
            // sessionStorage.setItem("userAvatar", res.data.userAvatar);
            // sessionStorage.setItem("userAvatar", res.data.userAvatar);
            // sessionStorage.setItem("userAvatar", res.data.userAvatar);
            // sessionStorage.setItem("userAvatar", res.data.userAvatar);
            this.props.onLogIn(res.data);
          }
        })
        .catch(err => {
          alert(`There was an error status:  ${err}`);
        });

      return;
    }
    alert("Please, fill all required values");
  };

  render() {
    if (this.props.isUserLoggedIn) {
      return <Redirect to="/cms/dashboard" />;
    }
    return (
      <div className="loginLayout">
        <div className="loginCont">
          <div className="loginInputLayout">
            <label>User</label>
            <input
              name="userName"
              value={this.state.userName}
              onChange={this.handleFormInputChange}
              type="text"
            />
            <label>Password</label>
            <input
              name="userPassword"
              value={this.state.userPassword}
              onChange={this.handleFormInputChange}
              type="password"
            />
          </div>
          <button onClick={this.loginClickHandler}>Login</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps state", state);
  return {
    loggedUserName: state.loggedUserName,
    isUserLoggedIn: state.isUserLoggedIn,
    loggedUserAvatar: state.loggedUserAvatar
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload })
  };
};

const Login2 = connect(
  mapStateToProps,
  mapDispachToProps
)(Login);

export default withCookies(Login2);
