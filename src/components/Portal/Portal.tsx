import { createPortal } from 'react-dom';
import { PortalProps } from './types';

const Portal = ({ children, targetId = 'root' }: PortalProps) => {
  const element = document.getElementById(targetId);

  return element && createPortal(children, element);
};

export default Portal;
