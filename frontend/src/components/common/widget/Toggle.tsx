import { ChangeEvent } from "react";
import styles from "./Toggle.module.css";

interface IToggleProp {
    checkHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean | undefined;
    index?: number;
    type: string;
}

const Toggle = ({ isChecked, checkHandler, type, index = -1, ...rest }: IToggleProp) => {
    //    console.log(type + index + " Toggle changed : " + isChecked);

    return (
        <div className={styles.checkbox__wrapper__2}>
            <input
                type="checkbox"
                id={`custom-toggle-${type}${index}`}
                className={styles.ikxBAC}
                checked={isChecked}
                onChange={checkHandler}
                {...rest}
            />
        </div>
    );
};

export default Toggle;
