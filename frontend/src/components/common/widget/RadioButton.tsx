import { ChangeEvent } from "react";
import styles from "./RadioButton.module.css";

interface IRadioButtonProp {
    id: string;
    label: string;
    group: string;
    isChecked? : boolean | undefined;
    checkHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({id, label, group, isChecked, checkHandler, ...rest} : IRadioButtonProp) => {

        return (
            <div className={styles.radio__button}>
            <input name={group} 
                   id={id} 
                   className={styles.radio__button__input} 
                   type="radio" 
                   checked={isChecked}
                   onChange={checkHandler}
                   {...rest}
                   />
            <label htmlFor={id} className={styles.radio__button__label}>
                <span className={styles.radio__button__custom}></span>                
                {label}
            </label>
            </div>
        )
} 

export default RadioButton;