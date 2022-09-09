import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import Paragraph from "../../ui/Paragraph";
import RenderPhotos from "../../ui/renderPhotos/RenderPhotos";
import HotelIcons from "./HotelIcons";

const HotelCards = ({ hotel }) => {
  const [stars] = useState(hotel.numberStars);
  const [leftIconsText, setLeftIconsText] = useState([]);
  const [rightIconsText, setRightIconsText] = useState([]);

  useEffect(() => {
    const leftIconsTextObj = {
      address: hotel.address,
      restaurants: hotel.restaurants,
      numberRooms: hotel.numberRooms,
      wifiSpeed: hotel.wifiSpeed,
    };

    const rightIconsTextObj = {
      swimmingPool: hotel.swimmingPool,
      checkin_out: hotel.checkin_out,
      meetingRooms: `${hotel.meetingRooms} meeting rooms`,
      wheelChairAccessible: `${hotel.wheelChairAccessible ? "Yes" : "No"}`,
    };

    const leftIconsTextArr = Object.values(leftIconsTextObj);
    setLeftIconsText(leftIconsTextArr);
    const rightIconsTextArr = Object.values(rightIconsTextObj);
    setRightIconsText(rightIconsTextArr);
  }, [hotel]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <h2>{hotel.name}</h2>
        <Rating readOnly value={stars} />
      </div>
      <Paragraph textContent={hotel.textContent} />
      <RenderPhotos images={hotel.imageContentUrl} />
      <HotelIcons
        leftIconsText={leftIconsText}
        rightIconsText={rightIconsText}
      />
    </div>
  );
};

export default HotelCards;
