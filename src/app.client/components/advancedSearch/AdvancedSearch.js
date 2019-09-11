import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  padding: 15px;
  width: 100%;
`;
const Label = styled.h4`
  font-family: "work sans", sans-serif;
  color: #00171f;
`;

const Input = styled.input`
  margin: 8px 8px 15px 8px;
  font-weight: bold;
  font-size: 20px;
  width: 300px;
  border: 1px solid #00171f;
  border-radius: 6px;
  height: 30px;
  padding: 0 10px;
  font-family: "Work sans", sans-serif;
  color: hsla(207, 90%, 43%, 1);
  transition: all ease 500ms;
  width: calc(100% - 30px);

  :focus,
  :active {
    outline: none;
    border: 1px solid hsla(196, 97%, 31%, 1);
  }
`;
const BtnCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0 0 0;
  button,
  input {
    margin: 0 0 0 25px;
    :first-child {
      margin: 0;
    }
  }
`;
const Button = styled.input`
  min-height: 30px;
  border-radius: 7px;
  font-weight: bold;
  font-size: 20px;
  box-sizing: border-box;

  min-width: 100px;
  padding: 10px 25px;

  background: ${props => (props.cancel ? "#ffffff" : "#00171f")};
  border: ${props =>
    props.cancel ? "1px solid #ff7f50" : "1px solid #00b7fb"};
  color: ${props => (props.cancel ? "#FF5722" : "#fff")};

  :hover {
    color: ${props => (props.cancel ? "#FF5722" : "#00171f")};
    background: ${props => (props.cancel ? "#ffffff" : "white")};
  }
`;

const AdvancedSearch = ({ onCancel, onSearch, setSearchValue }) => {
  const [author, setAuthor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [text, setText] = useState("");

  const inputChange = e => {
    const { value, name } = e.target;

    switch (name) {
      case "author":
        setAuthor(value);
        break;

      case "text":
        setText(value);
        break;

      case "dateTo":
        setDateTo(value);
        break;

      case "dateFrom":
        setDateFrom(value);
        break;

      default:
        break;
    }
  };

  const keyUpHandler = e => {
    //enter
    const { keyCode } = e;

    if (keyCode === 13) {
      onSearch({ text, author, dateFrom, dateTo });
    }
  };

  return (
    <Container>
      <label>
        <Label>Text</Label>
        <div>
          <Input
            type="search"
            name="text"
            htmlFor="text"
            value={text}
            onChange={inputChange}
            onKeyUp={keyUpHandler}
          />
        </div>
      </label>
      <label>
        <Label>Author</Label>
        <div>
          <Input
            type="search"
            name="author"
            htmlFor="author"
            value={author}
            onChange={inputChange}
            onKeyUp={keyUpHandler}
          />
        </div>
      </label>
      <label>
        <Label>Date</Label>
        <div>
          <Input
            type="date"
            name="dateFrom"
            htmlFor="date"
            onChange={inputChange}
            value={dateFrom}
          />
        </div>
        <div>
          <Input
            type="date"
            name="dateTo"
            htmlFor="date"
            onChange={inputChange}
            value={dateTo}
          />
        </div>
      </label>
      <BtnCont>
        <Button type="button" cancel={true} onClick={onCancel} value="Cancel" />
        <Button
          type="button"
          value="Search"
          onClick={() => {
            onSearch({ text, author, dateFrom, dateTo });
            setSearchValue(text);
          }}
        />
      </BtnCont>
    </Container>
  );
};

const mapActionsToProps = dispatch => {
  return {
    setSearchValue: value =>
      dispatch({ type: "SET_SEARCH_VALUE", payload: value })
  };
};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AdvancedSearch);
