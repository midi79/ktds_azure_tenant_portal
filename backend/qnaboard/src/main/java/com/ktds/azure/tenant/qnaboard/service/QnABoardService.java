package com.ktds.azure.tenant.qnaboard.service;

import com.ktds.azure.tenant.qnaboard.dto.QnABoardDto;
import com.ktds.azure.tenant.qnaboard.dto.QnABoardListDto;
import com.ktds.azure.tenant.qnaboard.model.QnABoard;
import com.ktds.azure.tenant.qnaboard.model.QnABoardState;
import com.ktds.azure.tenant.qnaboard.model.UserInfo;
import com.ktds.azure.tenant.qnaboard.repository.QnABoardRepository;
import com.ktds.azure.tenant.qnaboard.util.QnABoardMapper;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class QnABoardService {
    private final QnABoardRepository qnABoardRepository;

    public QnABoardService(QnABoardRepository qnABoardRepository) {
        this.qnABoardRepository = qnABoardRepository;
    }

    public Page<QnABoardListDto> getAllQnABoardList(Pageable pageable){
        Page<QnABoard> boardList = qnABoardRepository.findAll(pageable);
        List<QnABoardListDto> listDtos = boardList.getContent().stream()
                .map(QnABoardMapper::toBoardListDto).toList();
        return new PageImpl<>(listDtos, pageable, boardList.getTotalElements());
    }

    public QnABoardDto saveQnABoard(QnABoardDto qnABoardDto, HttpSession httpSession) {
        QnABoard board = QnABoardMapper.toEntity(qnABoardDto);
        qnABoardRepository.save(board);

        return qnABoardDto;
    }

    public QnABoardDto getQnABoardById(Long id, HttpSession httpSession){
        UserInfo userInfo = getUserInfo(httpSession);
        QnABoard qnABoard = qnABoardRepository.findById(id).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        if (userInfo.getName().equals(qnABoard.getWriter())) {
            return QnABoardMapper.toDto(qnABoard);
        } else {
            throw new RuntimeException("읽기 권한이 없습니다");
        }

    }

    public QnABoardDto updateQnABoard(QnABoardDto qnABoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        QnABoard qnABoard = qnABoardRepository.findById(qnABoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        if (userInfo.getName().equals(qnABoard.getWriter())) {
            return QnABoardMapper.toDto(qnABoardRepository.save(QnABoardMapper.toEntity(qnABoardDto)));
        } else {
            throw new RuntimeException("읽기 권한이 없습니다.");
        }
    }

    public void updateQnABoardAnswer(QnABoardDto qnABoardDto) {
        qnABoardRepository.updateAnswerAndState(qnABoardDto.getId(), qnABoardDto.getAnswer(), QnABoardState.ANSWERED);
    }

    public void deleteQnABoardsByIds(QnABoardDto qnABoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        QnABoard qnABoard = qnABoardRepository.findById(qnABoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        System.out.println(userInfo.getName());
        System.out.println(qnABoard.getWriter());

        if (userInfo.getName().equals(qnABoard.getWriter())) {
            qnABoardRepository.deleteById(qnABoardDto.getId());
        } else {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
    }

    public UserInfo getUserInfo(HttpSession httpSession){
        return (UserInfo) httpSession.getAttribute("userInfo");
    }

}
