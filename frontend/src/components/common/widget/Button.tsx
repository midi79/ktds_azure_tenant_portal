import { ButtonHTMLAttributes, MouseEvent } from "react";
import styles from "./Button.module.css";

interface IPropButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    onClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ title, onClickHandler, ...rest }: IPropButton) => {
    return (
        <button className={styles.custom__button} onClick={onClickHandler} {...rest}>
            {title}
        </button>
    );
};

export default Button;
