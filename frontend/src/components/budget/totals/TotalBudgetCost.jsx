import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import { selectBudget } from '../../../redux/features/budgetSlice'
import { BudgetContext } from '../context/context'
import {
  getHotelTotal,
  getTotalBudget,
  getVenueTotal
} from './compute-totals-functions'

const TotalBudgetCost = ({ pax }) => {
  const { currentProject } = useCurrentProject()
  const { hotels } = currentProject
  const [selectedHotel, setSelectedHotel] = useState(hotels[0])
  const { budgetValues } = useContext(BudgetContext)
  const { selectedHotelName, selectedVenueTotalCost } = budgetValues
  const { schedule } = useSelector(selectBudget)

  useEffect(() => {
    if (selectedHotelName) {
      const selectedHotel = hotels
        ? hotels.find((hotel) => hotel.name === budgetValues.selectedHotelName)
        : ''
      setSelectedHotel(selectedHotel)
    }
  }, [selectedHotelName, hotels])

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>TOTAL BUDGET</strong>
      </TableCell>
      <TableCell>
        <strong>
          {selectedHotel && selectedHotel?.price[0] && schedule[0].length !== 0
            ? accounting.formatMoney(
                getTotalBudget(
                  pax,
                  schedule,
                  getHotelTotal(selectedHotel.price[0], schedule.length) +
                    selectedVenueTotalCost
                ),
                '€'
              )
            : schedule[0].length > 0
            ? accounting.formatMoney(
                getTotalBudget(pax, schedule, 0) + selectedVenueTotalCost,
                '€'
              )
            : 0}
        </strong>
      </TableCell>
    </TableRow>
  )
}

export default TotalBudgetCost
