import React, { useState } from "react";
import { connect } from "react-redux";
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

  :focus {
    outline: none;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Textarea = styled.textarea`
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
  inputStyle,
  value,
  valid,
  setAbleWarning
}) => {
  const [isFocus, setisFocus] = useState(false);
  const [isInputFilled, setisInputFilled] = useState(false);
  const inputRef = React.createRef();

  const onInputChange = e => {
    const event = e;
    const { value } = event.target;
    if (value) {
      setisInputFilled(true);
    } else {
      setisInputFilled(false);
    }

    onChange(event);
  };

  const focusPlaceholder = () => {
    setAbleWarning(false);
    setisFocus(true);
  };

  const unfocusPlaceholder = () => {
    setAbleWarning(true);

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
          value={value}
          valid={valid}
        />
      ) : (
        <Input
          ref={inputRef}
          style={inputStyle}
          onFocus={focusPlaceholder}
          onBlur={unfocusPlaceholder}
          onChange={onInputChange}
          value={value}
          type={type}
          name={name}
          valid={valid}
        />
      )}
    </InputContainer>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispachToProps = dispach => {
  return {
    //acciones

    setAbleWarning: isAble =>
      dispach({ type: "SET_ABLE_WARNING", payload: isAble })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(InputPlaceholder);
