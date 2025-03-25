import { ChangeEvent } from "react";
import styles from "./Checkbox.module.css";

interface ICheckboxProp {
    label?: string;
    checkHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean | undefined;
    index?: number;
    type: string;
}

const Checkbox = ({ label, isChecked, checkHandler, type, index = -1, ...rest }: ICheckboxProp) => {
    //console.log(type + index + " Checkbox changed : " + isChecked);

    return (
        <div className={styles.checkbox__wrapper__1}>
            <input
                id={`custom-checkbox-${type}${index}`}
                className={styles.substituted}
                type="checkbox"
                aria-hidden="true"
                checked={isChecked}
                onChange={checkHandler}
                {...rest}
            />
            <label htmlFor={`custom-checkbox-${type}${index}`}>{label}</label>
        </div>
    );
};

export default Checkbox;
