import React, { useEffect, useState } from "react";
import FlightBookingNavbar from "../../components/flight-booking-page/flight-booking-navbar/FlightBookingNavbar";
import { Box, Stack } from "@mui/material";
import BookingDetails from "../../components/flight-booking-page/flight-booking-main/BookingDetails";
import FlightPriceCard from "../../components/flight-booking-page/flight-booking-main/FlightPriceCard";
import { fetchSingleFlightDetails } from "../../Apis/FlightSearchApi";
import { useParams } from "react-router-dom";
import { useFlightSearch } from "../../contexts/FlightsSearchProvider";
import Footer from "../../pages/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightBookingPage = () => {
  const [selected, setSelected] = useState(1);

  const { setSingleFlight } = useFlightSearch().singleFlightValue;
  const { flightId } = useParams();

  useEffect(() => {
    fetchSingleFlightDetails(flightId).then((resp) => {
      setSingleFlight(resp.data);
    });
  }, []);

  return (
    <div className="flight-booking-page">
      {/* flight booking navbar */}
      <FlightBookingNavbar />
      {/* border bottom below navbar */}
      <Box mt={2} mb={4} sx={{ borderBottom: "1px solid #E6E6E6" }}></Box>
      {/* main content of booking page */}
      <main id="flight-booking-main">
        <Stack
          flexDirection={{ xs: "column-reverse", md: "row" }}
          justifyContent={"space-between"}
          gap={{ xs: 6, md: 0 }}
        >
          {/* booking details */}
          <BookingDetails
            flightId={flightId}
            selected={selected}
            setSelected={setSelected}
          />

          {/* price card */}
          <FlightPriceCard selected={selected} />
        </Stack>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default FlightBookingPage;