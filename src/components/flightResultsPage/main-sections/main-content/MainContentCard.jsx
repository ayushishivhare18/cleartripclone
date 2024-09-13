import React, { useState } from "react";
import { Button, Paper, Stack, ThemeProvider, styled } from "@mui/material";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { fetchSingleFlightDetails } from "../../../../Apis/FlightSearchApi";
import { useFlightSearch } from "../../../../contexts/FlightsSearchProvider";
import { CustomTheme } from "../../../../util/muiTheme";
import { useAuth } from "../../../../contexts/AuthorizationProvider";
import { toast } from "react-toastify";

const MainContentCard = ({ airplane, planeLogoName, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [airplaneId, setAirplaneId] = useState(-1);
  const navigate = useNavigate();
  const { singleFlightValue } = useFlightSearch();
  const { setSingleFlight } = singleFlightValue;
  const { token } = useAuth().tokenDetails;

  const handleBookBtn = () => {
    fetchSingleFlightDetails(airplane._id).then((resp) => {
      setSingleFlight(resp.data);
    });
  };

  const handleId = (value) => {
    setAirplaneId(value);
  };

  const handleFlightDetails = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <ThemeProvider theme={CustomTheme}>
      <Paper elevation={8} className="main-content-card">
        <Stack
          className="initial-card-data"
          flexDirection={{
            xs: "column",
            sm: "row",
          }}
          justifyContent={{
            xs: "flex-start",
            sm: "space-between",
          }}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          gap={{
            xs: 2,
            sm: 2,
          }}
        >
          <Stack
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
            }}
            width={{
              xs: "80vw",
            }}
          >
            {/* card image */}
            <Stack
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              gap={1}
              mb={1}
            >
              {index % 2 === 0 ? (
                <img
                  className="aiplane-logo"
                  src="../assets/plane_logo/vistara-logo2.jpeg"
                  alt="vistara-logo2"
                />
              ) : index % 3 === 0 ? (
                <img
                  className="aiplane-logo"
                  src="../assets/plane_logo/indigo-logo.png"
                  alt="indigo-logo"
                />
              ) : index % 5 === 0 ? (
                <img
                  className="aiplane-logo"
                  src="../assets/plane_logo/air-india-logo.png"
                  alt="air-india-logo"
                />
              ) : (
                <img
                  className="aiplane-logo"
                  src="../assets/plane_logo/spice-jet-logo.png"
                  alt="spice-jet-logo"
                />
              )}
              <Stack
                flexDirection={"column"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                gap={0.3}
              >
                {index % 2 === 0 ? (
                  <span className="airplane-name">Vistara</span>
                ) : index % 3 === 0 ? (
                  <span className="airplane-name">IndiGo</span>
                ) : index % 5 === 0 ? (
                  <span className="airplane-name">Air India</span>
                ) : (
                  <span className="airplane-name">Spice jet</span>
                )}

                {/* <span className="airplane-name">
                {planeLogoName && planeLogoName.name}
              </span> */}
                <span style={{ fontSize: "11px" }}>UK- 807</span>
              </Stack>
            </Stack>
            {/*  depart time and duration and arrival time */}
            <div className="depart-time">{airplane.departureTime}</div>
            <Stack
              flexDirection={"column"}
              alignItems={"center"}
              gap={{
                xs: 0,
              }}
            >
              <span className="duration">{airplane.duration} hrs</span>

              <span className="stops">{airplane.stops} stops</span>
            </Stack>
            <div className="arrival-time">{airplane.arrivalTime}</div>
          </Stack>
          {/* price and book */}
          <Stack
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              sm: "space-around",
            }}
            width={{
              xs: "80vw",
            }}
          >
            {/* flight price */}
            <Stack
              flexDirection={"column"}
              justifyContent={"space-around"}
              alignItems={"flex-end"}
            >
              <span className="available-seat">
                {airplane.availableSeats} seat left
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "cenetr",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "cenetr",
                  }}
                >
                  <CurrencyRupeeOutlinedIcon fontSize="sm" />
                </span>
                {airplane.ticketPrice}
              </span>
            </Stack>

            {/* BOOK BUTTON */}
            <div>
              <button
                style={{ fontSize: "16px" }}
                className="book-btn"
                onClick={() => {
                  handleBookBtn();
                  navigate(`/flights/itinerary/${airplane._id}`);
                }}
              >
                Book
              </button>
            </div>
          </Stack>
        </Stack>

        {/* flight details btn */}
        {airplane.flightID === airplaneId && isOpen ? (
          <button
            className="details-btn"
            onClick={() => {
              handleFlightDetails();
              handleId(airplane.flightID);
            }}
          >
            Hide Details
          </button>
        ) : (
          <button
            className="details-btn"
            onClick={() => {
              handleFlightDetails();
              handleId(airplane.flightID);
            }}
          >
            Flight Details
          </button>
        )}

        {/* single flight details popup */}
        {airplane.flightID === airplaneId && isOpen ? (
          <div className="view-details-card-data">
            {/* view-details-header */}
            <Stack
              className="view-details-header"
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={2}
            >
              <Stack
                flexDirection={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={0.5}
              >
                <span style={{ fontWeight: 500 }}>{airplane.source}</span>
                <TrendingFlatIcon fontSize="sm" />
                <span style={{ fontWeight: 500 }}>{airplane.destination}</span>
              </Stack>
              <div>{localStorage.getItem("day")}</div>
            </Stack>
            {/* view-details-content */}
            <Stack
              flexDirection={{
                xs: "column",
                sm: "row",
              }}
              justifyContent={{
                sm: "space-between",
              }}
              width={{
                sm: "88vw",
                lg: "66vw",
              }}
              p={{
                xs: "0 10px",
                sm: "0 20px",
              }}
            >
              {/* details-image section */}
              <div>
                {index % 2 === 0 ? (
                  <img
                    className="details-aiplane-logo"
                    src="../assets/plane_logo/vistara-logo2.jpeg"
                    alt="vistara-logo2"
                  />
                ) : index % 3 === 0 ? (
                  <img
                    className="details-aiplane-logo"
                    src="../assets/plane_logo/indigo-logo.png"
                    alt="indigo-logo"
                  />
                ) : index % 5 === 0 ? (
                  <img
                    className="details-aiplane-logo"
                    src="../assets/plane_logo/air-india-logo.png"
                    alt="air-india-logo"
                  />
                ) : (
                  <img
                    className="details-aiplane-logo"
                    src="../assets/plane_logo/spice-jet-logo.png"
                    alt="spice-jet-logo"
                  />
                )}

                <Stack flexDirection={"column"}>
                  {index % 2 === 0 ? (
                    <>
                      <span
                        className="plane-name"
                        style={{ paddingBottom: "10px" }}
                      >
                        Vistara
                      </span>
                      {/* <span style={{ fontSize: "12px" }}>UK-807</span>
                      <span style={{ fontSize: "12px", marginBottom: "5px" }}>
                        Economy
                      </span> */}
                    </>
                  ) : index % 3 === 0 ? (
                    <>
                      <span style={{ paddingBottom: "10px" }}>IndiGo</span>
                      {/* <span style={{ fontSize: "12px" }}>6E-301</span>
                      <span style={{ fontSize: "12px", marginBottom: "5px" }}>
                        Economy
                      </span> */}
                    </>
                  ) : index % 5 === 0 ? (
                    <>
                      <span style={{ paddingBottom: "10px" }}>Air India</span>
                      {/* <span style={{ fontSize: "12px" }}>AI-859</span>
                      <span style={{ fontSize: "12px", marginBottom: "5px" }}>
                        Economy
                      </span> */}
                    </>
                  ) : (
                    <>
                      <span style={{ paddingBottom: "10px" }}>Spice jet</span>
                      {/* <span style={{ fontSize: "12px" }}>SG-8112</span> */}
                      {/* <span style={{ fontSize: "12px", marginBottom: "5px" }}>
                        Economy
                      </span> */}
                    </>
                  )}

                  {/* <span style={{ paddingBottom: "10px" }}>Vistara</span> */}
                  {/* <span style={{ fontSize: "12px" }}>UK-807</span>
                <span style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Economy
                </span> */}
                </Stack>
              </div>
              {/* deparature and duration and arrival section */}
              <Stack
                flexDirection={{
                  xs: "row",
                }}
                justifyContent={{
                  xs: "space-between",
                }}
                width={{
                  xs: "75vw",
                  sm: "40vw",
                  lg: "30vw",
                }}
              >
                {/* deparature-details */}
                <div className="deparature-details">
                  <div className="departure-rource-time">
                    <span>{airplane.source}</span>
                    <span>{airplane.departureTime}</span>
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    {localStorage.getItem("day")} 2023
                  </div>
                </div>
                {/* duration */}
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={{
                    xs: 0,
                  }}
                  mt={{
                    xs: -1,
                  }}
                >
                  <AccessTimeIcon htmlColor="gray" />
                  <span>{airplane.duration}h</span>
                </Stack>
                {/* arrival-details */}
                <div className="arrival-details">
                  <div className="arriavl-dest-time">
                    <span>{airplane.destination}</span>
                    <span>{airplane.arrivalTime}</span>
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    {localStorage.getItem("day")} 2023
                  </div>
                </div>
              </Stack>
              {/* baggage know and more btn */}
              <Stack
                flexDirection={{
                  xs: "row",
                }}
                justifyContent={{
                  lg: "space-evenly",
                }}
              >
                {/* baggage */}
                <Stack
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  gap={{
                    xs: 0.5,
                    lg: 1,
                  }}
                  width={{
                    xs: "85vw",
                    sm: "20vw",
                    lg: "13vw",
                  }}
                  mb={{
                    xs: 2,
                  }}
                >
                  <span>Check-in baggage</span>
                  <span>Cabin baggage</span>
                </Stack>
                {/* know more btn */}
                <Button
                  variant="text"
                  sx={{
                    width: {
                      xs: "70vw",
                      sm: "10vw",
                    },
                    height: {
                      xs: "2.5rem",
                    },
                    padding: {
                      xs: 0,
                    },
                    fontSize: {
                      sm: "12px",
                      lg: "14px",
                    },
                    cursor: "no-drop",
                    textTransform: "none",
                  }}
                >
                  Know more
                </Button>
              </Stack>
            </Stack>
          </div>
        ) : null}
      </Paper>
    </ThemeProvider>
  );
};

export default MainContentCard;