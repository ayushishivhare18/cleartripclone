import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stack, Box, Typography, Tab, Tabs } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import AirlineSeatReclineNormalOutlinedIcon from "@mui/icons-material/AirlineSeatReclineNormalOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            width: "100%",
            borderRight: "1px solid lightgray",
            borderLeft: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
          }}
        >
          <Typography sx={{ width: "58vw", ml: -3 }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FareDetails() {
  const [value, setValue] = useState(0);
  const [isRefund, setIsRefund] = useState(false);
  const [isDateChange, setIsDateChange] = useState(false);

  const { singleFlight } = useFlightSearch().singleFlightValue;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      mt={4}
      mb={4}
      sx={{
        width: {
          xs: "90vw",
          md: "60vw",
          xl: "40vw",
        },
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "#D6E8FC",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              width: {
                xs: "40vw",
                md: "26vw",
              },
              fontSize: {
                xs: "14px",
                md: "16px",
              },
              textTransform: "none",
            }}
            label={`${singleFlight?.source} - ${singleFlight?.destination}: Standard fare`}
            {...a11yProps(0)}
          />

          <Tab
            sx={{
              width: {
                xs: "40vw",
                md: "26vw",
              },
              fontSize: {
                xs: "14px",
                md: "16px",
              },
              textTransform: "none",
            }}
            label={`${singleFlight?.destination} - ${singleFlight?.source}: Standard fare`}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      {/* <Paper sx={{ border: "1px solid lightgray" }}> */}
      <CustomTabPanel value={value} index={0}>
        <Stack
          width={{
            xs: "90vw",
            md: "60vw",
            xl: "40vw",
          }}
        >
          <Box mb={3} pl={2}>
            <Stack
              mb={2}
              flexDirection={"row"}
              gap={{
                xs: 2,
              }}
              flexWrap={"wrap"}
            >
              <Stack flexDirection={"row"} gap={1}>
                <CalendarTodayOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>
                  Date change allowed from ₹3,650
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <WorkOutlineOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>Cabin/person: 7kg</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <LuggageOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>
                  Check-in/person: 15kg(1 Piece)
                </Typography>
              </Stack>
            </Stack>
            <Stack
              flexDirection={"row"}
              gap={{
                xs: 2,
              }}
              flexWrap={"wrap"}
            >
              <Stack flexDirection={"row"} gap={1}>
                <EditCalendarOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>
                  Cancellation fee starts from ₹3,900
                </Typography>
              </Stack>
              <Stack mr={8} flexDirection={"row"} gap={1}>
                <FastfoodOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>paid meal</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <AirlineSeatReclineNormalOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>Paid seat</Typography>
              </Stack>
            </Stack>
          </Box>
          {/* Cancellation refund policy */}
          <Stack>
            {/* header */}
            <Box
              mb={3}
              pt={2}
              pl={2}
              sx={{
                borderTop: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                cursor: "no-drop",
              }}
              onClick={() => setIsRefund((prev) => !prev)}
            >
              <KeyboardArrowRightIcon />
              <Typography fontWeight={500}>
                Cancellation refund policy
              </Typography>
            </Box>
            {/* after click main content */}
            <Box
              sx={{
                display: {
                  xs: "none",
                },
              }}
            >
              {isRefund ? (
                <Stack
                  ml={4}
                  mb={2}
                  mr={4}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={4}
                >
                  <Stack gap={4}>
                    <Typography fontSize={"12px"}>Cancel between</Typography>
                    <Typography fontSize={"12px"}>Amount refundable</Typography>
                  </Stack>

                  <Stack flexDirection={"row"}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>Now</Typography>
                        <Typography fontSize={"12px"}>27 Feb,</Typography>
                      </Stack>
                      <Box
                        width={350}
                        borderTop={"7px solid #F2BF42"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"12px"} textAlign={"center"}>
                        ₹871
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>13:00</Typography>
                        <Typography fontSize={"12px"}>27 Feb 15:00</Typography>
                      </Stack>
                      <Box
                        width={200}
                        borderTop={"7px solid #D85040"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"12px"} textAlign={"center"}>
                        ₹0
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                ""
              )}
            </Box>
          </Stack>
          {/* Date change policy */}
          <Stack>
            <Box
              pt={2}
              pl={2}
              sx={{
                borderTop: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                cursor: "no-drop",
              }}
              onClick={() => setIsDateChange((prev) => !prev)}
            >
              <KeyboardArrowRightIcon />
              <Typography fontWeight={500}>Date change policy</Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                },
              }}
            >
              {isDateChange ? (
                <Stack
                  ml={4}
                  mb={2}
                  mt={2}
                  mr={4}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={4}
                >
                  <Stack gap={4}>
                    <Typography fontSize={"12px"}>Change between</Typography>
                    <Typography fontSize={"12px"}>
                      Date change charges
                    </Typography>
                  </Stack>

                  <Stack flexDirection={"row"}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>Now</Typography>
                        <Typography fontSize={"12px"}>27 Feb,</Typography>
                      </Stack>
                      <Box
                        width={350}
                        borderTop={"7px solid #F2BF42"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"14px"} textAlign={"center"}>
                        ₹3,400 + Fare Difference
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>13:00</Typography>
                        <Typography fontSize={"12px"}>27 Feb 15:00</Typography>
                      </Stack>
                      <Box
                        width={200}
                        borderTop={"7px solid #D85040"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"12px"} textAlign={"center"}>
                        Non changeable
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                ""
              )}
            </Box>
          </Stack>
        </Stack>
      </CustomTabPanel>
      {/* </Paper> */}
      <CustomTabPanel value={value} index={1}>
        <Stack
          width={{
            xs: "90vw",
            md: "60vw",
            xl: "40vw",
          }}
        >
          <Box mb={3} pl={2}>
            <Stack
              mb={2}
              flexDirection={"row"}
              gap={{
                xs: 2,
              }}
              flexWrap={"wrap"}
            >
              <Stack flexDirection={"row"} gap={1}>
                <CalendarTodayOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>
                  Date change allowed from ₹3,650
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <WorkOutlineOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>Cabin/person: 7kg</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <LuggageOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>
                  Check-in/person: 15kg(1 Piece)
                </Typography>
              </Stack>
            </Stack>
            <Stack
              flexDirection={"row"}
              gap={{
                xs: 2,
              }}
              flexWrap={"wrap"}
            >
              <Stack flexDirection={"row"} gap={1}>
                <EditCalendarOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>
                  Cancellation fee starts from ₹3,900
                </Typography>
              </Stack>
              <Stack mr={8} flexDirection={"row"} gap={1}>
                <FastfoodOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>paid meal</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <AirlineSeatReclineNormalOutlinedIcon fontSize="small" />
                <Typography fontSize={"14px"}>Paid seat</Typography>
              </Stack>
            </Stack>
          </Box>
          {/* Cancellation refund policy */}
          <Stack>
            <Box
              mb={3}
              pt={2}
              pl={2}
              sx={{
                borderTop: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                cursor: "no-drop",
              }}
              onClick={() => setIsRefund((prev) => !prev)}
            >
              <KeyboardArrowRightIcon />
              <Typography fontWeight={500}>
                Cancellation refund policy
              </Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                },
              }}
            >
              {isRefund ? (
                <Stack
                  ml={4}
                  mb={2}
                  mr={4}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={4}
                >
                  <Stack gap={4}>
                    <Typography fontSize={"12px"}>Cancel between</Typography>
                    <Typography fontSize={"12px"}>Amount refundable</Typography>
                  </Stack>

                  <Stack flexDirection={"row"}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>Now</Typography>
                        <Typography fontSize={"12px"}>27 Feb,</Typography>
                      </Stack>
                      <Box
                        width={350}
                        borderTop={"7px solid #F2BF42"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"12px"} textAlign={"center"}>
                        ₹871
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>13:00</Typography>
                        <Typography fontSize={"12px"}>27 Feb 15:00</Typography>
                      </Stack>
                      <Box
                        width={200}
                        borderTop={"7px solid #D85040"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"12px"} textAlign={"center"}>
                        ₹0
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                ""
              )}
            </Box>
          </Stack>
          {/* Date change policy */}
          <Stack>
            <Box
              pt={2}
              pl={2}
              sx={{
                borderTop: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                cursor: "no-drop",
              }}
              onClick={() => setIsDateChange((prev) => !prev)}
            >
              <KeyboardArrowRightIcon />
              <Typography fontWeight={500}>Date change policy</Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                },
              }}
            >
              {isDateChange ? (
                <Stack
                  ml={4}
                  mb={2}
                  mt={2}
                  mr={4}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={4}
                >
                  <Stack gap={4}>
                    <Typography fontSize={"12px"}>Change between</Typography>
                    <Typography fontSize={"12px"}>
                      Date change charges
                    </Typography>
                  </Stack>

                  <Stack flexDirection={"row"}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>Now</Typography>
                        <Typography fontSize={"12px"}>27 Feb,</Typography>
                      </Stack>
                      <Box
                        width={350}
                        borderTop={"7px solid #F2BF42"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"14px"} textAlign={"center"}>
                        ₹3,400 + Fare Difference
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        mr={1}
                      >
                        <Typography fontSize={"12px"}>13:00</Typography>
                        <Typography fontSize={"12px"}>27 Feb 15:00</Typography>
                      </Stack>
                      <Box
                        width={200}
                        borderTop={"7px solid #D85040"}
                        borderRadius={2}
                        mr={1}
                      ></Box>
                      <Typography fontSize={"12px"} textAlign={"center"}>
                        Non changeable
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                ""
              )}
            </Box>
          </Stack>
        </Stack>
      </CustomTabPanel>
    </Box>
  );
}