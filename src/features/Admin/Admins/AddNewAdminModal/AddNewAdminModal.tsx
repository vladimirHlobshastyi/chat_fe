import Modal from '@/components/Modal';
import { AddNewAdminModalProps } from './AddNewAdminModal.types';
import AddAdminForm from '@/forms/AddAdminForm';

const AddNewAdminModal = ({
  isOpen,
  errorMessage,
  onClose,
  onSubmit,
}: AddNewAdminModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddAdminForm
        errorMessage={errorMessage}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddNewAdminModal;
