'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'

interface IConfirmModalProps {
  onConfirm?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  modalHeader: React.ReactNode
  modalBody: React.ReactNode
  confirmButtonText: string
  cancelButtonText: string
  isOpen: boolean
  onClose: () => void
}
const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isDisabled,
  modalHeader,
  modalBody,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <Modal
      classNames={{ base: 'bg-ct-white' }}
      placement='center'
      size='sm'
      isOpen={isOpen}
      onClose={onClose}
      radius='sm'
    >
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className='text-ct-blue justify-center text-2xl font-semibold'>
              {modalHeader}
            </ModalHeader>
            <ModalBody className='text-center'>
              <div className='text-sm font-normal text-foreground'>{modalBody}</div>
            </ModalBody>
            <ModalFooter className='flex flex-col'>
              <Button color='default' onPress={closeModal}>
                {cancelButtonText}
              </Button>
              <Button
                color='danger'
                onPress={onConfirm}
                isDisabled={isDisabled}
                isLoading={isLoading}
              >
                {confirmButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
