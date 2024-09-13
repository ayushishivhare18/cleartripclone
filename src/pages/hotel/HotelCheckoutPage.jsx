import React, { useEffect, useState } from "react";
import "../../styles/hotel/HotelCheckoutPage.css";
import FlightBookingNavbar from "../../components/flight-booking-page/flight-booking-navbar/FlightBookingNavbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { fetchSingleHotel } from "../../Apis/HotelDetailsApi";
import HotelInfoPriceCard from "../../components/ui/HotelInfoPriceCard";
import HotelInfoCard from "../../components/ui/HotelInfoCard";
import HotelCancellationPolicy from "../../components/ui/HotelCancellationPolicy";
import HotelBookingPolicy from "../../components/ui/HotelBookingPolicy";
import Footer from "../footer/Footer";
import HotelGuestDetails from "../../components/ui/HotelGuestDetails";
import { ToastContainer, toast } from "react-toastify";
import PaymentGateway from "../../components/ui/PaymentGateway";
import "react-toastify/dist/ReactToastify.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const HotelCheckoutPage = () => {
  const [open, setOpen] = useState(false);
  // const [name, setName] = useState({ fName: "", lName: "" });
  const [contact, setContact] = useState({ ph: "", email: "" });
  const [guests, setGuests] = useState([]);
  const [gfName, setGFName] = useState("");
  const [glName, setGLName] = useState("");
  const [addedGuest, setAddedGuest] = useState(0);
  const { hotelID } = useParams();
  const { hotelDetails, checkInOutDetails } = useHotelContext();
  const { singleHotel, setSingleHotel } = hotelDetails;
  const { checkInDate, checkOutDate } = checkInOutDetails;
  const navigate = useNavigate();
  const gfullName = gfName + " " + glName;

  const handleOpen = () => {
    if (contact?.ph.length === 10) {
      setOpen(true);
    } else {
      toast.error("Phone number is invalid!", { theme: "colored" });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchSingleHotel(hotelID).then((response) => {
      setSingleHotel(response.data);
    });
  }, [hotelID]);

  const getDateMonth = (dateVal) => {
    const month = months[dateVal.getMonth()];
    const formattedDate = `${dateVal.getDate()} ${month}`;
    return formattedDate;
  };

  const getDayTime = (dateVal) => {
    const day = days[dateVal.getDay()];
    const hour = dateVal.getHours();
    const minute = dateVal.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const formattedDate = `${day}, ${hour12 < 10 ? "0" : ""}${hour12}:${
      minute < 10 ? "0" : ""
    }${minute} ${ampm}`;
    return formattedDate;
  };

  const getNights = () => {
    const date1 = new Date(checkInDate);
    const date2 = new Date(checkOutDate);
    const differenceInMs = date2 - date1;
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  // const handleContinueBtn = () => {
  //   // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   // // if fname , lname , ph num, email and guest list added with name then only navigate
  //   // if(name.fName !== "" && name.lName !== "" && contact?.ph !== "" && contact?.email !== ""){
  //   //     if(regex.test( contact.email)){
  //   //         navigate(`/hotels/HBConfirmation/${hotelID}`);
  //   //     }else {
  //   //         notify("Email is invalid!");
  //   //     }
  //   // }else {
  //       if(contact?.ph.length === 10){
  //         handleOpen();

  //       }else{
  //         notify("Phone number is invalid, it must have 10 digits");
  //           // notify("Fill the input details!");
  //       }
  //   // }
  // }

  console.log("rendered");

  return (
    <div>
      <FlightBookingNavbar />
      <Box mt={2} mb={4} sx={{ borderBottom: "1px solid #E6E6E6" }}></Box>
      <main id="h-booking-main">
        {/* hotel booikng details content */}
        <div id="h-booking-content">
          {/* header */}
          <Stack
            mb={4}
            mt={{ xs: -3, sm: 0 }}
            flexDirection={"row"}
            alignItems={"center"}
            gap={2}
            width={{ xs: "90vw", md: "60vw" }}
          >
            <div className="number-circle">
              <span>1</span>
            </div>
            <Typography fontSize={{ xs: "24px" }} fontWeight={600}>
              Review your itinerary
            </Typography>
          </Stack>

          <div id="hotel-info-card">
            <HotelInfoCard
              singleHotel={singleHotel}
              getDateMonth={getDateMonth}
              getDayTime={getDayTime}
              getNights={getNights}
            />
          </div>

          {/* price card only for mobile screen  */}
          <div id="h-booking-price-card-mobile">
            <HotelInfoPriceCard getNights={getNights} />
          </div>

          <div id="cancellation-policy">
            <HotelCancellationPolicy
              getDateMonth={getDateMonth}
              getDayTime={getDayTime}
            />
          </div>

          <div id="hotel-booking-policy">
            <HotelBookingPolicy />
          </div>

          <div id="guest-details">
            <HotelGuestDetails
              guests={guests}
              setGuests={setGuests}
              gfName={gfName}
              setGFName={setGFName}
              glName={glName}
              setGLName={setGLName}
              contact={contact}
              setContact={setContact}
              gfullName={gfullName}
              addedGuest={addedGuest}
              setAddedGuest={setAddedGuest}
            />
          </div>

          <Button
            variant="contained"
            sx={{ width: 300, mt: 4 }}
            onClick={handleOpen}
          >
            Continue to payment
          </Button>

          <PaymentGateway
            open={open}
            handleClose={handleClose}
            booingId={hotelID}
            startDate={checkInDate}
            endDate={checkOutDate}
          />
        </div>

        {/* hotel booking price card */}
        <div id="h-booking-price-card">
          <HotelInfoPriceCard getNights={getNights} />
        </div>
      </main>

      <Box mt={10} mb={4} sx={{ borderBottom: "1px solid lightgray" }}></Box>
      <Footer />
    </div>
  );
};

export default HotelCheckoutPage;