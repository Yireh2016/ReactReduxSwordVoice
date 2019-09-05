import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Compressor from "compressorjs";
import { withRouter } from "react-router-dom";

//assets
import edit from "../../assets/createPost/edit.svg";
import { check } from "../../assets/SvgIcons";

//components
import CountrySelect from "../countryInput/CountryInput";
import LoadingBtn from "../loading/loadingBtn";
import MonthlyDate from "../../../common/components/monthlyInput/MonthlyInput";

//api calls
import searchEmail from "../../apiCalls/searchEmail";
import loginUser from "../../apiCalls/loginUser";
import sendUserProfile from "../../apiCalls/sendUserProfile";
import uploadAvatar from "../../../apiCalls/uploadAvatar";

//validations
import validateInterest from "./validations/validateInterest";
import validatePassword from "./validations/validatePassword";
import validateNames from "./validations/validateNames";
import validateEmail from "./validations/validateEmail";

//services
import blobToBase64 from "../../../services/blobToBase64";
import isBrowser from "../../../services/isBrowser";
import triggerDialog from "../../controllers/triggerDialog";

const UserProfileView = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;

  @media (max-width: 700px) {
    display: block;
    height: initial;
  }
`;

const FormLayout = styled.div`
  padding: 20px;
  display: flex;
  height: calc(100% - 40px);

  @media (max-width: 700px) {
    height: initial;
    padding: 0;
  }
`;

const Form = styled.form`
  flex-wrap: wrap;
  padding: 25px 0;
  box-sizing: border-box;
  display: flex;
  background-color: #1a2225;
  border-radius: 8px;
  width: 100%;
  margin: 0;

  @media (max-width: 1050px) {
    #FirstCol {
      width: calc(100% * 4 / 12);
    }

    #SecondCol {
      width: calc(100% * 8 / 12);
    }
  }

  @media (max-width: 700px) {
    padding: 25px 25px;
    border-radius: 0px;
    #FirstCol {
      width: calc(100% * 12 / 12);
    }

    #SecondCol {
      width: calc(100% * 12 / 12);
      margin-top: 25px;
    }
  }
`;
const Column = styled.div`
  width: ${props => props.widthCol};
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
const RowLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  > div {
    margin-top: 20px;
  }
  > div:first-child {
    margin-top: 0;
  }

  @media (max-width: 700px) {
    justify-content: initial;
    height: initial;
  }
`;

const InputTextLayout = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 25px;
  flex-wrap: wrap;
  @media (max-width: 1050px) {
    margin: 0;

    #CountryLabel {
      margin-left: 1px;
    }
  }
`;
const MainTitle = styled.h2`
  margin: 0px 0 8px 0;
  font-family: "Work Sans";
  font-size: 36px;
  font-weight: bold;
  color: var(--orange);
  color: coral;
`;

const InputLayout = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.width};

  @media (max-width: 1050px) {
    width: 50%;
  }

  @media (max-width: 700px) {
    width: 100%;

    visibility: ${props => {
      if (props.mobileDisplay === true) {
        return "hidden";
      } else if (props.mobileDisplay === false) {
        return "visible";
      }
    }};
  }

  select,
  input {
    border-radius: 4px;
    border: 1px solid transparent;
    padding: 2px 4px;
    text-align: center;
    text-align-last: center;
  }
`;

const Select = styled.select`
  color: ${props => (props.active ? "rgb(26, 34, 37)" : "rgb(195, 208, 213)")};
  background-color: ${props =>
    props.active ? "rgb(195, 208, 213)" : "rgba(128, 128, 128, 0.6)"};
  ${"" /* 
  @media (max-width: 700px) {
    margin: auto;
  } */}
`;

const Input = styled.input`
  color: ${props => (props.active ? "rgb(26, 34, 37)" : "rgb(195, 208, 213)")};
  background-color: ${props =>
    props.active ? "rgb(195, 208, 213)" : "rgba(128, 128, 128, 0.6)"};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ;

  @media (max-width: 1050px) {
    #OtherInterestLabel {
      width: 80%;
    }
  }

  @media (max-width: 700px) {
    #OtherInterestLabel {
      width: 100%;
    }
  }
`;

const EditBtn = styled.img`
  margin-left: 10px;
  width: 20px;
  :hover {
    cursor: pointer;
  }
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.lMargin};
  width: ${props => props.width};
  margin-top: 15px;
  position: relative;

  @media (max-width: 1050px) {
    #NameInputLayout {
      width: 80%;
    }
    > span {
      margin: 10px 0 5px 6px;
    }
  }

  @media (max-width: 700px) {
    width: 100%;

    > span {
      visibility: ${props => {
        if (props.mobileDisplay === true) {
          return "hidden";
        } else if (props.mobileDisplay === false) {
          return "visible";
        }
      }};
    }

    #NameInputLayout {
      width: 100%;
    }
  }

  > span {
    color: #00baff;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 0 6px;
  }
`;

const InputLabelUserProfile = styled.label`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.lMargin};
  width: ${props => props.width};
  margin-top: 15px;
  position: relative;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    width: 100%;
  }

  > span {
    color: #00baff;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 0 6px;
  }
`;

const InterestChkBox = styled.span`
  color: white;
  font-size: 18px;
  margin: 0 0 0 6px;
`;
const FormatWarning = styled.div`
  position: absolute;
  top: 47px;
  z-index: 2;
  text-align: center;
  color: #00171f;
  background: coral;
  border-radius: 4px;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  font-size: 14px;
  opacity: 1;
  width: 350px;
  padding: 5px 10px;
  max-width: 100%;
  display: ${props => props.display};
  @media (max-width: 700px) {
    width: 85%;
  }
`;

const OldPasswordInputCont = styled.div`
  height: 25px;
  display: flex;
`;

const OldPasswordInputLabel = styled.label`
  position: absolute;
  right: -80px;
  padding: 10px;
  top: -11px;
  display: flex;
  flex-direction: column;
  display: ${props => props.display};

  @media (max-width: 700px) {
    top: -13px;
    left: -7px;
  }

  > span {
    color: #00baff;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 0 6px;
  }
`;

const OldPasswordInput = styled.input`
  color: rgb(26, 34, 37);
  background-color: rgb(195, 208, 213);
  animation: ${props => (props.isOldPasswordShaking ? shake : "")} 500ms ease
    forwards;
`;

const shake = keyframes`
0% {transform:translateX(0) rotate(0) }
25% {transform:translateX(10%) rotate(5deg)}
50% {transform:translateX(-10%) rotate(-3deg)}
75% {transform:translateX(10%) rotate(1deg)}
100%{transform:translateX(0) rotate(0)}`;

const Avatar = styled.div`
  border-radius: 100%;
  height: 200px;
  width: 200px;
  margin: 0 auto;
  background-color: gray;
  position: relative;
  background: ${props => {
    return `url(${props.img})`;
  }};
  background-position: center;
  background-size: cover;

  :hover {
    cursor: pointer;
  }
`;

const AvatarEditBtn = styled.img`
  position: absolute;
  width: 20px;
  bottom: 0;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;
const UserName = styled.p`
  color: coral;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const UserControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-top: 8px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin: calc(74vh - 300px) 0 0 0;

  button {
    margin-left: 15px;
    @media (max-width: 1050px) {
      margin-left: 8px;
    }
  }

  button:disabled {
    cursor: not-allowed;
  }

  button:first-child {
    margin: 0;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ControlsMobile = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;

    button {
      margin-left: 15px;
    }

    button:disabled {
      cursor: not-allowed;
    }

    button:first-child {
      margin: 0;
    }
  }
`;

const ControlBtn = styled.button`
  font-size: 18px !important;
  padding: 8px 26px !important;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(1);

  }
50%{

  transform: rotate(180deg) scale(.5);


}
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const SvgBtn = styled.div`
  > svg {
    margin-left: 10px;
    fill: #00baff;
    width: 25px;
    animation: ${props => (props.rotateOn ? "" : rotate)} 1s ease infinite;
  }
  > svg:hover {
    cursor: pointer;
  }
`;

const OtherInterest = styled.div`
  position: relative;
  margin: 0 0 0 2px;
  padding: 0px 0px 0 5px;
  height: 22.8px;
  font-size: 13.3px;
  border-radius: 5px;
  background-color: #9e9e9e;
  float: left;
  color: #1a2225;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  > div {
    padding-right: 12px;
    margin-right: 8px;
  }

  span {
    position: absolute;
    top: 5px;
    right: 2px;
    z-index: 1;
    font-weight: bold;
    font-size: 12px;
    padding: 0 5px;
    color: red;
    cursor: pointer;
  }
`;

const OtherInterestsLayout = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-left: 5px;
    :first-child {
      margin-left: 0;
    }
  }
`;

const UserProfile = ({
  userProfile,
  setUserProfile,
  setUserAvatar,
  loggedUserName,
  login,
  history
}) => {
  const inputFile = React.createRef();

  const [oldPassword, setOldPassword] = useState("");
  const [isOldPassword, setIsOldPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(true);
  const [isOldPasswordShaking, setOldPasswordShaking] = useState(false);

  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(" ");

  const [passwdConf, setPasswdConf] = useState("");
  const [isPasswdConfValid, setPasswdConfValid] = useState(" ");

  const [isName, setIsName] = useState(false);
  const [isNameValid, setNameValid] = useState(" ");

  const [isLastName, setIsLastName] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(" ");

  const [isEmail, setIsEmail] = useState(false);
  const [isEmailValid, setEmailValid] = useState(" ");
  const [emailWarningMessage, setEmailWarningMessage] = useState(
    "Please, insert a valid Email"
  );

  const [isGender, setIsGender] = useState(false);
  const [isGenderValid, setGenderValid] = useState(" ");

  const [isBirthDate, setIsBirthDate] = useState(false);
  const [isBirthDateValid, setIsBirthDateValid] = useState(" ");

  const [isCountry, setIsCountry] = useState(false);
  const [isCountryValid, setIsCountryValid] = useState(" ");

  const [otherInterest, setOtherInterest] = useState("");
  const [isOtherInterest, setIsOtherInterest] = useState(false);
  const [isInterestValid, setInterestValid] = useState(" ");

  const [isProfileChanged, setProfileChanged] = useState(false);

  const [newAvatar, setNewAvatar] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [cancelMessage, setCancelMessage] = useState("Cancel");

  const interestArray = [
    "Graphic Design",
    "UX/UI",
    "Web Design",
    "Web Development",
    "Programming",
    "Ecommerce",
    "Digital Marketing",
    "Mobile Apps"
  ];

  let {
    userAvatar,
    userName,
    userFirstName,
    userLastName,
    userEmail,
    userInterests,
    userOtherInterests,
    userCountry,
    userBirthDate,
    userGender
  } = userProfile;

  // userBirthDate = userBirthDate.match(/\d{4}-\d{2}-\d{2}/);
  // userBirthDate = userBirthDate[0];

  const checkboxHandler = (e, isChecked) => {
    const { value, name } = e.target;

    let newUserProfile = userProfile;

    if (name === "userActive") {
      newUserProfile.isUserActive = !newUserProfile.isUserActive;
    } else {
      if (isChecked) {
        newUserProfile.userInterests = userProfile.userInterests.filter(
          interest => {
            return interest !== value;
          }
        );
      } else {
        newUserProfile.userInterests = [...userProfile.userInterests, value];
      }
    }

    setUserProfile(newUserProfile);
    setProfileChanged(true);
  };

  const setFinalDate = date => {
    let newUserProfile = userProfile;
    setIsBirthDate(date);
    setIsBirthDateValid(true);

    setProfileChanged(true);

    newUserProfile.userBirthDate = date;
    setUserProfile(newUserProfile);
  };

  const interests = interestArray.map((value, index) => {
    let isChecked = false;
    userInterests.forEach(interest => {
      if (interest === value) {
        isChecked = true;
      }
    });
    return (
      <React.Fragment key={index}>
        <InputLayout width="33%" id={`InterestInputLayout${index}`}>
          <Input
            checked={isChecked}
            type="checkbox"
            value={value}
            name={value}
            onChange={e => {
              checkboxHandler(e, isChecked);
            }}
          />
          <InterestChkBox>{value}</InterestChkBox>
        </InputLayout>
      </React.Fragment>
    );
  });

  const handleOnInterestClick = texto => {
    let newUserProfile = userProfile;
    let array = userOtherInterests;
    setProfileChanged(true);
    array = array.filter(item => item !== texto);
    newUserProfile.userOtherInterests = array;

    setUserProfile(newUserProfile);
  };

  const otherInterestsMap = userOtherInterests.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <OtherInterest>
          <div>{value}</div>
          <span
            onClick={() => {
              handleOnInterestClick(value);
            }}
          >
            X
          </span>
        </OtherInterest>
      </React.Fragment>
    );
  });

  const inputChangeHandler = async e => {
    const { value, name } = e.target;
    let newUserProfile = userProfile;
    switch (name) {
      case "userType":
        setProfileChanged(true);
        newUserProfile.userType = value;
        setUserProfile(newUserProfile);

        break;

      case "userOtherInterest": {
        setProfileChanged(true);
        setOtherInterest(value);
        const interestValidationRes = validateInterest(value);
        setInterestValid(interestValidationRes);
        if (interestValidationRes !== true) {
          setProfileChanged(false);
        }

        if (value.match(/,/g)) {
          let interest = value.slice(0, value.length - 1);

          if (interest !== "") {
            let arrayInterest = userProfile.userOtherInterests;
            arrayInterest.push(`${interest.toLowerCase()}`);

            setOtherInterest("");
            newUserProfile.userOtherInterests = arrayInterest;
            setUserProfile(newUserProfile);
            return;
          }

          setOtherInterest("");
          return;
        }

        break;
      }

      case "userCountry":
        setProfileChanged(true);
        newUserProfile.userCountry = value;
        setUserProfile(newUserProfile);

        if (value === " ") {
          setIsCountryValid(false);

          setProfileChanged(false);

          return;
        }

        setIsCountryValid(true);

        break;

      // case "userBirthDate":
      //   if (value) {
      //     setProfileChanged(true);
      //     newUserProfile.userBirthDate = value;
      //     setUserProfile(newUserProfile);
      //   }

      //   if (value === " ") {
      //     setIsBirthDateValid(false);
      //     setProfileChanged(false);
      //     return;
      //   }
      //   setIsBirthDateValid(true);
      //   break;

      case "userGender":
        setProfileChanged(true);

        newUserProfile.userGender = value;
        setUserProfile(newUserProfile);
        if (value === " ") {
          setGenderValid(false);
          setProfileChanged(false);
          return;
        }
        setGenderValid(true);
        break;

      case "oldPassword":
        setOldPassword(value);
        break;

      case "password":
        setPasswordValid(validatePassword(value));
        setPassword(value);
        break;

      case "passwdConfirm":
        setPasswdConf(value);
        if (password === value) {
          setPasswdConfValid(true);
          setProfileChanged(true);
          newUserProfile.userPassword = value;
          setUserProfile(newUserProfile);
        } else if (isPasswdConfValid !== false) {
          setPasswdConfValid(false);
          setProfileChanged(false);
        }
        break;

      case "userFirstName":
        setProfileChanged(true);
        const nameValidation = validateNames(value);
        newUserProfile.userFirstName = value;
        setUserProfile(newUserProfile);
        setNameValid(nameValidation);
        if (nameValidation !== true) {
          setProfileChanged(false);
        }
        break;

      case "userLastName":
        setProfileChanged(true);
        const lastNameValidation = validateNames(value);
        newUserProfile.userLastName = value;
        setUserProfile(newUserProfile);
        setLastNameValid(lastNameValidation);
        if (lastNameValidation !== true) {
          setProfileChanged(false);
        }
        break;

      case "userEmail":
        setProfileChanged(true);
        newUserProfile.userEmail = value;
        setUserProfile(newUserProfile);
        const emailFormatValidation = validateEmail(value);

        setEmailValid(emailFormatValidation);

        if (emailFormatValidation === true) {
          const emailRes = await searchEmail(value);

          if (!emailRes.valid && emailRes.user === userName) {
            setEmailValid(" ");
            return;
          }
          setEmailWarningMessage(emailRes.message);
          setEmailValid(emailRes.valid);
        } else {
          setEmailValid(emailFormatValidation);
          setEmailWarningMessage("Please, insert a valid Email");
          setProfileChanged(false);
        }
        break;

      default:
        break;
    }
  };

  const oldPasswordHandler = async () => {
    setIsPasswordCheck(false);
    const loginResponse = await loginUser(userProfile.userName, oldPassword);

    if (loginResponse.status === "OK") {
      setIsPassword(true);
      setIsOldPassword(!isOldPassword);
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(true);
      setOldPasswordShaking(true);
      setTimeout(() => {
        setOldPasswordShaking(false);
      }, 500);
    }
  };

  const imageUpload = image => {
    let newUserProfile = userProfile;
    blobToBase64(image, base64Obj => {
      newUserProfile.userAvatar = base64Obj.url;

      setUserProfile(newUserProfile);
      setProfileChanged(true);
      setNewAvatar(true);

      alert("file Uploaded successfully");
    });
  };

  const imageUploadErr = err => {
    console.log(`error on upload ${err}`);
  };

  const avatarEditHandler = files => {
    let Uploadfunction = imageUpload;
    const browser = isBrowser();

    const shouldCompress =
      browser === "ie" || browser === "edge" ? false : true;

    if (shouldCompress) {
      new Compressor(files[0], {
        quality: 0.6,
        width: 200,
        mimeType: "jpg",
        convertSize: 200000,
        success(result) {
          Uploadfunction(result);
        },
        error(err) {
          imageUploadErr(err);
          return;
        }
      });
    } else {
      Uploadfunction(files[0]);
    }
  };

  const saveHandler = async () => {
    setLoading(true);
    if (otherInterest !== "") {
      let newUserProfile = userProfile;
      newUserProfile.userOtherInterests = [
        ...newUserProfile.userOtherInterests,
        otherInterest
      ];
      setUserProfile(newUserProfile);
      setOtherInterest("");
    }
    if (newAvatar) {
      console.log("saveHandler userProfile.userName,", userProfile.userName);
      try {
        var sendAvatarRes = await uploadAvatar(
          userProfile.userName,
          userProfile.userAvatar
        );
      } catch (err) {
        console.log("err on catch", err);
        triggerDialog({
          title: "Error",
          body: `There was an error: ${sendAvatarRes.status} err.response.data.message: ${err.response.data.message} `,
          status: "ERR"
        });

        return;
      }

      if (sendAvatarRes.status === "OK") {
        userProfile.userAvatar = sendAvatarRes.avatarURL;

        if (userProfile.userName === loggedUserName) {
          setUserAvatar(userProfile.userAvatar);
        }
      } else {
        triggerDialog({
          title: "Error",
          body: `There was an error: ${sendAvatarRes.status} `,
          status: "ERR"
        });
        resetUserProfileUI();
        setLoading(false);
        return;
      }
    }

    const sendUserRes = await sendUserProfile(userProfile);
    if (sendUserRes.status === "OK") {
      triggerDialog({
        title: "Success",
        body: sendUserRes.message,
        status: "OK"
      }); //'Success','Your profile has been saved','OK'
      setCancelMessage("Back");
    } else {
      triggerDialog({
        title: "Error",
        body: sendUserRes.message,
        status: "ERR"
      });
    }
    resetUserProfileUI();
    setLoading(false);
  };

  const resetUserProfileUI = () => {
    setOldPassword("");
    setIsOldPassword(false);
    setIsPasswordCheck(true);
    setOldPasswordShaking(false);

    setPassword("");
    setIsPassword(false);
    setPasswordValid(" ");

    setPasswdConf("");
    setPasswdConfValid(" ");

    setIsName(false);
    setNameValid(" ");

    setIsLastName(false);
    setLastNameValid(" ");

    setIsEmail(false);
    setEmailValid(" ");
    setEmailWarningMessage("Please, insert a valid Email");

    setIsGender(false);
    setGenderValid(" ");

    setIsBirthDate(false);
    setIsBirthDateValid(" ");

    setIsCountry(false);
    setIsCountryValid(" ");

    setOtherInterest("");
    setIsOtherInterest(false);
    setInterestValid(" ");

    setProfileChanged(false);

    setNewAvatar(false);
  };
  return (
    <UserProfileView>
      <FormLayout id="FormLayout">
        <Form id="Form">
          <Column id="FirstCol" widthCol="calc( 100% * 1 / 4);">
            <input
              ref={inputFile}
              style={{
                display: "none"
              }}
              type="file"
              name="avatar"
              id="avatarInput"
              accept="image/*"
              onChange={e => {
                avatarEditHandler(e.target.files);
              }}
            />
            <Avatar
              img={userAvatar}
              id="avatar"
              onClick={e => {
                inputFile.current.click();
              }}
            >
              <AvatarEditBtn
                id="avatarEditBtn"
                src={edit}
                alt="Edit avatar"
                onClick={e => {
                  e.stopPropagation();
                  inputFile.current.click();
                }}
              />
            </Avatar>
            <UserControl>
              <UserName>{userName}</UserName>

              {login.userType === "admin" && (
                <React.Fragment>
                  <InputLabelUserProfile width="calc(100% / 2)">
                    <span>User Type</span>
                    <InputLayout
                      id="userTypeInputLayout"
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Select
                        value={userProfile.userType}
                        name="userType"
                        active={true}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      >
                        <option value="user" defaultValue>
                          User
                        </option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </InputLayout>
                  </InputLabelUserProfile>
                  <div>
                    <Input
                      checked={userProfile.isUserActive}
                      type="checkbox"
                      value={userProfile.isUserActive}
                      name="userActive"
                      onChange={e => {
                        checkboxHandler(e);
                      }}
                    />
                    <InterestChkBox>is User Active?</InterestChkBox>
                  </div>
                </React.Fragment>
              )}
            </UserControl>
            <Controls>
              {isProfileChanged && (
                <ControlBtn
                  type="button"
                  disabled={!isProfileChanged}
                  className="cmsBtn"
                  onClick={saveHandler}
                >
                  {isLoading ? <LoadingBtn /> : "Save"}
                </ControlBtn>
              )}

              <ControlBtn
                onClick={() => {
                  if (login.userType === "admin") {
                    history.push("/cms/usersList");
                    return;
                  }
                  history.push("/cms/dashboard");
                }}
                type="button"
                className="cmsBtn"
              >
                {cancelMessage}
              </ControlBtn>
            </Controls>
          </Column>
          <Column id="SecondCol" widthCol="calc( 100% * 3 / 4);">
            <RowLayout id="RowLayout">
              <Row id="securityRow">
                <MainTitle id="SecMainTitle">Security Info</MainTitle>
                <InputTextLayout id="SecurityTextLayout">
                  <InputLabel
                    mobileDisplay={isOldPassword}
                    width="50%"
                    id="PasswordInputLabel"
                  >
                    <span> New Password</span>
                    <InputLayout
                      mobileDisplay={isOldPassword}
                      id="PasswordInputLayout"
                    >
                      <Input
                        id="PasswordInput"
                        type="password"
                        name="password"
                        value={password}
                        disabled={!isPassword}
                        active={isPassword}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      />

                      <EditBtn
                        id="PasswordEditBtn"
                        src={edit}
                        alt="Edit Password"
                        onClick={() => {
                          if (!isPassword) {
                            setOldPassword("");
                            setIsOldPassword(!isOldPassword);
                          }
                        }}
                      />
                    </InputLayout>
                    <OldPasswordInputLabel
                      display={!isOldPassword ? "none" : "block"}
                    >
                      <span>Old Password please</span>
                      <OldPasswordInputCont>
                        <OldPasswordInput
                          isOldPasswordShaking={isOldPasswordShaking}
                          id="oldPassword"
                          type="password"
                          name="oldPassword"
                          value={oldPassword}
                          onChange={e => {
                            inputChangeHandler(e);
                          }}
                        />
                        <SvgBtn
                          rotateOn={isPasswordCheck}
                          id="oldPasswrodSend"
                          alt="old Password"
                          onClick={oldPasswordHandler}
                        >
                          {check}
                        </SvgBtn>
                      </OldPasswordInputCont>
                    </OldPasswordInputLabel>
                    <FormatWarning
                      display={
                        isPasswordValid === " " || isPasswordValid
                          ? "none"
                          : "block"
                      }
                    >
                      Password must be at least 10 characters long and must
                      contain uppercase and lowercase letters, numbers and
                      specials characters
                    </FormatWarning>
                  </InputLabel>

                  {isPasswordValid === true && (
                    <InputLabel width="50%" id="PasswdConfirmInputLabel">
                      <span>Password Confirm</span>
                      <InputLayout id="PasswdConfirmInputLayout">
                        <Input
                          id="PasswdConfirmInput"
                          type="password"
                          name="passwdConfirm"
                          value={passwdConf}
                          active={true}
                          onChange={e => {
                            inputChangeHandler(e);
                          }}
                        />
                      </InputLayout>
                      <FormatWarning
                        display={
                          isPasswdConfValid === " " || isPasswdConfValid
                            ? "none"
                            : "block"
                        }
                      >
                        Confirmation password do not match yet
                      </FormatWarning>
                    </InputLabel>
                  )}
                </InputTextLayout>
              </Row>
              <Row id="personalRow">
                <MainTitle id="PersonalMainTitle">Personal Info</MainTitle>
                <InputTextLayout id="PersonalTextLayout" width="70%">
                  <InputLabel width="calc(100% / 2)" id="NameInputLabel">
                    <span>First Name</span>
                    <InputLayout id="NameInputLayout">
                      <Input
                        id="NameInput"
                        type="text"
                        name="userFirstName"
                        value={userFirstName}
                        disabled={!isName}
                        active={isName}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      />

                      <EditBtn
                        id="NameEditBtn"
                        src={edit}
                        alt="Edit Name"
                        onClick={() => {
                          setIsName(!isName);
                        }}
                      />
                    </InputLayout>
                    <FormatWarning
                      display={
                        isNameValid === " " || isNameValid ? "none" : "block"
                      }
                    >
                      Please, insert name without spaces or numbers
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)" id="LastNameInputLabel">
                    <span>Last Name</span>
                    <InputLayout id="LastNameInputLayout">
                      <Input
                        id="LastNameInput"
                        type="text"
                        name="userLastName"
                        value={userLastName}
                        active={isLastName}
                        disabled={!isLastName}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      />

                      <EditBtn
                        id="LastNameEditBtn"
                        src={edit}
                        alt="Edit LastName"
                        onClick={() => {
                          setIsLastName(!isLastName);
                        }}
                      />
                    </InputLayout>
                    <FormatWarning
                      display={
                        isLastNameValid === " " || isLastNameValid
                          ? "none"
                          : "block"
                      }
                    >
                      Please, insert name without spaces or numbers
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)" id="EmailInputLabel">
                    <span>Email</span>
                    <InputLayout id="EmailInputLayout">
                      <Input
                        id="EmailInput"
                        type="email"
                        name="userEmail"
                        value={userEmail}
                        disabled={!isEmail}
                        active={isEmail}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      />

                      <EditBtn
                        id="EmailEditBtn"
                        onClick={() => {
                          setIsEmail(!isEmail);
                        }}
                        src={edit}
                        alt="Edit Email"
                      />
                    </InputLayout>
                    <FormatWarning
                      display={
                        isEmailValid === " " || isEmailValid ? "none" : "block"
                      }
                    >
                      {emailWarningMessage}
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)">
                    <span>Gender</span>
                    <InputLayout id="GenderInputLayout">
                      <Select
                        value={userGender}
                        name="userGender"
                        disabled={!isGender}
                        active={isGender}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      >
                        <option value=" ">Please Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                      <EditBtn
                        id="GenderEditBtn"
                        src={edit}
                        alt="Edit Gender"
                        onClick={() => {
                          setIsGender(!isGender);
                        }}
                      />
                    </InputLayout>

                    <FormatWarning
                      display={
                        isGenderValid === " " || isGenderValid
                          ? "none"
                          : "block"
                      }
                    >
                      This field is required
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)">
                    <span>Birth Date</span>
                    <InputLayout id="GenderInputLayout">
                      {/* <Input
                        style={{
                          padding: "0 0 0 40px",
                          width: "auto",
                          display: "none"
                        }}
                        type="date"
                        value={userBirthDate}
                        name="userBirthDate"
                        disabled={!isBirthDate}
                        active={isBirthDate}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      /> */}
                      <MonthlyDate
                        actualDate={userProfile.userBirthDate}
                        setFinalDate={setFinalDate}
                      ></MonthlyDate>
                      {/* <EditBtn
                        id="BirthDateEditBtn"
                        src={edit}
                        alt="Edit BirthDate"
                        onClick={() => {
                          setIsBirthDate(!isBirthDate);
                        }}
                      /> */}
                    </InputLayout>

                    <FormatWarning
                      display={
                        isBirthDateValid === " " || isBirthDateValid
                          ? "none"
                          : "block"
                      }
                    >
                      This field is required
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel id="CountryLabel" width="calc(100% / 2)">
                    <span>Country</span>
                    <InputLayout id="CountryInputLayout">
                      <CountrySelect
                        value={userCountry}
                        name="userCountry"
                        disabled={!isCountry}
                        active={isCountry}
                        onChange={e => {
                          inputChangeHandler(e);
                        }}
                      />
                      <EditBtn
                        id="CountryEditBtn"
                        src={edit}
                        alt="Edit Country"
                        onClick={() => {
                          setIsCountry(!isCountry);
                        }}
                      />
                    </InputLayout>

                    <FormatWarning
                      display={
                        isCountryValid === " " || isCountryValid
                          ? "none"
                          : "block"
                      }
                    >
                      This field is required
                    </FormatWarning>
                  </InputLabel>
                </InputTextLayout>
              </Row>
              <Row id="InterestRow">
                <MainTitle id="InterestMainTitle">Interest</MainTitle>
                <InputTextLayout>{interests}</InputTextLayout>
                <InputLabel width="calc(100% / 2)" id="OtherInterestLabel">
                  <span>Other Interests (separeted by commas)</span>
                  <InputLayout id="NameInputLayout">
                    <Input
                      style={{ width: "100%" }}
                      id="OtherInterest"
                      type="text"
                      name="userOtherInterest"
                      value={otherInterest}
                      disabled={!isOtherInterest}
                      active={isOtherInterest}
                      onChange={e => {
                        inputChangeHandler(e);
                      }}
                    />

                    <EditBtn
                      id="OtherInterestEditBtn"
                      src={edit}
                      alt="Edit OtherInterest"
                      onClick={() => {
                        setIsOtherInterest(!isOtherInterest);
                      }}
                    />
                  </InputLayout>
                  <OtherInterestsLayout>
                    {otherInterestsMap}
                  </OtherInterestsLayout>
                  <FormatWarning
                    display={
                      isInterestValid === " " || isInterestValid
                        ? "none"
                        : "block"
                    }
                  >
                    Don't use special characters
                  </FormatWarning>
                </InputLabel>
              </Row>

              <Row>
                <ControlsMobile>
                  {isProfileChanged && (
                    <ControlBtn
                      type="button"
                      disabled={!isProfileChanged}
                      className="cmsBtn"
                      onClick={saveHandler}
                    >
                      {isLoading ? <LoadingBtn /> : "Save"}
                    </ControlBtn>
                  )}

                  <ControlBtn
                    onClick={() => {
                      if (login.userType === "admin") {
                        history.push("/cms/usersList");
                        return;
                      }
                      history.push("/cms/dashboard");
                    }}
                    type="button"
                    className="cmsBtn"
                  >
                    Cancel
                  </ControlBtn>
                </ControlsMobile>
              </Row>
            </RowLayout>
          </Column>
        </Form>
      </FormLayout>
    </UserProfileView>
  );
};

// export default UserProfile;
const mapStateToProps = state => {
  return {
    userProfile: state.userProfile.userProfile,
    loggedUserName: state.login.loggedUserName,
    login: state.login
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones
    setUserProfile: profile =>
      dispatch({ type: "SET_USER_PROFILE", payload: profile }),
    setUserAvatar: base64Avatar =>
      dispatch({ type: "SET_AVATAR", payload: base64Avatar })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispachToProps
  )(UserProfile)
);
