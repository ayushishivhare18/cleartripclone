import { Box, Paper, Stack, ThemeProvider } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { OffersContext } from "../../contexts/OfferDetailsProvider";
import "./RightSideBar.css";
import "../../styles/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { CustomTheme } from "../../util/muiTheme";
import { useLocation } from "react-router-dom";

const RightSideBar = () => {
  const [upCurrentIndex, setUpCurrentIndex] = useState(0);
  const [downCurrentIndex, setDownCurrentIndex] = useState(0);
  const { offers, handleOfferFecth } = useContext(OffersContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/" || pathname === "/flights")
      handleOfferFecth("FLIGHTS");
    else if (pathname === "/hotels") handleOfferFecth("HOTELS");
  }, []);

  const handleNextUp = () => {
    setUpCurrentIndex((prevIndex) =>
      prevIndex === offers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevUp = () => {
    setUpCurrentIndex((prevIndex) =>
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  const handleNextDown = () => {
    setDownCurrentIndex((prevIndex) =>
      prevIndex === offers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevDown = () => {
    setDownCurrentIndex((prevIndex) =>
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Stack
        sx={{
          display: {
            xxs: "none",
            lg: "flex",
          },
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        {/* OFFER UPPER CAROUSEL */}
        <Box component={"div"} className="carousel-container-up">
          {/* PREV BTN */}
          <button className="up-prev-btn" onClick={handlePrevUp}>
            <KeyboardArrowLeftOutlinedIcon />
          </button>
          {/* OFFERS */}
          {offers.map((offer, index) => (
            <Paper
              key={offer._id}
              className={`carousel-item-up ${
                index === upCurrentIndex ? "active-up" : "inActive"
              }`}
            >
              <img src={offer.heroUrl} alt={offer.pTl} />
              <div className="offer-details">
                <h4>{offer.pTl}</h4>
                <p>{offer.pTx}</p>
                <button style={{ cursor: "no-drop" }}>{offer.ctaText}</button>
              </div>
            </Paper>
          ))}
          {/* NEXT BTN  */}
          <button className="up-next-btn" onClick={handleNextUp}>
            <KeyboardArrowRightOutlinedIcon />
          </button>
        </Box>
        {/* MORE OFFERS */}
        <Box
          sx={{
            fontWeight: "500",
            fontSize: { lg: "16px", xl: "18px" },
            mr: "50%",
            color: "#525252",
          }}
          component="div"
        >
          More offers
        </Box>
        {/* OFFER LOWER CAROUSEL */}
        <div className="carousel-container-down">
          <button className="down-prev-btn" onClick={handlePrevDown}>
            <KeyboardArrowLeftOutlinedIcon htmlColor="blue" />
          </button>
          <div className="carousel-down">
            {offers.map((offer, index) => (
              <Paper
                key={offer._id}
                className={`carousel-item-down ${
                  index === downCurrentIndex ? "active-down" : "inActive"
                }`}
              >
                <div className="offer-details-down">
                  <h3 style={{ color: "#525252" }}>{offer.pTl}</h3>
                  <p>{offer.pTx}</p>
                  <button className="know-more-btn">Know more</button>
                </div>
              </Paper>
            ))}
          </div>
          <button className="down-next-btn" onClick={handleNextDown}>
            <KeyboardArrowRightOutlinedIcon htmlColor="blue" />
          </button>
        </div>
      </Stack>
    </ThemeProvider>
  );
};

export default RightSideBar;