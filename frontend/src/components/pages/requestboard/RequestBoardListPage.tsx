import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./RequestBoardListPage.module.css";
import IconButton from "../../common/widget/IconButton";
import { DateTimeConverter } from "../../common/util/datetime";
import newIcon from "../../../assets/icons/note_add.svg";
import { getRequestBoards } from "../../common/util/http";
import Button from "../../common/widget/Button";
import { format } from "date-fns";

interface IBoardList {
    id: number;    
    title: string;
    writer: string;
    editDate: Date;
    state: string;
}

interface ITestProp {
    testData?: IBoardList[];
}

const listTitle: string[] = ["번호", "제목", "작성자", "작성일시", "상태"];

const RequestBoardListPage = ({ testData }: ITestProp) => {
    const [boardListData, setBoardListData] = useState<IBoardList[]>([]);
    const [size, setSize] = useState<number>(15);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchOption, setSearchOption] = useState<any>("title");
    const [searchTerm, setSearchTerm] = useState<any>("");
    const [fromDate, setFromDate] = useState<any>(null);
    const [toDate, setToDate] = useState<any>(null);

    const navigate = useNavigate();

    const {
        data: boardList,
        isLoading: isListLoading,
        isError: isListError,
        error: listError,
        refetch: listRefetch,
    } = useQuery({
        queryKey: ["request", page, size],
        queryFn: () => getRequestBoards({ size, page, searchOption, searchTerm, fromDate, toDate }),
        enabled: true,
    });

    useEffect(() => {
        if (boardList?.content) {
            setBoardListData(boardList.content);
            setTotalPages(boardList.totalPages);
        }
        if (testData) {
            setBoardListData(testData);
        }
    }, [boardList]);

    const onNewClickHandler = () => {
        navigate("/pages/request/edit");
    };

    const onTitleClickHandler = (id: number) => {
        navigate(`/pages/request/${id}`);
    };

    const onPageChangeHandler = (newPage: number) => {
        setPage(newPage);
    };

    const getPageNumbers = () => {
        const maxPagesToShow = 10;
        const startPage = Math.floor(page / maxPagesToShow) * maxPagesToShow;
        return Array.from({ length: Math.min(maxPagesToShow, totalPages - startPage) }, (_, i) => startPage + i);
    };

    const optionChangeHandler = (event: any) => {
        const option = event.target.value;
        setSearchOption(option);        
        setSearchTerm("");        
        setFromDate(null);
        setToDate(null);
    };

    const searchSubmitHandler = async (event: any) => {
        event.preventDefault();
        listRefetch();
    };

    const searchResetHandler = async () => {
        const resetAllStates = () => {
            setSearchOption("title");
            setSearchTerm("");
            setFromDate(null);
            setToDate(null);
            setPage(0);
            setSize(15);
        };

        await resetAllStates();
        listRefetch();
    };

    return (
        <section className={styles.board__section}>
            <div className={styles.board__wrapper}>
                <div className={styles.board__content}>     
                    <div className={styles.board__top}>                        
                        <div className={styles.board__button}>
                            <IconButton title="등록" icon={newIcon} onClickHandler={onNewClickHandler} />                            
                        </div>
                    </div>
                    <table className={styles.board__table}>
                        <colgroup>
                            <col className={styles["col-id"]} />
                            <col className={styles["col-title"]} />
                            <col className={styles["col-writer"]} />
                            <col className={styles["col-date"]} />
                            <col className={styles["col-state"]} />
                        </colgroup>
                        <thead>
                            <tr className={styles.board__thead_tr}>
                                {listTitle.map((item) => (
                                    <th key={item}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {boardListData &&
                                boardListData.map((item: any, index: number) => (
                                    <tr className={styles.board__list} key={item.id}>                                        
                                        <td className={styles.td__id}>{item.id}</td>
                                        <td className={styles.td__title} onClick={() => onTitleClickHandler(item.id)}>
                                            {item.title}
                                        </td>
                                        <td>{item.writer}</td>
                                        <td className={styles.td__date}>
                                            <DateTimeConverter date={item.createDate} />
                                        </td>
                                        <td className={styles.td__state}>{item.state}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.board__bottom}>
                    <form className={styles.board__search__form} onSubmit={searchSubmitHandler}>
                        <div className={styles.board__search__group}>
                            <select id="searchOption" value={searchOption} onChange={optionChangeHandler}>
                                <option value="title">Title</option>
                                <option value="writer">Writer</option>                                
                                <option value="date">Date</option>                                
                            </select>
                        </div>
                        <div className={styles.board__search__group}>
                            {searchOption === "date" ? (
                                <>
                                    <DatePicker
                                        selected={fromDate}
                                        onChange={(date: any) => setFromDate(date ? format(date, "yyyy-MM-dd") : null)}
                                        placeholderText="From-date"
                                        dateFormat="dd-MM-yyyy"
                                    />
                                    <DatePicker
                                        selected={toDate}
                                        onChange={(date: any) => setToDate(date ? format(date, "yyyy-MM-dd") : null)}
                                        placeholderText="To-date"
                                        dateFormat="dd-MM-yyyy"
                                    />
                                </>
                            ) : (
                                <input
                                    id="searchTerm"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search"
                                />
                            )}
                        </div>
                        <div>
                            <Button title="Search" type="submit" />
                        </div>
                        <div>
                            <Button title="Reset" type="button" onClick={searchResetHandler} />
                        </div>
                    </form>
                    <div className={`${styles.board__search__group} ${styles.board__page__option}`}>
                        <select
                            id="pageOption"
                            value={size}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                                setSize(parseInt(event.target.value))
                            }
                        >
                            <option value="5">05 rows</option>
                            <option value="10">10 rows</option>
                            <option value="15">15 rows</option>
                            <option value="20">20 rows</option>
                        </select>
                    </div>
                </div>
                <div className={styles.board__pagination}>
                    {boardList && boardList.totalPages > 1 && (
                        <div className={styles.board__pagination}>
                            <button onClick={() => onPageChangeHandler(0)} disabled={page === 0}>
                                First
                            </button>
                            <button onClick={() => onPageChangeHandler(page - 1)} disabled={page === 0}>
                                Previous
                            </button>
                            {getPageNumbers().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => onPageChangeHandler(pageNumber)}
                                    disabled={page === pageNumber}
                                    className={page === pageNumber ? "active" : ""}
                                >
                                    {pageNumber + 1}
                                </button>
                            ))}
                            <button onClick={() => onPageChangeHandler(page + 1)} disabled={page + 1 >= totalPages}>
                                Next
                            </button>
                            <button
                                onClick={() => onPageChangeHandler(totalPages - 1)}
                                disabled={page + 1 >= totalPages}
                            >
                                Last
                            </button>
                        </div>
                    )}
                </div>
                {isListLoading && <div>Loading Data....</div>}
                {isListError && <div>{listError.message}</div>}                                
            </div>
        </section>
    );
};

export default RequestBoardListPage;
