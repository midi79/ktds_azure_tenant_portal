import ReactDOM from "react-dom";
import styles from "./ImageDialog.module.css";

const modalRoot = document.getElementById("modal-root");

interface ITextareaDialogProp {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    desc: string;
    image: any;
    width: number;
    height: number;
}

const ImageDialog = ({ isOpen, onClose, title, image, desc, width, height }: ITextareaDialogProp) => {
    
    if (!isOpen || !modalRoot) return null;
  
    return ReactDOM.createPortal(
      <div className={styles.dialog__backdrop}>
        <div className={styles.dialog__box}>
          <h2 className={styles.dialog__title}>{title}</h2>
          <img src={image} width={width} height={height}/>
          <h3 className={styles.dialog__desc}>{desc}</h3>
          <div className={styles.dialog__buttons}>            
            <button className={`${styles.dialog__button} ${styles.close}`} onClick={onClose}>
              닫기
            </button>            
          </div>
        </div>
      </div>,
      modalRoot
    );
  };
  
  export default ImageDialog;
