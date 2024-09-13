import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchHotels, fetchFilteredHotels } from "../Apis/HotelDetailsApi";

const HotelContext = createContext();

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("something went wrong with the context");
  }
  return context;
};

export const HotelDetailsProvider = ({ children }) => {
  const currentDate = new Date();
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const [focus, setFocus] = useState(false);
  const [inputPlace, setInputPlace] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(nextDate);
  const [hotels, setHotels] = useState([]);
  const [singleHotel, setSingleHotel] = useState({});
  const [filterItems, setFilterItems] = useState({});
  const [hotelPage, setHotelPage] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);
  const [singleRoom, setSingleRoom] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([
    {
      adult: 1,
      children: 0,
    },
  ]);

  const handleInputPlaceChange = (val) => {
    setInputPlace(val);
  };

  const handleHotelSearchBtn = () => {
    fetchHotels(inputPlace, 10, hotelPage).then((resp) => {
      setTotalHotels(resp.totalResults);
      setHotels(resp.data.hotels);
    });
  };

  const handleHotelFilter = useCallback(() => {
    const JSONFilter = JSON.stringify(filterItems);
    setIsLoading(true);
    fetchFilteredHotels(
      localStorage.getItem("inputPlace"),
      10,
      hotelPage,
      JSONFilter
    ).then((response) => {
      setTotalHotels(response.totalResults);
      setHotels(response.data.hotels);
      setIsLoading(false);
    });
  }, [inputPlace, hotelPage, filterItems]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const hotelDetails = {
    hotelDetails: {
      hotels,
      setHotels,
      singleHotel,
      setSingleHotel,
      hotelPage,
      setHotelPage,
      totalHotels,
      setTotalHotels,
    },
    filtersData: {
      filterItems,
      setFilterItems,
      handleHotelFilter,
    },
    hotelSearchHandler: {
      handleHotelSearchBtn,
    },
    inputInfo: {
      handleInputPlaceChange,
      inputPlace,
      setInputPlace,
      focus,
      setFocus,
    },
    checkInOutDetails: {
      checkInDate,
      handleCheckInDateChange,
      checkOutDate,
      handleCheckOutDateChange,
    },
    roomTypeValues: { rooms, setRooms },
    singleRoomData: { singleRoom, setSingleRoom },
    loadingData: { isLoading, setIsLoading },
  };

  return (
    <HotelContext.Provider value={hotelDetails}>
      {children}
    </HotelContext.Provider>
  );
};