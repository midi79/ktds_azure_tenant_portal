import { InputHTMLAttributes } from "react";
import infoIcon from "../../../assets/icons/information.svg";
import styles from "./InputTitle.module.css";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface IPropInputTitle extends InputHTMLAttributes<HTMLInputElement> {
    title : string
    infoMessage? : string
    required? : boolean
}

const InputTitle = ({title, infoMessage, required = true} : IPropInputTitle) => {
    return (
        <div className={styles.board__input__title__wrapper}>
            <div className={styles.board__input__title}>
                <div>{title}</div>
                {required && <div className={styles.board__input__title__required__field}>*</div>}                
            </div>
            {infoMessage && (
            <>
                <div className={styles.board__input__img__wrapper}>
                    <img src={infoIcon} data-tooltip-id={title}/>
                </div>
                <Tooltip id={title} place="top" html={infoMessage} />
            </>)} 
        </div>
    )
}

export default InputTitle;