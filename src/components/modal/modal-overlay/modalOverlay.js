import React from 'react';
import ModalOverlayStyle from './modalOverlay.module.css'

export default function ModalOverlay({ children }) {
    return (
        <div className={ModalOverlayStyle.modal_overlay}>
            { children }
        </div>
    )
}