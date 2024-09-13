import React, { useRef, useState } from "react";
import "../../../styles/flight/Flight.css";
import MenuList from "@mui/material/MenuList";
import { Box, Stack } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const fareBtnTexts = [
  "Regular fare",
  "Student fare",
  "Senior citizen fare",
  "Armed forces fare",
];

const FareType = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [fareBtnIndex, setFareBtnIndex] = useState(0);
  const [fareType, setFareType] = useState("Regular fare");

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

  return (
    <Box className="fare-type">
      <Box
        sx={{
          zIndex: 10,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
        component="div"
      >
        <Stack
          sx={{
            flexDirection: "row",
            gap: {
              xs: 0,
              sm: 1,
              md: 2,
              lg: 1,
              xl: 3,
            },
          }}
        >
          {fareBtnTexts.map((fareBtnText, index) => (
            <button
              key={fareBtnText}
              className={
                fareBtnIndex === index
                  ? "list-group-item fare-btn-active"
                  : "list-group-item"
              }
              onClick={(e) => {
                setFareBtnIndex(index);
              }}
            >
              {fareBtnText}
            </button>
          ))}
        </Stack>
      </Box>
      {/* MOBILE DESIGN */}
      <Stack
        sx={{
          zIndex: 20,
          display: {
            xs: "flex",
            md: "none",
          },
        }}
        spacing={2}
      >
        <div className="card-header">
          <button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {open ? (
              <PersonIcon htmlColor="#999999" />
            ) : (
              <PersonOutlineOutlinedIcon htmlColor="#999999" />
            )}
            <span style={{ fontSize: "16px", fontWeight: "500  " }}>
              Fare Type , {fareType}
            </span>
            {open ? (
              <ExpandLessOutlinedIcon htmlColor="#999999" />
            ) : (
              <ExpandMoreOutlinedIcon htmlColor="#999999" />
            )}
          </button>
        </div>

        <Popper
          open={open}
          sx={{ zIndex: "10" }}
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
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    sx={{
                      width: {
                        xs: "70vw",
                        sm: "40vw",
                      },
                      height: "30vh",
                      paddingLeft: "20px",
                    }}
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {fareBtnTexts.map((fareBtnText, index) => (
                      <button
                        key={fareBtnText}
                        className={
                          fareBtnIndex === index
                            ? "list-group-item fare-btn-active"
                            : "list-group-item"
                        }
                        onClick={(e) => {
                          setFareBtnIndex(index);
                          setFareType(e.target.innerHTML);
                          handleClose(e);
                        }}
                      >
                        {fareBtnText}
                      </button>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>
    </Box>
  );
};

export default FareType;