import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../services/actions/detail';
import ModalOverlayStyle from './modalOverlay.module.css'

export default function ModalOverlay({ children }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const handleCloseModal = (e) => {
    if (e.target == ref.current) {
      dispatch(closeModal());
    }
  }

  return (
    <div ref={ref} onClick={handleCloseModal} className={ModalOverlayStyle.modal_overlay}>
      {children}
    </div>
  )
}