import styles from "./QnAFormPage.module.css";

import { useEffect, useState } from "react";
import Button from "../../common/widget/Button";
import LongInput from "../../common/widget/LongInput";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  saveRequestBoard,
  getRequestBoard,
  updateRequestBoard,
  deleteRequestBoard,
} from "../../common/util/http";
import RadioButton from "../../common/widget/RadioButton";
import Tiptap from "../../common/editor/TiptapEditor";

const QnAFormPage = () => {
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [id, setId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [selectedType, setSelectedType] = useState("sandbox");
  const [selectedMngGroup, setSelectedMngGroup] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    purpose: "",
    budgetManager: "",
    operationManager: "",
    budget: "",
    alertBudget: "",
    ipCount: "",
  });

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const {
    data,
    isError: isBoardError,
    error: boardError,
  } = useQuery({
    queryKey: ["request", id],
    queryFn: () => getRequestBoard(id),
    enabled: id ? true : false,
  });

  const {
    mutate: saveMutate,
    isError,
    error,
  } = useMutation({
    mutationFn: saveRequestBoard,
    onSuccess: () => {
      alert("정상적으로 저장되었습니다");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
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
      navigate("/pages/qna");
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
      navigate("/pages/qna");
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
    if (!formData.operationManager) {
      setValidationMessage("운영 담당자를 입력해주세요.");
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
    if (!formData.ipCount) {
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
      type: selectedType.toUpperCase(),
      alert: isChecked,
      startDate,
      endDate,
      managementGroup: selectedMngGroup,
      writer: "김이박 책임",
      state: "SAVE",
      id: id ? id : null,
    };

    if (id) {
      updateMutate({ board: data });
    } else {
      saveMutate({ board: data });
    }
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    setShowValidation(false);
    setValidationMessage("");

    if (!validateForm(formData)) {
      return;
    }

    const data = {
      ...formData,
      type: selectedType.toUpperCase(),
      alert: isChecked,
      startDate,
      endDate,
      managementGroup: selectedMngGroup,
      writer: "김이박 책임",
      state: "REQUEST",
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

    if (confirm("삭제 하시겠습니까?")) {
      const data = {
        id: id,
      };

      deleteMutate({ board: data });
    }
  };

  const onBackClickHandler = () => {
    if (confirm("리스트로 돌아가시겠습니까?")) {
      navigate("/pages/qna");
    }
  };

  const onCheckboxHandler = () => {
    setIsChecked(!isChecked);
  };

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
        operationManager: data.operationManager || "",
        budget: data.budget || "",
        alertBudget: data.alertBudget || "",
        ipCount: data.ipCount || "",
      });

      setId(data.id || null);
      setSelectedType(data.type?.toLowerCase() || "sandbox");
      setSelectedMngGroup(data.managementGroup || "");
      setIsChecked(data.alert || false);
      setStartDate(data.startDate ? new Date(data.startDate) : null);
      setEndDate(data.endDate ? new Date(data.endDate) : null);
    }
  }, [data]);

  return (
    <form className={styles.board__edit__wrapper} onSubmit={onSubmitHandler}>
      <div className={styles.board__edit__header}>
        <div className={styles.board__edit__header__left}>
          <div className={styles.board__edit__title}>
            KD DS Azure Tenant QnA 작성
          </div>
          <div className={styles.board__edit__error}>
            {showValidation && <div>{validationMessage}</div>}
          </div>
        </div>
        <div className={styles.board__edit__button}>
          <Button title="저장" type="button" onClickHandler={onSaveHandler} />
          <Button title="신청" type="submit" />
          {id && (
            <Button
              title="삭제"
              type="button"
              onClickHandler={onDeleteHandler}
            />
          )}
          <Button
            title="뒤로가기"
            onClickHandler={onBackClickHandler}
            type="button"
          />
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
              <td>Tenant 타입</td>
              <td>
                <RadioButton
                  id="sandbox"
                  label="SandBox"
                  group="tenant_type"
                  checkHandler={() => setSelectedType("sandbox")}
                  isChecked={selectedType === "sandbox"}
                />
                <RadioButton
                  id="workload"
                  label="Workload"
                  group="tenant_type"
                  checkHandler={() => setSelectedType("workload")}
                  isChecked={selectedType === "workload"}
                />
              </td>
            </tr>
            <tr>
              <td>프로젝트명</td>
              <td>
                <LongInput
                  type="text"
                  name="projectName"
                  placeholder="프로젝트명"
                  width={500}
                  defaultValue={data ? data.projectName : null}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                />
              </td>
            </tr>
            {selectedType === "workload" && (
              <tr>
                <td>프로젝트 코드</td>
                <td>
                  <LongInput
                    type="text"
                    name="projectCode"
                    placeholder="프로젝트 코드"
                    width={300}
                    defaultValue={data ? data.projectCode : null}
                    onChange={(e) =>
                      setFormData({ ...formData, projectCode: e.target.value })
                    }
                  />
                </td>
              </tr>
            )}
            <tr>
              <td>질문 내용</td>
              <td>
                <Tiptap />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isError && (
        <div className={styles.board__edit__validation}>
          {error.message ||
            "Failed to save board. Please check your inputs and try again later."}
        </div>
      )}
      {isUpdateError && (
        <div className={styles.board__edit__validation}>
          {updateError.message ||
            "Failed to update board. Please check your inputs and try again later."}
        </div>
      )}
      {isDeleteError && (
        <div className={styles.board__edit__validation}>
          {deleteError.message ||
            "Failed to delete board. Please try again later."}
        </div>
      )}
      {isBoardError && (
        <div className={styles.board__edit__validation}>
          {boardError.message || "Failed to get board."}
        </div>
      )}
    </form>
  );
};

export default QnAFormPage;
