import React, { useEffect } from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";

const CustomButton = styled(Button)({
  background: "#FFFFFF",
  color: "#525252",
  border: "1px solid lightgray",
  textTransform: "none",
  fontSize: "16px",
  "&:focus": {
    borderColor: "#3366CC",
  },
});

export const CheckInOutDate = ({ dateClass }) => {
  const {
    checkInDate,
    handleCheckInDateChange,
    checkOutDate,
    handleCheckOutDateChange,
  } = useHotelContext().checkInOutDetails;

  const formatDate = (inputDate) => {
    const options = { day: "2-digit", weekday: "short", month: "short" };
    const date = new Date(inputDate);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const CheckInDateInput = forwardRef(({ onClick }, ref) => (
    <CustomButton ref={ref} onClick={onClick} className={dateClass}>
      {formatDate(checkInDate)}
    </CustomButton>
  ));

  const CheckOutDateInput = forwardRef(({ onClick }, ref) => (
    <CustomButton ref={ref} onClick={onClick} className={dateClass}>
      {formatDate(checkOutDate)}
    </CustomButton>
  ));

  const today = new Date();
  return (
    <>
      <DatePicker
        required
        selected={checkInDate}
        onChange={handleCheckInDateChange}
        minDate={today} // Disable selection of past dates
        customInput={<CheckInDateInput />}
      />
      <DatePicker
        required
        selected={checkOutDate}
        onChange={handleCheckOutDateChange}
        minDate={today} // Disable selection of past dates
        customInput={<CheckOutDateInput />}
      />
    </>
  );
};