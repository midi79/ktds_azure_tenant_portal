import styles from "./HourSelect.module.css";

interface IHourSelectPops {
    title: string;
    id: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const HourSelect = ({ title, id, onChangeHandler, value }: IHourSelectPops) => {
    const timeList = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
    ];

    return (
        <div className={styles.hour__select__time}>
            {title}
            <select id={id} onChange={onChangeHandler} value={value}>
                {timeList.map((time) => (
                    <option value={time} key={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default HourSelect;
