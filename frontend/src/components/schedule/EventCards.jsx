import { Typography } from "@mui/material";
import Paragraph from "../../ui/Paragraph";
import RenderPhotos from "../../ui/renderPhotos/RenderPhotos";

const EventCards = ({ event }) => {
  return (
    <div id={event._id}>
      <Typography variant="h5">{event.name}</Typography>
      <Paragraph textContent={event.textContent} />
      <RenderPhotos images={event.imageContentUrl} />
    </div>
  );
};

export default EventCards;
