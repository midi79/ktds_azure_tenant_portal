package com.ktds.azure.tenant.requestboard.dto;

import com.ktds.azure.tenant.requestboard.model.RequestBoardState;
import com.ktds.azure.tenant.requestboard.model.RequestBoardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestBoardDto {
    private Long id;
    private String title;
    private String writer;
    private String projectCode;
    private String projectName;
    private String purpose;
    private LocalDate startDate;
    private LocalDate endDate;
    private String budgetManager;
    private String operationManager;
    private Long budget;
    private Boolean alert;
    private Long alertBudget;
    private String managementGroup;
    private Long ipCount;
    private RequestBoardType type;
    private RequestBoardState state;

    @Override
    public String toString() {
        return "RequestBoardDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", writer='" + writer + '\'' +
                ", projectCode='" + projectCode + '\'' +
                ", projectName='" + projectName + '\'' +
                ", purpose='" + purpose + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", budgetManager='" + budgetManager + '\'' +
                ", operationManager='" + operationManager + '\'' +
                ", budget=" + budget +
                ", alert=" + alert +
                ", alertBudget=" + alertBudget +
                ", managementGroup='" + managementGroup + '\'' +
                ", ipCount=" + ipCount +
                ", type=" + type +
                ", state=" + state +
                '}';
    }
}
