
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./TextareaDialog.module.css";

const modalRoot = document.getElementById("modal-root");

interface ITextareaDialogProp {
    isOpen: boolean;
    onClose: () => void;
    onSave: (text: string) => void;
}

const TextareaDialog = ({ isOpen, onClose, onSave }: ITextareaDialogProp) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (isOpen) {
            setText("");
        }
    }, [isOpen]);

    if (!isOpen || !modalRoot) return null;
  
    return ReactDOM.createPortal(
      <div className={styles.dialog__backdrop}>
        <div className={styles.dialog__box}>
          <h2 className={styles.dialog__title}>반려 사유</h2>
          <textarea
            className={styles.dialog__textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.dialog__buttons}>
            <button className={`${styles.dialog__button} ${styles.cancel}`} onClick={onClose}>
              취소
            </button>
            <button
              className={`${styles.dialog__button} ${styles.save}`}
              onClick={() => onSave(text)}
            >
              반려
            </button>
          </div>
        </div>
      </div>,
      modalRoot
    );
  };
  
  export default TextareaDialog;
