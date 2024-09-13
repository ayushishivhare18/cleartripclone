import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyles.css";
import { OffersContext } from "../../../contexts/OfferDetailsProvider";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import LoginPage from "../../../pages/login/LoginPage";
import { useAuth } from "../../../contexts/AuthorizationProvider";
import styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoginButton = styled(Button)({
  color: "#FFFFFF",
  textTransform: "none",
  backgroundColor: "#3366CC",
  width: {
    xs: "12vw",
    sm: "9.5vw",
  },
  lineHeight: 2.5,
  border: "none",
  borderRadius: "5px",
  fontWeight: "500",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#254EAF",
  },
});

const Navbar = ({ handleLoginOpen }) => {
  const { setOffersUrlFilter } = useContext(OffersContext);
  const { tokenDetails, handleLogout, signupDetails } = useAuth();
  const { token } = tokenDetails;
  const { setIsSignup } = signupDetails;

  return (
    <>
      <Box className="home-navbar" pt={2} pb={2} component="div">
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* cleartrip logo  */}
          <Link
            onClick={() => {
              setOffersUrlFilter("ALL");
            }}
            to="/"
          >
            <img
              className="cleartrip-logo"
              src="https://careers.cleartrip.com/images/cleartrip/footer-logo.svg"
              alt="cleartrip-logo"
            />
          </Link>
          {/* login btn */}
          <LoginButton
            sx={{
              fontSize: {
                xs: "11px",
                sm: "14px",
              },
              padding: {
                xs: "3px 7px",
                sm: "5px 10px",
                md: "5px 20px",
              },
            }}
            onClick={() => {
              setIsSignup(false);
              token ? handleLogout() : handleLoginOpen();
            }}
            variant="contained"
          >
            {token ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <AccountCircleIcon />
                <span>Log out</span>
              </Box>
            ) : (
              "Log in / Sign up"
            )}
          </LoginButton>
        </Stack>
        <LoginPage />
      </Box>

      <Divider />
    </>
  );
};

export default Navbar;