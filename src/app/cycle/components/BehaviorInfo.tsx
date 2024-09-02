import { Popconfirm } from 'antd'

import { CloseIcon } from '@/components/icons/Icons'

interface BehaviorInfoProps {
  behavior: string
  note: string
  onDelete?: () => void
}

const BehaviorInfo: React.FC<BehaviorInfoProps> = ({
  behavior,
  note,
  onDelete,
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
      <span className="text-sm p-2 text-slate-700">{note}</span>
      <div className="p-2 flex flex-col justify-center">
        <Popconfirm
          placement="topLeft"
          title="Are you sure you want to delete?"
          okText="Yes"
          cancelText="No"
          onConfirm={onDelete}
        >
          <CloseIcon size={15} />
        </Popconfirm>
      </div>
    </div>
  )
}

export default BehaviorInfo
