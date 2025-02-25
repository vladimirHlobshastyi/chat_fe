import Modal from '@/components/Modal';
import { EditAdminModalProps } from './EditAdminModal.types';
import EditAdminForm from '@/forms/EditAdminForm';

const EditAdminModal = ({
  isOpen,
  currentAdmin,
  onSubmit,
  onClose,
  errorMessage,
}: EditAdminModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditAdminForm
        currentAdmin={currentAdmin}
        onSubmit={onSubmit}
        onClose={onClose}
        errorMessage={errorMessage}
      />
    </Modal>
  );
};

export default EditAdminModal;
