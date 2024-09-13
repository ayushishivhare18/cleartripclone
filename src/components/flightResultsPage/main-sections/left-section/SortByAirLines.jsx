import React, { useState } from "react";
// import "../../FlightResultsPage.css";
import { Stack, Typography, Box } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SortByAirLines = () => {
  const [isPlane, setIsPlane] = useState(false);

  const handlePlanebtn = () => {
    setIsPlane((prev) => !prev);
  };

  return (
    <div>
      <Stack
        className="sort-by-airlines"
        flexDirection={"row"}
        alignItems={"center"}
        onClick={handlePlanebtn}
      >
        <Typography
          fontWeight={600}
          sx={{
            letterSpacing: 2,
          }}
        >
          Airlines
        </Typography>
        <span>
          {isPlane ? (
            <KeyboardArrowUpOutlinedIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </span>
      </Stack>
      {/* airline options */}
      {isPlane ? (
        <Stack gap={1}>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options multi-airline">
              <input type="checkbox" value="checkbox1" />
              <span>Show multi-airline itineraries</span>
            </div>
          </Stack>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options">
              <input type="checkbox" value="checkbox2" />
              <span>Air India</span>
            </div>
            <div className="price-tag-container">
              <span className="price-tag">
                <CurrencyRupeeIcon fontSize="sm" />
              </span>
              <span>10,640</span>
            </div>
          </Stack>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options">
              <input type="checkbox" value="checkbox3" />
              <span>Air India Express</span>
            </div>
            <div className="price-tag-container">
              <span className="price-tag">
                <CurrencyRupeeIcon fontSize="sm" />
              </span>
              <span>14,117</span>
            </div>
          </Stack>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options">
              <input type="checkbox" value="checkbox4" />
              <span>Air India Express</span>
            </div>
            <div className="price-tag-container">
              <span className="price-tag">
                <CurrencyRupeeIcon fontSize="sm" />
              </span>
              <span>12,276</span>
            </div>
          </Stack>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options">
              <input type="checkbox" value="checkbox5" />
              <span>Air India Express</span>
            </div>
            <div className="price-tag-container">
              <span className="price-tag">
                <CurrencyRupeeIcon fontSize="sm" />
              </span>
              <span>15,122</span>
            </div>
          </Stack>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options">
              <input type="checkbox" value="checkbox6" />
              <span>Indigo</span>
            </div>
            <div className="price-tag-container">
              <span className="price-tag">
                <CurrencyRupeeIcon fontSize="sm" />
              </span>
              <span>10,861</span>
            </div>
          </Stack>
          <Stack
            className="airlines-options"
            flexDirection={"row"}
            justifyContent={{
              xs: "space-between",
              lg: "flex-start",
            }}
            gap={{
              lg: 1,
            }}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#F7F7F7",
              },
            }}
          >
            <div className="airline-options">
              <input type="checkbox" value="checkbox7" />
              <span>Spice Jet</span>
            </div>
            <div className="price-tag-container">
              <span className="price-tag">
                <CurrencyRupeeIcon fontSize="sm" />
              </span>
              <span>18,751</span>
            </div>
          </Stack>
        </Stack>
      ) : null}
    </div>
  );
};

export default SortByAirLines;