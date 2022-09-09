export const BUDGET_ACTIONS = {
  SET_HOTEL_BREAKDOWN_OPEN: 'SET_HOTEL_BREAKDOWN_OPEN',
  SET_SELECTED_HOTEL_NAME: 'SET_SELECTED_HOTEL_NAME',
  SET_VENUE_BREAKDOWN_OPEN: 'SET_VENUE_BREAKDOWN_OPEN',
  SET_SELECTED_VENUE_NAME: 'SET_SELECTED_VENUE_NAME',
  SET_SELECTED_VENUE_TOTAL_COST: 'SET_SELECTED_VENUE_TOTAL_COST'
}

export const initialbudgetValues = {
  hotelBreakdownOpen: false,
  venueBreakdownOpen: false,
  selectedHotelName: '',
  selectedVenueName: '',
  selectedVenueTotalCost: 0
}

export const budgetReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case BUDGET_ACTIONS.SET_HOTEL_BREAKDOWN_OPEN:
      return {
        ...state,
        hotelBreakdownOpen: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_HOTEL_NAME:
      return {
        ...state,
        selectedHotelName: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_VENUE_NAME:
      return {
        ...state,
        selectedVenueName: payload
      }
    case BUDGET_ACTIONS.SET_VENUE_BREAKDOWN_OPEN:
      return {
        ...state,
        venueBreakdownOpen: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_VENUE_TOTAL_COST:
      return {
        ...state,
        selectedVenueTotalCost: payload
      }
    default:
      return state
  }
}
