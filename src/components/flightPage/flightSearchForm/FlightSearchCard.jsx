import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/flight/Flight.css";
import { Button, Paper, Stack, ThemeProvider } from "@mui/material";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PassengerAdd from "./PassengerAdd";
import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";
import DepartCityInput from "./DepartCityInput";
import DestinationCityInput from "./DestinationCityInput";
import { CustomTheme } from "../../../util/muiTheme";
import DateInputs from "./DateInputs";
import FareType from "./FareType";
import { fetchFlights } from "../../../Apis/FlightSearchApi";
import { toast, ToastContainer } from "react-toastify";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const returnDateStyle = () => ({
  width: {
    xxs: "45vw",
    xs: "39.2vw",
    sm: "16vw",
    lg: "12vw",
  },
  fontSize: {
    xs: "14px",
    md: "16px",
  },
});
const departDateStyle = () => ({
  width: {
    xxs: "40vw",
    xs: "45vw",
    sm: "19vw",
    lg: "14vw",
  },
  paddingLeft: {
    xs: 4,
    sm: 3,
  },
  fontSize: {
    xs: "14px",
    md: "16px",
  },
});

export default function FlightSearchCard() {
  const navigate = useNavigate();
  const {
    airplaneDetails,
    searchPlane,
    departvalue,
    sourceDestValue,
    flightPage,
  } = useFlightSearch();
  const { source, destination, cityNameCodes } = sourceDestValue;
  const { airportNames, setAirplanes } = airplaneDetails;
  // const { handleSearchClick } = searchPlane;
  const { departDay } = departvalue;

  const handleSearchClick = () => {
    if (source !== "" && destination !== "") {
      if (source.substring(0, 3) === destination.substring(0, 3)) {
        toast.error("Source and Destination can't be same!", {
          theme: "colored",
        });
      }
      if (
        source.substring(0, 3) !== destination.substring(0, 3) &&
        cityNameCodes.includes(source.substring(0, 3)) &&
        cityNameCodes.includes(destination.substring(0, 3)) &&
        days.includes(departDay.substring(0, 3))
      ) {
        const sourceVal = source.substring(0, 3);
        const destinationVal = destination.substring(0, 3);
        const day = departDay.substring(0, 3);
        if (sourceVal !== null && destinationVal !== null && day !== null) {
          fetchFlights(sourceVal, destinationVal, day, 5, flightPage).then(
            (response) => {
              setAirplanes(response.data.flights);
            }
          );
        } else {
          fetchFlights(sourceVal, destinationVal, day, 5, flightPage).then(
            (response) => {
              setAirplanes(response.data.flights);
            }
          );
        }
      }
    } else {
      if (source === "" || destination === "") {
        toast.warn("Fill the details before search!", { theme: "colored" });
      }
    }
  };

  const handleNavigation = () => {
    const encodedPath = btoa(
      `${source}-${destination}--${departDay}-&{returnDay}`
    );
    if (
      source.substring(0, 3) !== destination.substring(0, 3) &&
      cityNameCodes.includes(source.substring(0, 3)) &&
      cityNameCodes.includes(destination.substring(0, 3)) &&
      days.includes(departDay.substring(0, 3))
    ) {
      navigate(`/flights/results-${encodedPath}`);
    }
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Paper
        className="flight-search-form-card"
        sx={{
          width: {
            xxs: "94vw",
            xs: "92vw",
            sm: "64vw",
            md: "62vw",
            lg: "48vw",
          },
          height: {
            xxs: "71vh",
            xs: "62.5vh",
            sm: "54vh",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: {
            xxs: 1,
            xs: 1,
            sm: 3,
            md: 4,
            lg: 3,
          },
          padding: {
            xs: "10px",
            sm: "20px",
          },
          position: "relative",
        }}
      >
        {/* PASSENGER ADD SECTION */}
        <PassengerAdd />
        {/* FARE TYPE SECTION */}
        <FareType />
        {/* SOURCE DESTINATION INPUTS SECTION */}
        <Stack
          sx={{
            flexDirection: {
              xxs: "column",
              sm: "row",
            },
            gap: {
              xxs: 2,
              sm: 0,
            },
            position: "relative",
            width: "100%",
          }}
        >
          {/* SOURCE CONTAINER */}
          <div id="source-container">
            <div className="f-takeoff-icon">
              <FlightTakeoffOutlinedIcon htmlColor="#808080" />
            </div>
            <DepartCityInput
              options={airportNames}
              noOptionText={"No Match Found"}
            />
          </div>
          {/* SWITCH BTN */}
          <div className="f-switch-btn">
            <SwapHorizontalCircleOutlinedIcon
              htmlColor="#5D86D7"
              fontSize="large"
            />
          </div>
          {/* DESTINATION CONTAINER */}
          <div id="destination-container">
            <div className="f-landing-icon">
              <FlightLandOutlinedIcon htmlColor="#808080" />
            </div>
            <DestinationCityInput
              options={airportNames}
              noOptionText={"No Match Found"}
            />
          </div>
        </Stack>

        {/* DATE PICKER AND SEARCH BTN SECTION */}
        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: {
              xxs: 1,
              xs: 3,
              sm: 2,
              md: 4,
              xl: 5,
            },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              position: "relative",
            }}
          >
            <div className="f-calender-icon">
              <CalendarMonthOutlinedIcon htmlColor="#808080" />
            </div>

            {/* DEPART DATE AND RETURN DATE CONTAINER */}
            <DateInputs
              departStyle={departDateStyle}
              returnStyle={returnDateStyle}
            />
          </Stack>
          <Button
            variant="text"
            sx={{
              width: {
                xxs: "85vw",
                sm: "20vw",
                md: "19.4vw",
                lg: "15vw",
              },
              height: {
                xxs: "60px",
                sm: "56px",
              },
              bgcolor: "#F77728",
              color: "#FFFFFF",
              borderRadius: "7px",
              fontSize: "16px",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#D4581D",
              },
            }}
            onClick={() => {
              handleSearchClick();
              handleNavigation();
            }}
          >
            Search flights
          </Button>
        </Stack>
        <ToastContainer />
      </Paper>
    </ThemeProvider>
  );
}