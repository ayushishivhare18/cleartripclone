import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useFlightSearch } from "../../../../contexts/FlightsSearchProvider";
import { CustomTheme } from "../../../../util/muiTheme";
import { useFlightFilter } from "../../../../contexts/FlightFilterProvider";
const SortByStops = ({ getFilterFlights }) => {
  const { filterData, setFlightPage } = useFlightSearch();
  const { filterItems, setFilterItems } = filterData;
  const {
    stop,
    setStop,
    nonStop,
    setNonStop,
    oneStop,
    setOneStop,
    twoStop,
    setTwoStop,
  } = useFlightFilter().filterByStop;

  useEffect(() => {
    setFlightPage(1);
    if (nonStop || oneStop || twoStop) {
      getFilterFlights(filterItems);
    } else {
      delete filterItems["stops"];
      getFilterFlights(filterItems);
    }
  }, [nonStop, oneStop, twoStop]);

  const handleStopBnt = () => {
    setStop((prev) => !prev);
  };

  const handleNonStopFilter = () => {
    setOneStop(false);
    setTwoStop(false);
    setFilterItems((prev) => ({ ...prev, stops: "0" }));
  };

  const handleOneStopFilter = () => {
    setNonStop(false);
    setTwoStop(false);
    setFilterItems((prev) => ({ ...prev, stops: "1" }));
  };

  const handleTwoStopFilter = () => {
    setNonStop(false);
    setOneStop(false);
    setFilterItems((prev) => ({ ...prev, stops: "2" }));
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box>
        <Stack
          className="sort-by-stops"
          flexDirection={"row"}
          alignItems={"center"}
          onClick={handleStopBnt}
        >
          <Typography
            fontWeight={600}
            sx={{
              letterSpacing: 2,
            }}
          >
            Stops
          </Typography>

          {stop ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownIcon />}
        </Stack>
        {stop ? (
          <Stack
            justifyContent={"center"}
            alignItems={"flex-start"}
            gap={1}
            width={{
              lg: "20vw",
            }}
          >
            <div
              onClick={() => {
                setNonStop((prev) => !prev);
                // setFilterItems((prev) => ({ ...prev, stops: "0" }));
                // setCheckedBox("non-stop");
                handleNonStopFilter();
              }}
              className="stop-options"
            >
              <input
                className="stop-input"
                type="checkbox"
                id="non-stop"
                checked={nonStop}
                // checked={checkedBox === "non-stop"}
                onChange={(e) => console.log(e)}
              />
              <span>Non-stop</span>
            </div>
            <div
              onClick={() => {
                setOneStop((prev) => !prev);
                // setCheckedBox("one-stop");

                handleOneStopFilter();
              }}
              className="stop-options"
            >
              <input
                type="checkbox"
                id="one-stop"
                checked={oneStop}
                // checked={checkedBox === "one-stop"}
                onChange={(e) => console.log(e)}
              />
              <span>1 stop</span>
            </div>
            <div
              onClick={() => {
                setTwoStop((prev) => !prev);

                // setCheckedBox("two-stop");
                handleTwoStopFilter();
              }}
              className="stop-options"
            >
              <input
                type="checkbox"
                id="two-stop"
                checked={twoStop}
                // checked={checkedBox === "two-stop"}
                onChange={(e) => console.log(e)}
              />
              <span>2 stop</span>
            </div>
          </Stack>
        ) : null}
      </Box>
    </ThemeProvider>
  );
};

export default SortByStops;