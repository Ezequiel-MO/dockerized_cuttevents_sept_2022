import { useContext, useEffect, useState } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Icon } from '@iconify/react'
import { accounting } from 'accounting'
import { BudgetContext } from '../context/context'
import { BUDGET_ACTIONS } from '../context/reducer'
import HotelMultipleChoice from './hotel/HotelMultipleChoice'
import { getHotelTotal } from '../totals/compute-totals-functions'
import { useBudget } from '../../../hooks/useBudget'

const HotelRows = ({ hotels, nights }) => {
  const { setSelectedHotel } = useBudget()
  const { budgetValues, dispatch } = useContext(BudgetContext)
  const [selectedHotelState, setSelectedHotelState] = useState(hotels[0])

  useEffect(() => {
    setSelectedHotel(selectedHotelState)
  }, [selectedHotelState])

  useEffect(() => {
    if (budgetValues.selectedHotelName) {
      const selectedHotel = hotels?.find(
        (hotel) => hotel.name === budgetValues.selectedHotelName
      )
      setSelectedHotelState(selectedHotel)
    }
  }, [budgetValues.selectedHotelName, hotels])

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() =>
              dispatch({
                type: BUDGET_ACTIONS.SET_HOTEL_BREAKDOWN_OPEN,
                payload: !budgetValues.hotelBreakdownOpen
              })
            }
          >
            {budgetValues.hotelBreakdownOpen ? (
              <Icon icon='bx:up-arrow' color='#ea5933' />
            ) : (
              <Icon icon='bx:down-arrow' color='#ea5933' />
            )}
          </IconButton>
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <HotelMultipleChoice options={hotels} />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>
          {accounting.formatMoney(
            getHotelTotal(selectedHotelState.price[0], nights),
            '€'
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default HotelRows
