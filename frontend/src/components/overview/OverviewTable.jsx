import { Icon } from '@iconify/react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Link } from 'react-scroll'
import OTLogic from './OTLogic'
import { useCurrentProject } from '../../hooks/useCurrentProject'

const OverviewTable = () => {
  const { currentProject } = useCurrentProject()
  const { arrivalDay, departureDay, schedule } = currentProject
  const { transformDates, getDays, getEvents, renderEvent } = OTLogic()
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow className='bg-brown-50'>
            <TableCell>
              <Typography variant='h6'>
                {transformDates(arrivalDay, departureDay)}
              </Typography>
            </TableCell>
            {getDays(arrivalDay, departureDay).map((day) => (
              <TableCell key={day}>
                <Typography variant='h6'>{day}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant='body1' className='flex items-center'>
                Morning
                <span className='ml-2'>
                  <Icon
                    icon='mdi:weather-sunset-up'
                    color='#ea5933'
                    width='40'
                  />
                </span>
              </Typography>
            </TableCell>
            {getEvents(schedule, 'morningEvents')?.map((event) => (
              <TableCell key={event[0]?.id} className='cursor-pointer'>
                <Link
                  to={`${event[0]?.id}`}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {renderEvent(event)}
                </Link>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1' className='flex items-center'>
                Lunch
                <span className='ml-2'>
                  <Icon icon='bx:bx-restaurant' color='#ea5033' width='35' />
                </span>
              </Typography>
            </TableCell>
            {getEvents(schedule, 'lunch')?.map((event) => (
              <TableCell key={event[0]?.id} className='cursor-pointer'>
                <Link
                  to={`${event[0]?.id}`}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {renderEvent(event)}
                </Link>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1' className='flex items-center'>
                Afternoon
                <span className='ml-2'>
                  <Icon
                    icon='mdi:weather-sunset-down'
                    color='#ea5933'
                    width='40'
                  />
                </span>
              </Typography>
            </TableCell>
            {getEvents(schedule, 'afternoonEvents')?.map((event) => (
              <TableCell key={event[0]?.id} className='cursor-pointer'>
                <Link
                  to={`${event[0]?.id}`}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {renderEvent(event)}
                </Link>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1' className='flex items-center'>
                Dinner
                <span className='ml-2'>
                  <Icon icon='cil:dinner' color='#ea5033' width='35' />
                </span>
              </Typography>
            </TableCell>
            {getEvents(schedule, 'dinner')?.map((event) => (
              <TableCell key={event[0]?.id} className='cursor-pointer'>
                <Link
                  to={`${event[0]?.id}`}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {renderEvent(event)}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OverviewTable
