package com.ktds.azure.tenant.requestboard.repository;


import com.ktds.azure.tenant.requestboard.model.RequestBoard;
import com.ktds.azure.tenant.requestboard.model.RequestBoardState;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestBoardRepository extends JpaRepository<RequestBoard, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE RequestBoard board SET board.state = :state WHERE board.id = :id")
    void updateState(@Param("id") Long id, @Param("state") RequestBoardState state);

}
