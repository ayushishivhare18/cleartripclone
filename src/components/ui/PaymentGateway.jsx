import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import ExpiryDateDropdown from "./ExpiryDateDropDown";
import "../../styles/flight/FlightUi.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import PayConfirmModal from "./PayConfirmModal";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../contexts/AuthorizationProvider";
import {
  fetchFlightBookingInfo,
  fetchHotelBookingInfo,
} from "../../Apis/BookingApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const paperStyle = {
  mb: 2,
  mt: 1,
  ml: 4,
  p: 2,
  width: "80%",
  border: "1px solid lightgray",
};

export default function PaymentGateway({
  open,
  handleClose,
  booingId,
  startDate,
  endDate,
}) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showCardDetails, setShowCardDetails] = useState("upi-option");
  const [upiId, setUpiId] = useState("");
  const [openPayConfrm, setOpenPayConfrm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenPayConfrm = () => {
    setOpenPayConfrm(true);
  };
  const handleClosePayConfrm = () => {
    setOpenPayConfrm(false);
  };
  const handleRadioChange = (e) => {
    setShowCardDetails(e.target.id);
    toast.info(" it is under process", { theme: "colored" });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };
  const handleUpiPay = () => {
    const upiRegex = /^[0-9]{10}@upi$/;
    if (upiRegex.test(upiId)) {
      setIsLoading(true);
      if (pathname.includes("/flights")) {
        fetchFlightBookingInfo(booingId, startDate, endDate).then((resp) => {
          if (resp.status === "success") {
            const dataFromLS = JSON.parse(localStorage.getItem("bookingData"));
            const bookingDataFromLS = dataFromLS !== null ? dataFromLS : [];
            localStorage.setItem(
              "bookingData",
              JSON.stringify([resp?.booking, ...bookingDataFromLS])
            );
          }
        });
      } else if (pathname.includes("/hotels")) {
        fetchHotelBookingInfo(booingId, startDate, endDate).then((resp) => {
          if (resp.status === "success") {
            const dataFromLS = JSON.parse(
              localStorage.getItem("hotelBookingData")
            );
            const bookingDataFromLS = dataFromLS !== null ? dataFromLS : [];
            localStorage.setItem(
              "hotelBookingData",
              JSON.stringify([resp?.booking, ...bookingDataFromLS])
            );
          }
        });
      }

      setTimeout(() => {
        setOpenPayConfrm(true);
        setIsLoading(false);
      }, 3000);
    } else {
      toast.error("UPI ID is incorrect!", { theme: "colored" });
    }
  };
  const handleCheckBooking = () => {
    navigate("/mytrip");
  };

  return (
    <div>
      <Modal open={open}>
        <Box sx={{ ...style, width: 600 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="C l o s e">
              <Button onClick={handleClose}>
                <CloseIcon htmlColor="red" />
              </Button>
            </Tooltip>
          </Box>
          <h2 id="parent-modal-title">Select a payment method</h2>

          {/* upi-box */}
          <Box sx={{ mb: 2, mt: 4 }} className="upi-box">
            <label
              htmlFor="upi-option"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              <input
                onChange={handleRadioChange}
                defaultChecked={showCardDetails === "upi-option"}
                type="radio"
                id="upi-option"
                name="payment-options"
              />{" "}
              UPI Option
            </label>

            {showCardDetails === "upi-option" && (
              <Paper sx={paperStyle} elevation={8}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    marginBottom: "15px",
                  }}
                >
                  Please enter your UPI ID
                </p>
                <Stack sx={{ flexDirection: "row", alignItems: "flex-start" }}>
                  <input
                    onChange={handleUpiIdChange}
                    className="upi-option-input"
                    type="text"
                    id="card-number"
                    placeholder="MobileNumber@upi"
                  />
                  <ToastContainer />
                  <Button
                    onClick={handleUpiPay}
                    variant="contained"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      marginLeft: "10px",
                    }}
                  >
                    verify and pay
                  </Button>
                </Stack>
              </Paper>
            )}
          </Box>

          {/* debit-box */}
          <Box sx={{ mb: 2 }} className="debit-box">
            <label
              htmlFor="debit"
              style={{ fontSize: "18px", fontWeight: 500, color: "gray" }}
              onClick={() =>
                toast.info(" it is under process", { theme: "colored" })
              }
            >
              <input
                onChange={handleRadioChange}
                style={{ color: "lightgray", cursor: "no-drop" }}
                disabled="true"
                type="radio"
                id="debit"
                name="payment-options"
              />{" "}
              Debit card
            </label>
            {showCardDetails === "debit" && (
              <Paper sx={paperStyle}>
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "15px",
                    fontWeight: 500,
                  }}
                >
                  Enter card details
                </p>
                <label
                  style={{
                    fontSize: "18px",
                    marginRight: "20px",
                    textAlign: "right",
                  }}
                >
                  Card number
                </label>
                <input
                  className="debit-card-input"
                  type="number"
                  id="card-number"
                  placeholder="Enter card number"
                />
                <br />
                <label
                  style={{
                    fontSize: "18px",
                    marginRight: "20px",
                    textAlign: "right",
                  }}
                >
                  Name
                </label>
                <input
                  className="debit-card-name"
                  type="text"
                  id="debit-card-holder-name"
                  placeholder="Enter your name"
                />
                <ExpiryDateDropdown
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  onMonthChange={handleMonthChange}
                  onYearChange={handleYearChange}
                />
                <Stack
                  sx={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Button sx={{ mt: 2, width: "7rem" }} variant="contained">
                    Pay
                  </Button>
                </Stack>
              </Paper>
            )}
          </Box>

          {/* net-banking-box */}
          <Box className="net-banking-box">
            <label
              htmlFor="net-banking"
              style={{ fontSize: "18px", fontWeight: 500, color: "gray" }}
              onClick={() =>
                toast.info(" it is under process", { theme: "colored" })
              }
            >
              <input
                onChange={handleRadioChange}
                disabled="true"
                style={{ color: "lightgray", cursor: "no-drop" }}
                type="radio"
                id="net-banking"
                name="payment-options"
              />{" "}
              Net Banking
            </label>
          </Box>

          {isLoading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <PayConfirmModal
              openPayConfrm={openPayConfrm}
              handleOpenPayConfrm={handleOpenPayConfrm}
              handleClosePayConfrm={handleClosePayConfrm}
              handleCheckBooking={handleCheckBooking}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}