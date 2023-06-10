import React, { useEffect } from 'react';
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

export default function Modal({ children, title, handleClose, wrapperId = "react-modals" }) {
    const [visible, setVisible] = React.useState(true);

    useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const closeModal = () => {
        setVisible(false);
        handleClose();
    }

    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            closeModal()
        }
    }

    let root = document.getElementById(wrapperId);
    if (!root) {
        root = createWrapperAndAppendToBody(wrapperId);
    }

    return createPortal(
        <>
            {visible && (
                <ModalOverlay>
                    <div className={ModalStyle.modal}>
                        <div className={ModalStyle.modal_header}>
                            <p className={ModalStyle.modal_header_value}>{title}</p>
                            <button className={ModalStyle.modal_header_close} onClick={closeModal}>
                                <CloseIcon type="primary" />
                            </button>
                        </div>
                        <div className={ModalStyle.modal_body}>
                            {children}
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </>,
        root
    );
}