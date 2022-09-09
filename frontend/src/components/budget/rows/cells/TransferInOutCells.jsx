import { TableCell } from "@mui/material";
import accounting from "accounting";

const TransferInOutCells = ({ description, options, pax, id }) => {
  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>{`${options[0].vehicleCapacity} seater Bus `}</TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>
        {accounting.formatMoney(options[0].transfer_in_out, "€")}
      </TableCell>
      <TableCell>
        {accounting.formatMoney(options[0].transfer_in_out * pax, "€")}
      </TableCell>
    </>
  );
};

export default TransferInOutCells;
