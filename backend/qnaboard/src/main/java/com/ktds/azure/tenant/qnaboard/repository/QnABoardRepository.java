package com.ktds.azure.tenant.qnaboard.repository;

import com.ktds.azure.tenant.qnaboard.model.QnABoard;
import com.ktds.azure.tenant.qnaboard.model.QnABoardState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface QnABoardRepository extends JpaRepository<QnABoard, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE QnABoard board SET board.state =:state WHERE board.id = :id")
    void updateState(@Param("id") Long id, @Param("state") QnABoardState state);


    @Modifying
    @Transactional
    @Query("UPDATE QnABoard board SET board.answer =:answer WHERE board.id = :id")
    void updateAnswer(@Param("id") Long id, @Param("answer") String answer);

}
