import React, { useState } from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthorizationProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageCarousel = ({ hotel, handleSingleHotelClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { token } = useAuth().tokenDetails;

  const navigate = useNavigate();

  const goToPreviousImage = (images) => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNextImage = (images) => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const notify = (text) => toast(text);

  return (
    <div className="result-carosel">
      {/* PREV -BUTTON */}
      <button
        className="res-prev-btn"
        onClick={() => goToPreviousImage(hotel.images)}
      >
        <KeyboardArrowLeftOutlinedIcon />
      </button>
      {/* HOTEL IMAGE */}
      <LazyLoadImage
        loading="lazy"
        effect="blur"
        width={300}
        height={250}
        style={{ objectFit: "cover", borderRadius: 15 }}
        src={hotel.images && hotel.images[currentImageIndex]}
        alt={hotel.name}
        onClick={() => {
          handleSingleHotelClick(hotel._id);
          token
            ? navigate(`/hotels/results/${hotel._id}`)
            : notify("You have to log in first to continue further");
        }}
      />
      {/* NEXT BUTTON */}
      <button
        className="res-next-btn"
        onClick={() => goToNextImage(hotel.images)}
      >
        <KeyboardArrowRightOutlinedIcon />
      </button>
    </div>
  );
};

export default ImageCarousel;