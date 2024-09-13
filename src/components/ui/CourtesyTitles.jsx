import React, { useState } from "react";
const courtesyTitlesList = ["Mr.", "Mrs.", "Ms."];
const CourtesyTitles = () => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <ul className="courtesy-titles-list">
        {courtesyTitlesList.map((item, indx) => (
          <li
            key={item + indx}
            className={index === indx ? "active-list" : ""}
            onClick={() => {
              setIndex(indx);
              console.log("index", indx);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CourtesyTitles;