import React, { useEffect, useMemo, useState } from "react";
import "../../styles/hotel/HotelResultPage.css";
import HotelNavbar from "../../components/hotelResultPage/HotelNavBar";
import { fetchHotels, fetchSingleHotel } from "../../Apis/HotelDetailsApi";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import StarsIcon from "@mui/icons-material/Stars";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import ImageCarousel from "../../components/hotelResultPage/ImageCarousel";
import { Box, Divider, Pagination, Stack } from "@mui/material";
import Footer from "../footer/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelResultPage = () => {
  const { hotelSearchHandler, filtersData, hotelDetails, loadingData } =
    useHotelContext();
  const {
    setSingleHotel,
    setHotels,
    hotels,
    hotelPage,
    setHotelPage,
    totalHotels,
  } = hotelDetails;
  const { handleHotelFilter } = filtersData;
  const { isLoading } = loadingData;

  const memoizedhotels = useMemo(() => hotels, [hotels]);

  useEffect(() => {
    handleHotelFilter();
  }, []);

  const handleChange = (event, value) => {
    setHotelPage(value);
  };

  const handleSingleHotelClick = (hotelID) => {
    fetchSingleHotel(hotelID).then((response) => {
      setSingleHotel(response.data);
    });
  };

  return (
    <div id="hotel-result-page">
      {/* HOTEL RESULT PAGE NAVBAR */}
      <HotelNavbar />

      {/* dIVIDER */}
      <Divider sx={{ mt: 2, mb: 4 }} />
      {/* HOTEL RESULT MAIN CONTENT */}
      <main id="hotel-result-page-main">
        {!isLoading ? (
          memoizedhotels.length > 0 ? (
            memoizedhotels.map((hotel) => (
              <div key={hotel._id} className="hotel-card">
                {/* CARD IMAGE CAROUSEL */}
                <ImageCarousel
                  handleSingleHotelClick={handleSingleHotelClick}
                  hotel={hotel}
                />
                {/* CARD TITLE */}
                <div className="hotel-card-title">
                  <span>{hotel.name}</span>
                  <div>
                    <span>
                      <StarsIcon fontSize="sm" />
                    </span>
                    <span>{hotel.rating}/5</span>
                  </div>
                </div>
                {/* CARD RATING */}
                <div style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 14, color: "gray" }}>
                    {hotel?.rating}-star hotel · {hotel?.location}
                  </p>
                </div>
                {/* CARD PRICE DETAILS */}
                <div className="hotel-card-price">
                  <span>
                    ₹{Math.ceil(hotel?.avgCostPerNight)} +{" "}
                    <span className="night">
                      ₹{Math.ceil(hotel?.avgCostPerNight * 0.1)} tax / night
                    </span>
                  </span>
                  <div></div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ textAlign: "center" }}>NO Hotels are Available!</h1>
            </div>
          )
        ) : (
          <>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        )}
      </main>
      {/* pagination */}
      <Stack mt={4} mb={4} flexDirection={"row"} justifyContent={"center"}>
        <div>
          <Pagination
            count={Math.ceil(totalHotels / 10)}
            color="primary"
            page={hotelPage}
            onChange={handleChange}
          />
        </div>
      </Stack>

      <Divider sx={{ mt: 4, mb: 2 }} />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default HotelResultPage;