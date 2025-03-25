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

interface IFavoriteProp {
    id: number;
    favorite: boolean;
}

export async function createNewBoard(data: any) {
    try {
        const response = await axios.post("http://localhost:8090/api/v1/request-board/create", data.board);

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while save board data"
        );
    }
}

export async function updateBoard(data: any) {
    try {
        const response = await axios.patch("http://localhost:8090/api/v1/request-board/update", data.board, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while update board data"
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

    let URL = `http://localhost:8090/api/v1/request-board/all?size=${size}&page=${page}`;

    if ((checkNotNull(searchOption) && checkNotNull(searchTerm)) || searchOption === "date") {
        URL = `http://localhost:8090/api/v1/request-board/search?size=${size}&page=${page}`;

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
        const response = await axios.get(URL);

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

export async function deleteBoards(data: any) {
    try {
        const response = await axios.delete("http://localhost:8090/api/v1/request-board/delete", { data: data.boardIds });

        if (response.status !== 204) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while delete board data"
        );
    }
}

export async function updateBoardFavorite({ id, favorite }: IFavoriteProp) {
    const URL = `http://localhost:8090/api/v1/request-board/update/${id}/favorite`;
    try {
        const response = await axios.patch(URL, favorite, { headers: { "Content-Type": "application/json" } });

        if (response.status !== 204) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while update favorite data"
        );
    }
}

export async function getBoard(id: string | null | undefined, type?: string) {
    let URL = `http://localhost:8090/api/v1/request-board/${id}`;

    if (type === "update") {
        URL += "/update";
    }

    console.log("URL : ", URL);
    try {
        const response = await axios.get(URL);

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

export async function verifyPassword(data: any) {
    console.log("verifyPassword : ", data);
    try {
        const response = await axios.post("http://localhost:8090/api/v1/request-board/verify", data);

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
        return response.data;
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while verify password"
        );
    }
}


function checkNotNull(data: any) {
    if (data || data === null || data == undefined || data === "") {
        return false;
    }
    return true;
}