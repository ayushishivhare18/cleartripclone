import React from "react";
// import "../../FlightResultsPage.css";
import { Paper, Stack } from "@mui/material";
import SortByAirLines from "./SortByAirLines";
import SortByStops from "./SortByStops";
import SortByDeparatureTime from "./SortByDepartureTime";
import SortByPriceRange from "./SortByPriceRange";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const LeftSideSortingBar = ({ getFilterFlights }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <Button
          sx={{
            width: "10rem",
            display: {
              lg: "none",
            },
            textTransform: "none",
          }}
          variant="outlined"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FilterAltOutlinedIcon />
          Filter Options
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Paper
            sx={{
              border: "1px solid gary",
              p: {
                xs: 3,
              },
              width: "88vw",
              height: "60vh",
              overflowY: "auto",
            }}
          >
            <Stack flexDirection={"column"} gap={4} sx={{ width: "22%" }}>
              <SortByStops getFilterFlights={getFilterFlights} />

              <SortByDeparatureTime getFilterFlights={getFilterFlights} />

              <SortByPriceRange getFilterFlights={getFilterFlights} />

              {/* <SortByAirLines /> */}
            </Stack>
          </Paper>

          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              mt: 1,
            }}
            onClick={handleClose}
          >
            <Button
              variant="contained"
              sx={{
                width: "50vw",
                textTransform: "none",
              }}
            >
              Apply
            </Button>
          </MenuItem>
        </Menu>
      </div>
      {/* for laptop screen */}
      <Paper
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
          borderRight: "1px solid lightgray",
          p: {
            xs: 3,
            lg: 1,
            xl: 3,
          },
          width: "25vw",
          height: "84vh",
          elevation: 4,
        }}
      >
        <Stack
          flexDirection={"column"}
          gap={4}
          sx={{
            width: {
              xs: "22%",
              lg: "10%",
            },
          }}
        >
          <SortByStops getFilterFlights={getFilterFlights} />

          <SortByDeparatureTime getFilterFlights={getFilterFlights} />

          <SortByPriceRange getFilterFlights={getFilterFlights} />

          {/* <SortByAirLines /> */}
        </Stack>
      </Paper>
    </>
  );
};

export default LeftSideSortingBar;