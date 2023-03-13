import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import BookmarkItem from "../components/BookmarkItem";
import BookmarksList from "../components/BookmarksList";
import { getAccessToken } from "../utils/auth";
import { axiosInstance } from "../utils/axios";

function BookmarkDetailPage() {
  const { bookmark, bookmarks } = useRouteLoaderData("bookmark-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={bookmark}>
          {(loadedBookmark) => <BookmarkItem bookmark={loadedBookmark} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={bookmarks}>
          {(loadedBookmarks) => <BookmarksList bookmarks={loadedBookmarks} />}
        </Await>
      </Suspense>
    </>
  );
}

export default BookmarkDetailPage;

async function loadBookmark(id) {
  const access_token = getAccessToken();
  const response = await axiosInstance.get(
    `http://localhost:3333/bookmarks/${id}`,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  if (!response) {
    throw json(
      { message: "Could not fetch details for selected bookmark." },
      {
        status: 500,
      }
    );
  }
  return response.data;
}

async function loadBookmarks() {
  const access_token = getAccessToken();
  const response = await axiosInstance.get("http://localhost:3333/bookmarks", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  if (!response) {
    throw json(
      { message: "Could not fetch bookmarks." },
      {
        status: 500,
      }
    );
  }
  return response.data;
}

export async function loader({ request, params }) {
  const id = params.bookmarkId;

  return defer({
    bookmark: await loadBookmark(id),
    bookmarks: loadBookmarks(),
  });
}

export async function action({ params, request }) {
  const bookmarkId = params.bookmarkId;
  const access_token = getAccessToken();

  const response = await axiosInstance(
    `http://localhost:3333/bookmarks/${bookmarkId}`,
    {
      method: request.method,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  if (!response) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/bookmarks");
}
