import PopConfirm from '@/components/PopConfirm'

import { MdClose as CloseIcon } from 'react-icons/md'
import useModal from '@/hooks/useModal'
import type { BehaviorInstance } from '@/lib/definitions'

interface BehaviorInfoProps {
  behavior: BehaviorInstance
  onDelete?: () => void
  onSelect?: () => void
}

const BehaviorItem: React.FC<BehaviorInfoProps> = ({ behavior, onDelete, onSelect }) => {
  const { behavior_id, note } = behavior
  let behaviorColor = ''
  switch (behavior_id) {
    case '1':
      behaviorColor = 'border-l-green-300'
      break
    case '2':
      behaviorColor = 'border-l-red-300'
      break
    default:
      break
  }

  const { isOpen: openPopconfirm, openModal: openPopconfirmModal, closeModal: closePopconfirm } = useModal()

  return (
    <div
      className={`border border-grey-100 border-l-8 ${behaviorColor} my-4 rounded-md flex shadow-md  justify-between`}
    >
      <span className="text-md p-2 text-slate-700" onClick={onSelect}>
        {note}
      </span>
      <div className="p-2 flex flex-col justify-center">
        <PopConfirm open={openPopconfirm} onOk={onDelete} onCancel={closePopconfirm} />
        <div onClick={openPopconfirmModal}>
          <CloseIcon size={20} />
        </div>
      </div>
    </div>
  )
}

export default BehaviorItem
