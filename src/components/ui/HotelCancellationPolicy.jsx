import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useHotelContext } from "../../contexts/HotelDetailsProvider"; 

const HotelCancellationPolicy = ({ getDayTime, getDateMonth }) => {
  const { checkInDate } = useHotelContext().checkInOutDetails;
  const [day, time] = getDayTime(checkInDate).split(",");

  const cancelTime = (time) => {
    const [hours, minutes] = time.split(":");
    const originalDate = new Date();
    originalDate.setHours(parseInt(hours, 10));
    originalDate.setMinutes(parseInt(minutes, 10));
    const newDate = new Date(originalDate.getTime() + 2 * 60 * 60 * 1000);
    const formattedNewTime = newDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedNewTime;
  };
  return (
    <>
      <Typography variant="h4" mt={4} mb={2}>
        Cancellation policy
      </Typography>
      <Typography>
        This special discounted rate is non-refundable. If you choose to cancel
        this booking, you will not be refunded any of the payment.
      </Typography>
      <Stack
        mt={2}
        mb={2}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={4}
      >
        <Stack gap={4}>
          <Typography>Cancel between</Typography>
          <Typography>Amount refundable</Typography>
        </Stack>

        <Stack flexDirection={"row"}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              mr={1}
            >
              <Typography fontSize={"12px"}>
                {getDateMonth(checkInDate)},{time}
              </Typography>
              <Typography fontSize={"12px"}>
                {getDateMonth(checkInDate)}, {cancelTime(time)}
              </Typography>
            </Stack>
            <Box
              width={"40vw"}
              borderTop={"7px solid #D85040"}
              borderRadius={2}
              mr={1}
            ></Box>
            <Typography fontSize={"12px"} textAlign={"center"}>
              ₹0
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default HotelCancellationPolicy;