import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

interface IPageProp {
    size: number;
    page: number;
    searchOption: string | null;
    searchTerm: string | boolean | null;
    fromDate: string | null;
    toDate: string | null;
}

const ENV = import.meta.env.VITE_ENV;
let BASE_URL = "http://localhost:8090";

if (ENV === "dev" || ENV === "prd") {
    BASE_URL = import.meta.env.VITE_API_URL;
}
    
console.log("BASE_URL", BASE_URL);


export async function getUserInfo() {
    try {
        const response = await axios.get(BASE_URL + "/dash/api/v1/request-board/user", { withCredentials: true });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while fetching user data"
        );
    }
}

export async function saveRequestBoard(data: any) {
    try {
        const response = await axios.post(BASE_URL + "/dash/api/v1/request-board/save", data.board, { withCredentials: true });

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while save reqeust board data"
        );
    }
}

export async function updateRequestBoard(data: any) {
    try {
        const response = await axios.patch(BASE_URL + "/dash/api/v1/request-board/update", data.board, {
            headers: { "Content-Type": "application/json" },   
            withCredentials: true         
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while update reqeust board data"
        );
    }
}

export async function updateRequestBoardState(data: any) {
    console.log(data);
    try {
        const response = await axios.patch(BASE_URL + "/dash/api/v1/request-board/update/state", data.board, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while update reqeust board data"
        );
    }
}

export async function getRequestBoards({ size, page, searchOption, searchTerm, fromDate, toDate }: IPageProp) {
    // console.log(
    //     "size:",
    //     size,
    //     "page:",
    //     page,
    //     "searchOption",
    //     searchOption,
    //     "searchTerm",
    //     searchTerm,
    //     "fromDate",
    //     fromDate,
    //     "toDate",
    //     toDate
    // );

    let URL = `${BASE_URL}/dash/api/v1/request-board/all?size=${size}&page=${page}`;

    if ((checkNotNull(searchOption) && checkNotNull(searchTerm)) || searchOption === "date") {
        URL = `${BASE_URL}/dash/api/v1/request-board/search?size=${size}&page=${page}`;

        if (searchOption !== "date") {
            URL += `&${searchOption}=${searchTerm}`;
        } else {
            if (fromDate && toDate) {
                URL += `&fromDate=${fromDate}&toDate=${toDate}`;
            } else if (fromDate) {
                URL += `&fromDate=${fromDate}`;
            } else if (toDate) {
                URL += `&toDate=${toDate}`;
            }
        }
    }

    //console.log("URL : ", URL);
    try {
        const response = await axios.get(URL, { withCredentials: true });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while fetching reqeust board data"
        );
    }
}

export async function deleteRequestBoard(data: any) {
    try {
        const response = await axios.delete(BASE_URL + "/dash/api/v1/request-board/delete", {data: data.board, withCredentials: true}, );

        if (response.status !== 204) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while delete reqeust board data"
        );
    }
}

export async function getRequestBoard(id: string | null | undefined, type?: string) {
    let URL = `${BASE_URL}/dash/api/v1/request-board/${id}`;

    if (type === "update") {
        URL += "/update";
    }

    console.log("URL : ", URL);
    try {
        const response = await axios.get(URL, { withCredentials: true });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while fetching board data"
        );
    }
}

function checkNotNull(data: any) {
    if (data || data === null || data == undefined || data === "") {
        return false;
    }
    return true;
}