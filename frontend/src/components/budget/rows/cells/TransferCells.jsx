import { TableCell } from "@mui/material";
import accounting from "accounting";

const TransferCells = ({ description, options, pax }) => {
  const showDescription = () => {
    const selectedServiceDescription = options[0]?.selectedService;
    if (selectedServiceDescription === "dispo_4h") return "4 Hours at Disposal";
    if (selectedServiceDescription === "hextra") return "Overtime";
    if (selectedServiceDescription === "hextra_night") return "Night Overtime";
    if (selectedServiceDescription === "dispo_5h_out")
      return "5 Hours at Disposal Out of Town";
    if (selectedServiceDescription === "dispo_4h_airport")
      return "4 Hours at Disposal Departing/Starting at Airport";
    if (selectedServiceDescription === "dispo_4h_airport_night")
      return "4 Night Hours at Disposal Departing/Starting at Airport";
    if (selectedServiceDescription === "dispo_6h_night")
      return "6 Night Hours at Disposal";
    return description;
  };

  return (
    <>
      <TableCell>{showDescription()}</TableCell>
      <TableCell>{`${options[0].vehicleCapacity} seater Bus `}</TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>
        {accounting.formatMoney(options[0][options[0].selectedService], "€")}
      </TableCell>
      <TableCell>
        {accounting.formatMoney(
          options[0][options[0].selectedService] * pax,
          "€"
        )}
      </TableCell>
    </>
  );
};

export default TransferCells;
