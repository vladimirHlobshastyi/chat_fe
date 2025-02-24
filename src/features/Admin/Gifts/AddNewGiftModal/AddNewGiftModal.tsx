import Modal from '@/components/Modal';
import { AddNewGiftModalProps } from './AddNewGiftModal.types';
import AddNewGiftForm from '@/forms/AddNewGiftForm';

const AddNewGiftModal = ({
  isOpen,
  errorMessage,
  onClose,
  onSubmit,
}: AddNewGiftModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddNewGiftForm
        errorMessage={errorMessage}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddNewGiftModal;
