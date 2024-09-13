import React, { useState } from "react";
import "../../../styles/flight/Flight.css";
import FlightSearchCard from "./FlightSearchCard";
import { Typography, Box, Stack, Container, Paper } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";

const FlightSearch = () => {
  const [adVisibility, setAdVisibility] = useState(true);

  const onClose = () => {
    setAdVisibility(false);
  };
  return (
    <Box component="div">
      {/* FLIGHT SEARCH HEADER */}
      <Box
        component="div"
        sx={{
          textAlign: "left",
          mb: {
            xs: 2,
            sm: 4,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: "500",
            color: "#3B3B3B",
            fontSize: {
              xs: "23px",
              md: "36px",
            },
          }}
        >
          Search flights
        </Typography>
        <Typography
          gutterBottom
          sx={{
            color: "#525252",
            fontWeight: {
              xs: "400",
              md: "500",
            },
            fontSize: {
              xs: "16px",
            },
          }}
        >
          Enjoy hassle free bookings with Cleartrip
        </Typography>
      </Box>
      {/* FLIGHT SEARCH CARD */}
      <FlightSearchCard />
      {/* RECENT FLIGHT SECTION  */}
      <Box component={"div"} sx={{ mt: 6 }}>
        {/* HEADER */}
        <Typography component={"h3"} variant="h4" sx={{ textAlign: "left" }}>
          Recent searches
        </Typography>
        {/* RECENT FLIGHT CONATINER */}
        <Container
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {/* CARD 1 */}
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              border: "1px solid lightgray",
              width: "fit-content",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Stack sx={{ textAlign: "left" }}>
              <div style={{ display: "flex" }}>
                <Typography>Mumbai</Typography>
                {/* ICON */}
                <ArrowRightAltIcon htmlColor="gray" />
                <Typography>Kolkata</Typography>
              </div>
              <Typography sx={{ fontSize: 12, color: "gray" }}>
                Fri, 23 Feb
              </Typography>
            </Stack>
            {/* ICON */}
            <KeyboardArrowRightIcon htmlColor="gray" />
          </Box>
          {/* CARD 2 */}
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              border: "1px solid lightgray",
              width: "fit-content",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Stack sx={{ textAlign: "left" }}>
              <div style={{ display: "flex" }}>
                <Typography>Hyderabad</Typography>
                {/* ICON */}
                <ArrowRightAltIcon htmlColor="gray" />
                <Typography>Delhi</Typography>
              </div>
              <Typography sx={{ fontSize: 12, color: "gray" }}>
                Fri, 23 Feb
              </Typography>
            </Stack>
            {/* ICON */}
            <KeyboardArrowRightIcon htmlColor="gray" />
          </Box>
          {/* CARD 3 */}
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              border: "1px solid lightgray",
              width: "fit-content",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Stack sx={{ textAlign: "left" }}>
              <div style={{ display: "flex" }}>
                <Typography>Kolkata</Typography>
                {/* ICON */}
                <ArrowRightAltIcon htmlColor="gray" />
                <Typography>Delhi</Typography>
              </div>
              <Typography sx={{ fontSize: 12, color: "gray" }}>
                Fri, 23 Feb
              </Typography>
            </Stack>
            {/* ICON */}
            <KeyboardArrowRightIcon htmlColor="gray" />
          </Box>
        </Container>
      </Box>
      {/* ADVERTISEMENT */}
      {adVisibility ? (
        <Box
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mt: 4,
            background: "linear-gradient(to right, #F2EDF9, #EDDEF4) ",
            minHeight: "20vh",
            width: "100%",
            px: 2,
            py: 2,
            borderRadius: 2,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <div style={{ textAlign: "left" }}>
            <Typography paragraph sx={{ fontSize: 18, fontWeight: 500 }}>
              Flexible flight bookings with ClearChoice Max
            </Typography>
            <Typography paragraph sx={{ fontSize: 14 }}>
              Free cancellation or free date change starting from ₹499. T&C
              apply.
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              style={{
                padding: 8,
                borderRadius: 5,
                border: "1px solid gray",
                background: "transparent",
                cursor: "no-drop",
                fontSize: 16,
              }}
            >
              Learn more
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        </Box>
      ) : (
        ""
      )}

      <ToastContainer />
    </Box>
  );
};

export default FlightSearch;