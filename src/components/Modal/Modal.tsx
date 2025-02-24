import { cn } from '@/utils/styles';
import { RefObject, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Portal from '../Portal';
import useUniversalKeyboardShortcuts from '@/hooks/useUniversalKeyboardShortcuts';
import { ModalProps } from './Modal.types';

const Modal = ({
  children,
  isOpen = false,
  className,
  onClose,
  ...props
}: ModalProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useUniversalKeyboardShortcuts({
    shortcuts: [{ key: 'Escape', action: () => onClose?.() }],
    ref: modalRef as RefObject<HTMLElement>,
  });

  const hideModalWithAnimation = () => {
    if (isRemoving) {
      flushSync(() => {
        setIsRemoving(false);
        setIsModalOpened(false);
      });
    }
  };

  useEffect(() => {
    if (isOpen && !isModalOpened) {
      setIsModalOpened(true);
      modalRef.current?.focus();
    }

    if (!isOpen && isModalOpened) {
      setIsRemoving(true);
    }

    if (isModalOpened) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpened, isOpen]);

  useEffect(() => {
    if (!isRemoving && isModalOpened) {
      setIsModalOpened(false);
    }
  }, [isRemoving]);

  if (!isModalOpened) return null;

  return (
    <Portal>
      <div
        className='fixed max-h-content inset-0 z-50 flex items-center justify-center'
        ref={modalRef}
        tabIndex={-2}
        onAnimationEnd={hideModalWithAnimation}
        {...props}
      >
        <div
          className={cn('absolute inset-0 bg-black/50', {
            'animate-fadeOut': isRemoving,
            'animate-fadeIn': !isRemoving,
          })}
          onClick={onClose}
          aria-hidden='true'
        />
        <div
          className={cn(
            'relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl',
            {
              'animate-modalOut': isRemoving,
              'animate-modalIn': !isRemoving,
            },
            className,
          )}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
