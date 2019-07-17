import React from "react";
import styled from "styled-components";
import InputPlaceholder from "./inputPlacehoder/InputPlaceholder";

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
  }

  @media (max-width: 700px) {
    box-sizing: border-box;
    width: 100%;
    padding: 18px 10px;
  }
`;

const ContactForm = () => {
  const inputStyleObj = {
    background: " transparent",
    border: " none",
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

  return (
    <Form>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={inputStyleObj}
          placeholder="Name"
          type="text"
          name="name"
        />
      </label>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={inputStyleObj}
          placeholder="Email"
          type="email"
          name="Email"
        />
      </label>
      <label>
        <InputPlaceholder
          placeholderStyle={placeholderStyleObj}
          inputStyle={textareaStyleObj}
          placeholder="Your Message"
          type="textarea"
          name="text"
        />
      </label>
    </Form>
  );
};

export default ContactForm;