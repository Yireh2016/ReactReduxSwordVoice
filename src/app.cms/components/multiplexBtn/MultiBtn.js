import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Container = styled.div`
  min-width: 90px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.8rem;
  box-sizing: border-box;
  background: #00171f;
  border: 1px solid coral;
  color: #fff;
  transition: all ease 300ms;

  :hover {
    background: #fff;
    color: #00171f;
  }

  :hover span {
    border-top: 10px solid #00171f;
  }

  /* justify-content: center; */
`;
const DropDown = styled.div`
  position: absolute;
  top: 37px;
  left: 0;

  background: #00171f;
  border-radius: 8px;

  box-sizing: border-box;
  padding: 10px;
  width: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  span {
    margin-top: 5px;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;
const Selector = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  flex-grow: 10;
`;
const Button = styled.div`
  position: relative;
  padding: 5px 10px;
  text-align: center;
  flex-grow: 90;
`;
const Arrow = styled.span`
  transition: all ease 300ms;
  border-top: 10px solid white;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`;

const MultiBtn = ({ optionsArr, clickHandler }) => {
  //state declaration
  const [option, setOption] = useState(optionsArr[0]);
  const [showDropDown, setShowDropDown] = useState(false);

  //handlers

  const dropHandler = value => {
    setOption(value);
    setShowDropDown(false);
  };

  //maps
  const mapOptions = optionsArr.map(optionEl => {
    return (
      <span
        key={optionEl}
        onClick={() => {
          dropHandler(optionEl);
        }}
      >
        {optionEl}
      </span>
    );
  });

  //render
  return (
    <Wrapper>
      <Container id="Container">
        <Layout id="Layout" className="btn">
          <Button id="Button" onClick={clickHandler}>
            {option}
          </Button>
          <Selector id="Selector">
            <Arrow
              id="arrow"
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
            />
          </Selector>
        </Layout>
      </Container>

      {showDropDown && <DropDown>{mapOptions}</DropDown>}
    </Wrapper>
  );
};

export default MultiBtn;
