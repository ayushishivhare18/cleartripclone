import React, { createContext, useContext, useState } from "react";

const FlightFilterContext = createContext();

export const useFlightFilter = () => {
  const context = useContext(FlightFilterContext);
  if (!context) {
    throw new Error("Something is wrong with the FlightFilterContext");
  }
  return context;
};
const FlightFilterProvider = ({ children }) => {
  const [stop, setStop] = useState(true);
  const [nonStop, setNonStop] = useState(false);
  const [oneStop, setOneStop] = useState(false);
  const [twoStop, setTwoStop] = useState(false);
  const [isDeparature, setIsDeparature] = useState(true);
  const [isEarlyMorning, setIsEarlyMorning] = useState(false);
  const [isMorning, setIsMorning] = useState(false);
  const [isAfterNoon, setIsAfterNoon] = useState(false);
  const [isEvening, setIsEvening] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isPrice, setIsPrice] = useState(true);
  const [flightPrice, setFlightPrice] = useState();

  const flightFilterData = {
    filterByStop: {
      stop,
      setStop,
      nonStop,
      setNonStop,
      oneStop,
      setOneStop,
      twoStop,
      setTwoStop,
    },
    filterByDepartTime: {
      isDeparature,
      setIsDeparature,
      isEarlyMorning,
      setIsEarlyMorning,
      isMorning,
      setIsMorning,
      isAfterNoon,
      setIsAfterNoon,
      isEvening,
      setIsEvening,
      isNight,
      setIsNight,
    },
    filterPriceRange: { isPrice, setIsPrice, flightPrice, setFlightPrice },
  };
  return (
    <FlightFilterContext.Provider value={flightFilterData}>
      {children}
    </FlightFilterContext.Provider>
  );
};

export default FlightFilterProvider;