import { useContext, useState, useEffect } from 'react'
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { Box } from '@mui/system'
import { BudgetContext } from '../../context/context'
import VenueBreakdownRow from './VenueBreakdownRow'

const VenueBreakdownRows = ({ venues }) => {
  const [selectedVenue, setSelectedVenue] = useState(venues[0])
  const { budgetValues } = useContext(BudgetContext)
  const { selectedVenueName } = budgetValues

  useEffect(() => {
    if (selectedVenueName) {
      setSelectedVenue(venues.find((venue) => venue.name === selectedVenueName))
    }
  }, [selectedVenueName, venues])

  const {
    rental,
    cocktail_units,
    cocktail_price,
    catering_units,
    catering_price,
    staff_units,
    staff_menu_price,
    audiovisuals,
    cleaning,
    security,
    entertainment
  } = selectedVenue.venue_price[0]

  console.log(
    rental,
    cocktail_units,
    cocktail_price,
    catering_units,
    catering_price,
    staff_units,
    staff_menu_price,
    audiovisuals,
    cleaning,
    security,
    entertainment
  )

  const BreakdownRowsArr = [
    { units: 1, title: 'Rental Fee', rate: rental },
    {
      units: cocktail_units,
      title: 'Pre-dinner Cocktail',
      rate: cocktail_price
    },
    {
      units: catering_units,
      title: 'Full menu w/drinks & cofee',
      rate: catering_price
    },
    { units: staff_units, title: 'Staff Menu', rate: staff_menu_price },
    { units: 1, title: 'AudioVisuals', rate: audiovisuals },
    { units: 1, title: 'Cleaning', rate: cleaning },
    { units: 1, title: 'Security', rate: security },
    { units: 1, title: 'Entertainment', rate: entertainment }
  ]

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse
          in={budgetValues.venueBreakdownOpen}
          timeout='auto'
          unmountOnExit
        >
          <Box margin={1}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Nr. Units </TableCell>
                  <TableCell>Cost per unit</TableCell>
                  <TableCell>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {BreakdownRowsArr.map(({ units, title, rate }) => {
                  return (
                    rate && (
                      <TableRow key={title}>
                        <VenueBreakdownRow
                          units={units}
                          title={title}
                          rate={rate}
                        />
                      </TableRow>
                    )
                  )
                })}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default VenueBreakdownRows
