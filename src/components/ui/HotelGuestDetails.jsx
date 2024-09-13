import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import CourtesyTitles from "./CourtesyTitles";
import { ToastContainer, toast } from "react-toastify";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import AddGuestModal from "./AddGuestModal";

const HotelGuestDetails = ({
  guests,
  setGuests,
  gfName,
  setGFName,
  glName,
  setGLName,
  contact,
  setContact,
  gfullName,
  addedGuest,
  setAddedGuest,
}) => {
  const [open, setOpen] = useState(false);
  const gfNameRef = useRef(null);
  const glNameRef = useRef(null);

  const { rooms } = useHotelContext().roomTypeValues;

  const handleDeleteGuest = (item) => {
    setAddedGuest((prev) => prev - 1);
    const updatedGuests = guests.filter((guest) => guest !== item);
    setGuests(updatedGuests);
    // toast.success("One guest is removed successfully", { theme: "colored" });
  };
  const totalGuest = () => {
    const totalAdults = rooms.reduce(
      (acc, currentRoom) => acc + currentRoom.adult,
      0
    );
    const totalChildren = rooms.reduce(
      (acc, currentRoom) => acc + currentRoom.children,
      0
    );
    return totalAdults + totalChildren;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddGuest = () => {
    if (gfullName !== "" && gfName !== "" && glName !== "") {
      const nameExist = guests.find((guestName) => guestName === gfullName);
      if (nameExist) {
        toast.warn("Two guest name can not be same!", { theme: "colored" });
      } else {
        setGuests((prev) => [...prev, gfullName]);
        setAddedGuest((prev) => prev + 1);
        // toast.success("Guest added successfully", { theme: "colored" });
        handleClose();
        setGFName("");
        setGLName("");
      }
    } else if (gfName === "" && glName === "") {
      gfNameRef.current.focus();
      toast.warn("Enter the first name!", { theme: "colored" });
    } else if (glName === "") {
      glNameRef.current.focus();
      toast.warn("Enter the last name!", { theme: "colored" });
    } else {
      toast.error("Fill all the details!", { theme: "colored" });
    }
  };

  return (
    <div>
      <Typography variant="h4" mt={4} mb={2}>
        Guest details
      </Typography>
      <CourtesyTitles />
      {/* FIRST NAME and LAST NAME INPUTS */}
      <Stack flexDirection={{ xs: "column", sm: "row" }} mt={2} gap={4}>
        {/* <TextField
          type="text"
          id="f-name"
          label="First name"
          className="h-info-input"
          disabled="true"
          defaultValue={JSON.parse(localStorage.getItem("userDetails")).name}
          // onChange={(e) =>
          //   setName((prev) => ({ ...prev, fName: e.target.value }))
          // }
          // value={name?.fName}
        /> */}
        <TextField
          type="text"
          id="l-name"
          className="h-info-input"
          disabled={true}
          defaultValue={JSON.parse(localStorage.getItem("userDetails")).name}
          // onChange={(e) =>
          //   setName((prev) => ({ ...prev, lName: e.target.value }))
          // }
          // value={name?.lName}
        />
      </Stack>

      <Typography mt={2} mb={2}>
        Booking details will be sent to this number and email address
      </Typography>
      {/* PHONE NUMBER AND EMAIL ADDRESS */}
      <Stack flexDirection={{ xs: "column", sm: "row" }} mt={2} gap={4}>
        <Box>
          <TextField
            type="number"
            id="ph-numb"
            label="Enter mobile number"
            className="h-info-input"
            onChange={(e) =>
              setContact((prev) => ({ ...prev, ph: e.target.value }))
            }
            value={contact?.ph}
          />
        </Box>
        <TextField
          type="email"
          id="email"
          className="h-info-input"
          disabled={true}
          defaultValue={JSON.parse(localStorage.getItem("userDetails")).email}
          // onChange={(e) =>
          //   setContact((prev) => ({ ...prev, email: e.target.value }))
          // }
          // value={contact?.email}
        />
      </Stack>
      {/* OTHER GUESTS SECTION */}
      <Box sx={{ display: totalGuest() > 1 ? "block" : "none" }}>
        <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
          Other guests
        </Typography>
        <Typography sx={{ mb: 1 }}>
          You may be required to show name of all guests for Visa purpose
        </Typography>
        <ol className="add-other-guests">
          {/* map all the added guest */}
          {guests.length > 0 &&
            guests?.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: 400, fontSize: 16 }}>{item}</span>
                <Button onClick={() => handleDeleteGuest(item)}>Delete</Button>
              </li>
            ))}
        </ol>

        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={handleOpen}
        >
          Add new guest
        </Button>

        {/* ADD NEW GUEST MODAL */}
        <AddGuestModal
          open={open}
          handleClose={handleClose}
          gfName={gfName}
          setGFName={setGFName}
          gfNameRef={gfNameRef}
          glName={glName}
          setGLName={setGLName}
          glNameRef={glNameRef}
          totalGuest={totalGuest}
          addedGuest={addedGuest}
          handleAddGuest={handleAddGuest}
        />
      </Box>

      <ToastContainer />
    </div>
  );
};

export default HotelGuestDetails;