import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyle from './modal.module.css';
import ModalOverlay from './modal-overlay/modalOverlay';

type TModal = {
  title?: string;
  setCloseModal: () => void;
  wrapperId?: string;
  children?: string | JSX.Element;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  wrapperElement.style.position = 'relative';
  wrapperElement.style.zIndex = '55';
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const Modal: FC<TModal> = ({ children, title, setCloseModal, wrapperId = "react-modals" }) => {  
  useEffect(() => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLBodyElement>) => {
      if (e.key === "Escape") setCloseModal();
    }

    document.body.addEventListener("keydown", onKeyDown as any);
    return () => { document.body.removeEventListener("keydown", onKeyDown as any) };
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

export default Modal;