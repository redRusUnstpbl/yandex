import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../services/actions/detail';
import ModalOverlayStyle from './modalOverlay.module.css'

export default function ModalOverlay({ children }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDataModal = (state) => state.detail.id;
  const id = useSelector(getDataModal);

  const handleCloseModal = (e) => {
    if (e.target === ref.current) {
      dispatch(closeModal());
      
      if (id !== 'order_details') {
        navigate(-1);
      }
    }
  }

  return (
    <div ref={ref} onClick={handleCloseModal} className={ModalOverlayStyle.modal_overlay}>
      {children}
    </div>
  )
}