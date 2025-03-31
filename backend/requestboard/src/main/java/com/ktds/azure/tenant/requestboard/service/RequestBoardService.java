package com.ktds.azure.tenant.requestboard.service;


import com.ktds.azure.tenant.requestboard.dto.RequestBoardDto;
import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.model.RequestBoard;
import com.ktds.azure.tenant.requestboard.model.UserInfo;
import com.ktds.azure.tenant.requestboard.repository.RequestBoardRepository;
import com.ktds.azure.tenant.requestboard.util.RequestBoardMapper;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        // 일단 저장할때는 권한 체크 빼고 Front에서 writer 정보 셋팅 후에 처리
        RequestBoard board = RequestBoardMapper.toEntity(requestBoardDto);
        requestBoardRepository.save(board);
        return requestBoardDto;

//        UserInfo userInfo = getUserInfo(httpSession);
//        if (requestBoardDto.getWriter().equals(userInfo.getName())) {
//            RequestBoard board = RequestBoardMapper.toEntity(requestBoardDto);
//            requestBoardRepository.save(board);
//            return requestBoardDto;
//        } else {
//            throw new RuntimeException("저장 권한이 없습니다.");
//        }
    }

    public RequestBoardDto getRequestBoardById(Long id, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        RequestBoard requestBoard = requestBoardRepository.findById(id).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if (userInfo.getName().equals(requestBoard.getWriter())) {
            return RequestBoardMapper.toDto(requestBoard);
        } else {
            throw new RuntimeException("읽기 권한이 없습니다.");
        }
    }

    public RequestBoardDto updateRequestBoard(RequestBoardDto requestBoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        RequestBoard requestBoard = requestBoardRepository.findById(requestBoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if(userInfo.getName().equals(requestBoard.getWriter())) {
            return RequestBoardMapper.toDto(requestBoardRepository.save(RequestBoardMapper.toEntity(requestBoardDto)));
        } else {
            throw new RuntimeException("읽기 권한이 없습니다.");
        }
    }

    public void updateRequestBoardState(RequestBoardDto requestBoardDto) {
        requestBoardRepository.updateState(requestBoardDto.getId(), requestBoardDto.getState());
    }

    public void deleteReqeuestBoardsByIds(RequestBoardDto requestBoardDto, HttpSession httpSession) {
        UserInfo userInfo = getUserInfo(httpSession);
        RequestBoard requestBoard = requestBoardRepository.findById(requestBoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if(userInfo.getName().equals(requestBoard.getWriter())) {
            requestBoardRepository.deleteById(requestBoardDto.getId());
        } else {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
    }

    public UserInfo getUserInfo(HttpSession httpSession) {
        return (UserInfo) httpSession.getAttribute("userInfo");
    }
}
