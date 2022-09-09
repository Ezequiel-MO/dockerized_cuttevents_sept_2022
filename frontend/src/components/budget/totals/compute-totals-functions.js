export const getHotelTotal = (priceObj, nights = 1) => {
  const {
    DUInr = 0,
    DUIprice = 0,
    DoubleRoomNr = 0,
    DoubleRoomPrice = 0,
    breakfast = 0,
    DailyTax = 0
  } = priceObj

  const priceObValues = Object.values(priceObj).filter(
    (value) => typeof value === 'number'
  )

  if (priceObValues.some((v) => v < 0)) return 0

  const hotelTotal =
    nights *
    (DUInr * DUIprice +
      DoubleRoomNr * DoubleRoomPrice +
      breakfast * DUInr +
      breakfast * DoubleRoomNr * 2 +
      DailyTax * DUInr +
      DailyTax * DoubleRoomNr * 2)
  return hotelTotal
}

export const getTotalTransfers = (schedule) => {
  let transfers = 0
  schedule.forEach((day) => {
    const { morningEvents, lunch, afternoonEvents, dinner } = day
    if (morningEvents.length > 0) {
      if (morningEvents[0].transfer[0]) {
        transfers +=
          morningEvents[0].transfer[0][
            morningEvents[0].transfer[0]['selectedService']
          ] * morningEvents[0].transfer.length
      }
    }
    if (lunch.length > 0) {
      if (lunch[0].transfer[0]) {
        transfers +=
          lunch[0].transfer[0][lunch[0].transfer[0]['selectedService']] *
          lunch[0].transfer.length
      }
    }
    if (afternoonEvents.length > 0) {
      if (afternoonEvents[0].transfer[0]) {
        transfers +=
          afternoonEvents[0].transfer[0][
            afternoonEvents[0].transfer[0]['selectedService']
          ] * afternoonEvents[0].transfer.length
      }
    }
    if (dinner.length > 0) {
      if (dinner[0].transfer[0]) {
        transfers +=
          dinner[0].transfer[0][dinner[0].transfer[0]['selectedService']] *
          dinner[0].transfer.length
      }
    }
  })

  return transfers
}

export const getVenueTotal = (venue_price) => {
  const {
    audiovisuals = 0,
    catering_price = 0,
    catering_units = 0,
    cleaning = 0,
    cocktail_price = 0,
    cocktail_units = 0,
    rental = 0,
    security = 0,
    staff_menu_price = 0,
    staff_units = 0,
    entertainment
  } = venue_price

  const venue_priceObjValues = Object.values(venue_price).filter(
    (value) => typeof value === 'number'
  )

  if (venue_priceObjValues.some((v) => v < 0)) return 0

  const totalVenueCost =
    cocktail_units * cocktail_price +
    catering_units * catering_price +
    staff_units * staff_menu_price +
    audiovisuals +
    cleaning +
    security +
    rental +
    entertainment

  return totalVenueCost
}

export const computeTotal = (field) => {
  let total = 0
  //if field is an array
  if (Array.isArray(field)) {
    //iterate through the array
    field.forEach((event) => {
      //add the price to the total if the event is not a venue
      if (!event.isVenue) total += event.price
    })
  }
  //else if field is a single object
  else {
    //add the price to the total if the event is not a venue - venues will be added apart
    if (!field.isVenue) total += field.price
  }
  return total
}

export const getTotalBudget = (pax = 1, schedule, hotelTotal = 0) => {
  let totalMorningEvents = 0
  let totalAfternoonEvents = 0
  let totalLunch = 0
  let totalDinner = 0

  let totalTransfers = getTotalTransfers(schedule)
  schedule.forEach((day) => {
    for (let key in day) {
      if (key === 'morningEvents') {
        totalMorningEvents += computeTotal(day[key])
      } else if (key === 'afternoonEvents') {
        totalAfternoonEvents += computeTotal(day[key])
      } else if (key === 'lunch') {
        totalLunch += computeTotal(day[key])
      } else if (key === 'dinner') {
        totalDinner += computeTotal(day[key])
      }
    }
  })

  const totalTransfersIn = schedule[0].transfer_in.reduce(
    (acc, curr) => acc + curr.transfer_in_out,
    0
  )

  const totalTransfersOut = schedule[schedule.length - 1].transfer_out.reduce(
    (acc, curr) => acc + curr.transfer_in_out,
    0
  )

  const totalScheduleCost =
    pax * (totalMorningEvents + totalAfternoonEvents + totalLunch + totalDinner)

  return (
    hotelTotal +
    totalScheduleCost +
    totalTransfers +
    totalTransfersIn +
    totalTransfersOut
  )
}
