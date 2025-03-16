import Modal from '@/components/Modal';
import { AddNewChatterModalProps } from './AddNewChatterModal.types';
import AddChatterForm from '@/forms/AddChatterForm';

const AddNewChatterModal = ({
  isOpen,
  errorMessage,
  onClose,
  onSubmit,
}: AddNewChatterModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddChatterForm
        errorMessage={errorMessage}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddNewChatterModal;
