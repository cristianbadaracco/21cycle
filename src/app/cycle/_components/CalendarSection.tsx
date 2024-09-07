'use client'

import { useCallback, useState } from 'react'
import { Calendar } from '@natscale/react-calendar'
import type { Value } from '@natscale/react-calendar/dist/utils/types'

import '@natscale/react-calendar/dist/main.css'

const CalendarSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(new Date())

  const onDayChange = useCallback(
    (val: Value) => {
      setSelectedDate(val)
      localStorage.setItem('selectedDate', JSON.stringify(val))
    },
    [setSelectedDate],
  )

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center" id="calendar">
        <Calendar value={selectedDate} onChange={onDayChange} size={350} />
      </div>
      <span className="text-xl font-medium mt-10">
        {(selectedDate as Date)?.toLocaleDateString('es', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </div>
  )
}

export default CalendarSection
