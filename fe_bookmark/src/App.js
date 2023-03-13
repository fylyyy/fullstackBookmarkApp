import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import BookmarkDetailPage, {
  loader as bookmarkDetailLoader,
  action as deleteBookmarkAction,
} from "./pages/BookmarkDetail";
import BookmarksPage, { loader as bookmarksLoader } from "./pages/Bookmarks";
import { action as manipulateBookmarkAction } from "./components/BookmarkForm";
import BookmarksLayout from "./pages/BookmarksLayout";
import EditBookmarkPage from "./pages/EditBookmarkPage";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkAuthLoader } from "./utils/auth";
import NewBookmarkPage from "./pages/NewBookmark";
import ThankyouPage from "./pages/Thankyou";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "bookmarks",
        element: <BookmarksLayout />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <BookmarksPage />, loader: bookmarksLoader },
          {
            path: ":bookmarkId",
            id: "bookmark-detail",
            loader: bookmarkDetailLoader,
            children: [
              {
                index: true,
                element: <BookmarkDetailPage />,
                action: deleteBookmarkAction,
              },
              {
                path: "edit",
                element: <EditBookmarkPage />,
                action: manipulateBookmarkAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewBookmarkPage />,
            action: manipulateBookmarkAction,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      { path: "thankyou", element: <ThankyouPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
