/* eslint-disable @typescript-eslint/comma-dangle */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar } from '@natscale/react-calendar'
import '@natscale/react-calendar/dist/main.css'

import { CYCLE_BEHAVIORS } from '@/mock/data'

import MobileHeader from '@/components/MobileHeader'
import DailyChart from '@/components/charts/DailyChart'
import BehaviorInfo from '../components/BehaviorInfo'
import { AddIcon } from '@/components/icons/Icons'

import type { Behavior } from '@/types/Behavior'
import type { Value } from '@natscale/react-calendar/dist/utils/types'

const Cycle: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(undefined)
  const [statistics, setStatistics] = useState(undefined)
  const [behaviors] = useState(CYCLE_BEHAVIORS)

  const onChange = useCallback(
    (val: Value) => {
      setSelectedDate(val)
    },
    [setSelectedDate],
  )

  const onDelete = useCallback((id: string) => {
    console.log(id)
  }, [])

  const getColor = (behavior: string): string => {
    switch (behavior) {
      case 'good':
        return '#86efac'
      case 'bad':
        return '#fca5a5'
      default:
        return 'black'
    }
  }

  const transformBehaviorsToStatistics = useCallback(
    (behaviors: Behavior[]) => {
      const types = new Set(behaviors.map((behavior) => behavior.behavior))
      const counts = Array.from(types).map((type) => {
        return {
          name: type,
          value: behaviors.filter((behavior) => behavior.behavior === type)
            .length,
          color: getColor(type),
        }
      })

      return counts
    },
    [],
  )

  useEffect(() => {
    if (behaviors !== undefined) {
      setStatistics(transformBehaviorsToStatistics(behaviors))
    }
  }, [behaviors, transformBehaviorsToStatistics])

  console.log(statistics)

  return (
    <div className="flex flex-col gap-4 p-2">
      <MobileHeader title="Período 1" />
      <div className="h-[0_0_70%] flex justify-center items-center">
        <Calendar value={selectedDate} onChange={onChange} size={340} />
      </div>
      <div className="h-[0_0_30%] ">
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg">
            {(selectedDate as Date).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <div className="border-2 rounded-md border-green-300 w-10 h-10 flex justify-center items-center">
              <AddIcon color="#86efac" size={25} />
            </div>
            <div className="border-2 rounded-md border-red-300 w-10 h-10 flex justify-center items-center">
              <AddIcon color="#fca5a5" size={25} />
            </div>
          </div>
        </div>
        {CYCLE_BEHAVIORS.map((behavior) => (
          <BehaviorInfo
            key={behavior.id}
            behavior={behavior.behavior}
            note={behavior.note}
            onDelete={() => {
              onDelete(behavior.id)
            }}
          />
        ))}
        {statistics !== undefined && <DailyChart data={statistics} />}
      </div>
    </div>
  )
}

export default Cycle
