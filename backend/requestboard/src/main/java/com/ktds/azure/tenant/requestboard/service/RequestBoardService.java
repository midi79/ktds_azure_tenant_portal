package com.ktds.azure.tenant.requestboard.service;


import com.ktds.azure.tenant.requestboard.dto.RequestBoardDto;
import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.model.RequestBoard;
import com.ktds.azure.tenant.requestboard.model.RequestBoardRole;
import com.ktds.azure.tenant.requestboard.model.RequestBoardState;
import com.ktds.azure.tenant.requestboard.model.UserInfo;
import com.ktds.azure.tenant.requestboard.repository.RequestBoardRepository;
import com.ktds.azure.tenant.requestboard.util.RequestBoardMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class RequestBoardService {
    private final RequestBoardRepository requestBoardRepository;

    public RequestBoardService(RequestBoardRepository requestBoardRepository) {
        this.requestBoardRepository = requestBoardRepository;
    }

    public Page<RequestBoardListDto> getAllRequestBoardList(Pageable pageable) {
        Page<RequestBoard> boardList = requestBoardRepository.findAll(pageable);
        List<RequestBoardListDto> listDtos = boardList.getContent().stream()
                .map(RequestBoardMapper::toBoardListDto).toList();
        return new PageImpl<>(listDtos, pageable, boardList.getTotalElements());
    }

    public RequestBoardDto saveRequestBoard(RequestBoardDto requestBoardDto, HttpSession httpSession) {
        if(RequestBoardState.REQUEST == requestBoardDto.getState()) {
            requestBoardDto.setRequestDate(LocalDateTime.now());
        }
        RequestBoard board = RequestBoardMapper.toEntity(requestBoardDto, new RequestBoard());
        requestBoardRepository.save(board);
        return requestBoardDto;
    }

    public RequestBoardDto getRequestBoardById(Long id, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        RequestBoard requestBoard = requestBoardRepository.findById(id).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if (userInfo.getEmail().equals(requestBoard.getWriterEmail()) || userInfo.getRole().equals(RequestBoardRole.ROLE_ADMIN.name())) {
            return RequestBoardMapper.toDto(requestBoard);
        } else {
            throw new RuntimeException("읽기 권한이 없습니다.");
        }
    }

    public RequestBoardDto updateRequestBoard(RequestBoardDto requestBoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        RequestBoard requestBoard = requestBoardRepository.findById(requestBoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if(userInfo.getEmail().equals(requestBoard.getWriterEmail())) {
            if(RequestBoardState.REQUEST == requestBoardDto.getState()) {
                requestBoardDto.setRequestDate(LocalDateTime.now());
            }
            return RequestBoardMapper.toDto(requestBoardRepository.save(RequestBoardMapper.toEntity(requestBoardDto, requestBoard)));
        } else {
            throw new RuntimeException("업데이트 권한이 없습니다.");
        }
    }

    public void updateRequestBoardState(RequestBoardDto requestBoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        if(userInfo != null && RequestBoardRole.ROLE_ADMIN.name().equals(userInfo.getRole())) {
            RequestBoard board = requestBoardRepository.findById(requestBoardDto.getId()).orElseThrow(() -> new EntityNotFoundException("게시글을 찾을 수 없습니다."));
            board.setState(requestBoardDto.getState());
            switch (requestBoardDto.getState()) {
                case RequestBoardState.DENY -> board.setDenyDate(LocalDateTime.now());
                case RequestBoardState.APPROVED -> board.setApprovedDate(LocalDateTime.now());
                case RequestBoardState.COMPLETE -> board.setCompleteDate(LocalDateTime.now());
            }
            requestBoardRepository.save(board);
        } else {
            throw new RuntimeException("업데이트 권한이 없습니다.");
        }

    }

    public void deleteReqeuestBoardsByIds(RequestBoardDto requestBoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        RequestBoard requestBoard = requestBoardRepository.findById(requestBoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if(userInfo.getEmail().equals(requestBoard.getWriterEmail())) {
            requestBoardRepository.deleteById(requestBoardDto.getId());
        } else {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
    }

    public UserInfo getUserInfo(HttpSession httpSession) {
        return (UserInfo) httpSession.getAttribute("userInfo");
    }


    /**
     * Search ReqeustBoards by search condition
     * @return RequestBoardDto List
     */
    public Page<RequestBoardListDto> searchBoards(String writer, String title, LocalDate fromDate, LocalDate toDate, RequestBoardState state, Pageable pageable) {
        LocalDateTime localDateTimeFromDate = fromDate != null ? fromDate.atStartOfDay() : null;
        LocalDateTime localDateTimeToDate = toDate != null ? toDate.plusDays(1).atStartOfDay() : null;
        System.out.println("writer : " + writer + ", title : " + title + ", fromDate : " + fromDate + ", toDate : " + toDate + ", state : " + state);

        Page<RequestBoard> boardPage = requestBoardRepository.search(writer, title, localDateTimeFromDate, localDateTimeToDate, state, pageable);
        List<RequestBoardListDto> listDtos = boardPage.getContent().stream().map(RequestBoardMapper::toBoardListDto).collect(Collectors.toList());
        return new PageImpl<>(listDtos, pageable, boardPage.getTotalElements());
    }

}
