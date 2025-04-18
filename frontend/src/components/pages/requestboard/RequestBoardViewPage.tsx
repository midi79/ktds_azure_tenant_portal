import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/widget/Button";
import styles from "./RequestBoardViewPage.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRequestBoard, updateRequestBoardState } from "../../common/util/http";
import Checkbox from "../../common/widget/Checkbox";
import useUserInfo from "../../common/store/user";
import TextareaDialog from "../../common/widget/TextareaDialog";

const RequestBoardViewPage = () => {
    const navigate = useNavigate();
    const { user } = useUserInfo();
    const { id } = useParams();

    const [isDenyReasonDialogOpen, setDenyReasonDialogOpen] = useState(false);    

    const { data, isError, error } = useQuery({
        queryKey: ["requestBoard", id],
        queryFn: () => getRequestBoard(id),
    });

    const {
        mutate: updateMutate,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: updateRequestBoardState,
        onSuccess: () => {
            alert("정상적으로 수행되었습니다");
            setDenyReasonDialogOpen(false);
            navigate("/pages/request");
        },
    });


    const onBackClickHandler = () => {
        if (confirm("리스트로 돌아가시겠습니까?")) {
            navigate("/pages/request");
        }
    };

    const onApproveHandler = () => {
        if(confirm("승인 하시겠습니까?")) {
            const data = {
                id : id,
                state : "APPROVED"
            }    
            updateMutate({ board: data });
        }
    }

    const onDenyHandler = (text: string) => {        
        const data = {
            id : id,
            state : "DENY",
            denyReason : text
        }
        
        updateMutate({ board: data });                
    }

    const onCompleteHandler = () => {
        if(confirm("완료 하시겠습니까?")) {
            const data = {
                id : id,
                state : "COMPLETE"
            }
            updateMutate({ board: data });
        }
    }

    const onCancelDeny = () => {
        setDenyReasonDialogOpen(false);        
    }

    return (
        <div className={styles.board__view__wrapper}>
            <div className={styles.board__view__header}>
                <div className={styles.board__view__header__left}>
                    <div className={styles.board__view__header__title}>KD DS Azure Tenant 구독 신청</div>                    
                </div>
                <div className={styles.board__view__button}>
                    { (data && data.state === "REQUEST" && user?.role === "ROLE_ADMIN") && (
                        <>                        
                            <Button title="승인" type="button" onClickHandler={onApproveHandler}/>
                            <Button title="반려" type="button" onClickHandler={() => setDenyReasonDialogOpen(true)}/>
                        </>
                        )
                    }
                    { (data && data.state === "APPROVED" && user?.role === "ROLE_ADMIN") && (
                        <>                        
                            <Button title="완료" type="button" onClickHandler={onCompleteHandler}/>                            
                        </>
                        )
                    }
                    <Button title="뒤로가기" onClickHandler={onBackClickHandler} type="button" />
                </div>
            </div>
            <div className={styles.board__view_body}>
                <table className={styles.board__view__table}>
                    <colgroup>
                        <col className={styles["col-title"]} />
                        <col className={styles["col-content"]} />
                    </colgroup>
                    <tbody>
                        <tr>    
                            <td>신청자</td>
                            <td>
                                {data ? data.writer : null}                                
                                {data ? ` (${data.writerEmail})` : null}
                            </td>
                        </tr>
                        <tr>
                            <td>Tenant 타입</td>
                            <td>
                                {data ? data.type : null}
                            </td>
                        </tr>
                        <tr>
                            <td>프로젝트명</td>
                            <td>
                                {data ? data.projectName : null}                                                                    
                            </td>
                        </tr>
                        {data && data.type === "WORKLOAD" && 
                            <tr>
                                <td>프로젝트 코드</td>
                                <td>
                                    {data ? data.projectCode : null}                                                                            
                                </td>
                            </tr>
                        }
                        {data && data.type === "WORKLOAD" &&
                        <tr>
                            <td>프로젝트 기간</td>
                            <td>
                                <div className={styles.board__date}>
                                    {data.startDate} ~ {data.endDate}                                                                            
                                </div>
                            </td>
                        </tr>
                        }
                        {data && data.type === "WORKLOAD" &&
                        <tr>
                            <td>개발 환경 필요 여부</td>
                            <td>
                                <Checkbox                                                                        
                                    type="check"                                    
                                    isChecked={data ? data.requiredDev : false}
                                    checkHandler={(e)=>console.log(e)}
                                />
                            </td>
                        </tr>
                        }
                        {data && data.type === "SANDBOX" &&
                            <tr>
                                <td>사용 목적</td>
                                <td>
                                    {data ? data.purpose : null}                                                                            
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>예산 담당자</td>
                            <td>
                                {data ? data.budgetManager : null} ({data ? data.budgetManagerEmail : null})
                            </td>
                        </tr>
                        <tr>
                            <td>운영 담당자</td>
                            <td>
                                {data ? data.operationManager : null} ({data ? data.operationManagerEmail : null})
                            </td>
                        </tr>
                        <tr>
                            <td>예산(원)</td>
                            <td>
                                {data ? data.budget : null}                                                                    
                            </td>
                        </tr>
                        <tr>
                            <td>월 경보 희망여부</td>
                            <td>
                                <Checkbox                                                                        
                                    type="check"                                    
                                    isChecked={data ? data.alert : false}   
                                    checkHandler={(e)=>console.log(e)}                                 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>월 경보 한도금액</td>
                            <td>
                                {data ? data.alertBudget : null}                                                                    
                            </td>
                        </tr>
                        {data && data.type === "WORKLOAD" &&
                            <tr>
                                <td>Tanent 관리그룹</td>
                                <td>
                                    {data ? data.managementGroup : null}
                                </td>
                            </tr>
                        }
                        {data && data.type === "WORKLOAD" &&
                            <tr>
                                <td>필요 IP 수량</td>
                                <td>
                                    {data ? data.ipCount : null}
                                </td>                            
                            </tr>
                        }
                        <tr>
                            <td>예산정보 링크</td>
                            <td>
                                <a href={data ? data.budgetLink : null} target="_blank" rel="noopener noreferrer">{data ? data.budgetLink : null}</a>                       
                            </td>
                        </tr>
                        <tr>
                            <td>요청사항</td>
                            <td>
                                {data ? data.request : null}
                            </td>
                        </tr>                        
                    </tbody> 
                </table>                
            </div>            
            <TextareaDialog
                isOpen={isDenyReasonDialogOpen}
                onClose={onCancelDeny}
                onSave={(text) => onDenyHandler(text)} />
            {isError && (
                <div className={styles.board__view__validation}>{error.message || "Failed to get board."}</div>
            )}
            {isUpdateError && (
                <div className={styles.board__view__validation}>
                    {updateError.message || "Failed to update request board. Please try again later."}
                </div>
            )}
        </div>
    );
};

export default RequestBoardViewPage;
