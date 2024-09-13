import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { countries } from "../../static-data/countryCode";
import { Box, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CountryCodeDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchCode = ({ target }) => {
    const filteredData = countries.filter((country) =>
      country?.countryName.toLowerCase().includes(target.value.toLowerCase())
    );
    setFilteredCountries(filteredData);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          handleClick(e);
          setFilteredCountries(countries);
        }}
        sx={{ color: "black" }}
      >
        {countryCode}
        <KeyboardArrowDownIcon />
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
        <Box>
          <TextField
            sx={{ mt: 2, ml: 2, mb: 2 }}
            type="text"
            id="country_code"
            label="Search country code"
            size="small"
            onChange={searchCode}
          />
        </Box>
        {filteredCountries.map((country) => (
          <MenuItem
            key={country.countryCode}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            onClick={() => {
              handleClose();
              setCountryCode(country.countryCode);
            }}
          >
            <Typography sx={{ fontWeight: 450 }}>
              {country.countryCode} {country.countryName}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}