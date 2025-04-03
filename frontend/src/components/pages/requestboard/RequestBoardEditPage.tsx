import { useEffect, useState } from "react";
import styles from "./RequestBoardEditPage.module.css";
import Button from "../../common/widget/Button";
import LongInput from "../../common/widget/LongInput";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { saveRequestBoard, getRequestBoard, updateRequestBoard, deleteRequestBoard } from "../../common/util/http";
import RadioButton from "../../common/widget/RadioButton";
import Checkbox from "../../common/widget/Checkbox";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import InputTitle from "../../common/widget/InputTitle";
import useUserInfo from "../../common/store/user";

const RequestBoardEditPage = () => {
    const [showValidation, setShowValidation] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>("");
    const [id, setId] = useState<string | null>(null); 
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [selectedType, setSelectedType] = useState("sandbox");
    const [selectedMngGroup, setSelectedMngGroup] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);    
    const {user} = useUserInfo();
    const [formData, setFormData] = useState({
        projectName: "",
        projectCode: "",
        purpose: "",
        budgetManager: "",
        budgetManagerEmail: "",
        operationManager: "",
        operationManagerEmail: "",
        budget: "",
        alertBudget: "",
        ipCount: ""
    });

    const navigate = useNavigate();
    const params = useParams<{id: string}>();

    const {
        data,
        isError: isBoardError,
        error: boardError,
    } = useQuery({
        queryKey: ["request", id],
        queryFn: () => getRequestBoard(id),
        enabled: id ? true : false,
    });

    const { mutate : saveMutate, isError, error } = useMutation({
        mutationFn: saveRequestBoard,
        onSuccess: () => {
            alert("정상적으로 저장되었습니다");
            //queryClient.invalidateQueries({ queryKey: ["boards"] });
            navigate("/pages/request");
        },
    });

    const {
        mutate: updateMutate,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: updateRequestBoard,
        onSuccess: () => {
            alert("정상적으로 수행되었습니다");
            navigate("/pages/request");
        },
    });

    const {
        mutate: deleteMutate,
        isError: isDeleteError,
        error: deleteError,
    } = useMutation({
        mutationFn: deleteRequestBoard,
        onSuccess: () => {
            alert("정상적으로 삭제되었습니다");
            navigate("/pages/request");
        },
    });

    const validateForm = (formData: any) => {

        if (!formData.projectName) {
          setValidationMessage("프로젝트명을 입력해주세요.");
          setShowValidation(true);
          return false;
        }
        if (selectedType === "workload" && !formData.projectCode) {
          setValidationMessage("프로젝트 코드를 입력해주세요.");
          setShowValidation(true);
          return false;
        }
        if (selectedType === "workload" && (!startDate || !endDate)) {
            setValidationMessage("프로젝트 기간을 선택해주세요.");
            setShowValidation(true);
            return false;
        }
        if (selectedType === "sandbox" && !formData.purpose) {
          setValidationMessage("사용 목적을 입력해주세요.");
          setShowValidation(true);
          return false;
        }
        if (!formData.budgetManager) {
          setValidationMessage("예산 담당자를 입력해주세요.");
          setShowValidation(true);
          return false;
        }
        if (!formData.budgetManagerEmail) {
            setValidationMessage("예산 담당자 Email을 입력해주세요.");
            setShowValidation(true);
            return false;
        }
        if (!formData.operationManager) {
          setValidationMessage("운영 담당자를 입력해주세요.");
          setShowValidation(true);
          return false;
        }
        if (!formData.operationManagerEmail) {
            setValidationMessage("운영 담당자 Email을 입력해주세요.");
            setShowValidation(true);
            return false;
        }
        if (!formData.budget) {
          setValidationMessage("예산을 입력해주세요.");
          setShowValidation(true);
          return false;
        }        
        if (isChecked && !formData.alertBudget) {
            setValidationMessage("월 경보 한도금액을 입력해주세요.");
            setShowValidation(true);
            return false;
        }
        if (selectedType === "workload" && !selectedMngGroup) {
            setValidationMessage("Tanent 관리그룹을 선택해주세요.");
            setShowValidation(true);
            return false;
        }
        if (selectedType === "workload" && !formData.ipCount) {
          setValidationMessage("필요 IP 수량을 입력해주세요.");
          setShowValidation(true);
          return false;
        }

        return true;
    };

    const onSaveHandler = (event: any) => {
        event.preventDefault();
        setShowValidation(false);
        setValidationMessage("");

        if (!formData.projectName) {
            setValidationMessage("프로젝트명은 필수 입력 항목입니다.");
            setShowValidation(true);
            return false;
        }

        const data = { 
            ...formData, 
            type : selectedType.toUpperCase(), 
            alert : isChecked,
            startDate,
            endDate,
            managementGroup : selectedMngGroup,       
            writer : user?.name,
            state : "SAVE",
            id: id ? id : null,
        };

        if (id) {
            updateMutate({ board: data });
        } else {
            saveMutate({ board: data });
        }        
    }

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        setShowValidation(false);
        setValidationMessage("");

        if(!validateForm(formData)) {
            return;
        }
 
        const data = {
            ...formData,
            type : selectedType.toUpperCase(), 
            alert : isChecked,
            startDate,
            endDate,
            managementGroup : selectedMngGroup,       
            writer : user?.name,
            state : "REQUEST",
            id: id ? id : null,
        };  

        if (id) {
            updateMutate({ board: data });
        } else {
            saveMutate({ board: data });
        }

    };

    const onDeleteHandler = (event: any) => {
        event.preventDefault();
        setShowValidation(false);
        setValidationMessage("");

        if(confirm("삭제 하시겠습니까?")) {

            const data = {
                id : id,                
            }

            deleteMutate({ board: data });
        }

    }

    const onBackClickHandler = () => {
        if (confirm("리스트로 돌아가시겠습니까?")) {
            navigate("/pages/request");
        }
    };
    
    const onCheckboxHandler = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        if (params && params.id) {
            setId(params.id);
        }
    }, [params.id]);

    useEffect(() => {
        if (data) {            
            setFormData({                
                projectName: data.projectName || "",
                projectCode: data.projectCode || "",
                purpose: data.purpose || "",
                budgetManager: data.budgetManager || "",
                budgetManagerEmail: data.budgetManagerEmail || "",
                operationManager: data.operationManager || "",
                operationManagerEmail: data.operationManagerEmail || "",
                budget: data.budget || "",
                alertBudget: data.alertBudget || "",
                ipCount: data.ipCount || ""
            });

            setId(data.id || null);
            setSelectedType(data.type?.toLowerCase() || "sandbox");
            setSelectedMngGroup(data.managementGroup || "");
            setIsChecked(data.alert || false);
            setStartDate(data.startDate ? new Date(data.startDate) : null);
            setEndDate(data.endDate ? new Date(data.endDate) : null);
        }
    }, [data]);


    const titleDesc = {
        tenant_type : "Sandbox : PoC를 위해 사용할 수 있는 Tenant <br> Workload : KT DS 대내외 서비스를 위한 Tenant",
        projectName : "사용할 프로젝트명을 입력해주세요",
        projectCode : "경영성과팀에서 비용심의 후 발행해준 코드를 입력해주세요",
        budgetManager: "프로젝트 대표 빌링 담당자이며, <br> 프로젝트 예산에 맞게 Azure 사용료 관리",
        operationManager: "프로젝트 대표 운영 담당자이며, <br> 프로젝트 멤버 권한 관리와 Azure 시스템 구축/운영 수행",
        alertCheck : "월별 경보 수신을 희망할 경우만 선택 <br> (월별 균등하지 못한 금액의 경우는 월경보 발생 불가)", 
        alertBudget : "월 경보 한도 금액을 설정하여 임계치 도달 시 <br> 운영 담당자에게 메일을 발송",
        mng_group : "Private Spoke#1 : KT DS 내부망을 사용하는 서비스를 구성하고 운영 <br>" + 
                    "Private Spoke#2 : KT 그룹사 공통으로 사용하는 서비스를 구성하고 운영 <br>" +
                    "Public Spoke : 외부 인터넷 연결이 필요한 대외 서비스를 구성하고 운영",
        ipCount : "기본적으로 할당되는 IP 대역은 26bit(64개) <br>" +
                  " - IP 할당 수량은 PRD/DEV 포함 <br>" +
                  " - PRD/DEV의 경우 동일 구독 내 Resource Group로 구분됨 <br>" +
                  " - 이보다 큰 IP 대역이 필요하다면 사유 제출 필요",
        budgetLink : "Azure 계산기로 계산한 결과에 대한 페이지 링크를 달아주세요"
    }

    return (
        <form className={styles.board__edit__wrapper} onSubmit={onSubmitHandler}>
            <div className={styles.board__edit__header}>
                <div className={styles.board__edit__header__left}>
                    <div className={styles.board__edit__title}>KD DS Azure Tenant 구독 신청</div>
                    <div className={styles.board__edit__error}>{showValidation && <div>{validationMessage}</div>}</div>
                </div>
                <div className={styles.board__edit__button}>
                    <Button title="임시저장" type="button" onClickHandler={onSaveHandler}/>
                    <Button title="신청" type="submit" />
                    { id && 
                        <Button title="삭제" type="button" onClickHandler={onDeleteHandler}/>
                    }
                    <Button title="뒤로가기" onClickHandler={onBackClickHandler} type="button" />
                </div>
            </div>
            <div className={styles.board__edit_body}>
                <table className={styles.board__edit__table}>
                    <colgroup>
                        <col className={styles["col-title"]} />
                        <col className={styles["col-content"]} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><InputTitle title="Tenant 타입" infoMessage={titleDesc.tenant_type} /></td>
                            <td>
                                <RadioButton id="sandbox" label="SandBox" group="tenant_type" checkHandler={() => setSelectedType("sandbox")} isChecked={selectedType === "sandbox"} />
                                <RadioButton id="workload" label="Workload" group="tenant_type" checkHandler={() => setSelectedType("workload")} isChecked={selectedType === "workload"} />
                            </td>
                        </tr>
                        <tr>
                            <td><InputTitle title="프로젝트명" infoMessage={titleDesc.projectName} /></td>
                            <td>
                                <LongInput
                                    type="text"
                                    name="projectName"
                                    placeholder="프로젝트명"
                                    width={500}
                                    defaultValue={data ? data.projectName : null}
                                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                                />
                            </td>
                        </tr>
                        {selectedType === "workload" && 
                            <tr>
                                <td><InputTitle title="프로젝트 코드" infoMessage={titleDesc.projectCode} /></td>                                    
                                <td>
                                    <LongInput
                                        type="text"
                                        name="projectCode"
                                        placeholder="프로젝트 코드"
                                        width={300}
                                        defaultValue={data ? data.projectCode : null}
                                        onChange={(e) => setFormData({...formData, projectCode: e.target.value})}
                                    />
                                </td>
                            </tr>
                        }
                        {selectedType === "workload" &&
                        <tr>
                            <td><InputTitle title="프로젝트 기간" infoMessage="" /></td>
                            <td>
                                <div className={styles.board__date}>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: any) => setStartDate(date ? format(date, "yyyy-MM-dd") : null)}
                                        placeholderText="프로젝트 시작일"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    ~
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date: any) => setEndDate(date ? format(date, "yyyy-MM-dd") : null)}
                                        placeholderText="프로젝트 종료일"
                                        dateFormat="yyyy-MM-dd"
                                    />                    
                                </div>
                            </td>
                        </tr>
                        }
                        {selectedType === "sandbox" &&
                            <tr>
                                <td><InputTitle title="사용 목적" infoMessage="" /></td>
                                <td>
                                    <LongInput
                                        type="text"
                                        name="purpose"
                                        placeholder="사용 목적"
                                        width={500}
                                        defaultValue={data ? data.purpose : null}
                                        onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                                    />
                                </td>
                            </tr>
                        }
                        <tr>
                            <td><InputTitle title="예산 담당자" infoMessage={titleDesc.budgetManager} /></td>
                            <td className={styles.board__edit__table__manager}>
                                <LongInput
                                    type="text"
                                    name="budgetManager"
                                    placeholder="예산 담당자명"
                                    width={200}
                                    defaultValue={data ? data.budgetManager : null}
                                    onChange={(e) => setFormData({...formData, budgetManager: e.target.value})}
                                />
                                <LongInput
                                    type="text"
                                    name="budgetManagerEmail"
                                    placeholder="예산 담당자 Email"
                                    width={300}
                                    defaultValue={data ? data.budgetManagerEmail : null}
                                    onChange={(e) => setFormData({...formData, budgetManagerEmail: e.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><InputTitle title="운영 담당자" infoMessage={titleDesc.operationManager} /></td>                            
                            <td className={styles.board__edit__table__manager}>
                                <>
                                <LongInput
                                    type="text"
                                    name="operationManager"
                                    placeholder="운영 담당자명"
                                    width={200}
                                    defaultValue={data ? data.operationManager : null}
                                    onChange={(e) => setFormData({...formData, operationManager: e.target.value})}
                                />
                                </>
                                <>
                                <LongInput
                                    type="text"
                                    name="operationManagerEmail"
                                    placeholder="운영 담당자 Email"
                                    width={300}
                                    defaultValue={data ? data.operationManagerEmail : null}
                                    onChange={(e) => setFormData({...formData, operationManagerEmail: e.target.value})}
                                />
                                </>
                            </td>
                        </tr>
                        <tr>
                            <td><InputTitle title="총 예산(원)" infoMessage="" /></td>
                            <td>
                                <LongInput
                                    type="text"
                                    name="budget"
                                    placeholder="총 예산"
                                    width={300}
                                    defaultValue={data ? data.budget : null}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><InputTitle title="월 경보 희망여부" infoMessage={titleDesc.alertCheck} required={false}/></td>
                            <td>
                                <Checkbox                                    
                                    checkHandler={onCheckboxHandler}                                    
                                    type="check"                                    
                                    isChecked={isChecked}
                                 />
                            </td>
                        </tr>
                        <tr>
                            <td><InputTitle title="월 경보 한도금액" infoMessage={titleDesc.alertBudget} required={isChecked}/></td>
                            <td>
                                <LongInput
                                    type="text"
                                    name="alertBudget"
                                    placeholder="월 경보 한도금액"
                                    width={300}
                                    defaultValue={data ? data.alertBudget : null}
                                    onChange={(e) => setFormData({...formData, alertBudget: e.target.value})}
                                />
                            </td>
                        </tr>
                        {selectedType === "workload" &&
                            <tr>
                                <td><InputTitle title="Tenant 관리그룹" infoMessage={titleDesc.mng_group} /></td>
                                <td>
                                    <RadioButton id="private_spoke1" label="Private Spoke#1" group="mng_group" checkHandler={() => setSelectedMngGroup("private_spoke1")} isChecked={selectedMngGroup === "private_spoke1"}/>
                                    <RadioButton id="private_spoke2" label="Private Spoke#2" group="mng_group" checkHandler={() => setSelectedMngGroup("private_spoke2")} isChecked={selectedMngGroup === "private_spoke2"}/>
                                    <RadioButton id="public_spoke" label="Public Spoke" group="mng_group" checkHandler={() => setSelectedMngGroup("public_spoke")} isChecked={selectedMngGroup === "public_spoke"}/>                                
                                </td>
                            </tr>
                        }
                        {selectedType === "workload" &&
                            <tr>
                                <td><InputTitle title="필요 IP 수량" infoMessage={titleDesc.ipCount} /></td>
                                <td>
                                    <LongInput
                                        type="text"
                                        name="ipCount"
                                        placeholder="필요 IP 수량"
                                        width={200}
                                        defaultValue={data ? data.ipCount : null}
                                        onChange={(e) => setFormData({...formData, ipCount: e.target.value})}
                                    />
                                </td>                            
                            </tr>
                        }
                        <tr>
                            <td><InputTitle title="예산정보 링크" infoMessage={titleDesc.budgetLink} /></td>
                            <td>
                                예산정보 링크
                            </td>
                        </tr>
                        <tr>
                            <td>요청사항</td>
                            <td>
                                <textarea />
                            </td>
                        </tr>
                    </tbody> 
                </table>                
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
            {isDeleteError && (
                <div className={styles.board__edit__validation}>
                    {deleteError.message || "Failed to delete board. Please try again later."}
                </div>
            )}
            {isBoardError && (
                <div className={styles.board__edit__validation}>{boardError.message || "Failed to get board."}</div>
            )}
        </form>
    );
};

export default RequestBoardEditPage;
