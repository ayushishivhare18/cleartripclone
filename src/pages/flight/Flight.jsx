import React, { useContext, useEffect } from "react";
import "../../styles/flight/Flight.css";
import FlightSearch from "../../components/flightPage/flightSearchForm/FlightSearch";
import RightSideBar from "../../components/right-side-bar/RightSideBar";
import { Box, Container, Stack, Typography } from "@mui/material";
import { OffersContext } from "../../contexts/OfferDetailsProvider";
import { popularDestinations } from "../../static-data/popularDestinations";
import AboutCleartrip from "../../components/ui/AboutCleartrip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Flight = () => {
  const { offers, handleOfferFecth } = useContext(OffersContext);

  useEffect(() => {
    handleOfferFecth("ALL");
  }, []);

  return (
    <div>
      <div>
        <Stack
          component={"div"}
          sx={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: {
              md: 4,
              lg: 6,
            },
            justifyContent: {
              xs: "center",
              sm: "flex-start",
            },
            pt: {
              xs: 2,
              sm: 4,
            },
          }}
        >
          <FlightSearch />
          <RightSideBar />
        </Stack>

        {/* OFFERS SECTION */}
        <Box
          sx={{
            mt: 4,
            p: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 4.5,
          }}
        >
          {offers.slice(0, 6).map((offer) => (
            <Box
              key={offer._id}
              sx={{
                backgroundImage: `url('${offer.heroUrl}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "19.5rem",
                minHeight: "30vh",
                borderRadius: 2,
                color: "white",
                textAlign: "left",
                px: 4,
              }}
            >
              <Typography paragraph sx={{ mt: 4 }}>
                {offer.pTl}
              </Typography>
              <Typography paragraph sx={{ mt: 2 }}>
                {offer.pTx}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* POPULAR DESTINATIONS SECTION */}
        <Box sx={{ mt: 8 }}>
          <Typography component={"h3"} variant="h4" sx={{ textAlign: "left" }}>
            Popular destinations
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
            }}
          >
            {popularDestinations.map((dest) => (
              <Box
                key={dest.id}
                sx={{
                  backgroundImage: `url("${dest.imgUrl}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  color: "white",
                  width: "11.5rem",
                  height: "40vh",
                  borderRadius: 2,
                  pt: 20,
                }}
              >
                <Typography paragraph sx={{ fontSize: 20, fontWeight: 600 }}>
                  {dest.locaion}
                </Typography>
                <Typography paragraph sx={{ fontSize: 16, fontWeight: 500 }}>
                  {dest.numOfProp} properties
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ABOUT CLEARTRIP */}
        <div style={{ marginTop: "50px", marginBottom: "20px" }}>
          <AboutCleartrip />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Flight;