import { useRef } from 'react';
import PropTypes from 'prop-types';
import ModalOverlayStyle from './modalOverlay.module.css'

export default function ModalOverlay({ children, setCloseModal }) {
  const ref = useRef(null);

  const handleCloseModal = (e) => {
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

ModalOverlay.propTypes = {
  "setCloseModal": PropTypes.func.isRequired,
}; 