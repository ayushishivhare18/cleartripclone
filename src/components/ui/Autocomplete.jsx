import { useEffect, useRef, useState } from "react";
import "../../styles/hotel/Hotel.css";
import { Paper } from "@mui/material";
import { useHotelContext } from "../../contexts/HotelDetailsProvider";
import { useLocation } from "react-router-dom";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

const Autocomplete = ({
  options,
  optionKey = "name",
  noOptionText = "No Items",
  hotelInputClass,
  displayValue = "",
}) => {
  const [searchText, setSearchText] = useState(displayValue);
  const [allOption, setAllOption] = useState(options || []);
  const [iconThemeIndx, setIconThemeIndx] = useState(-1);
  const hotelSearchRef = useRef();
  const { inputInfo } = useHotelContext();
  const { inputPlace, setInputPlace, focus, setFocus } = inputInfo;

  useEffect(() => {
    setAllOption(options);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [options]);

  useEffect(() => {
    const selectdValueFromLS = localStorage.getItem("inputPlace");
    if (selectdValueFromLS) setInputPlace(selectdValueFromLS);
  }, [setInputPlace]);

  const handleOutsideClick = (event) => {
    if (
      hotelSearchRef.current &&
      !hotelSearchRef.current.contains(event.target)
    ) {
      setFocus(false);
    }
  };
  const selectHandle = (val) => {
    setFocus(false);
    setSearchText("");
    setInputPlace(val[optionKey]);
    localStorage.setItem("inputPlace", val[optionKey]);
  };
  const handleChange = ({ target }) => {
    let tempOptions = [...options];
    tempOptions = tempOptions.filter((obj) =>
      obj[optionKey]?.toLowerCase().includes(target.value?.toLowerCase())
    );
    setSearchText(target.value);
    setAllOption(tempOptions);
    setInputPlace(target.value);
  };

  return (
    <>
      <input
        ref={hotelSearchRef}
        className={hotelInputClass}
        placeholder={"Enter locality, landmark, city or hotel"}
        onFocus={() => {
          setInputPlace("");
          setFocus(true);
        }}
        value={inputPlace || searchText}
        onChange={handleChange}
        style={{
          borderBottomLeftRadius: searchText ? 0 : "",
          borderBottomRightRadius: searchText ? 0 : "",
        }}
      />
      <Paper
        className="dropdown"
        style={{
          display: focus ? "flex" : "none",
        }}
      >
        <p className="top-text">Popular destinations</p>
        {!allOption.length ? (
          <div> {noOptionText} </div>
        ) : (
          allOption.map((option, index) => (
            <div
              className="place-option"
              key={`${index}`}
              onClick={() => selectHandle(option)}
              onMouseEnter={() => setIconThemeIndx(index)}
              onMouseLeave={() => setIconThemeIndx(-1)}
            >
              <div style={{ marginLeft: "30px" }}>{option[optionKey]}</div>
              <div className="location-icon">
                <FmdGoodOutlinedIcon
                  fontSize="medium"
                  htmlColor={iconThemeIndx === index ? "#0f53a0" : "gray"}
                />
              </div>
            </div>
          ))
        )}
      </Paper>
    </>
  );
};
export default Autocomplete;