import Modal from '@/components/Modal';
import EditUserForm from '@/forms/EditUserForm';
import { EditUserModalProps } from './EditUserModal.types';

const EditUserModal = ({
  isOpen,
  currentUser,
  onSubmit,
  onClose,
  errorMessage,
}: EditUserModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditUserForm
        currentUser={currentUser}
        onSubmit={onSubmit}
        onClose={onClose}
        errorMessage={errorMessage}
      />
    </Modal>
  );
};

export default EditUserModal;
