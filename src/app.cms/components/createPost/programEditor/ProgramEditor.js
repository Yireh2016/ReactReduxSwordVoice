import React, { useState } from "react";
import styled from "styled-components";

//services
import {
  timeValidation,
  dateValidation
} from "../../../../services/dateTimeValidation";

const ProgramCont = styled.div`
  width: 60%;
  overflowy: scroll;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Btn = styled.button`
  margin-top: 15px;
  :disabled {
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  margin-top: 15px;
`;

const ProgramEditor = ({ editPostHandler }) => {
  const [date, setDate] = useState();
  const [validDate, setValidDate] = useState(false);

  const [time, setTime] = useState();
  const [validTime, setValidTime] = useState(false);

  const [dateTime, setDateTime] = useState();

  const programTimeHandler = e => {
    const { name, value } = e.target;
    let isTimeValid;
    let isDateValid;
    let totalDate;

    switch (name) {
      case "date":
        isDateValid = dateValidation(value);
        setDate(value);
        setValidDate(isDateValid);
        break;

      case "time":
        isTimeValid = timeValidation(value);
        setTime(value);

        break;

      default:
        break;
    }

    if (isTimeValid && validDate) {
      totalDate = isDateValid
        ? new Date(date + " " + value)
        : new Date(value + " " + date);

      if (totalDate > new Date()) {
        setDateTime(totalDate);
        setValidTime(true);

        return;
      }
      setValidTime(false);
    }
  };

  // const minDate = now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0];

  return (
    <ProgramCont className="style-7 seoArea" id="programCont">
      <Label>
        <h3>Date</h3>
        <input
          type="date"
          name="date"
          value={date}
          onChange={e => {
            programTimeHandler(e);
          }}
        />
      </Label>

      {validDate && (
        <Label>
          <h3>Time</h3>
          <input
            name="time"
            type="time"
            step={`${60 * 1}`}
            value={time}
            onChange={e => {
              programTimeHandler(e);
            }}
          />
        </Label>
      )}

      <Btn
        disabled={!validDate || !validTime}
        className="cmsBtn"
        onClick={() => {
          editPostHandler(
            "program",
            {
              title: "Success",
              body: `Your post has been programed to be published on ${date} at ${time}`,
              status: "OK",
              show: true
            },
            dateTime
          );
        }}
      >
        Program
      </Btn>
      {(!validDate || !validTime) && (
        <p>
          <strong>Warning:</strong> Your program datetime must be a future date
        </p>
      )}
    </ProgramCont>
  );
};

export default ProgramEditor;
