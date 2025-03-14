import Modal from '@/components/Modal';
import EditModelForm from '@/forms/EditModelForm';
import { EditModelModalProps } from './EditModelModal.types';

const EditModelModal = ({
  isOpen,
  currentModel,
  onSubmit,
  onClose,
  errorMessage,
}: EditModelModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditModelForm
        currentModel={currentModel}
        onSubmit={onSubmit}
        onClose={onClose}
        errorMessage={errorMessage}
      />
    </Modal>
  );
};

export default EditModelModal;
