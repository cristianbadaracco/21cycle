import { useEffect, useState } from 'react'

interface PopConfirmProps {
  onOk?: () => void
  onCancel?: () => void
  open?: boolean
}

const Popconfirm: React.FC<PopConfirmProps> = ({ onOk, onCancel, open = false }) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  if (!isOpen) return null

  return (
    <div
      id="popconfirm"
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black bg-opacity-45"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full z-50 m-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto md:mx-0">
            <i className="bx bx-error text-3xl">&#9888;</i>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p className="font-bold">Cuidado!</p>
            <p className="text-sm text-gray-700 mt-1">
              Si eliminas esto, perderás todos tus datos. Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            id="confirm-delete-btn"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            onClick={onOk}
          >
            Eliminar
          </button>
          <button
            id="confirm-cancel-btn"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popconfirm
