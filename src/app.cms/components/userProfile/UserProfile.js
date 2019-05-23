import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//assets
import edit from "../../assets/createPost/edit.svg";

//components
import CountrySelect from "../countryInput/CountryInput";

const UserProfileView = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const FormLayout = styled.div`
  padding: 20px;
  display: flex;
`;

const Form = styled.form`
  flex-wrap: wrap;
  padding: 25px 0;
  box-sizing: border-box;
  display: flex;
  background-color: #1a2225;
  border-radius: 8px;
  width: 100%;
`;
const Column = styled.div`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
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
`;

const InputTextLayout = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 25px;
  flex-wrap: wrap;
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

  input,
  select {
    border-radius: 4px;
    border: 1px solid transparent;
    padding: 2px 4px;
    background-color: rgba(128, 128, 128, 0.6);
    color: rgb(195, 208, 213);
    text-align: center;
    text-align-last: center;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ;
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
  text-align: center;
  color: #00171f;
  background: #f95f0b;
  border-radius: 15px;
  width: 100%;
  transition: all 0.4s;
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.6rem;
  opacity: 1;
  width: auto;
  padding: 0 10px;
  display: none;
`;

const Avatar = styled.div`
  border-radius: 100%;
  height: 200px;
  width: 200px;
  margin: auto;
  background-color: gray;
  position: relative;
  background: ${props => `url(data:image/jpeg;base64,${props.img})`};
  background-position: center;
  background-size: cover;
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
  flex-grow: 1;
  color: coral;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const SaveBtn = styled.button`
  margin: auto;
  font-size: 18px !important;
  padding: 8px 26px !important;
`;

const OtherInterest = styled.div`
  position: relative;
  margin: 0 0 0 2px;
  padding: 0px 0px 0 5px;
  height: 22.8px;
  font-size: 13.3px;
  border-radius: 5px;
  background-color: coral;
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

const UserProfile = ({ userProfile }) => {
  const [password, setpassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [passwdConf, setPasswdConf] = useState("");
  const [isPasswdConf, setIsPasswdConf] = useState(false);
  const [name, setName] = useState("Jainer");
  const [isName, setIsName] = useState(false);
  const [lastName, setLastName] = useState("Munoz");
  const [isLastName, setIsLastName] = useState(false);
  const [email, setEmail] = useState("j@j.com");
  const [isEmail, setIsEmail] = useState(false);
  const [gender, setGender] = useState(" ");
  const [isGender, setIsGender] = useState(false);
  const [birthdate, setBirthDate] = useState(" ");
  const [isBirthDate, setIsBirthDate] = useState(false);
  const [otherInterest, setOtherInterest] = useState(" ");
  const [isOtherInterest, setIsOtherInterest] = useState(false);

  useEffect(() => {
    console.log("useEffect userProfile", userProfile);
  }, []);

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
  userBirthDate = userBirthDate.match(/\d{4}-\d{2}-\d{2}/);
  userBirthDate = userBirthDate[0];

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
          <input
            className=""
            checked={isChecked}
            type="checkbox"
            value={value}
            name={value}
          />
          <InterestChkBox>{value}</InterestChkBox>
        </InputLayout>
      </React.Fragment>
    );
  });

  const otherInterestsMap = userOtherInterests.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <OtherInterest className="otherInterests">
          <div>{value}</div>
          <span>X</span>
        </OtherInterest>
      </React.Fragment>
    );
  });

  return (
    <UserProfileView>
      <FormLayout id="FormLayout">
        <Form id="Form">
          <Column id="FirstCol" width="calc( 100% * 1 / 4);">
            <Avatar img={userAvatar} id="avatar">
              <AvatarEditBtn id="avatarEditBtn" src={edit} alt="Edit avatar" />
            </Avatar>
            <UserName>{userName}</UserName>
            <SaveBtn className="cmsBtn">Save</SaveBtn>
          </Column>
          <Column id="SecondCol" width="calc( 100% * 3 / 4);">
            <RowLayout id="RowLayout">
              <Row id="securityRow">
                <MainTitle id="SecMainTitle">Security Info</MainTitle>
                <InputTextLayout id="SecurityTextLayout">
                  <InputLabel width="50%" id="PasswordInputLabel">
                    <span>New Password</span>
                    <InputLayout id="PasswordInputLayout">
                      <input
                        id="PasswordInput"
                        type="password"
                        name="password"
                        value={password}
                        disabled={!isPassword}
                      />

                      <EditBtn
                        id="PasswordEditBtn"
                        src={edit}
                        alt="Edit Password"
                      />
                    </InputLayout>
                    <FormatWarning>
                      Password must be at least 10 characters long and must
                      contain uppercase and lowercase letters, numbers and
                      specials characters
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="50%" id="PasswdConfirmInputLabel">
                    <span>Password Confirm</span>
                    <InputLayout id="PasswdConfirmInputLayout">
                      <input
                        id="PasswdConfirmInput"
                        type="password"
                        name="passwdConfirm"
                        value={passwdConf}
                        disabled={!isPasswdConf}
                      />

                      <EditBtn
                        id="PasswdConfirmEditBtn"
                        src={edit}
                        alt="Edit PasswdConfirm"
                      />
                    </InputLayout>
                    <FormatWarning>
                      Confirmation password do not match yet
                    </FormatWarning>
                  </InputLabel>
                </InputTextLayout>
              </Row>
              <Row id="personalRow">
                <MainTitle id="PersonalMainTitle">Personal Info</MainTitle>
                <InputTextLayout id="PersonalTextLayout" width="70%">
                  <InputLabel width="calc(100% / 2)" id="NameInputLabel">
                    <span>First Name</span>
                    <InputLayout id="NameInputLayout">
                      <input
                        id="NameInput"
                        type="text"
                        name="userFirstName"
                        value={userFirstName}
                        disabled={!isName}
                      />

                      <EditBtn id="NameEditBtn" src={edit} alt="Edit Name" />
                    </InputLayout>
                    <FormatWarning>
                      Please, insert name without spaces or numbers
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)" id="LastNameInputLabel">
                    <span>Last Name</span>
                    <InputLayout id="LastNameInputLayout">
                      <input
                        id="LastNameInput"
                        type="text"
                        name="userLastName"
                        value={userLastName}
                        disabled={!isLastName}
                      />

                      <EditBtn
                        id="LastNameEditBtn"
                        src={edit}
                        alt="Edit LastName"
                      />
                    </InputLayout>
                    <FormatWarning>
                      Please, insert name without spaces or numbers
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)" id="EmailInputLabel">
                    <span>Email</span>
                    <InputLayout id="EmailInputLayout">
                      <input
                        id="EmailInput"
                        type="email"
                        name="userEmail"
                        value={userEmail}
                        disabled={!isEmail}
                      />

                      <EditBtn id="EmailEditBtn" src={edit} alt="Edit Email" />
                    </InputLayout>
                    <FormatWarning>
                      Please, insert a valid Email address
                    </FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)">
                    <span>Gender</span>
                    <InputLayout id="GenderInputLayout">
                      <select
                        value={userGender}
                        name="userGender"
                        disabled={!isGender}
                      >
                        <option value=" ">Please Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <EditBtn
                        id="GenderEditBtn"
                        src={edit}
                        alt="Edit Gender"
                      />
                    </InputLayout>

                    <FormatWarning>This field is required</FormatWarning>
                  </InputLabel>

                  <InputLabel width="calc(100% / 2)">
                    <span>Birth Date</span>
                    <InputLayout id="GenderInputLayout">
                      <input
                        style={{ padding: "0 0 0 40px" }}
                        type="date"
                        value={userBirthDate}
                        name="userBirthDate"
                        disabled={!isBirthDate}
                      />
                      <EditBtn
                        id="BirthDateEditBtn"
                        src={edit}
                        alt="Edit BirthDate"
                      />
                    </InputLayout>

                    <FormatWarning>This field is required</FormatWarning>
                  </InputLabel>


                  <InputLabel width="calc(100% / 2)">
                    <span>Birth Date</span>
                    <InputLayout id="GenderInputLayout">
              <CountrySelect></CountrySelect>
                      <EditBtn
                        id="BirthDateEditBtn"
                        src={edit}
                        alt="Edit BirthDate"
                      />
                    </InputLayout>

                    <FormatWarning>This field is required</FormatWarning>
                  </InputLabel>


                  {/* <CountryInput country={userCountry} width="calc(100% / 2)">
                    <FormatWarning>This field is required</FormatWarning>
                  </CountryInput> */}
                </InputTextLayout>
              </Row>
              <Row id="InterestRow">
                <MainTitle id="InterestMainTitle">Interest</MainTitle>
                <InputTextLayout>{interests}</InputTextLayout>
                <InputLabel width="calc(100% / 2)" id="OtherInterestLabel">
                  <span>Other Intersts</span>
                  <InputLayout id="NameInputLayout">
                    <input
                      style={{ width: "100%" }}
                      id="OtherInterest"
                      type="text"
                      name="userOtherInterest"
                      value={otherInterest}
                      disabled={!isOtherInterest}
                    />

                    <EditBtn
                      id="OtherInterestEditBtn"
                      src={edit}
                      alt="Edit OtherInterest"
                    />
                  </InputLayout>
                  <OtherInterestsLayout>
                    {otherInterestsMap}
                  </OtherInterestsLayout>
                  <FormatWarning>Don't use special characters</FormatWarning>
                </InputLabel>
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
    userProfile: state.userProfile.userProfile
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(UserProfile);
