import React from "react";
import "../../styles/flight/Flight.css";
import { Paper, Stack } from "@mui/material";

const FlightCityDrowpdown = ({
  allOption,
  noOptionText,
  selectHandle,
  focus,
}) => {
  return (
    <>
      <Paper
        className="flight-input-dropdown"
        style={{
          display: focus ? "flex" : "none",
        }}
      >
        {!allOption.length ? (
          <div> {noOptionText} </div>
        ) : (
          allOption.map((option, index) => (
            <div
              className="flight-option"
              key={`${index}`}
              onClick={() => {
                selectHandle(option);
              }}
            >
              <button className="option-btn">{option.iata_code}</button>
              <Stack
                flexDirection={"row"}
                sx={{ textAlign: "left", width: "80%" }}
              >
                <span>{option.city}</span>
                <span>,</span>
                <span>IN</span>
                <span>-</span>
                <span className="city-name">{option.name}</span>
              </Stack>
            </div>
          ))
        )}
      </Paper>
    </>
  );
};

export default FlightCityDrowpdown;