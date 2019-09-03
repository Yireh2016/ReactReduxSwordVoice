//modules
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

//css
import "./logInForm.css";
//components
import Logo from "../../../general/logo.component";
import { connect } from "react-redux";
import UserManageForm from "../../../../layouts/UserManageForm";
import Loading from "../../../../components/loading/loading";

//services
import triggerDialog from "../../../../services/triggerDialog";
import Modal from "../../../modal/modal";

//api Calls
import apiCtrl from "../../../../../apiCalls/generic/apiCtrl";

const LogoContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
`;

const InputContainer = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > * {
    margin: 4vh 0 0 0;
  }
  > * {
    :first-child {
      margin: 0;
    }
  }
`;

const FormContainer = styled.div`
  @media (max-width: 1050px) {
    height: 100%;
  }

  > form {
    @media (max-width: 1050px) {
      height: 100%;
    }
  }
`;

const LogInCont = styled.div`
  height: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecoverCont = styled.div`
  font-weight: normal;
  span {
    font-weight: bold;
    color: #04b9fb !important;
    text-decoration: underline;
    :hover {
      cursor: pointer;
    }
  }
`;

const RecoveryForm = styled.form`
  display: flex;
  padding: 30px;
  flex-direction: column;
`;

const RecoveryLabel = styled.label`
  span {
    font-weight: bold;
    color: #f44336;
  }
  input {
    margin: 5px 0 0 0;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 23, 31, 0.29);
  }
`;

const Hint = styled.p`
  color: #2196f3;
  font-weight: bold;
  margin-left: 8px;
`;

const EmailHintCont = styled.div`
  margin: 22px 0 0 0;
  h4 {
    font-family: "Work Sans";
    color: #f44336;
  }
`;

const Tip = styled.p`
  span {
    color: #2196f3;
    font-weight: bold;
  }
`;

const EmailForgotCheck = styled.div`
  margin: 10px 0 0 8px;
`;

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user state

      userName: undefined,

      userPassword: undefined,

      // view state
      animControl1: undefined,
      isRecoveryModal: false,
      forgotEmail: false,
      recoveryEmail: "",
      recoveryUser: "",
      isRecoveryLoading: false,
      emailHint: ""
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
          triggerDialog({
            title: "Ups 😅 Something's wrong",
            body: `${err.response.data}`
          });

          // alert(`There was an error status:  ${err.data}`);
        });

      return;
    }

    triggerDialog({
      title: "Ups 😅 Something's wrong",
      body: `Please, fill all the required values`
    });

    // alert("Please, fill all the required values");
  };

  onScrollformLayout = e => {
    e.preventDefault();
  };

  forgotPasswdHandler = () => {
    this.setState({ isRecoveryModal: true });
  };

  handleRecovery = e => {
    const {
      target: { value, name }
    } = e;
    console.log(`name ${name} value ${value}`); //TODO erase
    this.setState({ [name]: value });
  };

  handleForgotEmail = () => {
    this.setState(prev => {
      return { forgotEmail: !prev.forgotEmail, emailHint: "" };
    });
  };

  sendRecoveryEmail = () => {
    this.setState({ isRecoveryLoading: true });
    const success = res => {
      console.log(res);
      this.setState({ isRecoveryLoading: false });

      triggerDialog(
        {
          title: "Nice pal",
          body:
            "If this Email was used to sign up, we will send you the password recovery instructions there. Don't forget to check your email **SPAN** folder"
        },
        () => {
          this.setState({ isRecoveryModal: false });
        }
      );
    };

    const errFn = err => {
      console.log(err);
      this.setState({ isRecoveryLoading: false });
      triggerDialog(
        {
          title: "Nice pal",
          body:
            "If this Email was used to sign up, we will send you the password recovery instructions there. Don't forget to check your email **SPAN** folder"
        },
        () => {
          this.setState({ isRecoveryModal: false });
        }
      );
    };

    const email = this.state.recoveryEmail;
    if (
      email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      )
    ) {
      apiCtrl({ url: `/api/recoveryPasswd?email=${email}` }, success, errFn);
      return;
    }
    this.setState({ isRecoveryLoading: false });
    triggerDialog({
      title: "Wrong",
      body: "The email format is incorrect, please try again"
    });
  };

  sendRecoveryUsername = () => {
    const success = response => {
      this.setState({ emailHint: response.data.emailHint });
    };

    const errFn = err => {
      console.log(err); //TODO erase
    };
    const userName = this.state.recoveryUser;
    apiCtrl(
      { url: `/api/recoveryUsername?userName=${userName}` },
      success,
      errFn
    );
  };

  sendRecoveryHandler = () => {
    if (this.state.forgotEmail) {
      this.sendRecoveryUsername();
      return;
    }

    this.sendRecoveryEmail();
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

    let recoveryForm = (
      <RecoveryForm id="userRecoveryForm">
        {this.state.forgotEmail ? (
          <RecoveryLabel>
            <span id="recoveryUsername">Username</span> <br />
            <input
              type="text"
              name="recoveryUser"
              htmlFor="userName"
              aria-label="userName"
              aria-labelledby="userRecoveryForm recoveryUsername"
              value={this.state.recoveryUser}
              onChange={this.handleRecovery}
            />
          </RecoveryLabel>
        ) : (
          <RecoveryLabel>
            <span id="recoveryEmail">Email</span> <br />
            <input
              type="email"
              name="recoveryEmail"
              htmlFor="userEmail"
              aria-label="userEmail"
              aria-labelledby="userRecoveryForm recoveryEmail"
              value={this.state.recoveryEmail}
              onChange={this.handleRecovery}
            />
          </RecoveryLabel>
        )}

        <EmailForgotCheck>
          <input
            type="checkbox"
            value={this.state.forgotEmail}
            checked={this.state.forgotEmail}
            name="forgotEmail"
            onChange={this.handleForgotEmail}
          />
          <span>Forgot Email?</span>
        </EmailForgotCheck>
        {this.state.emailHint !== "" && (
          <EmailHintCont>
            <h4>Email Hint</h4>
            <Hint>{this.state.emailHint}</Hint>
            <Tip>
              <span>Pro Tip:</span> Use this hint to recall your email address
            </Tip>
          </EmailHintCont>
        )}
      </RecoveryForm>
    );

    let recoveryFooter = (
      <div>
        <button
          onClick={() => {
            this.setState({
              isRecoveryModal: false,
              emailHint: "",
              recoveryUser: "",
              recoveryEmail: "",
              forgotEmail: false
            });
          }}
        >
          Cancel
        </button>
        <button onClick={this.sendRecoveryHandler}>
          {this.state.isRecoveryLoading ? <Loading></Loading> : "Send"}
        </button>
      </div>
    );

    // const logo = logoSV;
    return (
      <UserManageForm onClick={this.props.onCancelClick}>
        {this.state.isRecoveryModal && (
          <Modal
            modalHandler={() => {
              this.setState({ isRecoveryModal: false });
            }}
            title="Recovery Form"
            body={recoveryForm}
          >
            {recoveryFooter}
          </Modal>
        )}
        <LogInCont className="signUpPageCont">
          <FormContainer
            id="logInPage"
            className={`fila signUpPage1 col-12 ${this.state.animControl1} `}
          >
            <form id="logInForm" className="logInForm">
              <LogoContainer>
                <Logo className="col-8 logInLogo col-5-sm" />
              </LogoContainer>
              <InputContainer>
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
                <RecoverCont>
                  Forgot{" "}
                  <span onClick={this.forgotPasswdHandler}> something</span>?
                </RecoverCont>
              </InputContainer>
            </form>
          </FormContainer>
        </LogInCont>
        <div className="controlButtonLogin">{controlButtons}</div>
      </UserManageForm>
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
export default connect(
  mapStateToProps,
  mapDispachToProps
)(LogInForm);
