import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

//assets
import "./login.css";

//apiCalls
import loginUser from "../../apiCalls/loginUser";

//services
import triggerDialog from "../../controllers/triggerDialog";
import Dialog from "../dialog/Dialog";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: undefined,
      userPassword: undefined,
      showLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      showLoading: true,
    });
    axios(`/api/searchSessionID/`)
      .then((res) => {
        if (res.status === 200) {
          const data = {
            userAvatar: res.data.userAvatar,
            userName: res.data.userName,
            userID: res.data._id,
            userType: res.data.userType,
            userFullName: `${res.data.userFirstName} ${res.data.userLastName}`,
          };
          this.props.onLogIn(data);
        }
        this.setState({ showLoading: false });
      })
      .catch((err) => {
        if (err) {
          console.log(`Error al buscar el usuario por Session ID`, err);
          // guestCookie(this.props);
        }
        this.setState({ showLoading: false });
      });
    return;
  }

  handleFormInputChange = (event) => {
    const {
      target: { name, value },
    } = event;

    this.setState({ [name]: value });
  };

  loginClickHandler = async () => {
    const { userName, userPassword } = this.state;

    if (userName && userPassword) {
      try {
        var loginRes = await loginUser(userName, userPassword);
      } catch (error) {
        triggerDialog({ title: "Error 🤬", body: err.response.data.message });
      }

      if (loginRes.status === "OK") {
        triggerDialog({
          title: "Way to Go!! 😁",
          body: `Welcome Back ${userName}`,
          auto: true,
          time: 3000,
        });

        const data = {
          userAvatar: loginRes.data.userAvatar,
          userName: loginRes.data.userName,
          userID: loginRes.data._id,
          userType: loginRes.data.userType,
          userFullName: loginRes.data.userFullName,
        };
        this.props.onLogIn(data);
        return;
      }

      triggerDialog({ title: "Ups 😅", body: loginRes.status });
      return;
    }

    triggerDialog({
      title: "Ups 😅",
      body: "Please, fill all the required values",
    });
  };

  render() {
    if (this.props.isUserLoggedIn) {
      return <Redirect to="/cms/dashboard" />;
    }

    if (this.state.showLoading) {
      return this.props.loadingScreen;
    }
    return (
      <div className="loginLayout">
        {this.props.isDialog && <Dialog />}
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

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.login.isUserLoggedIn,
    isDialog: state.dialog.show,
  };
};
const mapDispachToProps = (dispach) => {
  return {
    //acciones
    onLogIn: (payload) => dispach({ type: "LOGGED_IN", payload: payload }),
  };
};

const Login2 = connect(mapStateToProps, mapDispachToProps)(Login);

export default Login2;
