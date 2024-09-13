import React, { useCallback, useEffect, useState } from "react";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useFlightSearch } from "../../../../contexts/FlightsSearchProvider";
import { useFlightFilter } from "../../../../contexts/FlightFilterProvider";

const PriceSlider = styled(Slider)({
  color: "green",
  height: 4,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
});

const SortByPriceRange = ({ getFilterFlights }) => {
  const { filterData, setFlightPage } = useFlightSearch();
  const { setFilterItems, filterItems } = filterData;
  const { isPrice, setIsPrice, flightPrice, setFlightPrice } =
    useFlightFilter().filterPriceRange;

  const flightPriceDebounce = useDebounce(flightPrice, 500);

  useEffect(() => {
    setFlightPage(1);
    getFilterFlights(filterItems);
  }, [flightPriceDebounce]);

  const handlePricebtn = () => {
    setIsPrice((prev) => !prev);
  };

  const handlePriceFilter = () => {
    const ticketPrice = {
      $lte: flightPrice,
      $gte: 1000,
    };
    setFilterItems((prev) => ({ ...prev, ticketPrice: ticketPrice }));
  };

  return (
    <>
      <Box>
        <Stack
          className="sort-by-price"
          flexDirection={"row"}
          alignItems={"center"}
          sx={{
            width: {
              xs: "12rem",
            },
          }}
          onClick={handlePricebtn}
        >
          <Typography
            fontWeight={600}
            sx={{
              letterSpacing: 2,
            }}
          >
            One-way price
          </Typography>
          <span>
            {isPrice ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </span>
        </Stack>
        {isPrice ? (
          <div id="sort-by-price">
            <Box>
              <Stack flexDirection={"row"} alignItems={"center"} width={"8rem"}>
                <Typography mr={1}>Up to</Typography>
                <CurrencyRupeeIcon fontSize="sm" />
                <Typography>{flightPrice}</Typography>
              </Stack>
              <PriceSlider
                value={flightPrice ?? 3000}
                min={1600}
                max={3000}
                defaultValue={3000}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                sx={{
                  width: {
                    xs: "60vw",
                    lg: "20vw",
                  },
                }}
                onChange={(e) => {
                  setFlightPrice(e.target.value);
                  // handlePriceFilter();
                }}
                onChangeCommitted={handlePriceFilter}
              />
            </Box>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                width: {
                  xs: "60vw",
                  lg: "20vw",
                },
              }}
            >
              <div className="price-tag-container">
                <span className="price-tag">
                  <CurrencyRupeeIcon fontSize="sm" />
                </span>
                <span>1600</span>
              </div>
              <div className="price-tag-container">
                <span className="price-tag">
                  <CurrencyRupeeIcon fontSize="sm" />
                </span>
                <span>3000</span>
              </div>
            </Stack>
          </div>
        ) : null}
      </Box>
    </>
  );
};

export default SortByPriceRange;