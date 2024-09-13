import React from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, ThemeProvider } from "@mui/material";
import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";
import { CustomTheme } from "../../../util/muiTheme";
import styled from "@emotion/styled";

const DateButton = styled(Button)({
  height: "56px",
  background: "#FFFFFF",
  color: "#1A1A1A",
  border: "1px solid lightgray",
  borderRadius: "5px",
  textTransform: "none",
  "&:focus": {
    borderColor: "#3366CC",
  },
});
const DateInputs = ({ departStyle, returnStyle }) => {
  const { departvalue, returnValue } = useFlightSearch();
  const { handleDepartDateChange, departDay, departDate } = departvalue;
  // const { handleReturnDateChange, returnDay, returnDate } = returnValue;

  const DepartDateInput = forwardRef(({ departDay, onClick }, ref) => (
    <DateButton sx={departStyle} onClick={onClick} ref={ref}>
      {departDay}
    </DateButton>
  ));
  // const ReturnDateInput = forwardRef(({ returnDay, onClick }, ref) => (
  //   <DateButton sx={returnStyle} onClick={onClick} ref={ref}>
  //     {returnDay}
  //   </DateButton>
  // ));

  const today = new Date();

  return (
    <ThemeProvider theme={CustomTheme}>
      {/* DEPART DATE PICKER */}
      <DatePicker
        required
        selected={departDate}
        onChange={handleDepartDateChange}
        minDate={today} // Disable selection of past dates
        customInput={<DepartDateInput departDay={departDay} />}
      />
      
    </ThemeProvider>
  );
};
export default DateInputs;