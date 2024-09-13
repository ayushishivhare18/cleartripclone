import styled from "@emotion/styled";
import { Box, Button, MenuItem, Modal, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HotelRatings from "./HotelRatings";
import { useHotelContext } from "../../contexts/HotelDetailsProvider"; 
import CloseIcon from "@mui/icons-material/Close";

const InfoCardPaper = styled(Paper)({
	padding: "20px",
	border: "1px solid lightgray",
	borderRadius: "12px",
});
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid lightgray',
	boxShadow: 24,
	p: 4,
	borderRadius: "15px"
  };

const HotelInfoCard = ({ singleHotel, getDateMonth, getDayTime, getNights }) => {
	const [isModal, setIsModal] = useState(false);
  const { checkInDate, checkOutDate } = useHotelContext().checkInOutDetails;
  const { rooms } = useHotelContext().roomTypeValues;

  const getFormatedRoomData = () => {
    const totalAdults = rooms.reduce((acc, currentRoom) => acc + currentRoom.adult, 0);
    const totalChildren = rooms.reduce((acc, currentRoom) => acc + currentRoom.children, 0);
    return (
		<>
			<Typography fontSize={"16px"} fontWeight={500}>
				{rooms.length} {rooms.length > 1 ? "Rooms" : "Room"}, {" "}
				{totalAdults + totalChildren} {(totalAdults + totalChildren) > 1 ? "Guests": "Guest"}
				
			</Typography>
			<Typography sx={{color: "gray"}}>{totalAdults} {totalAdults > 1 ? "Adults": "Adult"}</Typography>
		</>
	);
  };
  return (
    <>
      <InfoCardPaper>
        {/* header part */}
        <Stack
          flexDirection={{ xs: "column", sm: "row" }} alignItems={"center"} justifyContent={"space-between"}
		  gap={{ xs: 2, sm: 0}}
        >
          <div>
            <Typography sx={{ color: "gray" }}>
              {singleHotel?.rating}-star hotel in {singleHotel?.location}
            </Typography>
            <Typography variant="h3" component="h1" sx={{mb: 1}}>{singleHotel?.name}</Typography>
            {/* rating component */}
            <HotelRatings rating={singleHotel?.rating ?? 0} />
          </div>
          <img
            style={{ width: "120px", height: "100px", objectFit: "cover", borderRadius: "10px"}}
            alt="info-hotel-image"
            src={singleHotel?.images && singleHotel?.images[0]}
          />
        </Stack>

        <Box mt={4} mb={4} sx={{ borderBottom: "1px solid lightgray" }}></Box>
        {/* check in out and gauest part */}
        <Stack
          flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}
		  flexWrap={"wrap"} rowGap={2}
        >
          <div className="check-in">
            <Typography sx={{ color: "gray" }}>Check-in</Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
              {getDateMonth(checkInDate)}
            </Typography>
            <Typography sx={{ color: "gray" }}>
              {getDayTime(checkInDate)}
            </Typography>
          </div>

          <Typography
            sx={{ color: "gray", bgcolor: "rgb(238, 238, 238)", p: "2px 7px" }}
          >
            {getNights()} {getNights() > 1 ? "nights" : "night"}
          </Typography>

          <div className="check-out">
            <Typography sx={{ color: "gray" }}>Check-out</Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
              {getDateMonth(checkOutDate)}
            </Typography>
            <Typography sx={{ color: "gray" }}>
              {getDayTime(checkOutDate)}
            </Typography>
          </div>

          <Box sx={{ borderRight: "1px solid lightgray", height: "7vh", display: {xs: "none", sm :"block"} }}></Box>

          <Stack flexDirection={"row"} gap={2}>
            <Box>
				<Typography>Rooms & Guests</Typography>
				{getFormatedRoomData()}
			</Box>
            <Button sx={{textTransform: "none", fontSize :"16px"}} onClick={() => setIsModal(true)}>Details</Button>
			<Modal open={isModal} onClose={() => setIsModal(false)} >
				<Box sx={style}>
					<Stack flexDirection={"row"} justifyContent={"flex-end"} sx={{mt: -3}}>
						<Button onClick={() => setIsModal(false)}><CloseIcon /></Button>
					</Stack>
					<Typography variant="h4" sx={{mb: 2}}>Guest information</Typography>
					{rooms?.map((room, index) => (
						<Box  key={index} sx={{display: "flex", gap: 2}}>
							<Typography sx={{fontSize: "18px", fontWeight: 500}}>Room {index + 1}</Typography>
							<Typography >{room?.adult} {room?.adult>1 ? "Adults" : "Adult"}</Typography>
							<Typography sx={{display: room?.children>0 ? "block" : "none"}}>{room?.children} {room?.children>1 ? "children" : "child"}</Typography>
						</Box>
					))}
				</Box>
			</Modal>
          </Stack>
        </Stack>
      </InfoCardPaper>
    </>
  );
};

export default HotelInfoCard;