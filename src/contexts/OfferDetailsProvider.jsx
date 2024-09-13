import React, { createContext, useState } from "react";
import { fetchOffers } from "../Apis/OffersApi";

export const OffersContext = createContext();

export const OfferDetailsProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  const handleOfferFecth = (offerType) => {
    let type = "";

    if (offerType === "ALL") type = "ALL";
    else if (offerType === "FLIGHTS") type = "FLIGHTS";
    else if (offerType === "HOTELS") type = "HOTELS";

    if (type) {
      fetchOffers(type).then((res) => {
        setOffers(res.data.offers);
      });
    }
  };

  const offersValue = {
    offers,
    setOffers,
    handleOfferFecth,
  };
  return (
    <OffersContext.Provider value={offersValue}>
      {children}
    </OffersContext.Provider>
  );
};