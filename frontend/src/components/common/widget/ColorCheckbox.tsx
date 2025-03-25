import styles from "./ColorCheckbox.module.css";

interface IColorCheckboxProps {
    fillColor: string;
    onClickHandler: (event: any) => void;
    isChecked: boolean;
}

const ColorCheckbox = ({ fillColor, onClickHandler, isChecked }: IColorCheckboxProps) => {
    return (
        <div className={styles["checkbox-wrapper-31"]} onClick={onClickHandler}>
            <input type="checkbox" checked={isChecked} />
            <svg viewBox="0 0 35.6 35.6">
                <circle className={styles.background} cx="17.8" cy="17.8" r="17.8" style={{ fill: fillColor }}></circle>
                <circle className={styles.stroke} cx="17.8" cy="17.8" r="14.37"></circle>
                <polyline className={styles.check} points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
            </svg>
        </div>
    );
};

export default ColorCheckbox;
