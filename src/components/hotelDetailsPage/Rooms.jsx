import React from "react";
import { Stack, Paper } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthorizationProvider";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";

const DemoPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid lightgray",
  boxShadow: "none",
  borderRadius: "7px",
  padding: "20px",
}));

const Rooms = ({ singleHotel, hotelID }) => {
  const { token } = useAuth().tokenDetails;
  const navigate = useNavigate();
  const { singleRoom, setSingleRoom } = useHotelContext().singleRoomData;

  const handleHotelBook = (room) => {
    setSingleRoom(room);
    // after page refrsh singleRoom data --> reset for that stored in the LS
    localStorage.setItem("singleRoom", JSON.stringify(room));
    if (token) {
      navigate(`/hotels/itinerary/${hotelID}`);
    } else {
      toast.error("Please login first", { theme: "colored" });
    }
  };

  return (
    <div id="rooms">
      <h2>Rooms available</h2>
      <div className="room-cards">
        {singleHotel.rooms &&
          singleHotel.rooms.map((room, indx) => (
            <DemoPaper
              sx={{ width: { xs: "19rem", sm: "15rem", md: "19rem" } }}
              key={room._id}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"flex-start"}
                gap={1}
              >
                <h3>Room Only</h3>
                <div className="bed-details">{room.bedDetail}</div>
                <div>{room.cancellationPolicy}</div>
                <div className="room-price">
                  <CurrencyRupeeIcon fontSize="sm" />
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      paddingRight: "5px",
                    }}
                  >
                    {room.CurrencyRupeeIcon}
                    {room.costPerNight}
                  </span>

                  <span>/ night</span>
                </div>
                <button
                  className="room-book-btn"
                  onClick={() => handleHotelBook(room)}
                >
                  Book
                </button>
              </Stack>
            </DemoPaper>
          ))}
      </div>
    </div>
  );
};

export default Rooms;