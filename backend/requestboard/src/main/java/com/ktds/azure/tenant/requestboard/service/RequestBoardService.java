package com.ktds.azure.tenant.requestboard.service;


import com.ktds.azure.tenant.requestboard.dto.RequestBoardDto;
import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.model.RequestBoard;
import com.ktds.azure.tenant.requestboard.repository.RequestBoardRepository;
import com.ktds.azure.tenant.requestboard.util.RequestBoardMapper;
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
    private RequestBoardRepository requestBoardRepository;

    public RequestBoardService(RequestBoardRepository requestBoardRepository) {
        this.requestBoardRepository = requestBoardRepository;
    }

    public Page<RequestBoardListDto> getAllRequestBoardList(Pageable pageable) {
        Page<RequestBoard> boardList = requestBoardRepository.findAll(pageable);
        List<RequestBoardListDto> listDtos = boardList.getContent().stream()
                .map(RequestBoardMapper::toBoardListDto).toList();
        return new PageImpl<>(listDtos, pageable, boardList.getTotalElements());
    }

    public RequestBoardDto saveRequestBoard(RequestBoardDto requestBoardDto) {
        RequestBoard board = RequestBoardMapper.toEntity(requestBoardDto);
        requestBoardRepository.save(board);
        return requestBoardDto;
    }

    public RequestBoardDto getRequestBoardById(Long id) {
        RequestBoard board = requestBoardRepository.findById(id).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return RequestBoardMapper.toDto(board);
    }

    public RequestBoardDto updateRequestBoard(RequestBoardDto requestBoardDto) {
        RequestBoard requestBoard = requestBoardRepository.findById(requestBoardDto.getId()).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return RequestBoardMapper.toDto(requestBoardRepository.save(RequestBoardMapper.toEntity(requestBoardDto)));
    }


}
