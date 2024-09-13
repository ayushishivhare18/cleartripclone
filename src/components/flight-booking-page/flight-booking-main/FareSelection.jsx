import styled from "@emotion/styled";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const FareBox = styled(Box)({
  height: "40vh",
  border: "1px solid lightgray",
  "&:hover": {
    cursor: "pointer",
  },
})
const FareSelection = ({ singleFlight, selected, setSelected }) => {
  

  return (
    <Box
      width={{
        xs: "90vw",
        md: "60vw",
      }}
    >
      <Typography
        fontSize={{
          xs: "24px",
        }}
      >
        Select your fare
      </Typography>
      <Stack flexDirection={"row"} gap={2} mt={2}>
        {/* fare type 1 */}
        <FareBox
          sx={{
            width: {
              xs: "42vw",
              md: "20vw",
            },
            p: 2,
            bgcolor: selected === 1 ? "lightgreen" : ""
          }}
          onClick={() => setSelected(1)}
        >
          <Stack mb={4}>
            <Typography sx={{ fontSize :"16px", fontWeight: 500}}>Standard fare </Typography>
            <Typography sx={{ fontSize :"16px", fontWeight: 500}}>₹{singleFlight.ticketPrice}</Typography>
          </Stack>
          <Typography
            fontSize={{
              xs: "14px",
            }}
          >
            Standard airline cancellation and date change penalties apply
          </Typography>
        </FareBox>

        {/* fare type 2 */}
        <FareBox
          sx={{
            width: {
              xs: "42vw",
              md: "20vw",
            },
            p: 2,
            bgcolor: selected === 2 ? "lightgreen" : ""
          }}
          onClick={() => setSelected(2)}
        >
          <Stack mb={4}>
            <Typography sx={{ fontSize :"16px", fontWeight: 500}}>CFLEX fare(new) </Typography>
            <Typography sx={{ fontSize :"16px", fontWeight: 500}}>
              ₹{singleFlight?.ticketPrice} + ₹
              {Math.ceil(singleFlight?.ticketPrice * 0.2)}{" "}
            </Typography>
          </Stack>
          <Typography
            fontSize={{
              xs: "14px",
            }}
          >
            Standard airline cancellation and date change penalties apply
          </Typography>
        </FareBox>
      </Stack>
    </Box>
  );
};

export default FareSelection;