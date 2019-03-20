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
    if (this.props.cookies.cookies.sessionId) {
      axios(`/api/searchSessionID/${this.props.cookies.cookies.sessionId}`)
        .then(res => {
          if (res.status === 200) {
            const data = {
              userAvatar: res.data.userAvatar,
              userName: res.data.userName,
              userID: res.data._id
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
            sessionCookie(this.props);

            axios
              .put(`/api/sessionUpdate/${res.data.userName}`)
              .then(res => {
                console.log("res on put api/sessionUpdate ", res);
              })
              .catch(err => {
                console.log("err ", err);
              });

            window.localStorage.setItem("userAvatar", res.data.userAvatar);

            const data = {
              userAvatar: res.data.userAvatar,
              userName: res.data.userName,
              userID: res.data._id
            };
            this.props.onLogIn(data);
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
  return {
    loggedUserName: state.login.loggedUserName,
    isUserLoggedIn: state.login.isUserLoggedIn,
    loggedUserAvatar: state.login.loggedUserAvatar
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
