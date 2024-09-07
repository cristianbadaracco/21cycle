'use client'

import { useCallback, useState } from 'react'
import { Button, Modal } from 'antd'

import { type BehaviorInstanceComplete } from '@/lib/definitions'
import { uuidv4 } from '@/lib/utils'

import useModal from '@/hooks/useModal'

import { AddIcon } from '@/components/icons/Icons'
import Form from './Form'

import BehaviorItem from './BehaviorItem'
import { updateBehavior } from '@/lib/data'

interface Props {
  behaviors?: BehaviorInstanceComplete[]
}

const BehaviorSection: React.FC<Props> = ({ behaviors: behaviorData }) => {
  const [behaviors, setBehaviors] = useState<BehaviorInstanceComplete[]>(behaviorData ?? [])

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
    console.log('ON SUBMIT', values)
    if (isEditMode) {
      const updatedBehavior = await updateBehavior(values)
      if (updatedBehavior !== null) {
        console.log('UPDATED BEHAVIOR', updatedBehavior)
      } else {
        console.log('FALLo')
      }
    } else {
      const newBehavior = { ...values, id: uuidv4() }
      setBehaviors([...behaviors, newBehavior])
    }
    closeModal()
  }

  const onDelete = useCallback((id: string) => {
    const removedBehaviors = behaviors.filter((behavior) => behavior.id !== id)
    setBehaviors(removedBehaviors)
  }, [])

  return (
    <>
      <Modal destroyOnClose open={isOpen} onCancel={closeModal} onOk={closeModal} footer={null} width={350}>
        <Form
          onSubmit={(values) => {
            void onSubmit(values as BehaviorInstanceComplete)
          }}
          data={selectedBehavior}
        />
      </Modal>
      <div className="mt-2">
        {behaviors.map((behavior) => (
          <BehaviorItem
            key={behavior.id}
            behavior={behavior}
            onDelete={() => {
              onDelete(behavior.id)
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
        Agregar un comportamiento
      </Button>
    </>
  )
}

export default BehaviorSection
