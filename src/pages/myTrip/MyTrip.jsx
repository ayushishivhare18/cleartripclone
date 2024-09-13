import React, { useEffect, useRef, useState } from "react";
import "../../styles/myTrip/MyTrip.css";
import {
  Box,
  Button,
  Divider,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Footer from "../footer/Footer";
import { useAuth } from "../../contexts/AuthorizationProvider";
import DoneIcon from "@mui/icons-material/Done";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MytripNavbar from "../../components/mytripPage/MytripNavbar";
import LoginPage from "../login/LoginPage";
import LuggageIcon from "@mui/icons-material/Luggage";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer } from "react-toastify";

const fetchYourTrips = [
  "Check your trip details",
  "Cancel your trip",
  "Amend your flights",
  "Print E ticket",
  "and more...",
];
const MyTrip = () => {
  const [activeIndx, setActiveIndx] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { token } = useAuth().tokenDetails;
  const { handleLoginOpen } = useAuth().logSignDetails;
  const bdRef = useRef(JSON.parse(localStorage.getItem("bookingData"))); // bdRef --> bookindDadaRef
  const hbdRef = useRef(JSON.parse(localStorage.getItem("hotelBookingData"))); // hbdRef --> HotelBookindDadaRef

  console.log("hbdRef", hbdRef);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div id="my-trip-page">
      <MytripNavbar
        setActiveIndx={setActiveIndx}
        token={token}
        handleLoginOpen={handleLoginOpen}
      />
      <Divider />
      <main id="mytrip-main">
        {token ? (
          <>
            <h1 className="main-with-header">Trips you've booked</h1>
            <Button
              sx={{ display: { xs: "block", sm: "none" }, mb: 1 }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <li
                  className={
                    activeIndx === 1 ? "with-item activeTrip" : "with-item"
                  }
                  onClick={() => setActiveIndx(1)}
                >
                  <LuggageIcon sx={{ mr: 1 }} />
                  <span>Trips</span>
                </li>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <li
                  className={
                    activeIndx === 2 ? "with-item activeTrip" : "with-item"
                  }
                  onClick={() => setActiveIndx(2)}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  <span>Hotels Booking Data</span>
                </li>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <li
                  className={
                    activeIndx === 3 ? "with-item activeTrip" : "with-item"
                  }
                  onClick={() => setActiveIndx(3)}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  <span>Profile</span>
                </li>
              </MenuItem>
            </Menu>
            <div className="main-with-loggedin">
              <div className="with-left">
                {/* trip section */}
                <li
                  id="trip-info"
                  className={
                    activeIndx === 1 ? "with-item activeTrip" : "with-item"
                  }
                  onClick={() => setActiveIndx(1)}
                >
                  <LuggageIcon sx={{ mr: 1 }} />
                  <span>Trips</span>
                </li>

                <li
                  className={
                    activeIndx === 2 ? "with-item activeTrip" : "with-item"
                  }
                  onClick={() => setActiveIndx(2)}
                >
                  <HotelIcon sx={{ mr: 1 }} />
                  <span>Hotels Booking Data</span>
                </li>

                <li
                  className={
                    activeIndx === 3 ? "with-item activeTrip" : "with-item"
                  }
                  onClick={() => setActiveIndx(3)}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  <span>Profile</span>
                </li>
              </div>
              <div className="with-right">
                {/* trip information*/}
                {activeIndx === 1 &&
                  (bdRef?.current?.length > 0 ? (
                    <div className="bookind-details-container">
                      {bdRef.current?.map((bd, indx) => (
                        <>
                          <li className="bd-box" key={bd._id}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 500,
                                mb: 1,
                                color: indx === 0 ? "#006A4E" : "#32de84",
                              }}
                            >
                              {indx === 0
                                ? "Current Trip Information"
                                : "Previous Trip Information"}
                            </Typography>
                            <Typography>
                              <span>Trip ID:</span> {bd?._id}
                            </Typography>
                            <Typography>
                              <span>From:</span> {bd?.flight?.source}
                            </Typography>
                            <Typography>
                              <span>To:</span> {bd?.flight?.destination}
                            </Typography>
                            <Typography>
                              <span>Start date: </span> {bd?.start_date}
                            </Typography>
                            <Typography>
                              <span>End date: </span> {bd?.end_date}
                            </Typography>
                            <Typography>
                              <span>Booking Status:</span> {bd?.status}
                            </Typography>
                          </li>
                          <Divider sx={{ mb: 2 }} />
                        </>
                      ))}
                    </div>
                  ) : (
                    <h1 style={{ fontSize: 18, fontWeight: 500 }}>
                      Looks like you have not booked any trips yet.Start
                      exploring!
                    </h1>
                  ))}
                {/* Hotel booking infromation */}
                {activeIndx === 2 &&
                  (hbdRef?.current?.length > 0 ? (
                    <div className="bookind-details-container">
                      {hbdRef.current?.map((hbd, indx) => (
                        <li className="hbd-box" key={hbd._id}>
                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "500",
                              color: indx === 0 ? "#006A4E" : "#32de84",
                            }}
                          >
                            {indx === 0
                              ? "Current Booking Information"
                              : "Previous Booking Information"}
                          </Typography>
                          <Typography>
                            <span>Booking ID:</span>
                            {hbd?._id}
                          </Typography>
                          <Typography>
                            <span>Hotel Name:</span>
                            {hbd?.hotel?.name}
                          </Typography>
                          <Typography>
                            <span>Check in date:</span> {hbd?.start_date}
                          </Typography>
                          <Typography>
                            <span>Check out date:</span> {hbd?.end_date}
                          </Typography>
                          <Typography>
                            <span>Status:</span> {hbd?.status}
                          </Typography>

                          <Divider sx={{ mt: 4, mb: 2 }} />
                        </li>
                      ))}
                    </div>
                  ) : (
                    <h1 style={{ fontSize: 16, fontWeight: 450 }}>
                      Hotels Booking Information : Looks Like You haven't book
                      any hotels yet.
                    </h1>
                  ))}

                {/* PROFILE INFO */}
                {activeIndx === 3 && (
                  <>
                    <h1 className="profile-content">Profile</h1>
                    <h3>Login Information</h3>
                    <div className="email-details">
                      <p>Email address</p>
                      {/* data from booking details */}
                      <p>
                        {JSON.parse(localStorage.getItem("userDetails"))?.email}
                      </p>
                    </div>
                    <h3>Personal information</h3>
                    <div className="p-info">
                      <p>Full Name</p>
                      {/* data from booking details */}
                      <p className="full-name">
                        {JSON.parse(localStorage.getItem("userDetails"))?.name}
                      </p>

                      <p className="birthdate">Birthdate</p>
                      <p>Not Provied</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="main-without-loggedin">
            <div className="main-left">
              <h1>Welcome to Cleartrip Support</h1>
              <p>Find answers to all your queries, call us at +91 9595333333</p>
              <Box>
                <FlightIcon sx={{ color: "#AECFF9", width: "4rem" }} />
                <HotelIcon sx={{ color: "#AECFF9", width: "4rem" }} />
                <DirectionsBusIcon sx={{ color: "#AECFF9", width: "4rem" }} />
              </Box>

              <Paper
                elevation={8}
                sx={{
                  mt: 10,
                  p: 4,
                  width: {
                    xs: "90vw",
                    sm: "70vw",
                    md: "50vw",
                    lg: "40rem",
                  },
                }}
              >
                <h3>
                  Want to know about your bookings?Help us find your trips
                </h3>
                <p style={{ fontSize: "14px", marginBottom: "30px" }}>
                  Give us any traveller's Trip ID to check trip details
                </p>
                <label style={{ marginRight: "30px" }} htmlFor="trip-id">
                  Trip ID
                </label>
                <Tooltip title="Taken default value">
                  <input
                    defaultValue={"vf1245t12f6g3s"}
                    type="text"
                    id="trip-id"
                    disabled="true"
                  />
                </Tooltip>
                <p>
                  Have an account?
                  <Button
                    onClick={handleLoginOpen}
                    sx={{ textTransform: "none" }}
                  >
                    Sign in
                  </Button>{" "}
                  to fetch your trips
                </p>
              </Paper>
            </div>

            <div className="main-right">
              {/* Fetch your trips to card */}
              <Paper
                sx={{
                  p: 2,
                  mt: 6,
                  mb: 4,
                  width: { xs: "90vw", sm: "70vw", md: "20rem" },
                }}
              >
                <p>Fetch your trips to</p>
                <ul>
                  {fetchYourTrips?.map((item) => (
                    <li key={item} className="item">
                      <DoneIcon fontSize="sm" htmlColor="green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Paper>

              {/* Plan your vacation and book hotels in over 15,000 hotels worldwide */}
              <Paper
                sx={{ p: 2, width: { xs: "90vw", sm: "70vw", md: "20rem" } }}
              >
                <p>
                  Plan your vacation and book hotels in over 15,000 hotels
                  worldwide
                </p>
                <img
                  className="vacation-plan-photo"
                  alt="plan-photo"
                  src="https://fastui.cltpstatic.com/raw/upload/accounts-pwa/static/media/hotelbooking.6e9f65b4.png"
                />
              </Paper>
            </div>
          </div>
        )}
      </main>

      <LoginPage />

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default MyTrip;