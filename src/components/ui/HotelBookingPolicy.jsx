import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { policyList } from "../../static-data/StaticData";
import CloseIcon from "@mui/icons-material/Close";

const HotelBookingPolicy = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openValue) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(openValue);
  };

  const list = () => (
    <Box sx={{ width: { xs: 320, sm: 800}, padding: "20px 50px" }}>
      <Button sx={{ mb: 2, cursor: "pointer" }} onClick={toggleDrawer(false)}>
        <CloseIcon htmlColor="orange" />
      </Button>
      <Typography sx={{ pb: 2 }} variant={"h3"} component={"h2"}>
        Cleartrip booking policy
      </Typography>
      <Typography>
        Your hotel has laid down some rules, and it's our job to let you know
        what they are.
      </Typography>
      {policyList?.bookingPolicy.map((list) => (
        <li key={list}>{list}</li>
      ))}
      <Typography variant="h5" sx={{ fontWeight: 500, mt: 2, mb: 1 }}>
        Cancellation Policy
      </Typography>
      {policyList?.cancellationPolicy.map((list) => (
        <li key={list}>{list}</li>
      ))}
      <Typography variant="h5" sx={{ fontWeight: 500, mt: 2, mb: 1 }}>
        Modifications & Refunds
      </Typography>
      {policyList?.modificationsRefunds.map((list) => (
        <li key={list}>{list}</li>
      ))}
    </Box>
  );

  return (
    <>
      <Typography variant="h4" mt={4} mb={2}>
        Booking policy
      </Typography>
      <Stack flexDirection={"row"} gap={1}>
        <NotInterestedOutlinedIcon htmlColor="gray" />
        <Typography>Guests below 18 years of age NOT allowed</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={1}>
        <PeopleAltOutlinedIcon htmlColor="gray" />
        <Typography>Unmarried couples allowed</Typography>
      </Stack>
      {/* booking policy modal */}
      <Button
        sx={{ textTransform: "none", fontSize: "16px" }}
        onClick={toggleDrawer(true)}
      >
        See more
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default HotelBookingPolicy;