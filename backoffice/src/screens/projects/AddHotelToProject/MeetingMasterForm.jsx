import { Icon } from '@iconify/react'
import { useRef } from 'react'
import Button from '../../../ui/Button'
import TextAreaInput from '../../../ui/inputs/TextAreaInput'
import TextInput from '../../../ui/inputs/TextInput'

const MeetingMasterForm = ({ date, timing, addMeetingToSchedule }) => {
  const fileInput = useRef()
  return (
    <div className='text-slate-50'>
      <h1 className='font-bold uppercase underline underline-offset-4'>{`${timing} on ${date}`}</h1>
      <fieldset className='grid grid-cols-7'>
        <div className='w-[120px] '>
          <TextInput
            label='Room Capacity'
            name='roomCapacity'
            placeholder='Ex. 100'
            type='number'
          />
          {timing !== 'All day' ? (
            <>
              <TextInput
                label='HD Rental'
                name='HDRate'
                placeholder='Ex. 1500'
                type='number'
              />
              <TextInput
                label='HD Delegate.Rate'
                name='HDDDR'
                placeholder='Ex. 60'
                type='number'
              />
            </>
          ) : (
            <>
              <TextInput
                label='Full Day Rental'
                name='FDRate'
                placeholder='Ex. 2600'
                type='number'
              />
              <TextInput
                label='FD Delegate.Rate'
                name='FDDDR'
                placeholder='Ex. 120'
                type='number'
              />
            </>
          )}

          <TextInput
            label='Audiovisuals'
            name='aavvPackage'
            placeholder='Ex. 3000'
            type='number'
          />
        </div>
        <div className='w-[120px] '>
          <TextInput
            label='Coffee Break Units'
            name='cofeeBreakUnits'
            placeholder='Ex. 45'
            type='number'
          />
          <TextInput
            label='Coffee Break Price'
            name='coffeeBreakPrice'
            placeholder='Ex. 40'
            type='number'
          />
          <TextInput
            label='Lunch units'
            name='workingLunchUnits'
            placeholder='Ex. 40'
            type='number'
          />
          <TextInput
            label='Lunch price'
            name='workingLunchPrice'
            placeholder='Ex. 40'
            type='number'
          />
        </div>
        <div className='w-[100px] '>
          <TextInput
            label='Dinner units'
            name='hotelDinnerUnits'
            placeholder='Ex. 40'
            type='number'
          />
          <TextInput
            label='Dinner price'
            name='hotelDinnerPrice'
            placeholder='Ex. 82'
            type='number'
          />
        </div>
        <div className=''>
          <TextAreaInput
            name='introduction'
            className='
                     px-3
                     py-1.5
                     rounded-sm
                     mt-7
                     w-[520px]
                     h-[150px]
                     focus:text-gray-700 focus:outline-none
                   '
            placeholder='Write a description of the restaurant'
            type='text'
          />
          <div className='flex flex-row items-center'>
            <div className='flex align-center justify-start'>
              <label htmlFor='file-upload' className='custom-file-upload'>
                <Icon icon='akar-icons:cloud-upload' width='40' />
              </label>
              <input
                id='file-upload'
                type='file'
                ref={fileInput}
                name='imageContentUrl'
                multiple
              />
            </div>
            <div>
              <Button type='button' handleClick={addMeetingToSchedule}>
                Add Meeting
              </Button>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default MeetingMasterForm
