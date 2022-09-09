import React from 'react'
import VenueBreakdownRows from '../venue/VenueBreakdownRows'
import VenueRows from '../venue/VenueRows'
import DayRow from './DayRow'

const DayRows = ({ day, pax }) => {
  const {
    date,
    transfer_in,
    morningEvents,
    lunch,
    afternoonEvents,
    dinner,
    transfer_out
  } = day
  return (
    <>
      {transfer_in.length > 0 && (
        <DayRow
          pax={transfer_in.length}
          date={date}
          options={transfer_in}
          description='Transfer Aiport/Hotel'
          id='transfer_in'
        />
      )}
      {morningEvents.length > 0 && (
        <>
          {morningEvents[0].transfer.length > 0 && (
            <DayRow
              pax={morningEvents[0].transfer.length}
              date={date}
              options={morningEvents[0].transfer}
              description='Transfer'
              id='transfer'
            />
          )}
          <DayRow
            pax={pax}
            date={date}
            options={morningEvents}
            description='Morning Events'
            multipleChoice={`${morningEvents.length > 1}`}
            id='morningEvents'
          />
        </>
      )}
      {lunch.length > 0 && (
        <>
          <DayRow
            pax={lunch[0].transfer.length}
            date={date}
            options={lunch[0].transfer}
            description='Transfer'
            id='transfer'
          />
          <DayRow
            pax={pax}
            date={date}
            options={lunch}
            description='Lunch Restaurants'
            multipleChoice={`${lunch.length > 1}`}
            id='lunch'
          />
        </>
      )}
      {afternoonEvents.length > 0 && (
        <>
          <DayRow
            pax={afternoonEvents[0].transfer.length}
            date={date}
            options={afternoonEvents[0].transfer}
            description='Transfer'
            id='transfer'
          />
          <DayRow
            pax={pax}
            date={date}
            options={afternoonEvents}
            description='Afternoon Events'
            multipleChoice={`${afternoonEvents.length > 1}`}
            id='afternoonEvents'
          />
        </>
      )}
      {dinner.length > 0 && (
        <>
          <DayRow
            pax={dinner[0].transfer.length}
            date={date}
            options={dinner[0].transfer}
            description='Transfer'
            id='transfer'
          />
          {dinner[0].isVenue ? (
            <>
              <VenueRows venues={dinner} pax={pax} />
              <VenueBreakdownRows venues={dinner} />
            </>
          ) : (
            <DayRow
              pax={pax}
              date={date}
              options={dinner}
              description='Dinner Restaurants'
              multipleChoice={`${dinner.length > 1}`}
              id='dinner'
            />
          )}
        </>
      )}

      {transfer_out.length > 0 && (
        <DayRow
          pax={transfer_out.length}
          date={date}
          options={transfer_out}
          description='Hotel or City/Airport'
          id='transfer_out'
        />
      )}
    </>
  )
}

export default DayRows
