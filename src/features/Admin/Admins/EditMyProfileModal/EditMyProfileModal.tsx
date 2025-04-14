import Modal from '@/components/Modal';
import { EditMeModalProps } from './EditMyModal.types';
import EditMeForm from '@/forms/EditMyProfileForm';

const EditMyProfileModal = ({
  isOpen,
  data,
  role,
  onSubmit,
  onClose,
  errorMessage,
}: EditMeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditMeForm
        role={role}
        data={data}
        onSubmit={onSubmit}
        onClose={onClose}
        errorMessage={errorMessage}
      />
    </Modal>
  );
};

export default EditMyProfileModal;
