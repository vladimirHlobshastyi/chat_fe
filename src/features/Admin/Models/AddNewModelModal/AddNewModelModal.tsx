import Modal from '@/components/Modal';
import { AddNewModelModalProps } from './AddNewModelModal.types';
import AddModelForm from '@/forms/AddModelForm';

const AddNewModelModal = ({
  isOpen,
  errorMessage,
  onClose,
  onSubmit,
}: AddNewModelModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddModelForm
        errorMessage={errorMessage}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddNewModelModal;
