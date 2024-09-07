import PopConfirm from '@/components/PopConfirm'
import { Button } from 'antd'

import useModal from '@/hooks/useModal'

import type { BehaviorInstanceComplete } from '@/lib/definitions'

import { BadIcon, GoodIcon, RemoveIcon } from '@/components/icons/Icons'

interface BehaviorInfoProps {
  behavior: BehaviorInstanceComplete
  onDelete?: () => void
  onSelect?: () => void
}

const BehaviorItem: React.FC<BehaviorInfoProps> = ({ behavior, onDelete, onSelect }) => {
  const { note, name } = behavior
  const { isOpen: openPopconfirm, openModal: openPopconfirmModal, closeModal: closePopconfirm } = useModal()

  return (
    <div className="flex py-2 items-center justify-between">
      <div className="flex justify-center items-center bg-primary w-10 h-10 rounded-md shrink-0">
        {name === 'good' ? <GoodIcon size={22} /> : <BadIcon size={22} />}
      </div>
      <div className="flex justify-between items-center flex-1">
        <div className="flex text-sm p-2 text-slate-700" onClick={onSelect}>
          <span>{note}</span>
        </div>
        <div className="p-2 flex flex-col justify-center">
          <PopConfirm open={openPopconfirm} onOk={onDelete} onCancel={closePopconfirm} />
          <Button onClick={openPopconfirmModal} className="bg-primary" size="small">
            <RemoveIcon size={15} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BehaviorItem
