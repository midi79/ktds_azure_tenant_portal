import { useEffect, useRef, useState } from "react";
import Button from "../../common/widget/Button";
import Input from "../../common/widget/Input";
import styles from "./RequestBoardVerifyPasswordPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyPassword } from "../../common/util/http";

const RequestBoardVerifyPasswordPage = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>("");
    const [verifyFailed, setVerifyFailed] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();

    const { mutate, isError, error } = useMutation({
        mutationFn: verifyPassword,
        onSuccess: (data) => {
            if (data) {
                navigate("/pages/board/edit/" + id);
            } else {
                setVerifyFailed(true);
                setPassword("");
            }
        },
    });

    const onVerifyClickHandler = () => {
        console.log("Verify password : ", password);
        mutate({ id: id && parseInt(id), password: password });
    };

    const onCancelClickHandler = () => {
        navigate("/pages/board/" + id);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [id]);

    return (
        <div className={styles.board__verify__password__wrapper}>
            <div className={styles.board__verify__password__content}>
                <div className={styles.board__verify__password__text}>Please input your password</div>
                <div>
                    <Input
                        type="password"
                        placeholder="password"
                        width={300}
                        ref={inputRef}
                        onChange={(event: any) => setPassword(event.target.value)}
                    />
                </div>
                <div className={styles.board__verify__password__button}>
                    <Button title="Verify" onClickHandler={onVerifyClickHandler} />
                    <Button title="Cancel" onClickHandler={onCancelClickHandler} />
                </div>
                {verifyFailed && (
                    <div className={styles.board__verify__password__error}>Incorrect password. Please try again.</div>
                )}
                {isError && (
                    <div className={styles.board__verify__password__error}>
                        {error.message || "Error occured! Please try later."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestBoardVerifyPasswordPage;
