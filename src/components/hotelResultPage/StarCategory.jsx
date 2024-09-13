import React, { useEffect, useState } from "react";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Menu from "@mui/material/Menu";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { MenuItem } from "@mui/material";

const StarCategory = ({
  fiveStar,
  fourStar,
  threeStar,
  setFiveStar,
  setFourStar,
  setThreeStar,
}) => {
  const [applyBtn, setApplyBtn] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { filtersData, hotelDetails } = useHotelContext();
  const { hotelPage, setHotelPage } = hotelDetails;
  const { filterItems, setFilterItems, handleHotelFilter } = filtersData;

  useEffect(() => {
    if (applyBtn && (fiveStar || fourStar || threeStar)) {
      handleHotelFilter();
    } else {
      delete filterItems["rating"];
    }
  }, [applyBtn, hotelPage]);

  const handleFiveStar = () => {
    setFourStar(false);
    setThreeStar(false);
    setFilterItems((prev) => ({ ...prev, rating: 5 }));
  };
  const handleFourStar = () => {
    setFiveStar(false);
    setThreeStar(false);
    setFilterItems((prev) => ({ ...prev, rating: 4 }));
  };

  const handleThreeStar = () => {
    setFiveStar(false);
    setFourStar(false);
    setFilterItems((prev) => ({ ...prev, rating: 3 }));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setApplyBtn(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        id="basic-button"
        className="filter-btn"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span>
          <StarsOutlinedIcon fontSize="sm" />
        </span>
        <span>Star category</span>
        {open ? (
          <span>
            <KeyboardArrowDownOutlinedIcon />
          </span>
        ) : (
          <span>
            <KeyboardArrowUpIcon />
          </span>
        )}
      </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="filter-menu">
          <h4 className="sort-menu">Star category</h4>
          <MenuItem
            className="menu-item"
            onClick={() => {
              setFiveStar(!fiveStar);
              handleFiveStar();
            }}
          >
            {fiveStar ? (
              <CheckCircleSharpIcon htmlColor="#00A300" />
            ) : (
              <CircleOutlinedIcon htmlColor="#DEDEDE" />
            )}

            <span>5-star</span>
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => {
              setFourStar(!fourStar);
              handleFourStar();
            }}
          >
            {fourStar ? (
              <CheckCircleSharpIcon htmlColor="#00A300" />
            ) : (
              <CircleOutlinedIcon htmlColor="#DEDEDE" />
            )}

            <span>4-star</span>
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => {
              setThreeStar(!threeStar);
              handleThreeStar();
            }}
          >
            {threeStar ? (
              <CheckCircleSharpIcon htmlColor="#00A300" />
            ) : (
              <CircleOutlinedIcon htmlColor="#DEDEDE" />
            )}
            <span>3-star</span>
          </MenuItem>
        </div>
        <li className="apply-btn-container">
          <button
            className="aply-btn"
            onClick={() => {
              setHotelPage(1);
              setApplyBtn(true);
              handleClose();
            }}
          >
            Apply
          </button>
        </li>
      </Menu>
    </div>
  );
};

export default StarCategory;