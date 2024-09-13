import React, { useEffect, useMemo, useState } from "react";
import "../../styles/hotel/Hotel.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { roomOptions } from "../../static-data/StaticData";
import { toast } from "react-toastify";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddRooms = ({ btnClassName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isDelete, setIsDelete] = useState(false);
  const { rooms, setRooms } = useHotelContext().roomTypeValues;

  useEffect(() => {
    setRooms(rooms);
  }, [isDelete]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setIsAddBtn(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   const handleAddMoreBtn = () => {
  //     setIsAddBtn(true);
  //   }
  // const handleSelectedRoom = (optionVal) => {
  //   setRoomType(optionVal);
  //   setRooms([optionVal]);
  // }
  const handleAddAnotherRoomBtn = () => {
    setIsDelete(false);
    if (rooms.length < 4) {
      setRooms((prev) => [
        ...prev,
        {
          room: 1,
          adult: 1,
          children: 0,
        },
      ]);
    }
  };
  const handleDelete = (deleteIndex) => {
    setIsDelete((prev) => !prev);
    rooms.splice(deleteIndex, 1);
    toast.warn("One room is deleted", { theme: "colored" });
  };
  const handleIncrease = (index, state) => {
    const updatedRooms = [...rooms];
    if (updatedRooms[index]["adult"] + updatedRooms[index]["children"] < 4) {
      updatedRooms[index][state]++;
    }
    setRooms(updatedRooms);
  };
  const handleDecrease = (index, state) => {
    const updatedRooms = [...rooms];
    if (state === "adult" && updatedRooms[index][state] > 1) {
      updatedRooms[index][state]--;
    } else if (state === "children" && updatedRooms[index][state] > 0) {
      updatedRooms[index][state]--;
    }
    setRooms(updatedRooms);
  };
  const getFormatedRoomData = () => {
    const totalAdults = rooms.reduce(
      (accumulator, currentRoom) => accumulator + currentRoom.adult,
      0
    );
    const totalChildren = rooms.reduce(
      (accumulator, currentRoom) => accumulator + currentRoom.children,
      0
    );
    return (
      <Typography fontSize={"14px"}>
        {rooms.length} {rooms.length > 1 ? "Rooms" : "Room"} {totalAdults}{" "}
        {totalAdults > 1 ? "Adults" : "Adult"}{" "}
        {totalChildren > 0 ? totalChildren : ""}{" "}
        {totalChildren > 1 ? "Children" : totalChildren > 0 ? "Child" : ""}
      </Typography>
    );
  };

  const notify = (text) => toast(text);

  return (
    <div>
      <button
        className={btnClassName}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {open ? (
          <PersonIcon htmlColor="#3366CC" />
        ) : (
          <PersonOutlineOutlinedIcon htmlColor="#838383" />
        )}
        <span
          style={{ fontSize: "16px", fontWeight: "500 ", marginLeft: "10px" }}
        >
          {getFormatedRoomData()}
        </span>
      </button>

      <Menu
        className="menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ width: "100%" }}
      >
        
        <Box sx={{ width: "15rem" }}>
          {rooms.map((room, index) => (
            <Box key={index} sx={{ mb: 1, p: 2 }}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 1 }}>
                  Room {index + 1}
                </Typography>
                <Button
                  onClick={() => handleDelete(index)}
                  sx={{ display: index === 0 ? "none" : "block" }}
                >
                  delete
                </Button>
              </Stack>

              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography>Adults</Typography>
                  <Typography sx={{ fontSize: "11px" }}>(12+years)</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => handleDecrease(index, "adult")}>
                    <RemoveCircleOutlineIcon
                      htmlColor={room.adult === 1 ? "lightgray" : ""}
                    />
                  </Button>
                  <Typography>{room?.adult}</Typography>
                  <Button onClick={() => handleIncrease(index, "adult")}>
                    <AddCircleOutlineIcon
                      htmlColor={
                        room.adult === 4 || room.children === 3
                          ? "lightgray"
                          : ""
                      }
                    />
                  </Button>
                </Box>
              </Stack>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Typography>Children</Typography>
                  <Typography sx={{ fontSize: "11px" }}>
                    (1 - 11 years)
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => handleDecrease(index, "children")}>
                    <RemoveCircleOutlineIcon
                      htmlColor={
                        room.children === 0 || room.adult === 4
                          ? "lightgray"
                          : ""
                      }
                    />
                  </Button>
                  <Typography>{room?.children}</Typography>
                  <Button onClick={() => handleIncrease(index, "children")}>
                    <AddCircleOutlineIcon
                      htmlColor={
                        room.children === 3 || room.adult === 4
                          ? "lightgray"
                          : ""
                      }
                    />
                  </Button>
                </Box>
              </Stack>
            </Box>
          ))}
          <Button
            onClick={handleAddAnotherRoomBtn}
            sx={{ color: rooms.length === 4 ? "lightgray" : "" }}
          >
            Add another room
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default AddRooms;