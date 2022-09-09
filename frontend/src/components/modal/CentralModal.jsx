import { Typography, Modal, Box } from "@mui/material";
/* import { BtnBackToCenter } from "../map"; */
import VendorMap from "../map/Map";
/* import { SearchBar } from "../map"; */
import { MapProvider } from "react-map-gl";
import OverviewTable from "../overview/OverviewTable";
import Controls from "../map/controls";

const CentralModal = ({ open, handleClose, typeOfModal }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          typeOfModal={typeOfModal}
          className="absolute top-10 left-10 right-10 bottom-10 md:left-[150px]  md:right-[150px] lg:left-[250px] lg:right-250px] overflow-hidden"
        >
          <Typography
            variant="h6"
            component="h2"
            className="text-bold text-white-100 indent-2 "
          >
            {typeOfModal}
          </Typography>
          {typeOfModal === "Map" ? (
            <MapProvider>
              <Controls />
              <VendorMap />
              {/*   <BtnBackToCenter /> */}
            </MapProvider>
          ) : /*  <SearchBar /> */

          typeOfModal === "Overview" ? (
            <OverviewTable />
          ) : null}
          {/*  {typeOfModal === "Map" ? (
            <Map />
          ) : typeOfModal === "Overview" ? (
            <OverviewTable />
          ) : typeOfModal === "Briefing" ? (
            <Briefing />
          ) : null} */}
        </Box>
      </Modal>
    </div>
  );
};

export default CentralModal;
