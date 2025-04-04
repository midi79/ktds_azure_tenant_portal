package com.ktds.azure.tenant.qnaboard.util;

import com.ktds.azure.tenant.qnaboard.dto.QnABoardDto;
import com.ktds.azure.tenant.qnaboard.dto.QnABoardListDto;
import com.ktds.azure.tenant.qnaboard.model.QnABoard;

import java.time.LocalDateTime;

public class QnABoardMapper {

    public static QnABoard toEntity(QnABoardDto qnABoardDto) {
        if (qnABoardDto == null) {
            return null;
        }

        QnABoard board = new QnABoard();
        board.setId(qnABoardDto.getId());
        board.setTitle(qnABoardDto.getTitle());
        board.setWriter(qnABoardDto.getWriter());
        board.setProjectCode(qnABoardDto.getProjectCode());
        board.setProjectName(qnABoardDto.getProjectName());
        board.setContent(qnABoardDto.getContent());
        board.setAnswer(qnABoardDto.getAnswer());
        board.setType(qnABoardDto.getType());
        board.setState(qnABoardDto.getState());


        return board;
    }

    public static QnABoardDto toDto(QnABoard qnABoard) {
        if (qnABoard == null) return null;

        QnABoardDto qnABoardDto = new QnABoardDto();
        qnABoardDto.setId(qnABoard.getId());
        qnABoardDto.setTitle(qnABoard.getTitle());
        qnABoardDto.setWriter(qnABoard.getWriter());
        qnABoardDto.setProjectCode(qnABoard.getProjectCode());
        qnABoardDto.setProjectName(qnABoard.getProjectName());
        qnABoardDto.setContent(qnABoard.getContent());
        qnABoardDto.setAnswer(qnABoard.getAnswer());
        qnABoardDto.setType(qnABoard.getType());
        qnABoardDto.setState(qnABoard.getState());
        return qnABoardDto;
    }

    public static QnABoardListDto toBoardListDto(QnABoard qnABoard) {
        if (qnABoard == null) {
            return null;
        }

        LocalDateTime editDate = null;

        if (qnABoard.getCreateDate() != null) {
            editDate = qnABoard.getModifyDate().isAfter(qnABoard.getCreateDate()) ? qnABoard.getModifyDate() : qnABoard.getCreateDate();
        } else {
            editDate = qnABoard.getModifyDate();
        }

        return new QnABoardListDto(qnABoard.getId(),
                qnABoard.getTitle(),
                qnABoard.getWriter(),
                editDate,
                qnABoard.getState());

    }

}
