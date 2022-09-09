import { TableCell } from "@mui/material";
import { accounting } from "accounting";

const SingleChoiceCells = ({ pax, options, description }) => {
  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>{options[0].name}</TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(options[0].price, "€")}</TableCell>
      <TableCell>
        {accounting.formatMoney(pax * options[0].price, "€")}
      </TableCell>
    </>
  );
};

export default SingleChoiceCells;
