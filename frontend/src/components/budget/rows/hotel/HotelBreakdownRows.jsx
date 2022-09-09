import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { BudgetContext } from '../../context/context'
import BreakdownRow from './BreakdownRow'

const HotelBreakdownRows = ({ hotels, nights }) => {
  const [selectedHotel, setSelectedHotel] = useState(hotels[0])
  const { budgetValues } = useContext(BudgetContext)
  const { selectedHotelName } = budgetValues

  useEffect(() => {
    if (selectedHotelName) {
      setSelectedHotel(hotels.find((hotel) => hotel.name === selectedHotelName))
    }
  }, [selectedHotelName, hotels])

  const {
    DUInr,
    DUIprice,
    DoubleRoomNr,
    DoubleRoomPrice,
    DailyTax,
    breakfast
  } = selectedHotel.price[0]

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse
          in={budgetValues.hotelBreakdownOpen}
          timeout='auto'
          unmountOnExit
        >
          <Box margin={1}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Nr. Units </TableCell>
                  <TableCell>Nr. of nights </TableCell>
                  <TableCell>Cost per room per night</TableCell>
                  <TableCell>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <BreakdownRow
                  units={DUInr}
                  rate={DUIprice}
                  nights={nights}
                  title='Double Room Single Use'
                />
                <BreakdownRow
                  units={DoubleRoomNr}
                  rate={DoubleRoomPrice}
                  nights={nights}
                  title='Double Room //Twin Room'
                />
                <BreakdownRow
                  units={DUInr + DoubleRoomNr * 2}
                  rate={DailyTax}
                  nights={nights}
                  title='City Tax'
                />
                {breakfast ? (
                  <BreakdownRow
                    units={DUInr + DoubleRoomNr * 2}
                    rate={breakfast}
                    nights={nights}
                    title='Breakfast'
                  />
                ) : null}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default HotelBreakdownRows
