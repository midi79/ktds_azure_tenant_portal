package com.ktds.azure.tenant.qnaboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import com.ktds.azure.tenant.qnaboard.model.QnABoardState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QnABoardListDto {

    private Long id;
    private String title;
    private String writer;
    private LocalDateTime createDate;
    private QnABoardState state;

}