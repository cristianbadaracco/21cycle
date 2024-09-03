'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from 'antd'
import { Calendar } from '@natscale/react-calendar'

import '@natscale/react-calendar/dist/main.css'

import { CYCLE_BEHAVIORS } from '@/lib/placeholder-data'

import DailyChart from '@/components/charts/DailyChart'
import BehaviorInfo from '../_components/BehaviorInfo'
import Form from '../_components/Form'

import { AddIcon } from '@/components/icons/Icons'

import type { Behavior, Statistic } from '@/lib/definitions'
import type { Value } from '@natscale/react-calendar/dist/utils/types'

import useModal from '@/hooks/useModal'

import { uuidv4 } from '@/lib/utils'

const Cycle: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(new Date())
  const [statistics, setStatistics] = useState<Statistic[] | undefined>(undefined)
  const [behaviors, setBehaviors] = useState<Behavior[]>(CYCLE_BEHAVIORS ?? [])
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedBehavior, setSelectedBehavior] = useState<Behavior | undefined>(undefined)

  const { isOpen, openModal, closeModal } = useModal()

  const onChange = useCallback(
    (val: Value) => {
      setSelectedDate(val)
    },
    [setSelectedDate],
  )

  const onDelete = useCallback((id: string) => {
    const removedBehaviors = behaviors.filter((behavior) => behavior.id !== id)
    setBehaviors(removedBehaviors)
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

  const transformBehaviorsToStatistics = useCallback((behaviors: Behavior[]): Statistic[] => {
    const types = new Set(behaviors.map((behavior) => behavior.behavior))
    const counts = Array.from(types).map((type) => {
      return {
        name: type,
        value: behaviors.filter((behavior) => behavior.behavior === type).length,
        color: getColor(type),
      }
    })

    return counts
  }, [])

  useEffect(() => {
    if (behaviors !== undefined) {
      setStatistics(transformBehaviorsToStatistics(behaviors))
    }
  }, [behaviors, transformBehaviorsToStatistics])

  const onSubmit = (values: Behavior): void => {
    if (isEditMode) {
      const updatedBehaviors = behaviors.map((behavior) => {
        if (behavior.id === values.id) {
          return values
        }
        return behavior
      })
      setBehaviors(updatedBehaviors)
    } else {
      const newBehavior = { ...values, id: uuidv4() }
      setBehaviors([...behaviors, newBehavior])
    }
    closeModal()
  }

  const onAddBehavior = useCallback((): void => {
    openModal()
    setIsEditMode(false)
    setSelectedBehavior(undefined)
  }, [])

  const onEditBehavior = useCallback((behavior: Behavior) => {
    openModal()
    setIsEditMode(true)
    setSelectedBehavior(behavior)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-2 md:flex-row">
      <Modal destroyOnClose open={isOpen} onCancel={closeModal} onOk={closeModal} footer={null}>
        <Form onSubmit={onSubmit} data={selectedBehavior} />
      </Modal>
      <div className="h-[0_0_70%] flex justify-center items-center md:flex-col md:justify-start">
        <Calendar value={selectedDate} onChange={onChange} size={340} />
      </div>
      <div className="h-[0_0_30%] ">
        <div className="flex justify-between items-center mt-4 md:mt-0">
          <span className="text-lg">{selectedDate?.toString()}</span>
          <div className="flex gap-2">
            <div
              className="border-2 rounded-md border-slate-800 w-10 h-10 flex justify-center items-center"
              onClick={onAddBehavior}
            >
              <AddIcon color="#1e293b" size={25} />
            </div>
          </div>
        </div>
        {behaviors.map((behavior) => (
          <BehaviorInfo
            key={behavior.id}
            behavior={behavior.behavior}
            note={behavior.note}
            onDelete={() => {
              onDelete(behavior.id)
            }}
            onSelect={() => {
              onEditBehavior(behavior)
            }}
          />
        ))}
        {statistics !== undefined && <DailyChart data={statistics} />}
      </div>
    </div>
  )
}

export default Cycle
