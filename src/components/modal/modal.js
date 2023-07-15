import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyle from './modal.module.css';
import ModalOverlay from './modal-overlay/modalOverlay';

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default function Modal({ children, title, setCloseModal, wrapperId = "react-modals" }) {  
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setCloseModal();
    }

    document.body.addEventListener("keydown", onKeyDown);
    return () => { document.body.removeEventListener("keydown", onKeyDown) };
  }, [setCloseModal]);

  const handleCloseModal = () => {
    setCloseModal();
  }

  let root = document.getElementById(wrapperId);
  if (!root) {
    root = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(
    <ModalOverlay setCloseModal={setCloseModal}>
      <div className={ModalStyle.modal}>
        <div className={ModalStyle.modal_header}>
          <p className={ModalStyle.modal_header_value}>{title}</p>
          <button className={ModalStyle.modal_header_close} onClick={handleCloseModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={ModalStyle.modal_body}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    root
  );
}

Modal.propTypes = {
  "title": PropTypes.string,
  "setCloseModal": PropTypes.func.isRequired,
  "wrapperId": PropTypes.string,
}; 