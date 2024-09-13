import React, { useContext } from "react";
import "./NavbarStyles.css";
import AirplanemodeActiveRoundedIcon from "@mui/icons-material/AirplanemodeActiveRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import { Link, useLocation } from "react-router-dom";
import { OffersContext } from "../../../contexts/OfferDetailsProvider";
import { Box, Stack } from "@mui/material";
import { toast } from "react-toastify";

const SideNavbar = () => {
  const { setOffersUrlFilter } = useContext(OffersContext);
  const { pathname } = useLocation();

  const notify = () => toast("Page is under development!");
  return (
    <Stack
      sx={{
        flexDirection: {
          xxs: "row",
          xs: "row",
          sm: "column",
        },
        gap: {
          xs: 1,
          sm: 3,
        },
        pt: {
          xs: 2,
          sm: 4,
        },
        pr: {
          xs: 0,
          sm: 2,
          md: 4,
        },
      }}
    >
      <Link
        className={
          pathname === "/" || pathname === "/flights"
            ? "leftSection active-left-btn"
            : "leftSection"
        }
        to="/flights"
        onClick={() => {
          setOffersUrlFilter("FLIGHTS");
        }}
      >
        <AirplanemodeActiveRoundedIcon fontSize="medium" />
        <span>Flights</span>
      </Link>

      <Link
        className={
          pathname === "/hotels" ? "leftSection active-left-btn" : "leftSection"
        }
        to="/hotels"
        onClick={() => {
          setOffersUrlFilter("HOTELS");
        }}
      >
        <ApartmentRoundedIcon />
        <span>Hotels</span>
      </Link>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Link
          className={
            pathname === "/mytrip"
              ? "my-trip leftSection active-left-btn"
              : "leftSection"
          }
          to="/mytrip"
        >
          <LuggageOutlinedIcon />
          <span>My trips</span>
        </Link>
      </Box>

      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Link
          className={
            pathname === "/offers"
              ? "leftSection active-left-btn"
              : "leftSection"
          }
          // to="/offers"
          onClick={notify}
        >
          <MonetizationOnOutlinedIcon />
          <span>Offers</span>
        </Link>
      </Box>
    </Stack>
  );
};

export default SideNavbar;