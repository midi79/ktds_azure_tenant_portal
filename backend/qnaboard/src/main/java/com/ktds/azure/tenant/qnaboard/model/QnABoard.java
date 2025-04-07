package com.ktds.azure.tenant.qnaboard.model;


import com.ktds.azure.tenant.qnaboard.util.BaseTimeEntity;
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
@Table(name = "TB_QNA_BOARD")
public class QnABoard extends BaseTimeEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = -3724542338720346254L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String writer;

    @Column
    private String projectCode;

    @Column(nullable = false)
    private String projectName;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Column
    @Enumerated(EnumType.STRING)
    private QnABoardType type;

    @Column
    @Enumerated(EnumType.STRING)
    private QnABoardState state;

}