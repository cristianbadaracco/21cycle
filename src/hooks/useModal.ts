import { useState, useCallback } from 'react'

// Define un tipo para el objeto que se va a retornar
interface UseModalReturn {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }
}

export default useModal
