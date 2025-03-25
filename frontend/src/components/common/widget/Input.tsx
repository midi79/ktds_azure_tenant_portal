import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string;
    width?: number;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(({ type, placeholder, width, ...rest }, ref?) => {
    return (
        <div className={styles.input__wrapper} style={{ width: width }}>
            <input type={type} className={styles.input__content} placeholder={placeholder} ref={ref} {...rest} />
        </div>
    );
});

export default Input;
