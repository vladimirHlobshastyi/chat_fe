import Modal from '@/components/Modal';
import EditChatterForm from '@/forms/EditChatterForm';
import { EditChatterModalProps } from './EditChatterModal.types';

const EditChatterModal = ({
  isOpen,
  currentChatter,
  onSubmit,
  onClose,
  errorMessage,
}: EditChatterModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditChatterForm
        currentChatter={currentChatter}
        onSubmit={onSubmit}
        onClose={onClose}
        errorMessage={errorMessage}
      />
    </Modal>
  );
};

export default EditChatterModal;
