import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/common/util/http.ts";
import MainPage from "./components/pages/main/MainPage.tsx";
import RequestBoardListPage from "./components/pages/requestboard/RequestBoardListPage.tsx";
import RequestBoardEditPage from "./components/pages/requestboard/RequestBoardEditPage.tsx";
import RequestBoardViewPage from "./components/pages/requestboard/RequestBoardViewPage.tsx";

import QnABoardListPage from "./components/pages/qnaboard/QnABoardListPage.tsx";
import QnAFormPage from "./components/pages/qnaboard/QnAFormPage.tsx";
import QnABoardViewPage from "./components/pages/qnaboard/QnABoardViewPage.tsx";

import ErrorPage from "./components/pages/error/ErrorPage.tsx";
import WelcomePage from "./components/pages/welcome/WelcomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />, // No Header/Footer
    errorElement: <ErrorPage />,
  },
  {
    path: "",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [      
      {
        path: "pages/request",
        element: <RequestBoardListPage />,
      },
      {
        path: "pages/request/edit",
        element: <RequestBoardEditPage />,
      },
      {
        path: "pages/request/view/:id",
        element: <RequestBoardViewPage />,
      },
      {
        path: "pages/request/edit/:id",
        element: <RequestBoardEditPage />,
      },
      {
        path: "pages/qna",
        element: <QnABoardListPage />,
      },
      {
        path: "pages/qna/edit",
        element: <QnAFormPage />,
      },
      {
        path: "pages/qna/view/:id",
        element: <QnABoardViewPage />,
      },
      {
        path: "pages/qna/edit/:id",
        element: <QnAFormPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
