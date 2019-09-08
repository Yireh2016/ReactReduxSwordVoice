import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Calendar from "./icons/Calendar";
import Up from "./icons/UpArrow";

const Layout = styled.div`
  position: relative;
  display: inline-block;
  font-family: "Work sans", sans-serif;
`;

const InputContainer = styled.div`
  background: #00b7fb;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  border-left: ${props =>
    props.isValid ? "5px solid #00ff00" : "5px solid red"};

  font-size: 13.3px;
  color: #004059;
`;

const Container = styled.div`
  padding: 8px 0 8px 15px;
  span {
    font-weight: bold;
    user-select: none;
  }
`;

const YearShownInput = styled.input`
  font-weight: 700;
  border: none;
  width: 50px;
  text-align: center;
  background: transparent;
  :hover {
    cursor: pointer;
  }

  ::selection {
    background: transparent;
  }
`;

const Btn = styled.div`
  margin-left: 10px;
  padding: 8px 15px;
  background: white;
  border-radius: 0 20px 20px 0;
  :hover {
    cursor: pointer;
  }
  svg {
    width: 15px;
  }
`;
const MonthYearContainer = styled.div`
  position: absolute;
  top: 40px;
  display: flex;
  background: #00b7fb;
  border-radius: 10px;
  /* border:1px solid white; */
  font-weight: 700;
  font-size: 13.3px;
  color: #004059;
  z-index: 50;
`;

const MonthCont = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 10px 0 10px 10px;
  /* border: 1px solid black; */
  border-radius: 5px;
  margin-right: 5px;
  span {
    padding: 5px;
    :hover {
      cursor: pointer;
      color: white;
      background: black;
    }
  }
`;

const YearCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  user-select: none;

  padding: 0 10px;
  background: white;
  border-radius: 0 10px 10px 0;
`;

const UpArrow = styled.div`
  color: white;

  svg {
    width: 20px;
  }

  :active > svg {
    transform: scale(1.3);
    transition: all ease-out 300ms;
  }

  :hover {
    cursor: pointer;
  }
`;
const DownArrow = styled.div`
  color: white;

  svg {
    transform: rotate(180deg);
    width: 20px;
  }

  :active > svg {
    transform: scale(1.3) rotate(180deg);
    transition: all ease-out 300ms;
  }

  :hover {
    cursor: pointer;
  }
`;

const MonthlyInput = ({ setFinalDate, actualDate }) => {
  const [year, setYear] = useState(1990);
  const [yearChanged, setYearChanged] = useState(false);
  const [isControl, setIsControl] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [timer, setTimer] = useState(null);
  const [monthState, setMonth] = useState("Month");

  useEffect(() => {
    if (isValid) {
      timer && clearTimeout(timer);

      const timerVal = setTimeout(() => {
        setIsControl(false);
        setTimer(null);
        const finalDate = new Date(year, months.indexOf(monthState), 1);

        const compareActualDate = new Date(actualDate);

        compareActualDate.toString() !== finalDate.toString() &&
          setFinalDate(finalDate);
      }, 1.5 * 1000);

      setTimer(timerVal);
    }
  }, [year, monthState]);

  useEffect(() => {
    if (actualDate) {
      const date = new Date(actualDate);

      setYearChanged(true);
      setYear(parseInt(date.getFullYear()));
      setMonth(months[date.getMonth()]);
      setIsValid(true);
    }
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     !timerVal && setIsControl(false);
  //   }, 1.5 * 1000);
  // }, [isControl]);

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const mapMonths = months.map((month, i) => {
    return (
      <span
        key={i}
        onClick={e => {
          const monthClicked = e.target.innerHTML;
          console.log(monthClicked);

          setMonth(monthClicked);
        }}
      >
        {month}
      </span>
    );
  });

  const yearShownHandler = e => {
    let year = e.target.value;
    const actualDate = new Date();

    year = !isNaN(year) ? parseInt(year, 10) : year;

    !isNaN(year) && year <= actualDate.getFullYear() && setYear(year);
  };

  let yearShown;
  if (yearChanged) {
    yearShown = year;
  } else {
    yearShown = "Year";
  }

  if (yearChanged && monthState !== "Month") {
    !isValid && setIsValid(true);
  }

  return (
    <Layout id="Layout">
      <InputContainer isValid={isValid} id="InputContainer">
        <Container id="Container">
          <span
            onClick={() => {
              setIsControl(!isControl);
            }}
          >
            {monthState}
          </span>{" "}
          <YearShownInput
            id="YearShownInput"
            onClick={() => {
              // yearShown==="Year" && setYear(year);
              !yearChanged && setYearChanged(true);
            }}
            type="text"
            value={yearShown}
            name="year"
            onChange={yearShownHandler}
          />{" "}
        </Container>
        <Btn
          id="Btn"
          onClick={e => {
            setIsControl(!isControl);
          }}
        >
          <Calendar />
        </Btn>
      </InputContainer>

      {isControl && (
        <MonthYearContainer id="MonthYearContainer">
          <MonthCont id="MonthCont">{mapMonths}</MonthCont>

          <YearCont>
            <UpArrow
              id="UpArrow"
              onClick={() => {
                !yearChanged && setYearChanged(true);
                setYear(year + 1);
              }}
            >
              <Up />
            </UpArrow>
            {year}
            <DownArrow
              id="DownArrow"
              onClick={() => {
                !yearChanged && setYearChanged(true);
                year > 0 && setYear(year - 1);
              }}
            >
              <Up />
            </DownArrow>
          </YearCont>
        </MonthYearContainer>
      )}
    </Layout>
  );
};

export default MonthlyInput;
