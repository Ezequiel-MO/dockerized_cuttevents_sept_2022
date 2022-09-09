import { useReducer, forwardRef } from 'react'
import { Table, TableBody } from '@mui/material'
import HotelRows from './rows/HotelRows'
import DayRows from './rows/days/DayRows'
import HotelBreakdownRows from './rows/hotel/HotelBreakdownRows'
import { BudgetContext } from './context/context'
import { budgetReducer, initialbudgetValues } from './context/reducer'
import TotalBudgetCost from './totals/TotalBudgetCost'
import { useCurrentProject } from '../../hooks/useCurrentProject'
import BudgetTableHead from './BudgetTableHead'
import PartialCosts from './partial-costs/PartialCosts'

const Budget = forwardRef((props, ref) => {
  const { currentProject } = useCurrentProject()
  const { hotels, schedule, nrPax } = currentProject
  const [budgetValues, dispatch] = useReducer(
    budgetReducer,
    initialbudgetValues
  )

  return (
    <div ref={ref}>
      <BudgetContext.Provider value={{ budgetValues, dispatch }}>
        <div
          className='overflow-x-scroll no-scrollbar lg:min-w-max '
          id='budget_id'
        >
          <Table
            stickyHeader
            size='small'
            className='text-left divide-y divide-gray-700 dark:divide-black-50 dark:bg-gray-50'
          >
            <BudgetTableHead />
            <TableBody>
              {hotels?.length > 0 && (
                <>
                  <HotelRows hotels={hotels} nights={schedule?.length} />
                  <HotelBreakdownRows
                    hotels={hotels}
                    nights={schedule?.length}
                  />
                </>
              )}

              {schedule?.map((day) => (
                <DayRows key={day._id} day={day} pax={nrPax} />
              ))}
              <TotalBudgetCost pax={nrPax} />
            </TableBody>
          </Table>
        </div>
        <PartialCosts />
      </BudgetContext.Provider>
    </div>
  )
})

export default Budget
