import { useEffect, useState } from "react";
import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";
import "../../../styles/flight/Flight.css";
import FlightCityDrowpdown from "../../ui/FlightCityDropDown";

const DepartCityInput = ({
  options,
  noOptionText = "No Items",
  inputStyleClass,
  isSwitch,
  onValueChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [allOption, setAllOption] = useState(options || []);
  const [focus, setFocus] = useState(false);

  const { sourceDestValue } = useFlightSearch();
  const { source, setSource, sourceRef, destination } = sourceDestValue;

  useEffect(() => {
    setAllOption(options);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [options]);

  useEffect(() => {
    const storedSource = localStorage.getItem("source");
    console.log("storedSource", storedSource);
    if (storedSource) setSource(storedSource);
  }, [setSource]);

  const selectHandle = (val) => {
    setFocus(false);
    setSearchText("");
    setSource(`${val.iata_code} ${val.city}, IN`);
    localStorage.setItem("source", `${val.iata_code} ${val.city}, IN`);
  };

  const handleChange = ({ target }) => {
    let tempOptions = [...options];
    tempOptions = tempOptions.filter(
      (obj) =>
        obj.city?.toLowerCase().includes(target.value?.toLowerCase()) ||
        obj.iata_code?.toLowerCase().includes(target.value?.toLowerCase()) ||
        obj.name?.toLowerCase().includes(target.value?.toLowerCase())
    );
    setSearchText(target.value);
    setAllOption(tempOptions);
    setSource(target.value);
  };

  const handleOutsideClick = (event) => {
    if (sourceRef.current && !sourceRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  return (
    <div className="autoComplete">
      <input
        ref={sourceRef}
        className={`inputBox ${inputStyleClass}`}
        placeholder="Where from?"
        value={source || searchText}
        onChange={handleChange}
        onFocus={() => {
          setSource("");
          setFocus(true);
        }}
        style={{
          borderBottomLeftRadius: searchText ? 0 : "",
          borderBottomRightRadius: searchText ? 0 : "",
        }}
      />
      <FlightCityDrowpdown
        allOption={allOption}
        noOptionText={noOptionText}
        selectHandle={selectHandle}
        focus={focus}
      />
    </div>
  );
};
export default DepartCityInput;