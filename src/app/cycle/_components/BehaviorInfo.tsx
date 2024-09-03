import { Popconfirm } from 'antd'

import { CloseIcon } from '@/components/icons/Icons'

interface BehaviorInfoProps {
  behavior: string
  note: string
  onDelete?: () => void
  onSelect?: () => void
}

const BehaviorInfo: React.FC<BehaviorInfoProps> = ({
  behavior,
  note,
  onDelete,
  onSelect,
}) => {
  let behaviorColor = ''
  switch (behavior) {
    case 'good':
      behaviorColor = 'border-l-green-300'
      break
    case 'bad':
      behaviorColor = 'border-l-red-300'
      break
    default:
      break
  }

  return (
    <div
      className={`border border-grey-100 border-l-8 ${behaviorColor} my-4 rounded-md flex shadow-md  justify-between`}
    >
      <span className="text-md p-2 text-slate-700" onClick={onSelect}>
        {note}
      </span>
      <div className="p-2 flex flex-col justify-center">
        <Popconfirm
          placement="topLeft"
          title="¿Está seguro que quiere eliminar?"
          okText="Yes"
          cancelText="No"
          onConfirm={onDelete}
          className="text-red-500 cursor-pointer"
        >
          <CloseIcon size={20} />
        </Popconfirm>
      </div>
    </div>
  )
}

export default BehaviorInfo
