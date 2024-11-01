import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { useEffect, useRef } from "react";

const Modal = ({ open, onClose, children }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className={classes.modal} ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
