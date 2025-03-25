package com.ktds.azure.tenant.requestboard.util;

import com.ktds.azure.tenant.requestboard.dto.RequestBoardListDto;
import com.ktds.azure.tenant.requestboard.model.RequestBoard;

public class RequestBoardMapper {

    public static RequestBoardListDto toBoardListDto(RequestBoard requestBoard) {
        if (requestBoard == null) {
            return null;
        }

        return new RequestBoardListDto(requestBoard.getId(),
                requestBoard.getTitle(),
                requestBoard.getWriter(),
                requestBoard.getCreateDate(),
                requestBoard.getState());
    }
}
