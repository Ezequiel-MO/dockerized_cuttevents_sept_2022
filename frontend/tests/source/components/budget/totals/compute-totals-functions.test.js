import {
  getHotelTotal,
  getTotalTransfers
} from '../../../../../src/components/budget/totals/compute-totals-functions'

describe('Functions computing budget totals', () => {
  test('getHotelTotal', () => {
    const priceObj = {
      DUInr: 4,
      DUIprice: 130
    }

    const priceObj2 = {
      DUInr: 4,
      DUIprice: -130,
      DUIRoomNr: undefined
    }

    const result = getHotelTotal(priceObj, 2)
    const result2 = getHotelTotal(priceObj2, 2)

    expect(result).toEqual(1040)
    expect(result2).toEqual(0)
  })

  test('getTotalTransfers', () => {
    const emptySchedule = []
    const totalTransfers1 = getTotalTransfers(emptySchedule)

    expect(totalTransfers1).toEqual(0)
  })
})
