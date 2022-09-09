import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { BudgetContext } from '../../context/context'
import { BUDGET_ACTIONS } from '../../context/reducer'

const VenueMultipleChoice = ({ options }) => {
  const { budgetValues, dispatch } = useContext(BudgetContext)

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant='standard' sx={{ m: 1, minWidth: '15rem' }}>
        <Select
          value={budgetValues.selectedVenueName || options[0].name}
          onChange={(e) =>
            dispatch({
              type: BUDGET_ACTIONS.SET_SELECTED_VENUE_NAME,
              payload: e.target.value
            })
          }
        >
          {options.map((option) => (
            <MenuItem key={option._id} value={option.name}>
              <Typography variant='body1'>{option.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default VenueMultipleChoice
