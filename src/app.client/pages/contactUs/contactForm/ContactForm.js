import React, { useState } from "react";
import styled from "styled-components";
import InputPlaceholder from "./inputPlacehoder/InputPlaceholder";

//components
import Loading from "../../../components/loading/loading";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 30px 20px;
  background: rgba(0, 23, 31, 0.7);
  border-radius: 5px;
  border: 1px solid coral;

  label:first-child {
    margin-top: 0;
  }
  label {
    margin-top: 20px;
    width: 100#;
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
  font-size: 0.6rem;
  border-radius: 8px;

  :hover {
    cursor: pointer;
    background: #f95f0b;
    background: var(--orange);
  }

  @media (max-width: 1050px) {
    margin-top: 40px;
    font-size: 20px;
  }

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CheckBoxContainer = styled.div`
  border-right: ${props => {
    const { valid } = props;
    let result;

    switch (valid) {
      case true: {
        result = "5px solid #4caf50";
        break;
      }

      case false: {
        result = "5px solid #e91e63";
        break;
      }

      default: {
        result = "5px solid transparent";
        break;
      }
    }
    return result;
  }};
  border-radius: 0 5px 5px 0;
`;

const inputStyleObj = {
  background: " transparent",
  borderLeft: "none",
  borderTop: "none",
  borderBottom: " 1px solid #2e9ac2",
  fontSize: "24px",
  color: " #2e9ac2"
};

const textareaStyleObj = {
  ...inputStyleObj,
  height: "200px",
  width: "100%",
  padding: "10px",
  boxSizing: "border-box"
};

const placeholderStyleObj = {
  color: "#2e9ac2",
  colorOnFocus: "#f95f0b",
  fontSize: "18px"
};

const ContactForm = ({ onSubmit }) => {
  const [emailValid, setEmailValid] = useState({ valid: " " });
  const [email, setEmail] = useState("");

  const [nameValid, setNameValid] = useState({ valid: " " });
  const [name, setName] = useState("");

  const [messageValid, setMessageValid] = useState({ valid: " " });
  const [message, setMessage] = useState("");

  const [termsValid, setTermsValid] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // const [submitHandler,submitHandler]
  const submitHandler = async () => {
    let totalValid;
    if (
      emailValid.valid === true &&
      nameValid.valid === true &&
      messageValid.valid === true &&
      termsValid === true
    ) {
      totalValid = true;
    } else {
      totalValid = false;
    }

    if (!totalValid) {
      console.log("mensaje no enviado");
      onSubmit(totalValid, { message: "Please fill all the required inputs" });
      return;
    }

    setIsLoading(true);
    const submitResponse = await onSubmit(totalValid, {
      name,
      email,
      message,
      newsletter
    });

    if (submitResponse === "OK") {
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
      case "email": {
        setEmail(value);

        if (value.match(/^$/)) {
          setEmailValid({
            valid: " ",
            message: ``
          });
          return;
        }

        if (
          !value ||
          !value.match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
          )
        ) {
          setEmailValid({
            valid: false,
            message: "Please, insert a valid Email"
          });
          return;
        } else {
          setEmailValid({
            valid: true,
            message: ""
          });
        }

        break;
      }

      case "name": {
        setName(value);

        if (value.match(/^$/)) {
          setNameValid({ valid: " " });
          return;
        }

        if (!value || !value.match(/[a-zA-Z\sñáéíóú]{3,30}/g)) {
          setNameValid({
            valid: false
          });
          return;
        } else {
          setNameValid({
            valid: true
          });
        }

        break;
      }

      case "message": {
        setMessage(value);

        if (value.match(/^$/)) {
          setMessageValid({ valid: " " });
          return;
        } else {
          setMessageValid({
            valid: true
          });
        }

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
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          valid={nameValid.valid}
        />
      </label>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={inputStyleObj}
          placeholder="Email"
          onChange={handleFormInputChange}
          type="email"
          name="email"
          value={email}
          valid={emailValid.valid}
        />
      </label>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={textareaStyleObj}
          placeholder="Your Message"
          type="textarea"
          name="message"
          value={message}
          onChange={handleFormInputChange}
          valid={messageValid.valid}
        />
      </label>

      <div
        style={{
          color: "white",
          fontSize: "18px"
        }}
      >
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={newsletter}
          onChange={() => {
            setNewsletter(!newsletter);
          }}
        />
        <label htmlFor="newsletter">Subscribe to our Newsletter</label>
      </div>
      <CheckBoxContainer
        valid={termsValid}
        style={{
          color: "white",
          fontSize: "18px"
        }}
      >
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={termsValid}
          onChange={() => {
            setTermsValid(!termsValid);
          }}
        />
        <label htmlFor="terms">Accept Terms</label>
      </CheckBoxContainer>

      <Button onClick={submitHandler}>
        {isLoading ? <Loading color="white" /> : "send"}
      </Button>
    </Form>
  );
};

export default ContactForm;
