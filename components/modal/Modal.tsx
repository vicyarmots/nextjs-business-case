import React, { MouseEvent, ReactNode } from "react";
import ReactDOM from "react-dom";
import s from "./Modal.module.css";

type ModalProps = {
  onClose?: () => void;
  children?: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    // onClose();
  };

  const modalContent = (
    <div className={s.overlay}>
      <div className={s.wrapper}>
        <div className={s.modal}>
          <div className={s.header}>
            <button onClick={handleCloseClick}>CLOSE</button>
          </div>
          <div className={s.body}>{children}</div>
        </div>
      </div>
    </div>
  );

  // return ReactDOM.createPortal(
  //   modalContent,
  //   document.getElementById("modal") as HTMLElement
  // );

  return modalContent;
};

export default Modal;
