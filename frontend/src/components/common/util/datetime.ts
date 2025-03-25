import { format } from "date-fns";

interface IDateTimeProps {
    date: Date;
}

export const DateTimeConverter = (props: IDateTimeProps) => {
    const formattedDate = format(new Date(props.date), "yyyy/MM/dd HH:mm");
    return formattedDate;
};

export const DateConverter = (date: string) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    return formattedDate;
};
