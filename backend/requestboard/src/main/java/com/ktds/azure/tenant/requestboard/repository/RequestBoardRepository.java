package com.ktds.azure.tenant.requestboard.repository;


import com.ktds.azure.tenant.requestboard.model.RequestBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestBoardRepository extends JpaRepository<RequestBoard, Long> {

}
