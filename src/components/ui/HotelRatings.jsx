import React from "react";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const HotelRatings = ({ rating }) => {
  return (
    <StyledRating
      name="customized-color"
      readOnly
      value={rating}
      getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
      precision={0.5}
      icon={<CircleIcon fontSize="small" htmlColor="#52b788" />}
      emptyIcon={<CircleOutlinedIcon fontSize="small" htmlColor="#52b788" />}
    />
  );
};

export default HotelRatings;