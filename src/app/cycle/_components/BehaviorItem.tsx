import PopConfirm from '@/components/PopConfirm'

import useModal from '@/hooks/useModal'

import { MdClose as CloseIcon } from 'react-icons/md'

import type { BehaviorInstanceComplete } from '@/lib/definitions'
import { BadIcon, GoodIcon } from '@/components/icons/Icons'

interface BehaviorInfoProps {
  behavior: BehaviorInstanceComplete
  onDelete?: () => void
  onSelect?: () => void
}

const BehaviorItem: React.FC<BehaviorInfoProps> = ({ behavior, onDelete, onSelect }) => {
  const { note, name } = behavior
  const { isOpen: openPopconfirm, openModal: openPopconfirmModal, closeModal: closePopconfirm } = useModal()

  return (
    <div className="flex py-2 items-center">
      <div className="flex justify-center items-center bg-primary w-10 h-10 rounded-md shrink-0">
        {name === 'good' ? <GoodIcon size={18} /> : <BadIcon size={19} />}
      </div>
      <div className="flex text-sm p-2 text-slate-700" onClick={onSelect}>
        <span>{note}</span>
      </div>
      <div className="p-2 flex flex-col justify-center">
        <PopConfirm open={openPopconfirm} onOk={onDelete} onCancel={closePopconfirm} />
        <div onClick={openPopconfirmModal}>
          <CloseIcon size={15} />
        </div>
      </div>
    </div>
  )
}

export default BehaviorItem
