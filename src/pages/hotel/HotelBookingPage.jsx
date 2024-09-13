import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHotelBookingInfo } from "../../Apis/BookingApi";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { Divider, Typography } from "@mui/material";
import FlightBookingNavbar from "../../components/flight-booking-page/flight-booking-navbar/FlightBookingNavbar";

const HotelBookingPage = () => {
  const [hotelInfo, setHotelInfo] = useState({});
  const { hotelID } = useParams();
  const { checkInDate, checkOutDate } = useHotelContext().checkInOutDetails;

  useEffect(() => {
    getHotelInfo();
  }, []);

  const getHotelInfo = async () => {
    const response = await fetchHotelBookingInfo(
      hotelID,
      checkInDate,
      checkOutDate
    );
    setHotelInfo(response);
  };
  return (
    <div id="hotel-booking-page">
      <nav>
        <FlightBookingNavbar />
      </nav>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <main>
        <Typography
          component={"h2"}
          variant="h3"
          sx={{ textAlign: "center", color: "green" }}
        >
          {hotelInfo.message}
        </Typography>
      </main>
    </div>
  );
};

export default HotelBookingPage;