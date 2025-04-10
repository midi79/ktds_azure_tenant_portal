package com.ktds.azure.tenant.requestboard.dto;

import com.ktds.azure.tenant.requestboard.model.RequestBoardState;
import com.ktds.azure.tenant.requestboard.model.RequestBoardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestBoardDto {
    private Long id;
    private String title;
    private String writer;
    private String writerEmail;
    private String projectCode;
    private String projectName;
    private String purpose;
    private Boolean requiredDev;
    private LocalDate startDate;
    private LocalDate endDate;
    private String budgetManager;
    private String budgetManagerEmail;
    private String operationManager;
    private String operationManagerEmail;
    private Long budget;
    private Boolean alert;
    private Long alertBudget;
    private String managementGroup;
    private Long ipCount;
    private RequestBoardType type;
    private RequestBoardState state;
    private String budgetLink;
    private String request;

    @Override
    public String toString() {
        return "RequestBoardDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", writer='" + writer + '\'' +
                ", writerEmail='" + writerEmail + '\'' +
                ", projectCode='" + projectCode + '\'' +
                ", projectName='" + projectName + '\'' +
                ", purpose='" + purpose + '\'' +
                ", requiredDev='" + requiredDev + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", budgetManager='" + budgetManager + '\'' +
                ", budgetManagerEmail='" + budgetManagerEmail + '\'' +
                ", operationManager='" + operationManager + '\'' +
                ", operationManagerEmail='" + operationManagerEmail + '\'' +
                ", budget=" + budget +
                ", alert=" + alert +
                ", alertBudget=" + alertBudget +
                ", managementGroup='" + managementGroup + '\'' +
                ", ipCount=" + ipCount +
                ", type=" + type +
                ", state=" + state +
                ", budgetLink='" + budgetLink + '\'' +
                ", request='" + request + '\'' +
                '}';
    }
}
