import React from "react";
import CourtesyTitles from "./CourtesyTitles";
import {
  Modal,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AddGuestModal = ({
  open,
  handleClose,
  gfName,
  setGFName,
  gfNameRef,
  glName,
  setGLName,
  glNameRef,
  totalGuest,
  addedGuest,
  handleAddGuest,
}) => {
  console.log({ totalGuest: totalGuest(), addedGuest });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack flexDirection={"row"} justifyContent={"flex-end"}>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Stack>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Add new guest
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 4 }}>
          <CourtesyTitles />
          <TextField
            type="text"
            id="guest-f-name"
            label="Enter first name"
            sx={{ mt: 2, mb: 2, width: "20rem" }}
            onChange={(e) => setGFName(e.target.value)}
            value={gfName}
            inputRef={gfNameRef}
          />
          <TextField
            type="text"
            id="guest-l-name"
            label="Enter last name"
            sx={{ width: "20rem" }}
            onChange={(e) => setGLName(e.target.value)}
            value={glName}
            inputRef={glNameRef}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              mt: 10,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: totalGuest() === addedGuest + 1 ? "lightgray" : "",
              "&:hover": {
                bgcolor: totalGuest() === addedGuest + 1 ? "lightgray" : "",
              },
            }}
            onClick={() => {
              totalGuest() !== addedGuest + 1
                ? handleAddGuest()
                : toast.warn("Total guest added already", { theme: "colored" });
            }}
          >
            Add guest
          </Button>
        </Box>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default AddGuestModal;