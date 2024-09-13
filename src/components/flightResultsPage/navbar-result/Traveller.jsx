import React, { useState, useRef } from "react";
import MenuList from "@mui/material/MenuList";
import {
  Box,
  Stack,
  Typography,
  Button,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import TravellerOptionDropdown from "../../ui/TravellerOptionDropdown";
import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 300,
      xss: 340,
      sm: 600,
      md: 900,
      lg: 1024,
      xl: 1280,
    },
  },
});
const Traveller = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { traveller } = useFlightSearch().travellerData;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const getTotalTraveller = () => {
    let total = 0;
    for (let key in traveller) {
      total += traveller[key];
    }
    return total;
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" spacing={2}>
        {/* traveller option btn */}
        <Box
          sx={{
            border: "1px solid #D3D3D3",
            borderRadius: "6px",
          }}
        >
          <Button
            sx={{
              width: "10rem",
              height: "44px",
              textTransform: "none",
            }}
            ref={anchorRef}
            variant="outlined"
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <span>{getTotalTraveller()} Traveller</span>
            <ExpandMoreOutlinedIcon htmlColor="#999999" />
          </Button>
        </Box>
        {/* traveller popup */}
        <Popper
          open={open}
          sx={{
            zIndex: "1",
            padding: "10px",
          }}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                sx={{
                  width: { xs: "16rem" },
                  height: "fit-contained",
                  padding: "10px 20px",
                  mr: { xs: "20px" },
                  ml: { xs: "-30px", xss: "0px" },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <TravellerOptionDropdown />
                    {/* <Box>
                      <Box
                        mb={2}
                        mt={2.5}
                        component="div"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                        onClick={handleClose}
                      >
                        <Box
                          component="button"
                          sx={{
                            border: "none",
                            borderRadius: "5px",
                            width: "8rem",
                            height: "40px",
                            bgcolor: "green",
                            color: "whitesmoke",
                            cursor: "pointer",
                          }}
                        >
                          Update
                        </Box>
                      </Box>
                    </Box> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>
    </ThemeProvider>
  );
};

export default Traveller;