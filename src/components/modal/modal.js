import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/detail';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyle from './modal.module.css';
import ModalOverlay from './modal-overlay/modalOverlay';

function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export default function Modal({ children, title, wrapperId = "react-modals" }) {
    useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown);
        return () => { document.body.removeEventListener("keydown", onKeyDown) };
    }, []);

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    const onKeyDown = (e) => {
        if (e.key === "Escape") handleCloseModal()
    }

    let root = document.getElementById(wrapperId);
    if (!root) {
        root = createWrapperAndAppendToBody(wrapperId);
    }

    return createPortal(
        <ModalOverlay>
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