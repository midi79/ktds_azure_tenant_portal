import { ButtonHTMLAttributes, MouseEvent } from "react";
import styles from "./IconButton.module.css";

interface IPropIconButton {
    title: string;
    onClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
    rest?: ButtonHTMLAttributes<HTMLButtonElement>;
    icon: string;
}

const IconButton = ({ title, onClickHandler, icon, ...rest }: IPropIconButton) => {
    return (
        <button className={styles.custom__button} onClick={onClickHandler} {...rest}>
            <img src={icon} />
            <span>{title}</span>
        </button>
    );
};

export default IconButton;
