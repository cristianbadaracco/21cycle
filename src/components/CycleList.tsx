'use client'

import { useRouter } from 'next/navigation'

import { formatDate } from '@/lib/utils'
import type { Cycle } from '@/lib/definitions'
import { Button, Modal, notification } from 'antd'
import useModal from '@/hooks/useModal'
import AddEditCycle from './forms/AddEditCycle'

import { addCycle, getAllCycles, removeCycle } from '@/lib/data'
import { useState } from 'react'
import Popconfirm from './PopConfirm'
import { RemoveIcon } from './icons/Icons'

interface Props {
  cycles: Cycle[] | null
}
const CyclesList: React.FC<Props> = ({ cycles = [] }) => {
  const [cyclesList, setCyclesList] = useState<Cycle[] | null>(cycles)
  const [loading, setLoading] = useState(false)
  const [selectedCycle, setSelectedCycle] = useState<Cycle | undefined>(undefined)

  const router = useRouter()

  const { isOpen, openModal, closeModal } = useModal()
  const { isOpen: openPopconfirm, openModal: openPopconfirmModal, closeModal: closePopconfirm } = useModal()

  const handleSubmit = async (cycle: Cycle): Promise<void> => {
    setLoading(true)
    const response = await addCycle(cycle)
    if (response !== null) {
      notification.success({
        message: `Ciclo "${response?.name}" agregado con exito`,
      })
      const newCycles = await getAllCycles()
      setCyclesList(newCycles)
    }
    setLoading(false)
    closeModal()
  }

  const handleDelete = async (id: string): Promise<void> => {
    setLoading(true)
    const response = await removeCycle(id)
    if (response !== null) {
      notification.success({
        message: `Ciclo "${response?.name}" eliminado con exito`,
      })
      const newCycles = await getAllCycles()
      setCyclesList(newCycles)
    }
    setLoading(false)
    closePopconfirm()
  }

  return (
    <div className="flex flex-col justify-between">
      <Modal open={isOpen} onCancel={closeModal} onOk={closeModal} footer={[]} destroyOnClose>
        <AddEditCycle
          onSubmit={(values) => {
            void handleSubmit(values)
          }}
          loading={loading}
        />
      </Modal>
      <Popconfirm
        open={openPopconfirm}
        onOk={() => {
          void handleDelete(selectedCycle?.id ?? '')
        }}
        onCancel={closePopconfirm}
        loading={loading}
      />
      <div className="">
        {Array.isArray(cyclesList) &&
          cyclesList.map((cycle) => (
            <div className=" p-6 border border-gray-200 rounded-lg  bg-background my-2 shadow-md" key={cycle.id}>
              <div className="flex justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">{cycle.name}</h5>
                <Button
                  onClick={() => {
                    setSelectedCycle(cycle)
                    openPopconfirmModal()
                  }}
                  className="bg-primary"
                  size="small"
                >
                  <RemoveIcon size={15} />
                </Button>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {`${formatDate(cycle?.start_date)} - ${formatDate(cycle?.end_date)}`}
              </p>
              <div
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-secondary rounded-lg hover:bg-secondary hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={() => {
                  router.push(`/cycle/${cycle.id}`)
                }}
              >
                Ver más
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4">
        <Button
          onClick={openModal}
          size="large"
          className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-primary text-[#141C24] text-md leading-normal tracking-[0.015em] mb-4"
        >
          Agregar ciclo
        </Button>
      </div>
    </div>
  )
}

export default CyclesList
