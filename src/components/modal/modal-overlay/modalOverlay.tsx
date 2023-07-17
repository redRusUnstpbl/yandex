import { FC, useRef } from 'react';
import ModalOverlayStyle from './modalOverlay.module.css'

type TModalOverlay = {
  setCloseModal: () => void;
  children?: string | JSX.Element;
}

const ModalOverlay: FC<TModalOverlay> = ({ children, setCloseModal }) => {
  const ref = useRef(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === ref.current) {
      setCloseModal()
    }
  }

  return (
    <div ref={ref} onClick={handleCloseModal} className={ModalOverlayStyle.modal_overlay}>
      {children}
    </div>
  )
}

export default ModalOverlay;