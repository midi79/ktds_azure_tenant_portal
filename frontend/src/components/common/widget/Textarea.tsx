import { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./LongInput.module.css"; // 기존 스타일 그대로 재사용

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  width?: number;
  height?: number;
  defaultValue?: string;
  readOnly?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ name, width, defaultValue, readOnly, ...rest }, ref) => {
    return (
      <div className={styles.long__input__wrapper} style={{ width }}>
        <textarea
          name={name}
          className={styles.long__input__content}
          defaultValue={defaultValue}
          readOnly={readOnly}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default Textarea;
