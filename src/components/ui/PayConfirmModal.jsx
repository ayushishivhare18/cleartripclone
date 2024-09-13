import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    pt: 2,
    px: 4,
    pb: 3,
};

export default function PayConfirmModal({openPayConfrm,  handleClosePayConfrm, handleCheckBooking}) {
  const navigate = useNavigate();
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [payConfirmTime, setPayConfirmTime] = useState(10);

  useEffect(() => {
    if (payConfirmTime === 0) {
      setShouldCloseModal(true);
    }
  }, [payConfirmTime]);

  useEffect(() => {
    if (openPayConfrm) {
      const timeoutId = setInterval(() => {
        setPayConfirmTime(prev => prev-1);
        return () => clearInterval(timeoutId);
      }, 1000);
    }
  }, [openPayConfrm]);

  useEffect(() => {
    if (shouldCloseModal) {
      handleClosePayConfrm(); 
      navigate('/mytrip'); 
    }
  }, [shouldCloseModal, handleClosePayConfrm, navigate]);
    
    return (
      <>
        <Modal
          open={openPayConfrm}
        >
          <Box className="pay-confirm-modal" sx={{ ...style, width: 450 }}>
            <h1>Payment Success!!!</h1>
            <h2>Your Booking is confirmed</h2>
            <Box>
              <Button onClick={handleCheckBooking} sx={{textTransform :"none", fontSize: "12px"}}>Click here</Button>
              <span style={{fontSize: "12px", textAlign: "center", fontWeight: 500}}> or automatically redirecting to booking details in <span style={{fontWeight: 700}}>{payConfirmTime}</span>...</span>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }