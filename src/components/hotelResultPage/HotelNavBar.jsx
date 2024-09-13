import React, { memo } from "react";
import { Link } from "react-router-dom";
import "../../styles/hotel/HotelResultPage.css";
import { useAuth } from "../../contexts/AuthorizationProvider";
import HotelFilter from "./HotelFilter";
import LoginPage from "../../pages/login/LoginPage";
import { Box, Button, Tooltip } from "@mui/material";
import { fetchHotels } from "../../Apis/HotelDetailsApi";
import { toast } from "react-toastify";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { OPTION } from "../../pages/hotel/Hotel";
import Autocomplete from "../ui/Autocomplete";
import { CheckInOutDate } from "../ui/CheckInOutDate";
import AddRooms from "../ui/AddRooms";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoginButton = styled(Button)({
  width: "8rem",
  height: "40px",
  textTransform: "none",
});

const HotelNavbar = () => {
  const { tokenDetails, logSignDetails, handleLogout, signupDetails } =
    useAuth();
  const { token } = tokenDetails;
  const { handleLoginOpen } = logSignDetails;
  const { setIsSignup } = signupDetails;
  const { inputInfo, hotelDetails, loadingData } = useHotelContext();
  const { setHotels, setTotalHotels, hotelPage } = hotelDetails;
  const { inputPlace } = inputInfo;
  const { setIsLoading } = loadingData;

  const handleHotelUpdate = () => {
    if (inputPlace !== "") {
      setIsLoading(true);
      fetchHotels(inputPlace, 10, hotelPage).then((resp) => {
        setTotalHotels(resp.totalResults);
        setHotels(resp.data.hotels);
        setIsLoading(false);
      });
    } else {
      toast.error("Fill the input details!", { theme: "colored" });
    }
  };

  return (
    <nav className="hotel-result-navbar">
      {/* LOGO LOGIN SECTION */}
      <div className="logo-login-section">
        {/* cleartrip logo */}
        <Link to="/">
          <Tooltip title="Home">
            <img
              className="cleartrip-logo"
              src="https://careers.cleartrip.com/images/cleartrip/footer-logo.svg"
              alt="cleartrip-logo"
            />
          </Tooltip>
        </Link>
        {/* LOGIN/SIGNUP BUTTON */}
        <LoginButton
          variant="contained"
          sx={{
            width: { xs: "5.5rem", sm: "6.5rem", md: "8rem" },
            height: { xs: 30, sm: 35, md: 40 },
          }}
          onClick={() => {
            setIsSignup(false);
            token ? handleLogout() : handleLoginOpen();
          }}
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
      </div>
      <LoginPage />

      {/* NAVBAR SEARCH SECTION */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: { lg: -6 } }}>
        <div className="hres_search_section">
          {/* hotel result input */}
          <div className="location-input-box-res">
            <Autocomplete
              hotelInputClass="hotel-res-input-box"
              options={OPTION}
              noOptionText={"No Match Found"}
              optionKey={"name"}
            />
          </div>
          {/* hotel result date inputes */}
          <CheckInOutDate dateClass="check-in-out-date-res" />

          {/* hotel result room type */}
          <AddRooms btnClassName="add-room-btn add-room-btn-res" />

          {/* new search btn */}
          <button className="update-btn" onClick={handleHotelUpdate}>
            Update
          </button>
        </div>
      </Box>
      {/* FILTER SECTION */}
      <HotelFilter />
    </nav>
  );
};

export default memo(HotelNavbar);