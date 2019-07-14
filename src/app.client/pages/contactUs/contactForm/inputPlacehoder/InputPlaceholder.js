import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
`;

const Placeholder = styled.span`
  position: absolute;
  top: 0;
  transition: all ease 500ms;

  font-size: ${props => {
    return props.isFocus
      ? `calc( ${props.placeholderStyle.fontSize} * 2 / 3)`
      : `${props.placeholderStyle.fontSize}`;
  }};

  color: ${props => {
    return props.isFocus
      ? `${props.placeholderStyle.colorOnFocus}`
      : `${props.placeholderStyle.color}`;
  }};

  font-weight: ${props => {
    return props.isFocus ? `bold` : `normal`;
  }};

  transform: ${props => {
    return props.isFocus ? "translateY(-100%)" : "translateY(0)";
  }};
  left: ${props => {
    return props.isFocus ? "5px" : "10px";
  }};
`;

const Input = styled.input`
  :focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  font-family: "Work Sans", monospace;
  :focus {
    outline: none;
  }
`;

const InputPlaceholder = ({
  type,
  name,
  placeholder,
  onChange,
  placeholderStyle,
  inputStyle
}) => {
  const [isFocus, setisFocus] = useState(false);
  const [isInputFilled, setisInputFilled] = useState(false);
  const inputRef = React.createRef();

  const onInputChange = e => {
    const { value } = e.target;
    if (value) {
      setisInputFilled(true);
    } else {
      setisInputFilled(false);
    }

    onChange();
  };

  const focusPlaceholder = () => {
    setisFocus(true);
  };

  const unfocusPlaceholder = () => {
    if (!isInputFilled) {
      setisFocus(false);
    }
  };

  const placeholderClick = () => {
    inputRef.current.focus();
    focusPlaceholder();
  };

  return (
    <InputContainer>
      <Placeholder
        onClick={placeholderClick}
        placeholderStyle={placeholderStyle}
        isFocus={isFocus}
      >
        {placeholder}
      </Placeholder>
      {type === "textarea" ? (
        <Textarea
          className="style-7"
          ref={inputRef}
          name={name}
          onChange={onInputChange}
          style={inputStyle}
          onFocus={focusPlaceholder}
          onBlur={unfocusPlaceholder}
        />
      ) : (
        <Input
          ref={inputRef}
          onChange={onInputChange}
          style={inputStyle}
          onFocus={focusPlaceholder}
          onBlur={unfocusPlaceholder}
          type={type}
          name={name}
        />
      )}
    </InputContainer>
  );
};

export default InputPlaceholder;
