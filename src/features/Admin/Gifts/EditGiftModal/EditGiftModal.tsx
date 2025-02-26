import Modal from '@/components/Modal';
import { EditGiftModalProps } from './EditGiftModal.types';
import EditGiftForm from '@/forms/EditGiftForm';

const EditGiftModal = ({
  isOpen,
  errorMessage,
  initialProps,
  giftUrl,
  onClose,
  onSubmit,
}: EditGiftModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditGiftForm
        giftUrl={giftUrl}
        initialProps={initialProps}
        onClose={onClose}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default EditGiftModal;
