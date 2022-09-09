import { useState, useEffect, useContext } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { Icon } from '@iconify/react'
import { getVenueTotal } from '../../totals/compute-totals-functions'
import VenueMultipleChoice from './VenueMultipleChoice'
import { BudgetContext } from '../../context/context'
import { BUDGET_ACTIONS } from '../../context/reducer'

const VenueRows = ({ venues, pax }) => {
  const { budgetValues, dispatch } = useContext(BudgetContext)
  const [selectedVenue, setSelectedVenue] = useState(venues[0])
  const { selectedVenueName } = budgetValues

  useEffect(() => {
    const totalAmount = getVenueTotal(selectedVenue.venue_price[0])
    dispatch({
      type: BUDGET_ACTIONS.SET_SELECTED_VENUE_TOTAL_COST,
      payload: totalAmount
    })
  }, [selectedVenue])

  useEffect(() => {
    if (selectedVenueName) {
      setSelectedVenue(
        venues?.find((venue) => venue.name === selectedVenueName)
      )
    }
  }, [selectedVenueName, venues])

  const { venue_price } = selectedVenue
  const { catering_units } = venue_price[0]
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() =>
              dispatch({
                type: BUDGET_ACTIONS.SET_VENUE_BREAKDOWN_OPEN,
                payload: !budgetValues.venueBreakdownOpen
              })
            }
          >
            {budgetValues.venueBreakdownOpen ? (
              <Icon icon='bx:up-arrow' color='#ea5933' />
            ) : (
              <Icon icon='bx:down-arrow' color='#ea5933' />
            )}
          </IconButton>
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <VenueMultipleChoice options={venues} />
        </TableCell>
        <TableCell>{catering_units}</TableCell>
        <TableCell></TableCell>
        <TableCell>
          {accounting.formatMoney(getVenueTotal(venue_price[0]), '€')}
        </TableCell>
      </TableRow>
    </>
  )
}

export default VenueRows
