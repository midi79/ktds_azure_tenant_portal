package com.ktds.azure.tenant.requestboard.controller;

import com.ktds.azure.tenant.requestboard.dto.RequestBoardDto;
import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.model.UserInfo;
import com.ktds.azure.tenant.requestboard.service.RequestBoardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/dash/api/v1/request-board")
public class RequestBoardController {

    @Autowired
    RequestBoardService requestBoardService;

    @GetMapping("/user")
    public ResponseEntity<UserInfo> getUserInfor(HttpSession httpSession) {
        return ResponseEntity.ok(requestBoardService.getUserInfo(httpSession));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<RequestBoardListDto>> getAllRequestBoards(@PageableDefault(sort = "id", direction = Sort.Direction.DESC)Pageable pageable) {
        return ResponseEntity.ok(requestBoardService.getAllRequestBoardList(pageable));
    }

    @PostMapping("/save")
    public ResponseEntity<RequestBoardDto> saveRequestBoard(@RequestBody RequestBoardDto requestBoardDto, HttpSession httpSession) {
        return ResponseEntity.ok(requestBoardService.saveRequestBoard(requestBoardDto, httpSession));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestBoardDto> getRequestBoard(@PathVariable("id") Long id, HttpSession httpSession) {
        RequestBoardDto requestBoardDto = requestBoardService.getRequestBoardById(id, httpSession);
        return requestBoardDto != null ? ResponseEntity.ok(requestBoardDto) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/update")
    public ResponseEntity<RequestBoardDto> updateRequestBoard(@RequestBody RequestBoardDto requestBoardDto, HttpSession httpSession) {
        return ResponseEntity.ok(requestBoardService.updateRequestBoard(requestBoardDto, httpSession));
    }

    @PatchMapping("/update/state")
    public ResponseEntity<String> updateRequestBoardState(@RequestBody RequestBoardDto requestBoardDto) {
        requestBoardService.updateRequestBoardState(requestBoardDto);
        return ResponseEntity.accepted().body("Update Success");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteBoards(@RequestBody RequestBoardDto requestBoardDto, HttpSession httpSession) {
        requestBoardService.deleteReqeuestBoardsByIds(requestBoardDto, httpSession);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<RequestBoardListDto>> searchRequestBoards(
            @RequestParam(name="writer", required = false) String writer,
            @RequestParam(name="title", required = false) String title,
            @RequestParam(name="fromDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(name="toDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
            @RequestParam(name="state", required = false) String state,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<RequestBoardListDto> results = requestBoardService.searchBoards(writer, title, fromDate, toDate, state, pageable);
        return ResponseEntity.ok(results);
    }
}
