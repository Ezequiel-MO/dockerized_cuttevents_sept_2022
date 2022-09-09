import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'

const BreakdownRow = ({ title, units, rate, nights }) => {
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {title}
      </TableCell>
      <TableCell>{units}</TableCell>
      <TableCell>{nights}</TableCell>
      <TableCell>{accounting.formatMoney(rate, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(units * rate * nights, '€')}
      </TableCell>
    </TableRow>
  )
}

export default BreakdownRow
