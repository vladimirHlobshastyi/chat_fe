import Modal from '@/components/Modal';
import { AddNewUserModalProps } from './AddNewUserModal.types';
import AddUserForm from '@/forms/AddUserForm';

const AddNewUserModal = ({
  isOpen,
  errorMessage,
  onClose,
  onSubmit,
}: AddNewUserModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddUserForm
        errorMessage={errorMessage}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddNewUserModal;
