'use client'

import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Divider } from '@heroui/react'
import { AlertTriangle } from 'lucide-react'

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
  deleteOnFacebook?: boolean
  onDeleteOnFacebookChange?: (value: boolean) => void
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
  deleteOnFacebook,
  onDeleteOnFacebookChange,
}) => {
  return (
    <Modal
      classNames={{
        base: 'bg-white',
        header: 'pb-2',
        body: 'py-4',
        footer: 'pt-4',
      }}
      placement='center'
      size='md'
      isOpen={isOpen}
      onClose={onClose}
      radius='lg'
      hideCloseButton={isLoading}
    >
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <div className='flex items-center justify-center gap-2 text-danger'>
                <AlertTriangle className='size-5' />
                <span className='text-xl font-semibold'>{modalHeader}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='text-center'>
                <p className='text-sm font-normal text-foreground mb-4'>{modalBody}</p>
                {onDeleteOnFacebookChange !== undefined && (
                  <>
                    <Divider className='my-4' />
                    <div className='flex items-center justify-center'>
                      <Checkbox
                        isSelected={deleteOnFacebook}
                        onValueChange={onDeleteOnFacebookChange}
                        classNames={{ label: 'text-sm text-foreground' }}
                      >
                        Xóa trên Facebook
                      </Checkbox>
                    </div>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter className='flex-row gap-2 justify-end'>
              <Button
                color='default'
                variant='flat'
                onPress={closeModal}
                isDisabled={isLoading}
                className='min-w-20'
              >
                {cancelButtonText}
              </Button>
              <Button
                color='danger'
                onPress={onConfirm}
                isDisabled={isDisabled}
                isLoading={isLoading}
                className='min-w-24'
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
