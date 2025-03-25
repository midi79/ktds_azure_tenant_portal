package com.ktds.azure.tenant.requestboard.dto;


import com.ktds.azure.tenant.requestboard.model.RequestBoardState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestBoardListDto {

    private Long id;
    private String title;
    private String writer;
    private LocalDateTime createDate;
    private RequestBoardState state;

}
