import { useEffect, useState } from "react";
import { useFlightSearch } from "../../../contexts/FlightsSearchProvider";
import "../../../styles/flight/Flight.css";
import FlightCityDrowpdown from "../../ui/FlightCityDropDown";

const DestinationCityInput = ({
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
  const { destination, setDestination, destinationRef, source } =
    sourceDestValue;

  useEffect(() => {
    setAllOption(options);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [options]);

  useEffect(() => {
    const storedDestination = localStorage.getItem("destination");
    if (storedDestination) setDestination(storedDestination);
  }, [setDestination]);

  const handleOutsideClick = (event) => {
    if (
      destinationRef.current &&
      !destinationRef.current.contains(event.target)
    ) {
      setFocus(false);
    }
  };

  const selectHandle = (val) => {
    setFocus(false);
    setSearchText("");
    setDestination(`${val.iata_code} ${val.city}, IN`);
    localStorage.setItem("destination", `${val.iata_code} ${val.city}, IN`);
  };

  const handleChange = ({ target }) => {
    let tempOptions = [...options];
    tempOptions = tempOptions.filter(
      (obj) =>
        obj.city?.toLowerCase().includes(target.value?.toLowerCase()) ||
        obj.iata_code?.toLowerCase().includes(target.value?.toLowerCase()) ||
        obj.name?.toLowerCase().includes(target.classNamevalue?.toLowerCase())
    );
    setSearchText(target.value);
    setAllOption(tempOptions);
    setDestination(target.value);
  };

  return (
    <div className="autoComplete">
      <input
        ref={destinationRef}
        className={`inputBox ${inputStyleClass}`}
        placeholder="Where to?"
        value={destination || searchText}
        onFocus={() => {
          setDestination("");
          setFocus(true);
        }}
        onChange={handleChange}
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
export default DestinationCityInput;