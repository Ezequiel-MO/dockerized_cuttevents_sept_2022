import { Typography } from "@mui/material";
import { Link } from "react-scroll";

export default function InfoMarker({ selectedLocation }) {
  return (
    <Link to={selectedLocation.id} smooth={true} duration={500} spy={true}>
      <div className="p-1 cursor-pointer">
        <Typography variant="h6">{selectedLocation.name}</Typography>
      </div>
    </Link>
  );
}
