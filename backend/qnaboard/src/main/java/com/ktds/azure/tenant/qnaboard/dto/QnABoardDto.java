package com.ktds.azure.tenant.qnaboard.dto;


import com.ktds.azure.tenant.qnaboard.model.QnABoardState;
import com.ktds.azure.tenant.qnaboard.model.QnABoardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QnABoardDto {
    private Long id;
    private String title;
    private String writer;
    private String projectCode;
    private String projectName;
    private String purpose;
    private String content;
    private String answer;
    private QnABoardType type;
    private QnABoardState state;

    @Override
    public String toString() {
        return "QnABoardDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", writer='" + writer + '\'' +
                ", projectCode='" + projectCode + '\'' +
                ", projectName='" + projectName + '\'' +
                ", purpose='" + purpose + '\'' +
                ", type=" + type +
                ", content='" + content + '\'' +
                ", answer=" + answer +
                ", state=" + state +
                '}';
    }

}
