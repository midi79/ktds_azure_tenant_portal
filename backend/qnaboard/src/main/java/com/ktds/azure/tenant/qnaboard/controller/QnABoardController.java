package com.ktds.azure.tenant.qnaboard.controller;

import com.ktds.azure.tenant.qnaboard.dto.QnABoardDto;
import com.ktds.azure.tenant.qnaboard.dto.QnABoardListDto;
import com.ktds.azure.tenant.qnaboard.service.QnABoardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dash/api/v1/qna-board")
public class QnABoardController {

    @Autowired
    QnABoardService qnABoardService;

    @GetMapping("/all")
    public ResponseEntity<Page<QnABoardListDto>> getAllQnABoards(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(qnABoardService.getAllQnABoardList(pageable));
    }

    @PostMapping("/save")
    public ResponseEntity<QnABoardDto> saveQnABoard(@RequestBody QnABoardDto qnABoardDto, HttpSession httpSession) {
        return ResponseEntity.ok(qnABoardService.saveQnABoard(qnABoardDto, httpSession));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QnABoardDto> getQnABoard(@PathVariable("id") Long id, HttpSession httpSession) {
        QnABoardDto qnABoardDto = qnABoardService.getQnABoardById(id, httpSession);
        return qnABoardDto != null ? ResponseEntity.ok(qnABoardDto) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/update")
    public ResponseEntity<QnABoardDto> updateQnABoard(@RequestBody QnABoardDto qnABoardDto, HttpSession httpSession) {
        return ResponseEntity.ok(qnABoardService.updateQnABoard(qnABoardDto, httpSession));
    }

    @PatchMapping("/update/answer")
    public ResponseEntity<String> updateQnABoardAnswer(@RequestBody QnABoardDto qnABoardDto) {
        qnABoardService.updateQnABoardAnswer(qnABoardDto);
        return ResponseEntity.accepted().body("Updated Success");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteBoards(@RequestBody QnABoardDto qnABoardDto, HttpSession httpSession) {
        qnABoardService.deleteQnABoardsByIds(qnABoardDto, httpSession);
        return ResponseEntity.noContent().build();
    }

}