package com.ktds.azure.tenant.requestboard.model;


import com.ktds.azure.tenant.requestboard.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TB_REQUEST_BOARD")
public class RequestBoard extends BaseTimeEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = -3724542338720346254L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(nullable = false)
    private String writer;

    @Column
    private String projectCode;

    @Column(nullable = false)
    private String projectName;

    @Column
    private String purpose;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private String budgetManager;

    @Column
    private String operationManager;

    @Column
    private Long budget;

    @Column
    private Boolean alert;

    @Column
    private Long alertBudget;

    @Column
    private String managementGroup;

    @Column
    private Long ipCount;

    @Column
    @Enumerated(EnumType.STRING)
    private RequestBoardType type;

    @Column
    @Enumerated(EnumType.STRING)
    private RequestBoardState state;
}
