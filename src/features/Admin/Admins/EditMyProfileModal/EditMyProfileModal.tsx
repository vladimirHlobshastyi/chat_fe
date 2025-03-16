import Modal from '@/components/Modal';
import { EditMeModalProps } from './EditMyModal.types';
import EditMeForm from '@/forms/EditMyProfileForm';

const EditMyProfileModal = ({
  isOpen,
  data,
  onSubmit,
  onClose,
  errorMessage,
}: EditMeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditMeForm
        data={data}
        onSubmit={onSubmit}
        onClose={onClose}
        errorMessage={errorMessage}
      />
    </Modal>
  );
};

export default EditMyProfileModal;
