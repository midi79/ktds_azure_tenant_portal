import styles from "./QnABoardViewPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/widget/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getQnABoard, updateQnABoardAnswer } from "../../common/util/qnaHttp";

import Textarea from "../../common/widget/Textarea";

const QnABoardViewPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ["request", id],
    queryFn: () => getQnABoard(id),
  });

  const [showEditor, setShowEditor] = useState(false);
  const [answerData, setAnswerData] = useState("");

  const {
    mutate: updateMutate,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateQnABoardAnswer,
    onSuccess: () => {
      alert("정상적으로 수행되었습니다");
      navigate("/pages/qna");
    },
    onError: (error) => {
      console.error((error as Error).message);
    },
  });

  const onBackClickHandler = () => {
    if (confirm("리스트로 돌아가시겠습니까?")) {
      navigate("/pages/qna");
    }
  };

  const onAnswerUpdateHandler = () => {
    if (confirm("답변 하시겠습니까?")) {
      setShowEditor(false);

      const data = {
        id: id,
        answer: answerData,
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
          {data && data.state === "REQUEST" && (
            <>
              <Button
                title="수정하기"
                type="button"
                onClickHandler={onAnswerUpdateHandler}
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
            </tr>
            <tr>
              <td>Tenant 타입</td>
              <td>{data ? data.type : null}</td>
            </tr>
            <tr>
              <td>프로젝트명</td>
              <td>{data ? data.projectName : null}</td>
            </tr>
            {data && data.type === "WORKLOAD" && (
              <tr>
                <td>프로젝트 코드</td>
                <td>{data ? data.projectCode : null}</td>
              </tr>
            )}
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
              {data && data.state === "REQUEST" && !showEditor && (
                <>
                  <Button
                    title="답변하기"
                    type="button"
                    onClickHandler={() => setShowEditor(true)}
                  />
                </>
              )}
              {data && data.state === "REQUEST" && showEditor && (
                <>
                  <Button
                    title="제출하기"
                    type="button"
                    onClickHandler={onAnswerUpdateHandler}
                  />
                  <Button
                    title="취소하기"
                    type="button"
                    onClickHandler={() => setShowEditor(false)}
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

                {data?.state === "REQUEST" && !showEditor && (
                  <td> 관리자가 아직 답변하지 않았습니다. </td>
                )}

                {data?.state === "REQUEST" && showEditor && (
                  <td>
                    <Textarea
                      name="content"
                      placeholder="답변을 입력해주세요"
                      width={500}
                      defaultValue=""
                      onChange={(e) => setAnswerData(e.target.value)}
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
