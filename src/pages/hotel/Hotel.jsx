import React, { useContext, useEffect, useState } from "react";
import "../../styles/hotel/Hotel.css";
import { Box, Paper, Stack, Typography } from "@mui/material";
import RightSideBar from "../../components/right-side-bar/RightSideBar";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthorizationProvider";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { toast } from "react-toastify";
import AddRooms from "../../components/ui/AddRooms";
import Autocomplete from "../../components/ui/Autocomplete";
import { CheckInOutDate } from "../../components/ui/CheckInOutDate";
import { OffersContext } from "../../contexts/OfferDetailsProvider";
import { popularDestinations } from "../../static-data/popularDestinations";
import { topHotels } from "../../static-data/topHotels";
import HotelRatings from "../../components/ui/HotelRatings";
import AboutCleartripHotelBooking from "../../components/ui/AboutCleartripHotelBooking";

export const OPTION = [
  { name: "Kolkata, West Bengal" },
  { name: "Mumbai, Maharashtra" },
  { name: "Delhi, National Capital Territory of Delhi" },
  { name: "Bangalore, Karnataka" },
  { name: "Chennai, Tamil Nadu" },
  { name: "Hyderabad, Telangana" },
  { name: "Pune, Maharashtra" },
  { name: "Ahmedabad, Gujarat" },
  { name: "Surat, Gujarat" },
  { name: "Jaipur, Rajasthan" },
  { name: "Lucknow, Uttar Pradesh" },
  { name: "Kanpur, Uttar Pradesh" },
  { name: "Nagpur, Maharashtra" },
  { name: "Indore, Madhya Pradesh" },
  { name: "Thane, Maharashtra" },
];

const Hotels = () => {
  const { hotelSearchHandler, inputInfo } = useHotelContext();
  const { handleHotelSearchBtn } = hotelSearchHandler;
  const { focus, inputPlace } = inputInfo;
  const { token } = useAuth().tokenDetails;
  const navigate = useNavigate();
  const { offers, handleOfferFecth } = useContext(OffersContext);

  useEffect(() => {
    handleOfferFecth("HOTELS");
  }, []);

  const handleNavigation = () => {
    if (token && inputPlace !== undefined) {
      navigate("/hotels/results");
    } else if (token && inputPlace === undefined) {
      toast.error("Fill the details first!", { theme: "colored" });
    } else {
      toast.error("You have to login first to continue further!", {
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <div id="hotel-page">
        <div>
          {/* hotel home page main content */}
          <Stack id="h-search-container">
            {/* search header */}
            <Stack
              sx={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1,
              }}
              className="hotel-search-header"
            >
              <h1 style={{ color: "#3B3B3B" }}>Search hotels</h1>
              <h4>Enjoy hassle free bookings with Cleartrip</h4>
            </Stack>

            {/* hotel search container card */}
            <Paper id="h-search-card">
              {/* hotel search input section */}
              <div className="location-input-box">
                <Autocomplete
                  hotelInputClass="hotel-input-box"
                  options={OPTION}
                  noOptionText={"No Match Found"}
                  optionKey={"name"}
                />
                {focus ? (
                  <span className="place-icon">
                    <FmdGoodIcon fontSize="medium" htmlColor="#254EAF" />
                  </span>
                ) : (
                  <span className="place-icon">
                    <FmdGoodOutlinedIcon fontSize="medium" htmlColor="gray" />
                  </span>
                )}
              </div>

              {/* date room container */}
              <div className="date-room-input">
                <div className="h-date-icon">
                  <CalendarMonthOutlinedIcon htmlColor="gray" />
                </div>

                {/* date inputs */}
                <div className="date-input">
                  <CheckInOutDate dateClass="hotel-search-dates" />
                </div>

                {/* rooms add section */}
                <AddRooms btnClassName="add-room-btn" />
              </div>

              <div className="h-search-btn-container">
                <button
                  onClick={() => {
                    handleHotelSearchBtn();
                    handleNavigation();
                  }}
                  className="h-search-btn"
                >
                  Search hotels
                </button>
              </div>
            </Paper>
          </Stack>

          {/* ADVERTISEMENT */}
          <Box
            sx={{
              my: 8,
              minHeight: "18vh",
              background: "linear-gradient(to right , lightgray, #F3EDF9)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <div style={{ textAlign: "left" }}>
              <Typography paragraph sx={{ fontWeight: 500, color: "#383838" }}>
                IT'S THALA'S CHOICE
              </Typography>
              <Typography
                paragraph
                sx={{ fontSize: 20, fontWeight: 500, color: "#383838" }}
              >
                Fully refundable* hotel bookings until check -in time
              </Typography>
              <Typography paragraph>ClearChoiceMax Starting ₹49</Typography>
            </div>
            <button
              style={{
                padding: 8,
                borderRadius: 5,
                border: "1px solid gray",
                background: "transparent",
                cursor: "no-drop",
                fontSize: 16,
                minHeight: "6vh",
              }}
            >
              know more
            </button>
          </Box>
        </div>

        {/* RIGHT SIDE BAR */}
        <div id="hotel-right-side-bar">
          <RightSideBar />
        </div>
      </div>

      {/* OFFERS SECTION */}
      <Box
        sx={{
          mt: 4,
          p: 0,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 4.5,
        }}
      >
        {offers.slice(0, 6).map((offer) => (
          <Box
            key={offer._id}
            sx={{
              backgroundImage: `url('${offer.heroUrl}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "19.5rem",
              minHeight: "30vh",
              borderRadius: 2,
              color: "white",
              textAlign: "left",
              px: 4,
            }}
          >
            <Typography paragraph sx={{ mt: 4 }}>
              {offer.pTl}
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              {offer.pTx}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* POPULAR DESTINATIONS SECTION */}
      <Box sx={{ mt: 8 }}>
        <Typography component={"h3"} variant="h4" sx={{ textAlign: "left" }}>
          Popular destinations
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: {
              xs: "center",
              lg: "space-between",
            },
          }}
        >
          {popularDestinations.map((dest) => (
            <Box
              key={dest.id}
              sx={{
                backgroundImage: `url("${dest.imgUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "white",
                width: "11.5rem",
                height: "40vh",
                borderRadius: 2,
                pt: 20,
              }}
            >
              <Typography paragraph sx={{ fontSize: 20, fontWeight: 600 }}>
                {dest.locaion}
              </Typography>
              <Typography paragraph sx={{ fontSize: 16, fontWeight: 500 }}>
                {dest.numOfProp} properties
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* TOP HOTELS */}
      <Box sx={{ my: 8 }}>
        <Typography
          component={"h3"}
          variant="h4"
          sx={{ textAlign: "left", pb: 4 }}
        >
          Top hotels with great deals
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "cenetr",
            justifyContent: {
              xs: "center",
              lg: "space-between",
            },
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {topHotels.map((hotel) => (
            <Paper
              key={hotel._id}
              sx={{ width: "18rem", display: "flex", gap: 2 }}
            >
              <img
                width={120}
                height={150}
                src={hotel?.imgUrl}
                alt={hotel?.name}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <div>
                  <Typography component={"h6"} variant="h6">
                    {hotel?.name}
                  </Typography>
                  <Typography>{hotel?.location}</Typography>
                </div>

                <div style={{ paddingBottom: 4 }}>
                  <HotelRatings rating={hotel.rating} />
                </div>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* ABOUT CLEARTIP HOTEL */}
      <div>
        <AboutCleartripHotelBooking />
      </div>
    </div>
  );
};

export default Hotels;