import styles from "./QnABoardViewPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/widget/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getRequestBoard,
  updateRequestBoardState,
} from "../../common/util/http";

import Textarea from "../../common/widget/Textarea";

// mock data 구조 정의
interface IRequestBoard {
  id: number;
  title: string;
  writer: string;
  createDate: Date;
  state: "PENDING" | "ANSWERED"; // 수정 단계, 저장 단계 추가
  purpose: "WORKLOAD" | "SANDBOX";
  projectName: string;
  projectCode: string;
  content: string;
  answer: string;
}

const mockRequestBoards: Record<string, IRequestBoard> = {
  "1": {
    id: 1,
    title: "이 서비스는 어떻게 이용하나요?",
    writer: "장선후후후1",
    createDate: new Date("2024-12-01T10:00:00"),
    state: "PENDING",
    purpose: "WORKLOAD",
    projectName: "KTDS Azure 테넌트 포탈",
    projectCode: "AZ-PT-001",
    content: "<h1>긴급합니다.</h1><p>Azure가 뭐에요?</p>",
    answer: "",
  },
  "2": {
    id: 2,
    title: "관리자님 질문 있습니다!",
    writer: "장선후후후2",
    createDate: new Date("2025-01-15T14:30:00"),
    state: "ANSWERED",
    purpose: "SANDBOX",
    projectName: "기획서 자동화",
    projectCode: "AZ-PL-002",
    content: "<p>리소스를 더 할당해 주세요.</p>",
    answer: "<p>넵. 조치 완료했습니다.</p>",
  },
};
// 여기까지 삭제해야 해요

const QnABoardViewPage = () => {
  const navigate = useNavigate();

  // const { id } = useParams();

  // const { data, isError, error } = useQuery({
  //   queryKey: ["request", id],
  //   queryFn: () => getRequestBoard(id),
  // });

  // 여기부터 mockdata
  const { id } = useParams<{ id: string }>();
  const [showEditor, setShowEditor] = useState(false);

  const data = id ? mockRequestBoards[id] : undefined;
  const isError = !data;
  const error = isError ? new Error("데이터를 찾을 수 없습니다.") : null;

  const {
    mutate: updateMutate,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateRequestBoardState,
    onSuccess: () => {
      alert("정상적으로 수행되었습니다");
      navigate("/pages/qna");
    },
  });

  const onBackClickHandler = () => {
    if (confirm("리스트로 돌아가시겠습니까?")) {
      navigate("/pages/qna");
    }
  };

  const onAnswerClickHandler = () => {
    if (confirm("답변 하시겠습니까?")) {
      setShowEditor(false);
    }
  };

  const onApproveHandler = () => {
    if (confirm("승인 하시겠습니까?")) {
      const data = {
        id: id,
        state: "APPROVED",
      };

      updateMutate({ board: data });
    }
  };

  return (
    <div className={styles.board__view__wrapper}>
      <div className={styles.board__view__header}>
        <div className={styles.board__view__header__left}>
          <div className={styles.board__view__header__title}>
            KD DS Azure Tenant 신청 QnA
          </div>
        </div>
        <div className={styles.board__view__button}>
          {data && data.state === "PENDING" && (
            <>
              <Button
                title="수정하기"
                type="button"
                onClickHandler={onAnswerClickHandler}
              />
            </>
          )}
          <Button
            title="뒤로가기"
            onClickHandler={onBackClickHandler}
            type="button"
          />
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
              <td>제목</td>
              <td>{data ? data.title : null}</td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>{data ? data.writer : null}</td>
            </tr>{" "}
            <tr>
              <td>프로젝트 목적</td>
              <td>{data ? data.purpose : null}</td>
            </tr>
            <tr>
              <td>프로젝트명</td>
              <td>{data ? data.projectName : null}</td>
            </tr>
            <tr>
              <td>프로젝트 코드</td>
              <td>{data ? data.projectCode : null}</td>
            </tr>
            <tr>
              <td>질문 내용</td>
              <td dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
            </tr>
          </tbody>
        </table>

        <div className={styles.qna__answer__body}>
          <div className={styles.board__view__header}>
            <div className={styles.board__view__header__left}>
              <div className={styles.board__view__header__title}>
                {showEditor ? "QnA 답변 작성" : "관리자 QnA 답변"}
              </div>
            </div>
            <div className={styles.board__view__button}>
              {data && data.state === "PENDING" && !showEditor && (
                <>
                  <Button
                    title="답변하기"
                    type="button"
                    onClickHandler={() => setShowEditor(true)}
                  />
                </>
              )}
              {data && data.state === "PENDING" && showEditor && (
                <>
                  <Button
                    title="제출하기"
                    type="button"
                    onClickHandler={onAnswerClickHandler}
                  />
                </>
              )}
            </div>
          </div>
          <table className={styles.board__view__table}>
            <colgroup>
              <col className={styles["col-title"]} />
              <col className={styles["col-content"]} />
            </colgroup>
            <tbody>
              <tr>
                <td>답변</td>

                {data?.state === "ANSWERED" && (
                  <td dangerouslySetInnerHTML={{ __html: data.answer }} />
                )}

                {data?.state === "PENDING" && !showEditor && (
                  <td> 관리자가 아직 답변하지 않았습니다. </td>
                )}

                {data?.state === "PENDING" && showEditor && (
                  <td>
                    <Textarea
                      name="content"
                      placeholder="답변을 입력해주세요"
                      width={500}
                      defaultValue=""
                    />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isError && (
        <div className={styles.board__view__validation}>
          {error.message || "Failed to get board."}
        </div>
      )}
      {isUpdateError && (
        <div className={styles.board__view__validation}>
          {updateError.message ||
            "Failed to update request board. Please try again later."}
        </div>
      )}
    </div>
  );
};

export default QnABoardViewPage;
