import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { guestCookie } from "../../../app.client/services/cookieManager";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

//assets
import "./login.css";

//apiCalls
import loginUser from "../../apiCalls/loginUser";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: undefined,
      userPassword: undefined
    };
  }

  componentDidMount() {
    axios(`/api/searchSessionID/`)
      .then(res => {
        if (res.status === 200) {
          const data = {
            userAvatar: res.data.userAvatar,
            userName: res.data.userName,
            userID: res.data._id,
            userType: res.data.userType,
            userFullName: `${res.data.userFirstName} ${res.data.userLastName}`
          };
          this.props.onLogIn(data);
        }
      })
      .catch(err => {
        if (err) {
          console.log(`Error al buscar el usuario por Session ID`, err);
          guestCookie(this.props);
        }
      });
    return;
  }

  handleFormInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({ [name]: value });
  };

  loginClickHandler = async () => {
    const { userName, userPassword } = this.state;

    if (userName && userPassword) {
      const loginRes = await loginUser(userName, userPassword);

      if (loginRes.status === "OK") {
        alert("Login Successful");

        window.localStorage.setItem("userAvatar", loginRes.data.userAvatar);

        const data = {
          userAvatar: loginRes.data.userAvatar,
          userName: loginRes.data.userName,
          userID: loginRes.data._id,
          userType: loginRes.data.userType,
          userFullName: loginRes.data.userFullName
        };
        this.props.onLogIn(data);
      }

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
  return {
    isUserLoggedIn: state.login.isUserLoggedIn
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
