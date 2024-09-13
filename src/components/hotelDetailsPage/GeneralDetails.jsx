import React, { useEffect, useState } from "react";
import HotelRatings from "../ui/HotelRatings";

const GeneralDetails = ({ singleHotel }) => {
  console.log("singleHotel in hotel details", singleHotel);

  return (
    <>
      <h1 className="gen-header">{singleHotel.name}</h1>
      <div className="gen-sub-header">
        <span>{singleHotel.rating}-star Hotel</span>
        <span>.</span>
        <span>{singleHotel.location}</span>
      </div>
      <div className="review-rating">
        <span>{singleHotel?.rating} / 5</span>
        <HotelRatings rating={singleHotel?.rating ?? 0} />
      </div>
      <div className="breakfast-plan">
        <div>Free breakfast on select plans</div>
        <p>Some plans include free breakfast</p>
      </div>
    </>
  );
};

export default GeneralDetails;