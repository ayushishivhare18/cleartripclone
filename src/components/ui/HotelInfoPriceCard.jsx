import styled from "@emotion/styled";
import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";

const CustomPaper = styled(Paper)({
  width: "18rem",
  height: "fit-contain",
  position: "sticky",
  top: "40px",
  borderRadius: "10px",
});

const HotelInfoPriceCard = ({ getNights }) => {
  const { rooms } = useHotelContext().roomTypeValues;
  const { singleRoom } = useHotelContext().singleRoomData;

  // after page refrsh singleRoom data --> reset
  // console.log("singleRoom", singleRoom);

  // console.log("singleRoomLS", JSON.parse(localStorage.getItem("singleRoom")));

  const getBasePrice = () => {
    const price = Math.ceil(
      JSON.parse(localStorage.getItem("singleRoom"))?.costPerNight *
        getNights() *
        rooms.length
    );
    return price;
  };
  const getPrice = (value) => {
    return JSON.parse(localStorage.getItem("singleRoom"))?.costDetails?.[value];
  };
  return (
    <>
      <CustomPaper elevation={4}>
        <div style={{ padding: "20px" }}>
          <Typography variant="h5" mb={2}>
            Price breakup
          </Typography>
          <div className="price-break-up">
            {/* room and night : room from addroom and night day diffenece between checkin and checkout date */}
            <Typography>
              {rooms?.length} room x {getNights()} night
            </Typography>
            <Typography>₹{getBasePrice()}</Typography>
          </div>

          <div className="price-break-up">
            {/* hotel taxes from the signleHotel.rooms. */}
            <Typography>Hotel taxes</Typography>
            <Typography>₹{getPrice("taxesAndFees")}</Typography>
          </div>

          <div className="price-break-up">
            {/* hotel taxes from the signleHotel.rooms. */}
            <Typography>Discounts</Typography>
            <Typography>₹{getPrice("discount")}</Typography>
          </div>

          <Box mt={1} mb={1} sx={{ borderBottom: "1px dotted #E6E6E6" }}></Box>

          <div className="price-break-up">
            <Typography fontSize={"18px"} fontWeight={"600"}>
              Total price
            </Typography>
            <Typography>
              ₹
              {getBasePrice() + getPrice("taxesAndFees") - getPrice("discount")}
            </Typography>
          </div>
          <Typography fontSize={"11px"}>
            {rooms?.length} room . {getNights()} night
          </Typography>
        </div>

        <Typography
          bgcolor={"#FFF1EC"}
          height={"15.3vh"}
          fontSize={14}
          pt={2}
          textAlign={"left"}
          pl={3}
          pr={3}
        >
          Pay om 3 interest free EMIs At <CurrencyRupeeIcon fontSize="sm" />
          4,095/mo
          <Button variant="text" sx={{ cursor: "no-drop" }}>
            View plans
          </Button>
          with your credit card
        </Typography>
      </CustomPaper>
    </>
  );
};

export default HotelInfoPriceCard;