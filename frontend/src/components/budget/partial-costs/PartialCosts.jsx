import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { Icon } from '@iconify/react'
import { accounting } from 'accounting'
import {
  totalActivities,
  totalMeals,
  totalTransfersIn,
  totalTransfersOut
} from '../totals/compute-totals-per-category'
import {
  getHotelTotal,
  getTotalTransfers
} from '../totals/compute-totals-functions'
import { selectBudget } from '../../../redux/features/budgetSlice'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import { BudgetContext } from '../context/context'

const PartialCosts = () => {
  const { currentProject } = useCurrentProject()
  const { budgetValues } = useContext(BudgetContext)
  const { selectedVenueTotalCost } = budgetValues
  const { nrPax } = currentProject
  const [subtotals, setSubtotals] = useState({
    activities: 0,
    meals: 0,
    transfers: 0,
    hotel: 0
  })
  const budget = useSelector(selectBudget)
  const { schedule, hotel } = budget

  useEffect(() => {
    setSubtotals({
      ...subtotals,
      activities: totalActivities(schedule, nrPax),
      meals: totalMeals(schedule) + selectedVenueTotalCost,
      transfers:
        totalTransfersIn(schedule) +
        totalTransfersOut(schedule) +
        getTotalTransfers(schedule),
      hotel: hotel
        ? getHotelTotal(hotel.price[0], schedule.length)
        : getHotelTotal(0, schedule.length)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule, hotel, selectedVenueTotalCost, nrPax])

  ChartJS.register(ArcElement, Tooltip, Legend)

  const data = {
    labels: ['Accommodation', 'Transfers', 'Meals', 'Activities'],
    datasets: [
      {
        label: 'Budget Breakdown',
        data: [
          subtotals.hotel,
          subtotals.transfers,
          subtotals.meals,
          subtotals.activities
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='mt-10 w-2/3'>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='bx:hotel'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'> ACCOMMODATION </p>

          {hotel &&
            accounting.formatMoney(
              getHotelTotal(hotel.price[0], schedule.length),
              '€'
            )}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='bx:bus'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'>TRANSFERS </p>
          {schedule && accounting.formatMoney(subtotals.transfers, '€')}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='carbon:restaurant'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'>MEAL FUNCTIONS</p>
          {schedule && nrPax && accounting.formatMoney(subtotals.meals, '€')}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='akar-icons:people-multiple'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'>ACTIVITIES </p>
          {schedule &&
            nrPax &&
            accounting.formatMoney(subtotals.activities, '€')}
        </div>
      </div>
      <div className='w-1/3 hidden md:flex md:justify-center md:items-center'>
        <Doughnut data={data} className='flex-shrink-0' />
      </div>
    </div>
  )
}

export default PartialCosts
