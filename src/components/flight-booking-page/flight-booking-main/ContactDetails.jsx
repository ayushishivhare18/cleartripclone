import {
    Container,
    Box,
    Modal,
    Button,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useRef, useState } from "react";
  
  import PaymentGateway from "../../ui/PaymentGateway";
  import { ToastContainer, toast } from "react-toastify";
  import { useAuth } from "../../../contexts/AuthorizationProvider";
  import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";
  import CountryCodeDropdown from "../../ui/CountryCodeDropdown";
  import AddGuestModal from "../../ui/AddGuestModal";
  
  const ContactDetails = ({ flightId }) => {
    const [phone, setPhone] = useState();
    const [openPayment, setOpenPayment] = useState(false);
    const { token } = useAuth().tokenDetails;
    const { departDate } = useFlightSearch().departvalue;
    const { returnDate } = useFlightSearch().returnValue;
    const [openGuestModal, setOpenGuestModal] = useState(false);
    const [guests, setGuests] = useState([]);
    const [gfName, setGFName] = useState("");
    const [glName, setGLName] = useState("");
    const [addedGuest, setAddedGuest] = useState(0);
    const gfNameRef = useRef(null);
    const glNameRef = useRef(null);
    const gfullName = gfName + " " + glName;
  
    const { traveller } = useFlightSearch().travellerData;
  
    console.log(traveller);
  
    const handleGuestOpen = () => {
      setOpenGuestModal(true);
    };
    const handleGuestClose = () => {
      setOpenGuestModal(false);
    };
  
    const handleAddGuest = () => {
      if (gfullName !== "" && gfName !== "" && glName !== "") {
        const nameExist = guests.find((guestName) => guestName === gfullName);
        if (nameExist) {
          toast.warn("Two guest name can not be same!", { theme: "colored" });
        } else {
          setGuests((prev) => [...prev, gfullName]);
          setAddedGuest((prev) => prev + 1);
          // toast.success("Guest added successfully", { theme: "colored" });
          handleGuestClose();
          setGFName("");
          setGLName("");
        }
      } else if (gfName === "" && glName === "") {
        gfNameRef.current.focus();
        toast.warn("Enter the first name!", { theme: "colored" });
      } else if (glName === "") {
        glNameRef.current.focus();
        toast.warn("Enter the last name!", { theme: "colored" });
      } else {
        toast.error("Fill all the details!", { theme: "colored" });
      }
    };
  
    const totalGuest = () => {
      return traveller.adults + traveller.children + traveller.infants;
    };
  
    const handleDeleteGuest = (item) => {
      setAddedGuest((prev) => prev - 1);
      const updatedGuests = guests.filter((guest) => guest !== item);
      setGuests(updatedGuests);
      // toast.success("One guest is removed successfully", { theme: "colored" });
    };
  
    const handlePaymentOpen = () => {
      if (phone?.length === 10) {
        if (token) {
          setOpenPayment(true);
        } else {
          toast.error("For payment you have to log in!", { theme: "colored" });
        }
      } else {
        toast.error("Phone number is invalid!", { theme: "colored" });
      }
    };
    const handlePaymentClose = () => {
      setOpenPayment(false);
    };
  
    return (
      <div>
        {/* header */}
        <Stack
          className="contact-details"
          mb={4}
          flexDirection={"row"}
          alignItems={"center"}
          gap={2}
          width={{
            xs: "90vw",
          }}
        >
          <div className="number-circle">
            <span>2</span>
          </div>
          <Stack>
            <Typography sx={{ fontWeight: "500", fontSize: "24px" }}>
              Add contact details
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
              E-ticket will be sent to this email address and phone number
            </Typography>
          </Stack>
        </Stack>
        {/* inputs container */}
        <Container
          sx={{
            border: "1px solid lightgray",
            borderRadius: "7px",
            width: {
              xs: "90vw",
              md: "60vw",
            },
          }}
        >
          <Stack mt={2} mb={2}>
            <label className="mobile-label" htmlFor="mobile-number">
              Mobile number
            </label>
            <Stack
              flexDirection={"row"}
              gap={{
                xs: 1,
              }}
            >
              <Stack
                border={"1px solid lightgray"}
                borderRadius={"5px"}
                flexDirection={"row"}
                justifyContent={"center"}
                sx={{
                  gap: {
                    xs: 1,
                  },
                  cursor: "pointer",
                  minWidth: "6rem",
                }}
              >
                <CountryCodeDropdown />
              </Stack>
              <input
                className="mobile-input"
                type="number"
                id="mobile-number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Stack>
          </Stack>
  
          <Stack mb={2}>
            <label className="email-label" htmlFor="email">
              Email address
            </label>
            <input
              className="email-input"
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={JSON.parse(localStorage.getItem("userDetails"))?.email}
              disabled="true"
              required
            />
          </Stack>
  
          {/* Add Guests */}
          <Stack sx={{ mb: 2 }}>
            <h3>Guest details</h3>
  
            <ol className="add-other-guests">
              {/* map all the added guest */}
              {guests.length > 0 &&
                guests?.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span style={{ fontWeight: 400, fontSize: 16 }}>{item}</span>
                    <Button onClick={() => handleDeleteGuest(item)}>
                      Delete
                    </Button>
                  </li>
                ))}
            </ol>
  
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mb: 4, width: "20%" }}
              onClick={handleGuestOpen}
            >
              Add new guest
            </Button>
          </Stack>
  
          {/* ADD NEW GUEST MODAL */}
          <AddGuestModal
            open={openGuestModal}
            handleClose={handleGuestClose}
            gfName={gfName}
            setGFName={setGFName}
            gfNameRef={gfNameRef}
            glName={glName}
            setGLName={setGLName}
            glNameRef={glNameRef}
            totalGuest={totalGuest}
            addedGuest={addedGuest}
            handleAddGuest={handleAddGuest}
          />
  
          <button className="continue-btn" onClick={handlePaymentOpen}>
            Continue to payment
          </button>
  
          <PaymentGateway
            open={openPayment}
            handleClose={handlePaymentClose}
            booingId={flightId}
            startDate={departDate}
            endDate={returnDate}
          />
        </Container>
      </div>
    );
  };
  
  export default ContactDetails;