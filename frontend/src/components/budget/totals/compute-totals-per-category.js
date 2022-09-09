import { computeTotal } from './compute-totals-functions'

export const totalTransfersIn = (arr) =>
  arr[0].transfer_in.reduce((acc, curr) => acc + curr.transfer_in_out, 0)

export const totalTransfersOut = (arr) =>
  arr[arr.length - 1].transfer_out.reduce(
    (acc, curr) => acc + curr.transfer_in_out,
    0
  )

export const totalMeals = (arr) => {
  let total = 0
  arr.forEach((day) => {
    for (let key in day) {
      if (key === 'lunch') {
        total += computeTotal(day[key])
      } else if (key === 'dinner') {
        total += computeTotal(day[key])
      }
    }
  })
  return total
}

export const totalActivities = (arr, pax = 1) => {
  let total = 0
  arr.forEach((item) => {
    for (let key in item) {
      if (key === 'morningEvents') {
        total += computeTotal(item[key])
      } else if (key === 'afternoonEvents') {
        total += computeTotal(item[key])
      }
    }
  })
  return total * pax
}
