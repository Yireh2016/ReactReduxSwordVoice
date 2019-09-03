import React, { useState } from "react";
import styled from "styled-components";

//components
import InputPlaceholder from "./inputPlacehoder/InputPlaceholder";

import Loading from "../../../components/loading/loading";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 30px 20px;
  background: rgba(0, 23, 31, 0.9);
  border-radius: 5px;
  border: 1px solid coral;

  label:first-child {
    margin-top: 0;
  }
  label {
    margin-top: 20px;
  }

  @media (max-width: 1050px) {
    margin: 10vh 0 0 0;
  }

  @media (max-width: 700px) {
    box-sizing: border-box;
    width: 300px;
    padding: 25px 18px;
    margin: 59px 0px 35px 0;
  }
`;

const Button = styled.button`
  position: relative;
  z-index: 2;
  margin-top: 30px;
  height: 36px;
  min-width: 90px;
  background: #00171f;
  background: var(--blueDark);
  border: 1px solid #f95f0b;
  border: 1px solid var(--orange);
  box-sizing: border-box;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-decoration: none;
  color: white;
  font-size: 16px;
  padding: 10px 30px;
  border-radius: 8px;

  :hover {
    cursor: pointer;
    background: #f95f0b;
    background: var(--orange);
  }

  @media (max-width: 1050px) {
    margin-top: 40px;
  }

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const inputStyleObj = {
  background: " transparent",
  borderLeft: "none",
  borderTop: "none",
  borderBottom: " 1px solid #2e9ac2",
  fontSize: "24px",
  color: " #2e9ac2"
};

const placeholderStyleObj = {
  color: "#2e9ac2",
  colorOnFocus: "#f95f0b",
  fontSize: "18px"
};

const PasswdRecoveryForm = ({ onSubmit }) => {
  const [passwdConfirmValid, setPasswdConfirmValid] = useState({ valid: " " });
  const [passwdConfirm, setPasswdConfirm] = useState("");

  const [passwdValid, setPasswdValid] = useState({ valid: " " });
  const [passwd, setPasswd] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // const [submitHandler,submitHandler]
  const submitHandler = async () => {
    let totalValid;
    if (passwdValid === true && passwdConfirmValid === true) {
      totalValid = true;
    } else {
      totalValid = false;
    }

    if (!totalValid) {
      console.log("mensaje no enviado");
      onSubmit(totalValid, {
        message: "Please check password match or fill all the the inputs"
      });
      return;
    }

    setIsLoading(true);
    const submitResponse = await onSubmit(totalValid, { passwd });

    if (submitResponse.status === "OK") {
      setEmailValid({ valid: " " });
      setNameValid({ valid: " " });
      setMessageValid({ valid: " " });

      setEmail("");
      setName("");
      setMessage("");

      setTermsValid(true);
      setNewsletter(true);
    }
    setIsLoading(false);
  };
  const handleFormInputChange = event => {
    const {
      target: { name, value }
    } = event;

    switch (name) {
      case "passwd": {
        setPasswd(value);
        //it has to be 10 chars long with any special one and uppercase and lowercase chars
        if (
          value &&
          value.match(
            /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g
          )
        ) {
          setPasswdValid(true);
          return;
        }

        if (value.match(/^$/)) {
          setPasswdValid(" ");
          return;
        }
        setPasswdValid(false);
        break;
      }

      case "passwdConfirm": {
        setPasswdConfirm(value);
        if (value.match(/^$/)) {
          setPasswdConfirmValid(" ");
          return;
        }
        if (value !== passwd) {
          setPasswdConfirmValid(false);
          return;
        }

        setPasswdConfirmValid(true);
        break;
      }
    }
  };

  return (
    <Form>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={inputStyleObj}
          onChange={handleFormInputChange}
          placeholder="Password"
          type="password"
          name="passwd"
          value={passwd}
          valid={passwdValid}
        />
      </label>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={inputStyleObj}
          placeholder="Confirm Password"
          onChange={handleFormInputChange}
          type="password"
          name="passwdConfirm"
          value={passwdConfirm}
          valid={passwdConfirmValid}
        />
      </label>

      <Button onClick={submitHandler}>
        {isLoading ? <Loading color="white" /> : "send"}
      </Button>
    </Form>
  );
};

export default PasswdRecoveryForm;
