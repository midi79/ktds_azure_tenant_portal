package com.ktds.azure.tenant.requestboard.controller;

import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.service.RequestBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/request-board")
public class RequestBoardController {

    @Autowired
    RequestBoardService requestBoardService;

    @GetMapping("/all")
    public ResponseEntity<Page<RequestBoardListDto>> getAllRequestBoards(@PageableDefault(sort = "id", direction = Sort.Direction.DESC)Pageable pageable) {
        return ResponseEntity.ok(requestBoardService.getAllRequestBoardList(pageable));
    }
}
