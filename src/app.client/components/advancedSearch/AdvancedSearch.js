import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px;
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
`;
const Button = styled.button`
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

const AdvancedSearch = ({ onCancel, onSearch }) => {
  const [author, setAuthor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const inputChange = e => {
    const { value, name } = e.target;

    switch (name) {
      case "author":
        setAuthor(value);
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

  return (
    <Container>
      <label>
        <Label>Author</Label>
        <div>
          <Input
            type="text"
            name="author"
            htmlFor="author"
            value={author}
            onChange={inputChange}
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
        <Button
          onClick={() => {
            onSearch(author, dateFrom, dateTo);
          }}
        >
          Search
        </Button>
        <Button cancel={true} onClick={onCancel}>
          Cancel
        </Button>
      </BtnCont>
    </Container>
  );
};

export default AdvancedSearch;
