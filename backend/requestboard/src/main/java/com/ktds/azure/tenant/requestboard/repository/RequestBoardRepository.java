package com.ktds.azure.tenant.requestboard.repository;


import com.ktds.azure.tenant.requestboard.model.RequestBoard;
import com.ktds.azure.tenant.requestboard.model.RequestBoardState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface RequestBoardRepository extends JpaRepository<RequestBoard, Long> {

    @Query("SELECT board FROM RequestBoard board WHERE " +
            "(:writer IS NULL OR board.writer LIKE CONCAT('%', CAST(:writer AS string), '%')) AND " +
            "(:title IS NULL OR board.title LIKE CONCAT('%', CAST(:title AS string), '%')) AND " +
            "(cast(:fromDate as timestamp) IS NULL OR board.createDate >= :fromDate) AND " +
            "(cast(:toDate as timestamp) IS NULL OR board.createDate <= :toDate) AND " +
            "(:state IS NULL OR board.state = :state)")
    Page<RequestBoard> search(@Param("writer") String writer,
                              @Param("title") String title,
                              @Param("fromDate") LocalDateTime fromDate,
                              @Param("toDate") LocalDateTime toDate,
                              @Param("state") RequestBoardState state,
                              Pageable pageable);

}
