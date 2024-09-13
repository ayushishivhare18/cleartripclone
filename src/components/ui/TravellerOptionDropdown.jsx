import React from "react";
import { useFlightSearch } from "../../contexts/FlightsSearchProvider";
import { Box, Stack, Typography } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const TravellerOptionDropdown = () => {
  const { traveller, setTraveller } = useFlightSearch().travellerData;

  const handleIncrese = (state) => {
    const updatedTraveller = { ...traveller };
    const totalTrvaller =
      updatedTraveller["adults"] +
      updatedTraveller["children"] +
      updatedTraveller["infants"];
    if (state !== "infants" && totalTrvaller < 12) {
      updatedTraveller[state] += 1;
    } else if (state === "infants" && updatedTraveller["infants"] < 2) {
      updatedTraveller[state] += 1;
    }
    setTraveller(updatedTraveller);
  };
  const handleDecrease = (state) => {
    const updatedTraveller = { ...traveller };
    if (state === "adults" && updatedTraveller[state] > 1) {
      updatedTraveller[state] -= 1;
    } else if (
      (state === "children" || state === "infants") &&
      updatedTraveller[state] > 0
    ) {
      updatedTraveller[state] -= 1;
    }
    setTraveller(updatedTraveller);
  };
  const getAddedTraveller = () => {
    let addedTraveller = 0;
    for (let key in traveller) {
      addedTraveller += traveller[key];
    }
    return addedTraveller;
  };

  return (
    <>
      {/* AULTS SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Box>
          <Typography fontSize={"16px"} fontWeight={"600"} variant="h6">
            Adults
          </Typography>
          <Typography fontSize={"12px"}>(12+ Years)</Typography>
        </Box>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <RemoveCircleOutlineOutlinedIcon
            htmlColor="#3567CC"
            fontSize="large"
            className={
              traveller.adults === 1 ? "cursor-change" : "cursor-normal"
            }
            onClick={() => handleDecrease("adults")}
          />
          <span>{traveller.adults}</span>
          <ControlPointOutlinedIcon
            htmlColor="#3567CC"
            fontSize="large"
            sx={{ cursor: "pointer" }}
            className={
              getAddedTraveller() === 12 ? "cursor-change" : "cursor-normal"
            }
            onClick={() => handleIncrese("adults")}
          />
        </Stack>
      </Box>
      {/* CHILDREN SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Box>
          <Typography fontSize={"16px"} fontWeight={"600"} variant="h6">
            Children
          </Typography>
          <Typography fontSize={"12px"}>(2 - 12 yrs)</Typography>
        </Box>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <RemoveCircleOutlineOutlinedIcon
            htmlColor="#3567CC"
            fontSize="large"
            className={
              traveller.children === 0 ? "cursor-change" : "cursor-normal"
            }
            onClick={() => handleDecrease("children")}
          />
          <span>{traveller.children}</span>
          <ControlPointOutlinedIcon
            htmlColor="#3567CC"
            fontSize="large"
            className={
              getAddedTraveller() === 12 ? "cursor-change" : "cursor-normal"
            }
            onClick={() => handleIncrese("children")}
          />
        </Stack>
      </Box>
      {/* INFANTS SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Box>
          <Typography fontSize={"16px"} fontWeight={"600"} variant="h6">
            Infants
          </Typography>
          <Typography fontSize={"12px"}>(Below 2 yrs)</Typography>
        </Box>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <RemoveCircleOutlineOutlinedIcon
            htmlColor="#3567CC"
            fontSize="large"
            className={
              traveller.infants === 0 ? "cursor-change" : "cursor-normal"
            }
            onClick={() => handleDecrease("infants")}
          />
          <span>{traveller.infants}</span>
          <ControlPointOutlinedIcon
            htmlColor="#3567CC"
            fontSize="large"
            className={
              traveller.infants === 2 || getAddedTraveller() === 12
                ? "cursor-change"
                : "cursor-normal"
            }
            onClick={() => handleIncrese("infants")}
          />
        </Stack>
      </Box>
    </>
  );
};

export default TravellerOptionDropdown;