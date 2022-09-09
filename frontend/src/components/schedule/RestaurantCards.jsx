import { Typography } from "@mui/material";
import Paragraph from "../../ui/Paragraph";
import RenderPhotos from "../../ui/renderPhotos/RenderPhotos";

const RestaurantCards = ({ restaurant }) => {
  return (
    <div id={restaurant._id}>
      <Typography variant="h5">{restaurant.name}</Typography>
      <Paragraph textContent={restaurant.textContent} />
      <RenderPhotos images={restaurant.imageContentUrl} />
    </div>
  );
};

export default RestaurantCards;
