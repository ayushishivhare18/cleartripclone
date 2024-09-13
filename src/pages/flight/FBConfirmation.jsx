import React, { useEffect, useState } from "react";
import "./FBConfirmation.css";
import { fetchFlightBookingInfo } from "../../Apis/BookingApi";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import Footer from "../../components/FooterPage/Footer";

const FBConfirmation = () => {
  const [user, setUser] = useState({});
  const { flightId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlightBookingInfo(flightId).then((resp) => {
      setUser(resp.booking);
    });
  }, []);

  const timeFormat = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;
    const formattedDate = `${time} ${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    return formattedDate;
  };

  return (
    <div id="booking-confirmation">
      <nav className="booking-con-navbar">
        <Stack
          className="flight-booking-navabr"
          flexDirection={{
            xs: "column",
            sm: "row",
          }}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          mt={4}
        >
          <img
            className="cleartrip-logo"
            src="https://careers.cleartrip.com/images/cleartrip/footer-logo.svg"
            alt="cleartrip-logo"
            onClick={() => navigate("/")}
          />
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                },
              }}
            >
              Customer care call(7am to 10pm) Indian time:
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                },
              }}
            >
              Call: +91 9123452006(Standard charges apply within India)
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                },
              }}
            >
              Email: dummycostomersupport@gmail.com
            </Typography>
          </Box>
        </Stack>
      </nav>
      {/* bottom border below navbar */}
      <Box
        sx={{
          borderBottom: "1px solid lightgray",
          mt: 2,
          mb: 2,
        }}
      ></Box>
      <main className="booking-con-main">
        {/* header */}
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{
            color: "green",
          }}
        >
          {user.status === "confirmed"
            ? "Your trip has been booked successfully"
            : ""}
        </Typography>
        {/* trip source dest */}
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            mb: 2,
            fontSize: {
              xs: "18px",
              sm: "25px",
              md: "30px",
            },
            fontWeight: 600,
          }}
        >
          {user?.flight?.source} to {user?.flight?.destination} (Trip Id:
          02689bkl0333)
        </Typography>
        <Box borderBottom={"1px solid lightgray"} mb={2}></Box>
        {/* flight details */}
        <div className="flight-details">
          <Typography variant="h5">Flight Details:</Typography>
          <Box borderBottom={"1px solid lightgray"} mb={2}></Box>
          <div className="b-flight-details">
            <Typography variant="h6">Flight</Typography>
            <Typography>{user?.flight?.airline?.airlineID}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Airline</Typography>
            <Typography>{user?.flight?.airline?.name}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">From</Typography>
            <Typography>{user?.flight?.source}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">To</Typography>
            <Typography>{user?.flight?.destination}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Departs</Typography>
            {/* <Typography>{departTime}</Typography> */}
            <Typography>{timeFormat(user?.start_date)}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Arrives</Typography>
            {/* <Typography>{arrivalTime}</Typography> */}
            <Typography>{timeFormat(user?.end_date)}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Duration</Typography>
            <Typography>{user?.flight?.duration} hr</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Ticket</Typography>
            <Typography>E-ticket</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Stops</Typography>
            <Typography>{user?.flight?.stops}</Typography>
          </div>
          <div className="b-flight-details">
            <Typography variant="h6">Class</Typography>
            <Typography>Economy</Typography>
          </div>
        </div>

        <div className="price-details">
          <Typography variant="h5">Price Details:</Typography>
          <Box borderBottom={"1px solid lightgray"} mb={2}></Box>
          <div className="b-price-details">
            <Typography variant="h6">Base fare</Typography>
            <Typography>
              {Math.ceil(user?.flight?.ticketPrice * 0.85)}
            </Typography>
          </div>
          <div className="b-price-details">
            <Typography variant="h6">Discount</Typography>
            <Typography>
              {Math.ceil(user?.flight?.ticketPrice * 0.15)}
            </Typography>
          </div>
          <Box
            borderBottom={"1px solid lightgray"}
            mb={0.5}
            width={"40%"}
          ></Box>
          <div className="b-price-details">
            <Typography variant="h6">Total price</Typography>
            <Typography>{user?.flight?.ticketPrice}</Typography>
          </div>
        </div>

        <div className="contact-details">
          <Typography variant="h5">Contact Details:</Typography>
          <Box borderBottom={"1px solid lightgray"} mb={2}></Box>
          <div className="b-contact-details">
            <Typography variant="h6">Name:</Typography>
            <Typography>{user?.user?.name}</Typography>
          </div>
          <div className="b-contact-details">
            <Typography variant="h6">Email:</Typography>
            <Typography>{user?.user?.email}</Typography>
          </div>
          <div className="b-contact-details-address ">
            <Typography variant="h6">Address:</Typography>
            <Box
              sx={{
                mt: 0.8,
              }}
            >
              <Typography>36, rabrindra sarabar lane</Typography>
              <Typography>Bk road kolkata - 700012</Typography>
              <Typography>West Bengal</Typography>
              <Typography>India</Typography>
            </Box>
          </div>
        </div>

        {/* <div className="flight-booking-policy">
          <Typography variant="h5">Flight booking policy:</Typography>
          <Box borderBottom={"1px solid lightgray"} mb={2}></Box>
        </div> */}
      </main>

      <Footer />
    </div>
  );
};

export default FBConfirmation;