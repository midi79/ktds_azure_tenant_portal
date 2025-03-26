import { ChangeEvent } from "react";
import styles from "./Checkbox.module.css";

interface ICheckboxProp {
    label?: string;
    checkHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    isChecked?: boolean | undefined;
    index?: number;
    type: string;
}

const Checkbox = ({ label, isChecked, checkHandler, type, index = -1, ...rest }: ICheckboxProp) => {
    //console.log(type + index + " Checkbox changed : " + isChecked);

    return (
        <label className={styles.custom__checkbox}>
            <input type="checkbox"
                id={`custom-checkbox-${type}${index}`}
                className={styles.inp__cbx}            
                aria-hidden="true"
                checked={isChecked}
                onChange={checkHandler}
                {...rest}/>     
                <span className={styles.checkmark}></span>
        </label>        
    );
};

export default Checkbox;
