'use client'

import { useCallback, useState } from 'react'
import { Button, Modal, notification } from 'antd'
import { uuidv4 } from '@/lib/utils'

import type { Behavior, BehaviorInstance, BehaviorInstanceComplete } from '@/lib/definitions'
import {
  addBehaviorInstance,
  getAllBehaviorInstancesComplete,
  removeBehaviorInstance,
  updateBehaviorInstance,
} from '@/lib/data'

import useModal from '@/hooks/useModal'

import Form from '../../../components/forms/AddEditBehaviorInstance'

import BehaviorItem from './BehaviorItem'

interface Props {
  behaviors?: BehaviorInstanceComplete[]
  behaviorOptions?: Behavior[]
}

const BehaviorSection: React.FC<Props> = ({ behaviors: behaviorData, behaviorOptions }) => {
  const [behaviors, setBehaviors] = useState<BehaviorInstanceComplete[]>(behaviorData ?? [])
  const [loading, setLoading] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)

  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorInstanceComplete | undefined>(undefined)

  const { isOpen, openModal, closeModal } = useModal()

  const onAddBehavior = useCallback((): void => {
    openModal()
    setIsEditMode(false)
    setSelectedBehavior(undefined)
  }, [])

  const onEditBehavior = useCallback((behavior: BehaviorInstanceComplete) => {
    openModal()
    setIsEditMode(true)
    setSelectedBehavior(behavior)
  }, [])

  const onSubmit = async (values: BehaviorInstanceComplete): Promise<void> => {
    const selectedDate = JSON.parse(localStorage.getItem('selectedDate') ?? '')
    const behavior: BehaviorInstance = {
      ...values,
      id: values?.id ?? uuidv4(),
      date: selectedDate !== '' ? new Date(selectedDate as string) : new Date(),
      cycle_id: values?.cycle_id ?? '10a3fa07-d1a0-487b-a168-a410dbcf1afd',
      note: values?.note ?? undefined,
      behavior_id: values?.behavior_id ?? undefined,
    }

    setLoading(true)
    try {
      if (isEditMode) {
        await updateBehaviorInstance(behavior)
      } else {
        const response = await addBehaviorInstance(behavior)
        if (response !== null) {
          notification.success({
            message: 'Comportamiento guardado con exito',
          })
        }
      }
    } catch (error) {
      notification.error({
        message: 'Ha ocurrido un error al guardar un comportamiento.',
      })
    } finally {
      setLoading(false)
    }

    await fetchBehaviors()
    closeModal()
  }

  const onDelete = async (id: string): Promise<void> => {
    setLoading(true)
    try {
      const removedBehaviors = await removeBehaviorInstance(id)
      console.log(removedBehaviors)
      if (removedBehaviors !== null) {
        notification.success({
          message: 'Comportamiento eliminado con exito',
        })
      }
    } finally {
      setLoading(false)
    }
    await fetchBehaviors()
  }

  const fetchBehaviors = async (): Promise<void> => {
    const updatedBehaviors = await getAllBehaviorInstancesComplete()
    setBehaviors(updatedBehaviors)
  }

  return (
    <>
      <Modal destroyOnClose open={isOpen} onCancel={closeModal} onOk={closeModal} footer={null} width={350}>
        <Form
          onSubmit={(values) => {
            void onSubmit(values as BehaviorInstanceComplete)
          }}
          data={selectedBehavior}
          loading={loading}
          behaviorOptions={behaviorOptions}
        />
      </Modal>
      <div className="mt-2">
        {Array.isArray(behaviors) &&
          behaviors.map((behavior) => (
            <BehaviorItem
              key={behavior.id}
              behavior={behavior}
              onDelete={() => {
                void onDelete(behavior.id)
              }}
              onSelect={() => {
                onEditBehavior(behavior)
              }}
            />
          ))}
      </div>
      <Button
        onClick={onAddBehavior}
        size="large"
        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-primary text-[#141C24] text-md leading-normal tracking-[0.015em] mt-10 mb-4"
      >
        Agregar comportamiento
      </Button>
    </>
  )
}

export default BehaviorSection
