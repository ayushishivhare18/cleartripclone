import React, { useState } from "react";
import "../../../styles/flight/FlightBookingPage.css";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthorizationProvider";
import LoginPage from "../../../pages/login/LoginPage";

const CustomButton = styled(Button)({
  variant: "text",
  textTransform: "none",
  fontsize: "16px",
});
const FlightBookingNavbar = () => {
  const { tokenDetails, logSignDetails, handleLogout, signupDetails } =
    useAuth();
  const { token } = tokenDetails;
  const { handleLoginOpen } = logSignDetails;
  const { setIsSignup } = signupDetails;

  const navigate = useNavigate();
  return (
    <>
      <Stack
        className="flight-booking-navabr"
        flexDirection={"row"}
        justifyContent={"space-between"}
        mt={2}
      >
        <Tooltip title="Home">
          <img
            className="cleartrip-logo"
            src="https://careers.cleartrip.com/images/cleartrip/footer-logo.svg"
            alt="cleartrip-logo"
            onClick={() => navigate("/")}
          />
        </Tooltip>

        <CustomButton
          onClick={() => {
            setIsSignup(false);
            token ? handleLogout() : handleLoginOpen();
          }}
        >
          <AccountCircleSharpIcon fontSize="sm" />
          {token ? (
            <span style={{ marginLeft: "3px" }}>Log out</span>
          ) : (
            <span style={{ marginLeft: "3px" }}>Log in</span>
          )}
        </CustomButton>
      </Stack>
      <LoginPage />
    </>
  );
};

export default FlightBookingNavbar;