package com.ktds.azure.tenant.requestboard.controller;

import com.ktds.azure.tenant.requestboard.dto.RequestBoardDto;
import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.service.RequestBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dash/api/v1/request-board")
public class RequestBoardController {

    @Autowired
    RequestBoardService requestBoardService;

    @GetMapping("/all")
    public ResponseEntity<Page<RequestBoardListDto>> getAllRequestBoards(@PageableDefault(sort = "id", direction = Sort.Direction.DESC)Pageable pageable) {
        return ResponseEntity.ok(requestBoardService.getAllRequestBoardList(pageable));
    }

    @PostMapping("/save")
    public ResponseEntity<RequestBoardDto> saveRequestBoard(@RequestBody RequestBoardDto requestBoardDto) {
        return ResponseEntity.ok(requestBoardService.saveRequestBoard(requestBoardDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestBoardDto> getRequestBoard(@PathVariable("id") Long id) {
        RequestBoardDto requestBoardDto = requestBoardService.getRequestBoardById(id);
        return requestBoardDto != null ? ResponseEntity.ok(requestBoardDto) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/update")
    public ResponseEntity<RequestBoardDto> updateRequestBoard(@RequestBody RequestBoardDto requestBoardDto) {
        return ResponseEntity.ok(requestBoardService.updateRequestBoard(requestBoardDto));
    }

    @PatchMapping("/update/state")
    public ResponseEntity<RequestBoardDto> updateRequestBoardState(@RequestBody RequestBoardDto requestBoardDto) {
        requestBoardService.updateRequestBoardState(requestBoardDto);
        return ResponseEntity.ok(requestBoardService.getRequestBoardById(requestBoardDto.getId()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteBoards(@RequestBody RequestBoardDto requestBoardDto) {
        requestBoardService.deleteReqeuestBoardsByIds(requestBoardDto);
        return ResponseEntity.noContent().build();
    }
}
