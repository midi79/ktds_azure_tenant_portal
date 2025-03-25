import { useEffect, useState } from "react";
import styles from "./RequestBoardEditPage.module.css";
import Button from "../../common/widget/Button";
import LongInput from "../../common/widget/LongInput";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewBoard, getBoard, updateBoard } from "../../common/util/http";

const RequestBoardEditPage = () => {
    const [showValidation, setShowValidation] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>("");
    const [id, setId] = useState<string | null>(null);    
    const navigate = useNavigate();
    const params = useParams();

    const validateForm = (formData: Record<string, any>) => {
        if (!formData.title) {
            setValidationMessage("You must insert a title");
            setShowValidation(true);
            return false;
        }
        if (!id && !formData.writer) {
            setValidationMessage("You must insert a writer");
            setShowValidation(true);
            return false;
        }
        if (!id && !formData.password) {
            setValidationMessage("You must insert a password");
            setShowValidation(true);
            return false;
        }        
        return true;
    };

    const {
        data,
        isError: isBoardError,
        error: boardError,
    } = useQuery({
        queryKey: ["board", id],
        queryFn: () => getBoard(id, "update"),
        enabled: id ? true : false,
    });

    const { mutate, isError, error } = useMutation({
        mutationFn: createNewBoard,
        onSuccess: () => {
            alert("Successfully saved!");
            //queryClient.invalidateQueries({ queryKey: ["boards"] });
            navigate("/pages/board");
        },
    });

    const {
        mutate: updateMutate,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: updateBoard,
        onSuccess: () => {
            alert("Successfully updated!");
            navigate("/pages/board");
        },
    });

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowValidation(false);
        setValidationMessage("");

        const fd = new FormData(event.target as HTMLFormElement);
        const formData = Object.fromEntries(fd.entries());
        const tags = formData.tags ? (formData.tags as string).split(",").map((tag) => tag.trim()) : [];

        if (!validateForm(formData)) {
            return;
        }

        const content = "";

        if (id) {
            const data = {
                ...formData,
                id,
                tags,
                bodyContent: content,
            };
            updateMutate({ board: data });
        } else {
            const data = {
                ...formData,
                tags,
                bodyContent: content,
            };
            mutate({ board: data });
        }
    };

    const onBackClickHandler = () => {
        if (confirm("Are you sure?")) {
            navigate("/pages/board");
        }
    };

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, false] }],
            [{ size: [true, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["link", "image", "code-block"],
            ["clean"],
        ],
    };

    useEffect(() => {
        if (params && params.id) {
            setId(params.id);
        }
    }, [params.id]);

    return (
        <form className={styles.board__edit__wrapper} onSubmit={onSubmitHandler}>
            <div className={styles.board__edit__header}>
                <div className={styles.board__edit__header__left}>
                    <div className={styles.board__edit__title}>{data ? "Edit" : "New"} notice</div>
                    <div className={styles.board__edit__error}>{showValidation && <div>{validationMessage}</div>}</div>
                </div>
                <div className={styles.board__edit__button}>
                    <Button title="Save" type="submit" />
                    <Button title="Back" onClickHandler={onBackClickHandler} type="button" />
                </div>
            </div>
            <div>
                <LongInput
                    type="text"
                    name="title"
                    placeholder="Title"
                    width={1000}
                    defaultValue={data ? data.title : null}
                />
            </div>
            <div className={styles.board__edit__user}>
                <LongInput
                    type="text"
                    name="writer"
                    placeholder="Writer"
                    width={200}
                    defaultValue={data ? data.writer : null}
                    readOnly={id ? true : false}
                />
                {!id && <LongInput type="password" name="password" placeholder="Password" width={200} />}
            </div>
            <div>
                <div>원래 에디터가 있던 자리</div>
            </div>
            <div className={styles.board__edit__tag}>
                <LongInput
                    type="text"
                    name="tags"
                    placeholder="TAG1,TAG2,... (Maximum 5 tags allowed)"
                    width={1000}
                    defaultValue={data ? data.tags : null}
                />
            </div>
            {isError && (
                <div className={styles.board__edit__validation}>
                    {error.message || "Failed to save board. Please check your inputs and try again later."}
                </div>
            )}
            {isUpdateError && (
                <div className={styles.board__edit__validation}>
                    {updateError.message || "Failed to update board. Please check your inputs and try again later."}
                </div>
            )}
            {isBoardError && (
                <div className={styles.board__edit__validation}>{boardError.message || "Failed to get board."}</div>
            )}
        </form>
    );
};

export default RequestBoardEditPage;
