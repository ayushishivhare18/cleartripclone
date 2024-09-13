import { Box, Button, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import { useAuth } from "../../contexts/AuthorizationProvider";

const ProlieButton = styled(Button)({
  textTransform: "none",
  color: "gray",
});
const menuItemStyle = {
  cursor: "default",
  "&:hover": { backgroundColor: "white" },
};
const MytripNavbar = ({ token, handleLoginOpen, setActiveIndx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { handleLogout } = useAuth();
  const { setIsSignup } = useAuth().signupDetails;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   console.log("userdetails", JSON.parse(localStorage.getItem("userDetails")));

  return (
    <Box className="mytrip-navbar" pt={2} pb={2}>
      {/* cleartrip logo  */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/">
          <img
            className="cleartrip-logo"
            src="https://careers.cleartrip.com/images/cleartrip/footer-logo.svg"
            alt="cleartrip-logo"
          />
        </Link>
        <Link to="/flights">
          <Tooltip title="Flight">
            <FlightIcon htmlColor="gray" />
          </Tooltip>
        </Link>
        <Link to="/hotels">
          <Tooltip title="Hotel">
            <HotelIcon htmlColor="gray" />
          </Tooltip>
        </Link>
      </Box>

      {/* profile section */}

      <ProlieButton
        className="mytrip-profile"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleRoundedIcon htmlColor="gray" />
        <span className="profile-text">
          {token
            ? JSON.parse(localStorage.getItem("userDetails"))?.name
            : "Your trips"}
        </span>
        <ArrowDropDownRoundedIcon htmlColor="gray" />
      </ProlieButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {token ? (
          <>
            <MenuItem
              onClick={() => {
                setActiveIndx(1);
                handleClose();
              }}
              sx={{ ...menuItemStyle, cursor: "pointer" }}
            >
              Trips
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActiveIndx(2);
                handleClose();
              }}
              sx={{ ...menuItemStyle, cursor: "pointer" }}
            >
              Hotel Booking Info
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActiveIndx(3);
                handleClose();
              }}
              sx={{ ...menuItemStyle, cursor: "pointer" }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ ...menuItemStyle }}>
              <Button
                onClick={handleLogout}
                sx={{ textTransform: "none", color: "tomato", ml: -1 }}
              >
                Logout
              </Button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              autoFocus="false"
              sx={{
                ...menuItemStyle,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={handleClose}
            >
              <Button
                onClick={handleLoginOpen}
                variant="contained"
                sx={{ textTransform: "none", mb: 2 }}
              >
                Sign in
              </Button>
              <p>
                New here?{" "}
                <Button
                  onClick={() => setIsSignup(true)}
                  sx={{ textTransform: "none" }}
                >
                  Register
                </Button>
              </p>
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default MytripNavbar;